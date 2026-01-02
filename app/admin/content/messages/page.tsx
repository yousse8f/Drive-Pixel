'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Loader2, Mail, CheckCircle, Circle } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setMessages(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      setDeletingId(id);
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        loadMessages();
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      setUpdatingId(id);
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'read' }),
      });
      if (response.ok) {
        loadMessages();
      }
    } catch (error) {
      console.error('Failed to update message status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-600">
        <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-500" />
        Loading messages...
      </div>
    );
  }

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  return (
    <div className="space-y-8 text-gray-900">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-600">
            {messages.length} total messages • {unreadCount} unread
          </p>
        </div>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-xl font-semibold text-gray-900">All Messages</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600">Name</TableHead>
                  <TableHead className="text-gray-600">Email</TableHead>
                  <TableHead className="text-gray-600">Service</TableHead>
                  <TableHead className="text-gray-600">Message</TableHead>
                  <TableHead className="text-gray-600">Date</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-gray-500">
                      No messages yet.
                    </TableCell>
                  </TableRow>
                )}
                {messages.map((message) => (
                  <TableRow 
                    key={message.id} 
                    className={`border-b border-gray-100 hover:bg-gray-50/70 ${
                      message.status === 'unread' ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {message.status === 'unread' ? (
                          <Circle className="h-3 w-3 fill-blue-500 text-blue-500" />
                        ) : (
                          <CheckCircle className="h-3 w-3 text-green-500" />
                        )}
                        <span className={`text-xs font-semibold ${
                          message.status === 'unread' ? 'text-blue-600' : 'text-green-600'
                        }`}>
                          {message.status === 'unread' ? 'Unread' : 'Read'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900">
                      {message.fullName}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      <a href={`mailto:${message.email}`} className="hover:text-emerald-600 hover:underline">
                        {message.email}
                      </a>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                        {message.service}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-gray-700 truncate" title={message.message}>
                        {message.message}
                      </p>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {new Date(message.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {message.status === 'unread' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                            onClick={() => handleMarkAsRead(message.id)}
                            disabled={updatingId === message.id}
                          >
                            {updatingId === message.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                          onClick={() => handleDelete(message.id)}
                          disabled={deletingId === message.id}
                        >
                          {deletingId === message.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
