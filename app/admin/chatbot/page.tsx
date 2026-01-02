'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

type Session = {
  id: string;
  name: string | null;
  email: string | null;
  ip_address: string | null;
  initial_email_sent?: boolean | null;
  email_sent_status: string | null;
  email_sent_at: string | null;
  last_email_status?: string | null;
  last_email_at?: string | null;
  last_activity: string | null;
  created_at: string;
  last_message: string | null;
};

type Message = {
  id: string;
  sender: 'user' | 'bot';
  message: string;
  page_url: string | null;
  created_at: string;
};

export default function ChatbotAdminPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [emailFilter, setEmailFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const limit = 20;

  useEffect(() => {
    loadSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadSessions = async () => {
    setLoadingSessions(true);
    try {
      const response = await fetch('/api/chat/message');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Transform the data to match expected format
          const transformedSessions = data.data.map((session: any) => ({
            id: session.sessionId,
            name: session.name || null,
            email: session.email || null,
            ip_address: null,
            initial_email_sent: false,
            email_sent_status: null,
            email_sent_at: null,
            last_email_status: null,
            last_email_at: null,
            last_activity: session.lastMessageAt || session.startedAt,
            created_at: session.startedAt,
            last_message: session.messages && session.messages.length > 0 
              ? session.messages[session.messages.length - 1].message 
              : null,
          }));
          
          // Apply filters
          let filtered = transformedSessions;
          if (emailFilter) {
            filtered = filtered.filter((s: any) => 
              s.email && s.email.toLowerCase().includes(emailFilter.toLowerCase())
            );
          }
          if (dateFrom) {
            filtered = filtered.filter((s: any) => 
              new Date(s.created_at) >= new Date(dateFrom)
            );
          }
          if (dateTo) {
            filtered = filtered.filter((s: any) => 
              new Date(s.created_at) <= new Date(dateTo)
            );
          }
          
          // Apply pagination
          const start = (page - 1) * limit;
          const end = start + limit;
          const paginated = filtered.slice(start, end);
          
          setSessions(paginated);
          setTotal(filtered.length);
        }
      }
    } catch (err) {
      console.error('Failed to load sessions', err);
    } finally {
      setLoadingSessions(false);
    }
  };

  const loadMessages = async (sessionId: string) => {
    setLoadingMessages(true);
    try {
      const response = await fetch(`/api/chat/message?sessionId=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.messages) {
          // Transform messages to match expected format
          const transformedMessages = data.data.messages.map((msg: any) => ({
            id: msg.id,
            sender: msg.sender,
            message: msg.message,
            page_url: data.data.pageUrl || null,
            created_at: msg.timestamp,
          }));
          setMessages(transformedMessages);
        } else {
          setMessages([]);
        }
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error('Failed to load messages', err);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const applyFilters = () => {
    setPage(1);
    loadSessions();
  };

  const selectSession = (sessionId: string) => {
    setSelectedSessionId(sessionId);
    loadMessages(sessionId);
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-8 text-gray-900">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Chatbot</h1>
        <p className="text-gray-600">View sessions and messages (read-only)</p>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Search by email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="bg-white text-gray-900 placeholder:text-gray-400"
          />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-white text-gray-900"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-white text-gray-900"
          />
          <Button onClick={applyFilters} className="w-full md:w-auto bg-emerald-500 text-white hover:bg-emerald-600">
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-gray-900">Sessions</CardTitle>
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages} ({total} sessions)
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-600 font-semibold">Client</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Email</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Initial Email</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Email Status</TableHead>
                    <TableHead className="text-gray-600 font-semibold">IP</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Last Message</TableHead>
                    <TableHead className="text-gray-600 font-semibold">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingSessions ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-gray-600">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                          Loading sessions...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : sessions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                        No results
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions.map((s) => (
                      <TableRow
                        key={s.id}
                        className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50/70 ${selectedSessionId === s.id ? 'bg-emerald-50' : ''}`}
                        onClick={() => selectSession(s.id)}
                      >
                        <TableCell className="font-semibold text-gray-900">
                          {s.name || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700">{s.email || '—'}</TableCell>
                        <TableCell className="text-sm text-gray-700">
                          {s.initial_email_sent ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell className="text-xs text-gray-600">
                          <div className="font-semibold">{s.last_email_status || s.email_sent_status || '—'}</div>
                          <div className="text-[11px] text-gray-500">
                            {s.last_email_at || s.email_sent_at
                              ? format(new Date(s.last_email_at || s.email_sent_at as string), 'yyyy-MM-dd HH:mm')
                              : '—'}
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {s.ip_address || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-gray-700 line-clamp-2 max-w-[220px]">
                          {s.last_message || '—'}
                        </TableCell>
                        <TableCell className="text-xs text-gray-500">
                          {format(new Date(s.created_at), 'yyyy-MM-dd HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <div className="text-sm text-gray-600">
              Showing {sessions.length} of {total}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Conversation</CardTitle>
          </CardHeader>
          <CardContent className="h-[480px] overflow-auto space-y-3 bg-gray-50">
            {loadingMessages ? (
              <div className="flex items-center justify-center h-full text-gray-600">
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
                Loading messages...
              </div>
            ) : !selectedSessionId ? (
              <div className="flex items-center justify-center h-full text-gray-500">Select a session to view details</div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500">No messages</div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-4 py-3 rounded-xl text-sm max-w-[80%] shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}
                  >
                    <div className={`text-[11px] mb-1 ${
                      m.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                    }`}>
                      {format(new Date(m.created_at), 'yyyy-MM-dd HH:mm')}
                    </div>
                    <div className="whitespace-pre-wrap">{m.message}</div>
                    {m.page_url && (
                      <div className={`mt-1 text-[11px] truncate ${
                        m.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                      }`}>{m.page_url}</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
