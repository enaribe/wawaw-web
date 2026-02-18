'use client';

import { use } from 'react';
import { useEvent, useUpdateEvent } from '@/lib/queries';
import { EventForm } from '../../EventForm';
import type { EventFormData } from '@/lib/validations';

export default function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: event, isLoading } = useEvent(id);
  const updateEvent = useUpdateEvent();

  const handleSubmit = async (data: EventFormData) => {
    await updateEvent.mutateAsync({ id, data });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-2xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-6">
        <p className="text-white/40 text-sm">Événement introuvable.</p>
      </div>
    );
  }

  return (
    <EventForm
      title="Modifier l'événement"
      eventId={id}
      defaultValues={{
        title: event.title,
        description: event.description,
        type: event.type,
        status: event.status,
        startDate: event.startDate ? event.startDate.slice(0, 16) : '',
        endDate: event.endDate ? event.endDate.slice(0, 16) : '',
        location: event.location,
        city: event.city,
        country: event.country,
        isOnline: event.isOnline,
        isLive: event.isLive,
        imageUrl: event.imageUrl,
        participantsCount: event.participantsCount,
      }}
      onSubmit={handleSubmit}
      isLoading={updateEvent.isPending}
    />
  );
}
