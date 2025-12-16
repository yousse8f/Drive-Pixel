'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageCircle, X, Send } from 'lucide-react';

type Sender = 'user' | 'bot';

type ChatMessage = {
  id: string;
  sender: Sender;
  text: string;
};

type Step =
  | 'greeting'
  | 'service'
  | 'lead-name'
  | 'lead-email'
  | 'context'
  | 'complete';

const servicePrompts: Record<
  string,
  { title: string; followUps: string[]; intro: string }
> = {
  it: {
    title: 'IT Services',
    intro: 'Great! We can help with development, maintenance, hosting, and automation.',
    followUps: [
      'Do you need new development, maintenance, or automation?',
      'Do you already have infrastructure/hosting in place?',
      'What timeline are you aiming for?',
    ],
  },
  realestate: {
    title: 'Real Estate Services',
    intro: 'Awesome. We support IDX sites, marketing, and CRM integrations.',
    followUps: [
      'Do you need IDX integration or listing automation?',
      'Do you have an existing CRM or want recommendations?',
      'Which market/locations are your focus?',
    ],
  },
  ecommerce: {
    title: 'E-commerce Services',
    intro: 'Excellent. We build storefronts, optimize conversions, and integrate ops.',
    followUps: [
      'Are you launching or optimizing an existing store?',
      'Do you need inventory/fulfillment integrations?',
      'What platform or stack are you on today?',
    ],
  },
  support: {
    title: 'Support / Other',
    intro: 'No problem—tell us what you need and we will route it.',
    followUps: [
      'Is this a technical issue, content change, or new request?',
      'Is anything blocked right now?',
      'What outcome would be a win for you?',
    ],
  },
};

const initialBotMessages: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'bot',
    text: "Hi! I'm the DrivePixel assistant. I can help you with IT, Real Estate, E-commerce, or other support. What can we do for you?",
  },
  {
    id: 'm2',
    sender: 'bot',
    text: 'Select a service to start or type a message.',
  },
];

const bubbleClasses =
  'fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-cta text-white shadow-lg hover:shadow-xl transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cta-300 animate-bounce';

const containerClasses =
  'fixed bottom-20 right-4 sm:right-6 z-50 w-[360px] max-w-[95vw] max-h-[70vh] bg-white shadow-2xl rounded-2xl border border-primary-100 flex flex-col overflow-hidden';

const headerClasses =
  'flex items-center justify-between bg-primary-700 text-white px-4 py-3';

const buttonBase =
  'rounded-full px-3 py-2 text-sm font-semibold border transition focus:outline-none focus:ring-2 focus:ring-primary-200';

const serviceBtn =
  'bg-primary-100 text-primary-800 hover:bg-primary-200 border-primary-200';

const inputClasses =
  'flex-1 bg-transparent px-3 py-2 outline-none text-sm placeholder:text-gray-400';

const ChatWindow = dynamic(async () => Promise.resolve(ChatBody), {
  ssr: false,
});

