'use client';

import { useState } from 'react';
import { Smartphone, Star, Lock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useContents } from '@/lib/queries';
import { cn } from '@/lib/utils';
import type { Content, ContentType } from '@/features/admin/types';

const filters: { label: string; value: ContentType | 'all' }[] = [
  { label: 'Tout', value: 'all' },
  { label: 'Films', value: 'movie' },
  { label: 'Séries', value: 'series' },
  { label: 'Animés', value: 'anime' },
];

export function CatalogSection() {
  const [activeFilter, setActiveFilter] = useState<ContentType | 'all'>('all');
  const { data: contents = [], isLoading } = useContents({ status: 'published' });

  const filtered = activeFilter === 'all'
    ? contents
    : contents.filter((c) => c.type === activeFilter);

  const displayed = filtered.slice(0, 8);

  return (
    <section className="py-24 sm:py-32 bg-[#080808]" id="catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Catalogue</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Films & Séries <span className="gradient-text">africains</span>
            </h2>
          </div>
          <Button variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
            Voir tout le catalogue
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {filters.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setActiveFilter(value)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
                activeFilter === value
                  ? 'bg-[#FFD700] text-black border-[#FFD700]'
                  : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/20'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-[#111] border border-white/5 animate-pulse">
                <div className="aspect-[2/3] bg-white/5" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-white/10 rounded-full w-3/4" />
                  <div className="h-3 bg-white/5 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && displayed.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/30 text-sm">Aucun contenu disponible pour le moment.</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && displayed.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayed.map((content) => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContentCard({ content }: { content: Content }) {
  const typeLabel = content.type === 'movie' ? 'Film' : content.type === 'series' ? 'Série' : 'Animé';
  const typeBadge = content.type === 'movie' ? 'blue' : content.type === 'series' ? 'green' : 'orange';

  return (
    <div className="group relative rounded-xl overflow-hidden bg-[#111] border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden bg-[#1A1A1A]">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${content.posterUrl})` }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 px-3 text-center">
            <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center">
              <Smartphone size={16} className="text-[#FFD700]" />
            </div>
            <span className="text-xs font-semibold text-white leading-tight">Disponible sur l&apos;app</span>
          </div>
        </div>
        {content.accessLevel === 'premium' && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center">
            <Lock size={10} className="text-[#FFD700]" />
          </div>
        )}
        <div className="absolute top-2 left-2">
          <Badge label={typeLabel} variant={typeBadge as 'blue' | 'green' | 'orange'} size="sm" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-1 mb-1">{content.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">{content.year}</span>
          <div className="flex items-center gap-1">
            <Star size={10} className="text-[#FFD700] fill-[#FFD700]" />
            <span className="text-xs font-bold text-white/70">{content.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
