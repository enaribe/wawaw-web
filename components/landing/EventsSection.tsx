'use client';

import { Calendar, MapPin, Wifi, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useEvents } from '@/lib/queries';
import { formatDate } from '@/lib/utils';

export function EventsSection() {
  const { data: events = [], isLoading } = useEvents({ status: 'published', limitCount: 3 });

  if (!isLoading && events.length === 0) return null;

  return (
    <section className="py-24 sm:py-32" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#FFD700] mb-3">Événements</p>
            <h2 className="text-3xl sm:text-4xl font-black leading-tight">
              Festivals & <span className="gradient-text">avant-premières</span>
            </h2>
            <p className="text-sm text-white/50 mt-2 max-w-md">
              Participez aux événements du cinéma africain, en présentiel et en ligne.
            </p>
          </div>
          <Button variant="outline" size="sm" className="self-start sm:self-auto shrink-0">
            Tous les événements
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-white/10 rounded-full w-3/4" />
                  <div className="h-3 bg-white/5 rounded-full w-full" />
                  <div className="h-3 bg-white/5 rounded-full w-1/2" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-[#0F0F0F]"
              >
                <div className="relative h-44 overflow-hidden bg-[#1A1A1A]">
                  {event.imageUrl && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${event.imageUrl})` }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] to-transparent" />

                  {event.isLive && (
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>
                  )}

                  <div className="absolute top-3 right-3">
                    <Badge
                      label={event.type === 'festival' ? 'Festival' : event.type === 'masterclass' ? 'Masterclass' : 'Première'}
                      variant={event.type === 'festival' ? 'gold' : event.type === 'masterclass' ? 'blue' : 'green'}
                      size="sm"
                    />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-white text-base mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-sm text-white/50 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-1.5 text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    {event.isOnline ? (
                      <div className="flex items-center gap-2">
                        <Wifi size={12} />
                        <span>En ligne</span>
                      </div>
                    ) : event.location ? (
                      <div className="flex items-center gap-2">
                        <MapPin size={12} />
                        <span>{event.location}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
