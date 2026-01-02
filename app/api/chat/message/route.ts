import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'chat-sessions.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read chat sessions from file
async function readSessions() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write chat sessions to file
async function writeSessions(sessions: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(sessions, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, sender, message, pageUrl, name, email, sessionComplete } = body;

    const sessions = await readSessions();
    
    // Generate new session ID if not provided
    const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Find existing session or create new one
    let session = sessions.find((s: any) => s.sessionId === currentSessionId);
    
    if (!session) {
      session = {
        sessionId: currentSessionId,
        startedAt: new Date().toISOString(),
        pageUrl: pageUrl || '',
        name: name || null,
        email: email || null,
        service: null,
        messages: [],
        status: 'active',
        emailSent: false,
      };
      sessions.push(session);
    }
    
    // Update session info if provided
    if (name) session.name = name;
    if (email) session.email = email;
    if (sessionComplete) session.status = 'completed';
    
    // Detect service from message
    if (!session.service && message) {
      const serviceLower = message.toLowerCase();
      if (serviceLower.includes('it') || serviceLower.includes('development')) {
        session.service = 'IT Services';
      } else if (serviceLower.includes('real estate') || serviceLower.includes('realestate')) {
        session.service = 'Real Estate Services';
      } else if (serviceLower.includes('e-commerce') || serviceLower.includes('ecommerce')) {
        session.service = 'E-commerce Services';
      } else if (serviceLower.includes('support') || serviceLower.includes('other')) {
        session.service = 'Support / Other';
      }
    }
    
    // Add message to session
    session.messages.push({
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sender,
      message,
      timestamp: new Date().toISOString(),
    });
    
    session.lastMessageAt = new Date().toISOString();
    
    // Send email if we have name, email, and service, and haven't sent email yet
    if (session.name && session.email && session.service && !session.emailSent) {
      try {
        const emailResponse = await fetch(`${request.nextUrl.origin}/api/chat/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: session.name,
            email: session.email,
            service: session.service,
          }),
        });
        
        if (emailResponse.ok) {
          session.emailSent = true;
          session.emailSentAt = new Date().toISOString();
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Continue even if email fails
      }
    }
    
    await writeSessions(sessions);

    return NextResponse.json({
      success: true,
      data: {
        sessionId: currentSessionId,
        messageCount: session.messages.length,
        emailSent: session.emailSent || false,
      },
    });
  } catch (error) {
    console.error('Error saving chat message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    const sessions = await readSessions();
    
    if (sessionId) {
      const session = sessions.find((s: any) => s.sessionId === sessionId);
      return NextResponse.json({
        success: true,
        data: session || null,
      });
    }
    
    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sessions' },
      { status: 500 }
    );
  }
}