function ChatBody() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialBotMessages);
  const [step, setStep] = useState<Step>('greeting');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [leadName, setLeadName] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || '/api';

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, open]);

  const appendBot = (text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: 'bot', text }]);
  };

  const appendUser = (text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), sender: 'user', text }]);
  };

  const persistMessage = async (
    sender: Sender,
    message: string,
    meta?: { name?: string; email?: string; sessionComplete?: boolean }
  ) => {
    try {
      const res = await fetch(`${apiBase}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          sender,
          message,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
          name: meta?.name,
          email: meta?.email,
          sessionComplete: meta?.sessionComplete,
        }),
      });
      const data = await res.json();
      if (data?.data?.sessionId) {
        setSessionId(data.data.sessionId);
      }
    } catch (e) {
      console.error('Chat message persist error', e);
    }
  };

  const handleServiceSelect = (key: string) => {
    const selected = servicePrompts[key];
    setSelectedService(key);
    appendUser(selected.title);
    persistMessage('user', selected.title);
    appendBot(selected.intro);
    selected.followUps.forEach((f) => appendBot(f));
    setStep('lead-name');
  };

  const handleLeadName = (value: string) => {
    appendUser(value || 'Skipped name');
    setLeadName(value || null);
    persistMessage('user', value || 'Skipped name', { name: value || undefined });
    appendBot('Thanks! Drop your email (optional) so our team can follow up.');
    setStep('lead-email');
  };

  const handleLeadEmail = (value: string) => {
    appendUser(value || 'Skipped email');
    const emailValue = value || null;
    setLeadEmail(emailValue);
    const serviceTitle = selectedService ? servicePrompts[selectedService]?.title : 'General inquiry';
    const leadSummary = `Lead details: Service=${serviceTitle}; Name=${leadName || 'N/A'}; Email=${emailValue || 'N/A'}`;
    persistMessage('user', leadSummary, {
      name: leadName || undefined,
      email: emailValue || undefined,
    });
    appendBot('Got it. Share any context so we can prepare the right answer for you.');
    setStep('context');
  };

  const handleContext = (value: string) => {
    appendUser(value || 'No extra context');
    persistMessage('user', value || 'No extra context', {
      name: leadName || undefined,
      email: leadEmail || undefined,
      sessionComplete: true,
    });
    appendBot('Thanks! A DrivePixel team member will follow up shortly.');
    if (leadEmail) {
      appendBot(`We’ll reach out via ${leadEmail} with next steps.`);
    }
    appendBot('You can leave more notes here any time.');
    setStep('complete');
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');

    switch (step) {
      case 'greeting':
      case 'service':
        appendUser(text);
        persistMessage('user', text);
        appendBot('Select one of the options above to get started.');
        setStep('service');
        break;
      case 'lead-name':
        handleLeadName(text);
        break;
      case 'lead-email':
        handleLeadEmail(text);
        break;
      case 'context':
        handleContext(text);
        break;
      case 'complete':
        appendUser(text);
        persistMessage('user', text);
        appendBot('Noted. We will keep an eye on this thread.');
        break;
      default:
        appendUser(text);
        persistMessage('user', text);
        break;
    }
  };

  const serviceButtons = useMemo(
    () =>
      Object.entries(servicePrompts).map(([key, info]) => (
        <button
          key={key}
          className={`${buttonBase} ${serviceBtn}`}
          onClick={() => handleServiceSelect(key)}
        >
          {info.title}
        </button>
      )),
    []
  );

  const renderInputPlaceholder = () => {
    switch (step) {
      case 'lead-name':
        return 'Your name (optional)';
      case 'lead-email':
        return 'Your email (optional)';
      case 'context':
        return 'What do you need?';
      default:
        return 'Type a message...';
    }
  };

  if (!ready) return null;

  return (
    <>
      <button
        className={`${bubbleClasses} h-14 w-14`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className={containerClasses} role="dialog" aria-label="Chatbot">
          <div className={headerClasses}>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">DrivePixel Assistant</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 hover:bg-primary-600 transition"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 px-4 py-3 space-y-3 overflow-y-auto bg-primary-50"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] ${
                    m.sender === 'user'
                      ? 'bg-primary-600 text-white rounded-br-none'
                      : 'bg-white text-gray-900 border border-primary-100 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {(step === 'greeting' || step === 'service') && (
              <div className="flex flex-wrap gap-2">{serviceButtons}</div>
            )}
          </div>

          <div className="border-t border-primary-100 bg-white">
            <div className="flex items-center px-2 py-1">
              {(step === 'lead-name' || step === 'lead-email' || step === 'context') && (
                <button
                  className="px-3 py-2 text-xs font-semibold text-primary-700 hover:text-primary-900"
                  onClick={() => {
                    if (step === 'lead-name') handleLeadName('');
                    else if (step === 'lead-email') handleLeadEmail('');
                    else if (step === 'context') handleContext('');
                  }}
                  type="button"
                >
                  Skip
                </button>
              )}
              <input
                className={inputClasses}
                placeholder={renderInputPlaceholder()}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                className="p-2 text-primary-700 hover:text-primary-900 disabled:text-gray-300"
                onClick={handleSend}
                disabled={!input.trim()}
                aria-label="Send"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function Chatbot() {
  return <ChatWindow />;
}
