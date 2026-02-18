'use client';

import { useCreateContent } from '@/lib/queries';
import { ContentForm } from '../ContentForm';
import type { ContentFormData } from '@/lib/validations';
import type { Season } from '@/features/admin/types';

export default function NewContentPage() {
  const createContent = useCreateContent();

  const handleSubmit = async (data: ContentFormData, seasons: Season[]) => {
    await createContent.mutateAsync({
      ...data,
      seasons,
      viewCount: 0,
      posterUrl: data.posterUrl ?? '',
      rating: data.rating ?? 0,
    });
  };

  return (
    <ContentForm
      title="Nouveau contenu"
      onSubmit={handleSubmit}
      isLoading={createContent.isPending}
    />
  );
}
