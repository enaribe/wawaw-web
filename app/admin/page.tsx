'use client';

import { Users, Film, TrendingUp, Crown, ArrowUpRight, Star } from 'lucide-react';
import { StatCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useDashboardStats, useContents, useUsers } from '@/lib/queries';
import { formatCurrency } from '@/lib/utils';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const PLAN_COLORS = ['#6B7280', '#FFD700', '#E2B93B'];

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: contents = [], isLoading: contentsLoading } = useContents({ limitCount: 5 });
  const { data: users = [], isLoading: usersLoading } = useUsers({ limitCount: 6 });

  if (statsLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded-full w-1/2 mb-3" />
              <div className="h-8 bg-white/10 rounded-xl w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Utilisateurs totaux"
          value={(stats?.totalUsers ?? 0).toLocaleString('fr-FR')}
          growth={stats?.usersGrowth}
          icon={<Users size={20} />}
        />
        <StatCard
          title="Contenus publiés"
          value={(stats?.totalContents ?? 0).toLocaleString('fr-FR')}
          icon={<Film size={20} />}
        />
        <StatCard
          title="Revenus du mois"
          value={formatCurrency(stats?.monthlyRevenueFcfa ?? 0)}
          growth={stats?.revenueGrowth}
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Abonnés premium"
          value={(stats?.premiumSubscribers ?? 0).toLocaleString('fr-FR')}
          growth={stats?.premiumGrowth}
          icon={<Crown size={20} />}
        />
      </div>

      {/* Recent contents + recent users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent contents */}
        <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">Contenus récents</p>
            <a href="/admin/contents" className="text-xs text-[#FFD700] hover:underline flex items-center gap-1">
              Voir tout <ArrowUpRight size={12} />
            </a>
          </div>
          {contentsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-14 rounded-lg bg-white/5 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded-full w-2/3" />
                    <div className="h-2 bg-white/5 rounded-full w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : contents.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-8">Aucun contenu</p>
          ) : (
            <div className="space-y-3">
              {contents.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <div
                    className="w-10 h-14 rounded-lg bg-cover bg-center shrink-0 bg-[#1A1A1A]"
                    style={{ backgroundImage: c.posterUrl ? `url(${c.posterUrl})` : undefined }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{c.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-white/40">{c.year}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <div className="flex items-center gap-0.5">
                        <Star size={10} className="text-[#FFD700] fill-[#FFD700]" />
                        <span className="text-xs text-white/50">{c.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    label={c.status === 'published' ? 'Publié' : 'Brouillon'}
                    variant={c.status === 'published' ? 'green' : 'gray'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent users */}
        <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-white">Utilisateurs récents</p>
            <a href="/admin/users" className="text-xs text-[#FFD700] hover:underline flex items-center gap-1">
              Voir tout <ArrowUpRight size={12} />
            </a>
          </div>
          {usersLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded-full w-1/2" />
                    <div className="h-2 bg-white/5 rounded-full w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="text-sm text-white/30 text-center py-8">Aucun utilisateur</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#FFD700]">
                      {u.displayName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{u.displayName}</p>
                    <p className="text-xs text-white/40 truncate">{u.email}</p>
                  </div>
                  <Badge
                    label={u.plan === 'free' ? 'Gratuit' : u.plan === 'premium' ? 'Premium' : 'Famille'}
                    variant={u.plan === 'free' ? 'gray' : u.plan === 'premium' ? 'gold' : 'blue'}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
