'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';

const breadcrumbMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/contents': 'Contenus',
  '/admin/contents/new': 'Nouveau contenu',
  '/admin/events': 'Événements',
  '/admin/events/new': 'Nouvel événement',
  '/admin/users': 'Utilisateurs',
  '/admin/subscriptions': 'Abonnements',
  '/admin/comments': 'Commentaires',
  '/admin/settings': 'Paramètres',
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = breadcrumbMap[pathname] ?? 'Admin';

  return (
    <header className="h-16 bg-[#0A0A0A] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
      <div>
        <p className="text-xs text-white/30 font-medium">Admin</p>
        <h1 className="text-sm font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 w-64">
          <Search size={14} className="text-white/30 shrink-0" />
          <input
            type="search"
            placeholder="Rechercher..."
            className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <Bell size={18} className="text-white/60" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 flex items-center justify-center">
          <span className="text-xs font-bold text-[#FFD700]">A</span>
        </div>
      </div>
    </header>
  );
}
