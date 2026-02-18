'use client';

import { use } from 'react';
import { useContent, useUpdateContent } from '@/lib/queries';
import { ContentForm } from '../../ContentForm';
import type { ContentFormData } from '@/lib/validations';
import type { Season } from '@/features/admin/types';

export default function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: content, isLoading } = useContent(id);
  const updateContent = useUpdateContent();

  const handleSubmit = async (data: ContentFormData, seasons: Season[]) => {
    await updateContent.mutateAsync({
      id,
      data: { ...data, seasons },
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-3xl">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-14 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6">
        <p className="text-white/40 text-sm">Contenu introuvable.</p>
      </div>
    );
  }

  return (
    <ContentForm
      title="Modifier le contenu"
      contentId={id}
      defaultValues={{
        title: content.title,
        type: content.type,
        shortDescription: content.shortDescription,
        fullDescription: content.fullDescription,
        genres: content.genres,
        languages: content.languages,
        year: content.year,
        durationMinutes: content.durationMinutes,
        videoUrl: content.videoUrl,
        trailerUrl: content.trailerUrl,
        posterUrl: content.posterUrl,
        coverUrl: content.coverUrl,
        rating: content.rating,
        directorName: content.directorName,
        productionName: content.productionName,
        accessLevel: content.accessLevel,
        isForKids: content.isForKids,
        status: content.status,
      }}
      defaultSeasons={content.seasons ?? []}
      onSubmit={handleSubmit}
      isLoading={updateContent.isPending}
    />
  );
}
