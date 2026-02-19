'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { AdminSidebar } from '@/components/admin/Sidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

type AuthState = 'loading' | 'unauthenticated' | 'not-admin' | 'admin';

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [authState, setAuthState] = useState<AuthState>('loading');

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: { queries: { staleTime: 30 * 1000, retry: 1 } },
  }));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (!user) {
        setAuthState('unauthenticated');
        if (!isLoginPage) router.replace('/admin/login');
        return;
      }

      // Check admin role in Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const role = userDoc.data()?.role;
        if (role === 'admin') {
          setAuthState('admin');
          if (isLoginPage) router.replace('/admin');
        } else {
          setAuthState('not-admin');
        }
      } catch {
        setAuthState('not-admin');
      }
    });

    return () => unsubscribe();
  }, [isLoginPage, router]);

  // On the login page, render immediately (the effect handles redirect if already authed)
  if (isLoginPage) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  }

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === 'not-admin') {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg font-semibold mb-2">Accès refusé</p>
          <p className="text-white/40 text-sm">Votre compte n&apos;a pas les droits administrateur.</p>
        </div>
      </div>
    );
  }

  if (authState === 'unauthenticated') {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-[#0F0F0F] overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
