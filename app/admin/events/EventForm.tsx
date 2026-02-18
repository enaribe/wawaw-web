'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileUpload } from '@/components/ui/FileUpload';
import { eventSchema, type EventFormData } from '@/lib/validations';
import type { Event } from '@/features/admin/types';

interface EventFormProps {
  defaultValues?: Partial<EventFormData>;
  eventId?: string;
  onSubmit: (data: EventFormData) => Promise<void>;
  isLoading?: boolean;
  title: string;
}

const typeOptions = [
  { value: 'festival', label: 'Festival' },
  { value: 'masterclass', label: 'Masterclass' },
  { value: 'premiere', label: 'Avant-première' },
];

const statusOptions = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
  { value: 'ended', label: 'Terminé' },
];

export function EventForm({ defaultValues, eventId, onSubmit, isLoading, title }: EventFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      type: 'festival',
      status: 'draft',
      isOnline: false,
      isLive: false,
      participantsCount: 0,
      ...defaultValues,
    },
  });

  const isOnline = watch('isOnline');

  const handleFormSubmit = async (data: EventFormData) => {
    await onSubmit(data);
    router.push('/admin/events');
  };

  return (
    <div className="p-6 max-w-2xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/events">
          <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-xs text-white/40 mt-0.5">Événements</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">

        {/* Infos générales */}
        <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Informations générales</h3>

          <Input
            label="Titre *"
            placeholder="Nom de l'événement"
            error={errors.title?.message}
            {...register('title')}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  label="Type *"
                  options={typeOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.type?.message}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Statut *"
                  options={statusOptions}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={errors.status?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date de début *"
              type="datetime-local"
              error={errors.startDate?.message}
              {...register('startDate')}
            />
            <Input
              label="Date de fin"
              type="datetime-local"
              error={errors.endDate?.message}
              {...register('endDate')}
            />
          </div>

          <Input
            label="Nombre de participants"
            type="number"
            min={0}
            error={errors.participantsCount?.message}
            {...register('participantsCount', { valueAsNumber: true })}
          />
        </section>

        {/* Description */}
        <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Description</h3>
          <Textarea
            label="Description *"
            placeholder="Décrivez l'événement..."
            rows={5}
            error={errors.description?.message}
            {...register('description')}
          />
        </section>

        {/* Lieu */}
        <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Lieu</h3>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <Controller
              name="isOnline"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="relative w-10 h-5 rounded-full border transition-colors duration-200"
                    style={{
                      backgroundColor: field.value ? '#FFD700' : 'rgba(255,255,255,0.1)',
                      borderColor: field.value ? '#FFD700' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                      style={{ transform: field.value ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                  <span className="text-sm text-white/70">En ligne</span>
                </label>
              )}
            />
            <Controller
              name="isLive"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <button
                    type="button"
                    onClick={() => field.onChange(!field.value)}
                    className="relative w-10 h-5 rounded-full border transition-colors duration-200"
                    style={{
                      backgroundColor: field.value ? '#FFD700' : 'rgba(255,255,255,0.1)',
                      borderColor: field.value ? '#FFD700' : 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <span
                      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
                      style={{ transform: field.value ? 'translateX(20px)' : 'translateX(0)' }}
                    />
                  </button>
                  <span className="text-sm text-white/70">En direct</span>
                </label>
              )}
            />
          </div>

          {!isOnline && (
            <>
              <Input
                label="Lieu *"
                placeholder="Nom du lieu"
                error={errors.location?.message}
                {...register('location')}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Ville" placeholder="Dakar" {...register('city')} />
                <Input label="Pays" placeholder="Sénégal" {...register('country')} />
              </div>
            </>
          )}

          {isOnline && (
            <Input
              label="Lien / plateforme"
              placeholder="https://..."
              error={errors.location?.message}
              {...register('location')}
            />
          )}
        </section>

        {/* Image */}
        <section className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white">Image</h3>
          <Controller
            name="imageUrl"
            control={control}
            render={({ field }) => (
              <FileUpload
                label="Image de l'événement"
                storagePath={`events/${eventId ?? 'new'}`}
                value={field.value}
                onChange={field.onChange}
                accept="image"
                maxSizeMb={5}
                error={errors.imageUrl?.message}
              />
            )}
          />
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-1">
          <Button type="submit" isLoading={isLoading}>
            <Save size={16} />
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Link href="/admin/events">
            <Button type="button" variant="ghost">
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
