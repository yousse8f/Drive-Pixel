import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'newsletters.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read subscribers from file
async function readSubscribers() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write subscribers to file
async function writeSubscribers(subscribers: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(subscribers, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const subscribers = await readSubscribers();
    
    return NextResponse.json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, source } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const subscribers = await readSubscribers();

    // Check if email already exists
    const existing = subscribers.find((sub: any) => sub.email === email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    // Add new subscriber
    const newSubscriber = {
      id: Date.now().toString(),
      email,
      source: source || 'blog-page',
      created_at: new Date().toISOString(),
    };

    subscribers.push(newSubscriber);
    await writeSubscribers(subscribers);

    return NextResponse.json({
      success: true,
      data: newSubscriber,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe' },
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
        { success: false, error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    const subscribers = await readSubscribers();
    const filtered = subscribers.filter((sub: any) => sub.id !== id);
    
    await writeSubscribers(filtered);

    return NextResponse.json({
      success: true,
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting subscriber:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete subscriber' },
      { status: 500 }
    );
  }
}
