'use client';

import { useState } from 'react';
import { Plus, Search, Star, Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useContents, useDeleteContent, useUpdateContent } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { ContentType } from '@/features/admin/types';

const filters: { label: string; value: ContentType | 'all' }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Films', value: 'movie' },
  { label: 'Séries', value: 'series' },
  { label: 'Animés', value: 'anime' },
];

export default function ContentsPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<ContentType | 'all'>('all');

  const { data: contents = [], isLoading } = useContents();
  const deleteContent = useDeleteContent();
  const updateContent = useUpdateContent();

  const filtered = contents.filter((c) => {
    const matchType = typeFilter === 'all' || c.type === typeFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Contenus</h2>
          <p className="text-xs text-white/40 mt-0.5">{contents.length} contenus au total</p>
        </div>
        <Link href="/admin/contents/new">
          <Button size="sm" variant="primary">
            <Plus size={16} />
            Ajouter un contenu
          </Button>
        </Link>
      </div>

      {/* Filters & search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-xl px-3 py-2 flex-1 max-w-xs">
          <Search size={14} className="text-white/30 shrink-0" />
          <input
            type="search"
            placeholder="Rechercher un contenu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-sm text-white placeholder-white/30 focus:outline-none w-full"
          />
        </div>
        <div className="flex items-center gap-2">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setTypeFilter(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                typeFilter === value
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'text-white/50 border-white/10 hover:text-white hover:border-white/20'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Contenu</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden md:table-cell">Type</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden lg:table-cell">Année</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3 hidden lg:table-cell">Note</th>
                <th className="text-left text-xs font-semibold text-white/40 px-5 py-3">Accès</th>
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
                        <div className="w-9 h-12 rounded-md bg-white/5 shrink-0" />
                        <div className="space-y-2">
                          <div className="h-3 bg-white/10 rounded-full w-32" />
                          <div className="h-2 bg-white/5 rounded-full w-20" />
                        </div>
                      </div>
                    </td>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="px-5 py-4 hidden md:table-cell">
                        <div className="h-3 bg-white/5 rounded-full w-16 animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-white/30 text-sm">
                    Aucun contenu trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((c, i) => {
                  const typeLabel = c.type === 'movie' ? 'Film' : c.type === 'series' ? 'Série' : 'Animé';
                  const typeBadge = c.type === 'movie' ? 'blue' : c.type === 'series' ? 'green' : 'orange';
                  return (
                    <tr
                      key={c.id}
                      className={cn(
                        'border-b border-white/5 hover:bg-white/2 transition-colors',
                        i === filtered.length - 1 && 'border-0'
                      )}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-12 rounded-md bg-cover bg-center shrink-0 bg-[#1A1A1A]"
                            style={{ backgroundImage: c.posterUrl ? `url(${c.posterUrl})` : undefined }}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate max-w-[150px]">{c.title}</p>
                            {c.directorName && <p className="text-xs text-white/40 truncate">{c.directorName}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <Badge label={typeLabel} variant={typeBadge as 'blue' | 'green' | 'orange'} size="sm" />
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <span className="text-sm text-white/60">{c.year}</span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-[#FFD700] fill-[#FFD700]" />
                          <span className="text-sm text-white/70">{c.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <Badge
                          label={c.accessLevel === 'free' ? 'Gratuit' : 'Premium'}
                          variant={c.accessLevel === 'free' ? 'default' : 'gold'}
                          size="sm"
                        />
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={() => updateContent.mutate({ id: c.id, data: { status: c.status === 'published' ? 'draft' : 'published' } })}
                        >
                          <Badge
                            label={c.status === 'published' ? 'Publié' : 'Brouillon'}
                            variant={c.status === 'published' ? 'green' : 'gray'}
                            size="sm"
                          />
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1 justify-end">
                          <Link href={`/admin/contents/${c.id}/edit`}>
                            <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                              <Eye size={14} />
                            </button>
                          </Link>
                          <Link href={`/admin/contents/${c.id}/edit`}>
                            <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                              <Edit size={14} />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteContent.mutate(c.id)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
