'use client';

import { use } from 'react';
import { ArrowLeft, Shield, UserX, CreditCard, MessageSquare, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useUser, useUserPayments, useUserComments, useUpdateUser } from '@/lib/queries';
import { formatDate, formatDateShort, formatCurrency, cn } from '@/lib/utils';

const PLAN_LABEL: Record<string, string> = { free: 'Gratuit', premium: 'Premium', family: 'Famille' };
const PLAN_VARIANT: Record<string, 'gray' | 'gold' | 'blue'> = { free: 'gray', premium: 'gold', family: 'blue' };
const OPERATOR_LABEL: Record<string, string> = {
  orange_money: 'Orange Money',
  wave: 'Wave',
  free_money: 'Free Money',
};
const PAYMENT_VARIANT: Record<string, 'green' | 'orange' | 'red'> = {
  completed: 'green',
  pending: 'orange',
  failed: 'red',
};
const PAYMENT_LABEL: Record<string, string> = { completed: 'Complété', pending: 'En attente', failed: 'Échoué' };

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const { data: user, isLoading } = useUser(id);
  const { data: payments = [] } = useUserPayments(id);
  const { data: comments = [] } = useUserComments(id);
  const updateUser = useUpdateUser();

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl">
        <div className="h-8 bg-white/5 rounded-xl animate-pulse w-40" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="h-64 bg-white/5 rounded-2xl animate-pulse" />
          <div className="lg:col-span-2 h-64 bg-white/5 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-white/40 text-sm">Utilisateur introuvable.</p>
      </div>
    );
  }

  const initials = user.displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const totalSpent = payments
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + (p.amountFcfa ?? 0), 0);

  return (
    <div className="p-6 max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/users">
          <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h2 className="text-lg font-bold text-white">Détail utilisateur</h2>
          <p className="text-xs text-white/40 mt-0.5">Utilisateurs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* ── Colonne gauche : Profil ── */}
        <div className="space-y-4">
          {/* Card profil */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 flex flex-col items-center text-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/10"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#FFD700]/20 border-2 border-[#FFD700]/30 flex items-center justify-center">
                <span className="text-xl font-bold text-[#FFD700]">{initials}</span>
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-white">{user.displayName}</p>
              <p className="text-xs text-white/40">{user.email}</p>
              {user.phone && <p className="text-xs text-white/40 mt-0.5">{user.phone}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Badge label={PLAN_LABEL[user.plan]} variant={PLAN_VARIANT[user.plan]} />
              <Badge
                label={user.status === 'active' ? 'Actif' : 'Suspendu'}
                variant={user.status === 'active' ? 'green' : 'red'}
              />
            </div>
          </div>

          {/* Infos */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Informations</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Inscrit le</span>
                <span className="text-white">{formatDate(user.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Dernière connexion</span>
                <span className="text-white">{user.lastLoginAt ? formatDate(user.lastLoginAt) : '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Dépenses totales</span>
                <span className="text-[#FFD700] font-semibold">{formatCurrency(totalSpent)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-2">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Actions</h3>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={() =>
                updateUser.mutate({
                  id,
                  data: { status: user.status === 'active' ? 'suspended' : 'active' },
                })
              }
              isLoading={updateUser.isPending}
            >
              <UserX size={14} />
              {user.status === 'active' ? 'Suspendre le compte' : 'Réactiver le compte'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 text-[#FFD700]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/5"
              onClick={() => updateUser.mutate({ id, data: { role: 'admin' } as never })}
            >
              <Shield size={14} />
              Promouvoir admin
            </Button>
          </div>
        </div>

        {/* ── Colonne droite : Activité ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Paiements */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              <CreditCard size={14} className="text-[#FFD700]" />
              <h3 className="text-sm font-semibold text-white">Paiements</h3>
              <span className="text-xs text-white/30 ml-auto">{payments.length} transaction{payments.length !== 1 ? 's' : ''}</span>
            </div>
            {payments.length === 0 ? (
              <p className="text-center text-white/30 text-sm py-8">Aucun paiement</p>
            ) : (
              <div className="divide-y divide-white/5">
                {payments.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">
                        {PLAN_LABEL[p.plan]} — {OPERATOR_LABEL[p.operator] ?? p.operator}
                      </p>
                      <p className="text-xs text-white/40">{formatDateShort(p.createdAt)}</p>
                    </div>
                    <span className="text-sm font-semibold text-white shrink-0">
                      {formatCurrency(p.amountFcfa)}
                    </span>
                    <Badge
                      label={PAYMENT_LABEL[p.status]}
                      variant={PAYMENT_VARIANT[p.status]}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Commentaires */}
          <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
              <MessageSquare size={14} className="text-[#FFD700]" />
              <h3 className="text-sm font-semibold text-white">Commentaires récents</h3>
              <span className="text-xs text-white/30 ml-auto">{comments.length}</span>
            </div>
            {comments.length === 0 ? (
              <p className="text-center text-white/30 text-sm py-8">Aucun commentaire</p>
            ) : (
              <div className="divide-y divide-white/5">
                {comments.map((c) => (
                  <div key={c.id} className="px-5 py-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-medium text-[#FFD700]/80 truncate">{c.contentTitle}</p>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Badge
                          label={c.status === 'approved' ? 'Approuvé' : c.status === 'pending' ? 'En attente' : 'Signalé'}
                          variant={c.status === 'approved' ? 'green' : c.status === 'pending' ? 'orange' : 'red'}
                          size="sm"
                        />
                        <span className="text-xs text-white/30">{formatDateShort(c.createdAt)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
