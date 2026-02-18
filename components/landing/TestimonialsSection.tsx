'use client';

import { Star } from 'lucide-react';
import { useTestimonials } from '@/lib/queries';

export function TestimonialsSection() {
  const { data: testimonials = [], isLoading } = useTestimonials();

  if (!isLoading && testimonials.length === 0) return null;

  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-24 sm:py-32 bg-[#080808] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Témoignages</p>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-4">
            Ce que disent nos{' '}
            <span className="gradient-text">abonnés</span>
          </h2>
        </div>
      </div>

      {isLoading && (
        <div className="flex gap-4 px-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-72 shrink-0 p-5 rounded-2xl bg-[#0F0F0F] border border-white/5 animate-pulse">
              <div className="h-3 bg-white/10 rounded-full w-1/3 mb-3" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-white/5 rounded-full w-full" />
                <div className="h-3 bg-white/5 rounded-full w-4/5" />
                <div className="h-3 bg-white/5 rounded-full w-2/3" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10" />
                <div className="space-y-1">
                  <div className="h-3 bg-white/10 rounded-full w-24" />
                  <div className="h-2 bg-white/5 rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!isLoading && doubled.length > 0 && (
        <div className="relative">
          <div className="flex gap-4 animate-scroll-x" style={{ width: 'max-content' }}>
            {doubled.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="w-72 shrink-0 p-5 rounded-2xl bg-[#0F0F0F] border border-white/5"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={12} className="text-[#FFD700] fill-[#FFD700]" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4 line-clamp-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#FFD700]">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    {t.location && <p className="text-xs text-white/40">{t.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
        </div>
      )}
    </section>
  );
}
