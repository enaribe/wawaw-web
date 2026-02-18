'use client';

import { useState, useEffect } from 'react';
import { Smartphone, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useContents } from '@/lib/queries';

export function HeroSection() {
  const { data: contents = [], isLoading } = useContents({ status: 'published', limitCount: 5 });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (contents.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % contents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [contents.length]);

  if (isLoading) {
    return (
      <section className="relative min-h-screen flex items-end overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-32 w-full">
          <div className="max-w-2xl space-y-4 animate-pulse">
            <div className="h-4 w-32 bg-white/10 rounded-full" />
            <div className="h-16 w-3/4 bg-white/10 rounded-xl" />
            <div className="h-4 w-1/2 bg-white/10 rounded-full" />
            <div className="h-16 w-full bg-white/5 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (contents.length === 0) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="text-center max-w-lg px-4">
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-xs font-semibold text-[#FFD700] tracking-wider uppercase">Cinéma Africain</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black leading-tight mb-4">
            Le meilleur du<br />
            <span className="gradient-text">cinéma africain</span>
          </h1>
          <p className="text-base text-white/50 leading-relaxed mb-8">
            Films, séries et animés africains en streaming. Disponible sur iOS et Android.
          </p>
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Button size="lg" variant="primary" className="gap-2">
              <Smartphone size={18} />
              Télécharger l&apos;app
            </Button>
            <Button size="lg" variant="ghost" className="gap-1 text-white">
              En savoir plus
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const current = contents[activeIndex];

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {contents.map((content, i) => (
          <div
            key={content.id}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${content.coverUrl ?? content.posterUrl})` }}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-[#FFD700]/10 border border-[#FFD700]/20 rounded-full px-3 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
            <span className="text-xs font-semibold text-[#FFD700] tracking-wider uppercase">Cinéma Africain</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-4 transition-all duration-700">
            {current.title}
          </h1>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-[#FFD700] fill-[#FFD700]" />
              <span className="text-sm font-bold text-[#FFD700]">{current.rating.toFixed(1)}</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-sm text-white/60">{current.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-sm text-white/60">{current.durationMinutes ? `${current.durationMinutes} min` : 'Série'}</span>
            {current.genres.slice(0, 2).map((g) => (
              <span key={g} className="text-xs font-medium text-white/40 border border-white/10 rounded-full px-2 py-0.5">{g}</span>
            ))}
          </div>

          <p className="text-base text-white/60 leading-relaxed mb-8 max-w-lg line-clamp-3">
            {current.shortDescription}
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <Button size="lg" variant="primary" className="gap-2">
              <Smartphone size={18} />
              Télécharger l&apos;app
            </Button>
            <Button size="lg" variant="ghost" className="gap-1 text-white">
              En savoir plus
              <ChevronRight size={16} />
            </Button>
          </div>

          {contents.length > 1 && (
            <div className="flex items-center gap-2 mt-10">
              {contents.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? 28 : 6,
                    height: 6,
                    backgroundColor: i === activeIndex ? '#FFD700' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
