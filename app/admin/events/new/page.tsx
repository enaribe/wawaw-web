'use client';

import { useCreateEvent } from '@/lib/queries';
import { EventForm } from '../EventForm';
import type { EventFormData } from '@/lib/validations';

export default function NewEventPage() {
  const createEvent = useCreateEvent();

  const handleSubmit = async (data: EventFormData) => {
    await createEvent.mutateAsync({
      ...data,
      imageUrl: data.imageUrl ?? '',
    });
  };

  return (
    <EventForm
      title="Nouvel événement"
      onSubmit={handleSubmit}
      isLoading={createEvent.isPending}
    />
  );
}
