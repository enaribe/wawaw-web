'use client';

import { Badge } from '@/components/ui/Badge';
import { usePayments } from '@/lib/queries';
import { formatCurrency, formatDate, cn } from '@/lib/utils';

const operatorLabels: Record<string, string> = {
  orange_money: 'Orange Money',
  wave: 'Wave',
  free_money: 'Free Money',
};

export default function SubscriptionsPage() {
  const { data: payments = [], isLoading } = usePayments();

  const completed = payments.filter((p) => p.status === 'completed').length;
  const pending = payments.filter((p) => p.status === 'pending').length;
  const failed = payments.filter((p) => p.status === 'failed').length;

  return (
    <div className="p-6 space-y-5">
      <div>
        <h2 className="text-lg font-bold text-white">Abonnements & Paiements</h2>
        <p className="text-xs text-white/40 mt-0.5">{payments.length} transactions récentes</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Complétés', count: completed, variant: 'green' },
          { label: 'En attente', count: pending, variant: 'orange' },
          { label: 'Échoués', count: failed, variant: 'red' },
        ].map(({ label, count, variant }) => (
          <div key={label} className="bg-[#0F0F0F] border border-white/5 rounded-xl p-4 text-center">
            {isLoading ? (
              <div className="h-8 bg-white/10 rounded-xl w-1/2 mx-auto animate-pulse mb-1" />
            ) : (
              <p className="text-2xl font-black text-white">{count}</p>
            )}
            <p className="text-xs text-white/40 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Utilisateur</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Plan</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden md:table-cell">Montant</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden lg:table-cell">Opérateur</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden lg:table-cell">Date</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="px-5 py-4">
                      <div className="space-y-2 animate-pulse">
                        <div className="h-3 bg-white/10 rounded-full w-32" />
                        <div className="h-2 bg-white/5 rounded-full w-24" />
                      </div>
                    </td>
                    {Array.from({ length: 4 }).map((_, j) => (
                      <td key={j} className="px-5 py-4 hidden md:table-cell">
                        <div className="h-3 bg-white/5 rounded-full w-16 animate-pulse" />
                      </td>
                    ))}
                    <td className="px-5 py-4">
                      <div className="h-3 bg-white/5 rounded-full w-16 animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-white/30 text-sm">
                    Aucune transaction
                  </td>
                </tr>
              ) : (
                payments.map((p, i) => (
                  <tr
                    key={p.id}
                    className={cn(
                      'border-b border-white/5 hover:bg-white/2 transition-colors',
                      i === payments.length - 1 && 'border-0'
                    )}
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-white">{p.userName}</p>
                      <p className="text-xs text-white/40">ID: {p.userId}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        label={p.plan === 'free' ? 'Gratuit' : p.plan === 'premium' ? 'Premium' : 'Famille'}
                        variant={p.plan === 'free' ? 'gray' : p.plan === 'premium' ? 'gold' : 'blue'}
                        size="sm"
                      />
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-sm font-bold text-white">{formatCurrency(p.amountFcfa)}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-sm text-white/60">{operatorLabels[p.operator] ?? p.operator}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-sm text-white/60">{formatDate(p.createdAt)}</span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        label={p.status === 'completed' ? 'Complété' : p.status === 'pending' ? 'En attente' : 'Échoué'}
                        variant={p.status === 'completed' ? 'green' : p.status === 'pending' ? 'orange' : 'red'}
                        size="sm"
                      />
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
