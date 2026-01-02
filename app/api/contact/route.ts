import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'contact-messages.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read messages from file
async function readMessages() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write messages to file
async function writeMessages(messages: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(messages, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const messages = await readMessages();
    
    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, service, message } = body;

    if (!fullName || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const messages = await readMessages();

    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      fullName,
      email,
      service,
      message,
      status: 'unread',
      created_at: new Date().toISOString(),
    };

    messages.unshift(newMessage); // Add to beginning of array
    await writeMessages(messages);

    return NextResponse.json({
      success: true,
      data: newMessage,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const messages = await readMessages();
    const filtered = messages.filter((msg: any) => msg.id !== id);
    
    await writeMessages(filtered);

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Message ID and status are required' },
        { status: 400 }
      );
    }

    const messages = await readMessages();
    const messageIndex = messages.findIndex((msg: any) => msg.id === id);
    
    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    messages[messageIndex].status = status;
    await writeMessages(messages);

    return NextResponse.json({
      success: true,
      data: messages[messageIndex],
      message: 'Message status updated successfully',
    });
  } catch (error) {
    console.error('Error updating message status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message status' },
      { status: 500 }
    );
  }
}
