'use client';

import { usePathname } from 'next/navigation';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingCartButton from '@/components/ui/FloatingCartButton';
import Chatbot from '@/components/Chatbot';

export default function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <>
      {children}
      {!isAdminPage && (
        <>
          <WhatsAppButton />
          <FloatingCartButton />
          <Chatbot />
        </>
      )}
    </>
  );
}
