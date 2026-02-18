'use client';

import { Plus, Calendar, MapPin, Wifi, Users, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useEvents, useDeleteEvent } from '@/lib/queries';
import { formatDate } from '@/lib/utils';

export default function EventsPage() {
  const { data: events = [], isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white">Événements</h2>
          <p className="text-xs text-white/40 mt-0.5">{events.length} événements</p>
        </div>
        <Link href="/admin/events/new">
          <Button size="sm" variant="primary">
            <Plus size={16} />
            Nouvel événement
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
              <div className="h-40 bg-white/5" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-white/10 rounded-full w-3/4" />
                <div className="h-3 bg-white/5 rounded-full w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-white/30 text-sm">Aucun événement. Créez le premier !</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-[#0F0F0F] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-colors">
              <div
                className="h-40 bg-cover bg-center bg-[#1A1A1A]"
                style={{ backgroundImage: event.imageUrl ? `url(${event.imageUrl})` : undefined }}
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-white leading-snug">{event.title}</h3>
                  <Badge
                    label={event.type === 'festival' ? 'Festival' : event.type === 'masterclass' ? 'Masterclass' : 'Première'}
                    variant={event.type === 'festival' ? 'gold' : event.type === 'masterclass' ? 'blue' : 'green'}
                    size="sm"
                  />
                </div>
                <p className="text-xs text-white/50 line-clamp-2 mb-4">{event.description}</p>
                <div className="space-y-1.5 text-xs text-white/40 mb-4">
                  <div className="flex items-center gap-2"><Calendar size={12} /><span>{formatDate(event.startDate)}</span></div>
                  {event.isOnline
                    ? <div className="flex items-center gap-2"><Wifi size={12} /><span>En ligne</span></div>
                    : <div className="flex items-center gap-2"><MapPin size={12} /><span>{event.location}</span></div>
                  }
                  <div className="flex items-center gap-2"><Users size={12} /><span>{event.participantsCount.toLocaleString('fr-FR')} participants</span></div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge
                    label={event.status === 'published' ? 'Publié' : event.status === 'ended' ? 'Terminé' : 'Brouillon'}
                    variant={event.status === 'published' ? 'green' : event.status === 'ended' ? 'gray' : 'orange'}
                    size="sm"
                  />
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"><Edit size={14} /></button>
                    </Link>
                    <button onClick={() => deleteEvent.mutate(event.id)} className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
