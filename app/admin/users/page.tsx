'use client';

import { useState } from 'react';
import { Search, UserX, Shield, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { useUsers, useUpdateUser } from '@/lib/queries';
import { formatDate, cn } from '@/lib/utils';

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const { data: users = [], isLoading } = useUsers();
  const updateUser = useUpdateUser();

  const filtered = users.filter(
    (u) =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">Utilisateurs</h2>
        <p className="text-xs text-white/40 mt-0.5">{users.length} utilisateurs inscrits</p>
      </div>

      <div className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-xl px-3 py-2 max-w-xs">
        <Search size={14} className="text-white/30 shrink-0" />
        <input
          type="search"
          placeholder="Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none w-full"
        />
      </div>

      <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Utilisateur</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden md:table-cell">Plan</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden lg:table-cell">Inscrit le</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden xl:table-cell">Dernière connexion</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Statut</th>
                <th className="text-right text-xs font-semibold text-white/40 px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                        <div className="space-y-2"><div className="h-3 bg-white/10 rounded-full w-28" /><div className="h-2 bg-white/5 rounded-full w-40" /></div>
                      </div>
                    </td>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="px-5 py-4 hidden md:table-cell"><div className="h-3 bg-white/5 rounded-full w-16 animate-pulse" /></td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-white/30 text-sm">Aucun utilisateur trouvé</td></tr>
              ) : (
                filtered.map((u, i) => (
                  <tr key={u.id} className={cn('border-b border-white/5 hover:bg-white/2 transition-colors', i === filtered.length - 1 && 'border-0')}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-[#FFD700]">{u.displayName.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white truncate">{u.displayName}</p>
                          <p className="text-xs text-white/40 truncate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <Badge label={u.plan === 'free' ? 'Gratuit' : u.plan === 'premium' ? 'Premium' : 'Famille'} variant={u.plan === 'free' ? 'gray' : u.plan === 'premium' ? 'gold' : 'blue'} size="sm" />
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell"><span className="text-sm text-white/60">{formatDate(u.createdAt)}</span></td>
                    <td className="px-5 py-4 hidden xl:table-cell"><span className="text-sm text-white/60">{u.lastLoginAt ? formatDate(u.lastLoginAt) : '—'}</span></td>
                    <td className="px-5 py-4">
                      <Badge label={u.status === 'active' ? 'Actif' : 'Suspendu'} variant={u.status === 'active' ? 'green' : 'red'} size="sm" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button className="p-1.5 rounded-lg text-white/40 hover:text-[#FFD700] hover:bg-[#FFD700]/5 transition-colors" title="Promouvoir admin"><Shield size={14} /></button>
                        <button
                          onClick={() => updateUser.mutate({ id: u.id, data: { status: u.status === 'active' ? 'suspended' : 'active' } })}
                          className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                          title={u.status === 'active' ? 'Suspendre' : 'Réactiver'}
                        >
                          <UserX size={14} />
                        </button>
                        <Link href={`/admin/users/${u.id}`}>
                          <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"><MoreHorizontal size={14} /></button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
