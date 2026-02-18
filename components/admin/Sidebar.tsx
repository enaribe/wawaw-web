'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  LayoutDashboard, Film, Calendar, Users, CreditCard,
  MessageSquare, Settings, LogOut, ChevronRight, Play,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/contents', label: 'Contenus', icon: Film },
  { href: '/admin/events', label: 'Événements', icon: Calendar },
  { href: '/admin/users', label: 'Utilisateurs', icon: Users },
  { href: '/admin/subscriptions', label: 'Abonnements', icon: CreditCard },
  { href: '/admin/comments', label: 'Commentaires', icon: MessageSquare },
  { href: '/admin/settings', label: 'Paramètres', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 bg-[#FFD700] rounded-lg flex items-center justify-center">
          <Play size={16} className="text-black fill-black ml-0.5" />
        </div>
        <span className="text-lg font-bold tracking-widest text-white">WAWAW</span>
        <span className="ml-auto text-xs text-white/30 font-medium bg-white/5 px-2 py-0.5 rounded">Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-0.5 px-3">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    active
                      ? 'bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/20'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon size={18} className={active ? 'text-[#FFD700]' : ''} />
                  {label}
                  {active && <ChevronRight size={14} className="ml-auto text-[#FFD700]/60" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
