'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  FileText, 
  Settings, 
  LogOut, 
  Menu,
  X,
  BookOpen,
  MessageSquare,
  Briefcase,
  Sparkles,
  Activity,
  Layers,
  UserCheck,
  Mail,
  Upload,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const handleLogout = () => {
    apiClient.logout();
    router.push('/admin/login');
  };

  const menuItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { href: '/admin/crm', icon: UserCheck, label: 'CRM' },
    { href: '/admin/cms', icon: Layers, label: 'CMS' },
    { href: '/admin/email', icon: Mail, label: 'Email' },
    { href: '/admin/products', icon: Briefcase, label: 'Products' },
    { href: '/admin/subscriptions', icon: Sparkles, label: 'Subscriptions' },
    { href: '/admin/content/services', icon: Briefcase, label: 'Services' },
    { href: '/admin/content/portfolio', icon: Sparkles, label: 'Portfolio' },
    { href: '/admin/content/blog', icon: BookOpen, label: 'Blog' },
    { href: '/admin/content/testimonials', icon: MessageSquare, label: 'Testimonials' },
    { href: '/admin/content/hero-texts', icon: FileText, label: 'Hero Texts' },
    { href: '/admin/orders', icon: Activity, label: 'Orders' },
    { href: '/admin/chatbot', icon: MessageSquare, label: 'Chatbot' },
    { href: '/admin/import-export', icon: Upload, label: 'Import/Export' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
    { href: '/admin/logs', icon: Activity, label: 'Logs' },
  ];

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a1f3a] to-[#2d3561] border-b border-gray-700 p-4 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-white/10 text-white"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:transition-none shadow-xl`}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-200 hidden lg:block bg-gradient-to-r from-[#1a1f3a] to-[#2d3561]">
              <h1 className="text-2xl font-bold text-white">Admin</h1>
              <p className="text-xs text-gray-300 mt-1">Dashboard</p>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-[#10b981] text-white font-bold shadow-md'
                        : 'text-gray-700 hover:bg-gray-100 font-medium'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-300 font-semibold"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 lg:ml-0 pt-16 lg:pt-0">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

