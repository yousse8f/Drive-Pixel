'use client';

import { usePathname } from 'next/navigation';
import Chatbot from '@/components/Chatbot';

export default function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdminPage && (
        <>
          <Chatbot />
        </>
      )}
    </>
  );
}
