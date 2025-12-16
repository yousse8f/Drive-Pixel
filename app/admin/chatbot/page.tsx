'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

type Session = {
  id: string;
  name: string | null;
  email: string | null;
  ip_address: string | null;
  email_sent_status: string | null;
  email_sent_at: string | null;
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
      const res = await apiClient.getChatSessions({
        page,
        limit,
        email: emailFilter || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      if (res.success && res.data) {
        const data = res.data as { sessions?: Session[]; pagination?: { total?: number } };
        setSessions(data.sessions || []);
        setTotal(data.pagination?.total || 0);
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
      const res = await apiClient.getChatMessages(sessionId);
      if (res.success && res.data) {
        const data = res.data as Message[];
        setMessages(Array.isArray(data) ? data : []);
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Chatbot</h1>
        <p className="text-slate-600">عرض الجلسات والرسائل (قراءة فقط)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الفلاتر</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="البحث بالبريد"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <Button onClick={applyFilters} className="w-full md:w-auto">
            تطبيق الفلاتر
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>الجلسات</CardTitle>
            <div className="text-sm text-slate-500">
              الصفحة {page} من {totalPages} ({total} جلسة)
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العميل</TableHead>
                    <TableHead>الإيميل</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>آخر رسالة</TableHead>
                    <TableHead>تاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingSessions ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500">
                        جارِ التحميل...
                      </TableCell>
                    </TableRow>
                  ) : sessions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500">
                        لا توجد نتائج
                      </TableCell>
                    </TableRow>
                  ) : (
                    sessions.map((s) => (
                      <TableRow
                        key={s.id}
                        className={`cursor-pointer ${selectedSessionId === s.id ? 'bg-slate-100' : ''}`}
                        onClick={() => selectSession(s.id)}
                      >
                        <TableCell className="font-semibold">
                          {s.name || '—'}
                        </TableCell>
                        <TableCell>{s.email || '—'}</TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {s.ip_address || '—'}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700 line-clamp-2 max-w-[220px]">
                          {s.last_message || '—'}
                        </TableCell>
                        <TableCell className="text-xs text-slate-500">
                          {format(new Date(s.created_at), 'yyyy-MM-dd HH:mm')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50">
            <div className="text-sm text-slate-600">
              عرض {sessions.length} من {total}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                التالي
              </Button>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>المحادثة</CardTitle>
          </CardHeader>
          <CardContent className="h-[480px] overflow-auto space-y-3">
            {loadingMessages ? (
              <div className="text-center text-slate-500">جارِ التحميل...</div>
            ) : !selectedSessionId ? (
              <div className="text-center text-slate-500">اختر جلسة لعرض التفاصيل</div>
            ) : messages.length === 0 ? (
              <div className="text-center text-slate-500">لا توجد رسائل</div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`px-3 py-2 rounded-xl text-sm max-w-[80%] shadow-sm ${
                      m.sender === 'user'
                        ? 'bg-slate-800 text-white'
                        : 'bg-white border border-slate-200 text-slate-900'
                    }`}
                  >
                    <div className="text-[11px] text-slate-400 mb-1">
                      {format(new Date(m.created_at), 'yyyy-MM-dd HH:mm')}
                    </div>
                    <div className="whitespace-pre-wrap">{m.message}</div>
                    {m.page_url && (
                      <div className="mt-1 text-[11px] text-slate-400 truncate">{m.page_url}</div>
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
