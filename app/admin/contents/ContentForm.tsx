'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as Tabs from '@radix-ui/react-tabs';
import { ArrowLeft, Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { FileUpload } from '@/components/ui/FileUpload';
import { cn } from '@/lib/utils';
import { contentSchema, type ContentFormData } from '@/lib/validations';
import type { Season, Episode } from '@/features/admin/types';

const GENRES = [
  'Action', 'Aventure', 'Animation', 'Biopic', 'Comédie', 'Documentaire',
  'Drame', 'Fantastique', 'Horreur', 'Policier', 'Romance', 'Sci-Fi', 'Thriller',
];
const LANGUAGES = [
  { value: 'fr', label: 'Français' },
  { value: 'wo', label: 'Wolof' },
  { value: 'en', label: 'Anglais' },
];
const typeOptions = [
  { value: 'movie', label: 'Film' },
  { value: 'series', label: 'Série' },
  { value: 'anime', label: 'Animé' },
];
const accessOptions = [
  { value: 'free', label: 'Gratuit' },
  { value: 'premium', label: 'Premium' },
];
const statusOptions = [
  { value: 'draft', label: 'Brouillon' },
  { value: 'published', label: 'Publié' },
];

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-10 h-5 rounded-full border transition-colors duration-200"
        style={{
          backgroundColor: value ? '#FFD700' : 'rgba(255,255,255,0.1)',
          borderColor: value ? '#FFD700' : 'rgba(255,255,255,0.2)',
        }}
      >
        <span
          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200"
          style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }}
        />
      </button>
      <span className="text-sm text-white/70">{label}</span>
    </label>
  );
}

interface ContentFormProps {
  defaultValues?: Partial<ContentFormData>;
  defaultSeasons?: Season[];
  contentId?: string;
  onSubmit: (data: ContentFormData, seasons: Season[]) => Promise<void>;
  isLoading?: boolean;
  title: string;
}

export function ContentForm({
  defaultValues,
  defaultSeasons = [],
  contentId,
  onSubmit,
  isLoading,
  title,
}: ContentFormProps) {
  const router = useRouter();
  const [seasons, setSeasons] = useState<Season[]>(defaultSeasons);
  const [expandedSeason, setExpandedSeason] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      type: 'movie',
      accessLevel: 'free',
      status: 'published',
      isForKids: false,
      isFeatured: false,
      isTrending: false,
      genres: [],
      languages: [],
      year: new Date().getFullYear(),
      rating: 0,
      ...defaultValues,
    },
  });

  const type = watch('type');
  const isSerial = type === 'series' || type === 'anime';

  // ── Seasons management ────────────────────────────────────

  const addSeason = () => {
    const newSeason: Season = {
      id: crypto.randomUUID(),
      number: seasons.length + 1,
      episodes: [],
    };
    setSeasons((prev) => [...prev, newSeason]);
    setExpandedSeason(newSeason.id);
  };

  const removeSeason = (seasonId: string) => {
    setSeasons((prev) => prev.filter((s) => s.id !== seasonId));
  };

  const addEpisode = (seasonId: string) => {
    setSeasons((prev) =>
      prev.map((s) => {
        if (s.id !== seasonId) return s;
        const ep: Episode = {
          id: crypto.randomUUID(),
          number: s.episodes.length + 1,
          title: '',
          durationMinutes: 0,
          videoUrl: '',
        };
        return { ...s, episodes: [...s.episodes, ep] };
      })
    );
  };

  const updateEpisode = (seasonId: string, episodeId: string, data: Partial<Episode>) => {
    setSeasons((prev) =>
      prev.map((s) => {
        if (s.id !== seasonId) return s;
        return {
          ...s,
          episodes: s.episodes.map((ep) =>
            ep.id === episodeId ? { ...ep, ...data } : ep
          ),
        };
      })
    );
  };

  const removeEpisode = (seasonId: string, episodeId: string) => {
    setSeasons((prev) =>
      prev.map((s) =>
        s.id === seasonId
          ? { ...s, episodes: s.episodes.filter((ep) => ep.id !== episodeId) }
          : s
      )
    );
  };

  const handleFormSubmit = async (data: ContentFormData) => {
    await onSubmit(data, isSerial ? seasons : []);
    router.push('/admin/contents');
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/contents">
          <button className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors">
            <ArrowLeft size={18} />
          </button>
        </Link>
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-xs text-white/40 mt-0.5">Contenus</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Tabs.Root defaultValue="general" className="space-y-5">
          {/* Tab list */}
          <Tabs.List className="flex items-center gap-1 bg-white/5 border border-white/5 rounded-xl p-1 w-fit">
            {[
              { value: 'general', label: 'Général' },
              { value: 'description', label: 'Description' },
              { value: 'medias', label: 'Médias' },
              { value: 'categories', label: 'Catégories' },
              ...(isSerial ? [{ value: 'seasons', label: 'Saisons' }] : []),
            ].map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="px-4 py-2 text-xs font-medium rounded-lg transition-all text-white/50 hover:text-white data-[state=active]:bg-[#FFD700] data-[state=active]:text-black"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {/* ── Général ───────────────────────────────── */}
          <Tabs.Content value="general">
            <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
              <Input
                label="Titre *"
                placeholder="Titre du contenu"
                error={errors.title?.message}
                {...register('title')}
              />

              <div className="grid grid-cols-3 gap-4">
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
                  name="accessLevel"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Accès *"
                      options={accessOptions}
                      value={field.value}
                      onValueChange={field.onChange}
                      error={errors.accessLevel?.message}
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

              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Année *"
                  type="number"
                  min={1900}
                  max={new Date().getFullYear() + 2}
                  error={errors.year?.message}
                  {...register('year', { valueAsNumber: true })}
                />
                {!isSerial && (
                  <Input
                    label="Durée (min)"
                    type="number"
                    min={1}
                    placeholder="120"
                    error={errors.durationMinutes?.message}
                    {...register('durationMinutes', { valueAsNumber: true })}
                  />
                )}
                <Input
                  label="Note (0–10)"
                  type="number"
                  min={0}
                  max={10}
                  step={0.1}
                  placeholder="7.5"
                  error={errors.rating?.message}
                  {...register('rating', { valueAsNumber: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Réalisateur"
                  placeholder="Nom du réalisateur"
                  {...register('directorName')}
                />
                <Input
                  label="Production"
                  placeholder="Studio / société"
                  {...register('productionName')}
                />
              </div>

              <div className="flex flex-wrap gap-6">
                <Controller
                  name="isForKids"
                  control={control}
                  render={({ field }) => (
                    <Toggle value={field.value} onChange={field.onChange} label="Contenu pour enfants" />
                  )}
                />
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <Toggle value={field.value} onChange={field.onChange} label="Mis en avant (hero)" />
                  )}
                />
                <Controller
                  name="isTrending"
                  control={control}
                  render={({ field }) => (
                    <Toggle value={field.value} onChange={field.onChange} label="Tendance" />
                  )}
                />
              </div>
            </div>
          </Tabs.Content>

          {/* ── Description ───────────────────────────── */}
          <Tabs.Content value="description">
            <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
              <Textarea
                label="Courte description *"
                placeholder="Résumé court (max 200 caractères)"
                rows={3}
                error={errors.shortDescription?.message}
                hint={`${watch('shortDescription')?.length ?? 0}/200`}
                {...register('shortDescription')}
              />
              <Textarea
                label="Description complète"
                placeholder="Synopsis détaillé..."
                rows={7}
                {...register('fullDescription')}
              />
            </div>
          </Tabs.Content>

          {/* ── Médias ────────────────────────────────── */}
          <Tabs.Content value="medias">
            <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <Controller
                  name="posterUrl"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      label="Affiche (poster)"
                      storagePath={`contents/${contentId ?? 'new'}/poster`}
                      value={field.value}
                      onChange={field.onChange}
                      accept="image"
                      maxSizeMb={5}
                    />
                  )}
                />
                <Controller
                  name="coverUrl"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      label="Bannière (cover)"
                      storagePath={`contents/${contentId ?? 'new'}/cover`}
                      value={field.value}
                      onChange={field.onChange}
                      accept="image"
                      maxSizeMb={5}
                    />
                  )}
                />
              </div>

              {!isSerial && (
                <Controller
                  name="videoUrl"
                  control={control}
                  render={({ field }) => (
                    <FileUpload
                      label="Vidéo principale"
                      storagePath={`contents/${contentId ?? 'new'}/video`}
                      value={field.value}
                      onChange={field.onChange}
                      accept="video"
                      maxSizeMb={2048}
                    />
                  )}
                />
              )}

              <Input
                label="URL bande-annonce"
                type="url"
                placeholder="https://..."
                error={errors.trailerUrl?.message}
                {...register('trailerUrl')}
              />
            </div>
          </Tabs.Content>

          {/* ── Catégories ────────────────────────────── */}
          <Tabs.Content value="categories">
            <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-5">
              {/* Genres */}
              <Controller
                name="genres"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-white/60">
                      Genres * {errors.genres && <span className="text-red-400 ml-1">{errors.genres.message}</span>}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {GENRES.map((g) => {
                        const selected = field.value?.includes(g);
                        return (
                          <button
                            key={g}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? field.value.filter((x: string) => x !== g)
                                  : [...(field.value ?? []), g]
                              )
                            }
                            className={cn(
                              'px-3 py-1 rounded-full text-xs font-medium border transition-all',
                              selected
                                ? 'bg-[#FFD700]/10 border-[#FFD700]/50 text-[#FFD700]'
                                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                            )}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              />

              {/* Langues */}
              <Controller
                name="languages"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-white/60">
                      Langues * {errors.languages && <span className="text-red-400 ml-1">{errors.languages.message}</span>}
                    </label>
                    <div className="flex gap-2">
                      {LANGUAGES.map((l) => {
                        const selected = field.value?.includes(l.value);
                        return (
                          <button
                            key={l.value}
                            type="button"
                            onClick={() =>
                              field.onChange(
                                selected
                                  ? field.value.filter((x: string) => x !== l.value)
                                  : [...(field.value ?? []), l.value]
                              )
                            }
                            className={cn(
                              'px-4 py-1.5 rounded-full text-xs font-medium border transition-all',
                              selected
                                ? 'bg-[#FFD700]/10 border-[#FFD700]/50 text-[#FFD700]'
                                : 'bg-white/5 border-white/10 text-white/50 hover:text-white hover:border-white/20'
                            )}
                          >
                            {l.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              />
            </div>
          </Tabs.Content>

          {/* ── Saisons / Épisodes ────────────────────── */}
          {isSerial && (
            <Tabs.Content value="seasons">
              <div className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-5 space-y-4">
                {seasons.length === 0 ? (
                  <p className="text-sm text-white/30 text-center py-4">
                    Aucune saison. Ajoutez-en une.
                  </p>
                ) : (
                  seasons.map((season) => (
                    <div
                      key={season.id}
                      className="border border-white/8 rounded-xl overflow-hidden"
                    >
                      {/* Season header */}
                      <div className="flex items-center gap-2 px-4 py-3 bg-white/3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSeason(
                              expandedSeason === season.id ? null : season.id
                            )
                          }
                          className="flex-1 flex items-center gap-2 text-left"
                        >
                          {expandedSeason === season.id ? (
                            <ChevronUp size={14} className="text-white/40" />
                          ) : (
                            <ChevronDown size={14} className="text-white/40" />
                          )}
                          <span className="text-sm font-medium text-white">
                            Saison {season.number}
                          </span>
                          <span className="text-xs text-white/30">
                            ({season.episodes.length} épisode{season.episodes.length !== 1 ? 's' : ''})
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSeason(season.id)}
                          className="p-1 text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Season content */}
                      {expandedSeason === season.id && (
                        <div className="p-4 space-y-3">
                          {season.episodes.map((ep) => (
                            <div
                              key={ep.id}
                              className="grid grid-cols-12 gap-2 items-end bg-white/3 rounded-xl p-3"
                            >
                              <div className="col-span-1">
                                <label className="block text-xs text-white/40 mb-1">N°</label>
                                <input
                                  type="number"
                                  value={ep.number}
                                  onChange={(e) =>
                                    updateEpisode(season.id, ep.id, {
                                      number: Number(e.target.value),
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/40"
                                />
                              </div>
                              <div className="col-span-4">
                                <label className="block text-xs text-white/40 mb-1">Titre</label>
                                <input
                                  type="text"
                                  value={ep.title}
                                  placeholder="Titre de l'épisode"
                                  onChange={(e) =>
                                    updateEpisode(season.id, ep.id, { title: e.target.value })
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/40"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-xs text-white/40 mb-1">Durée (min)</label>
                                <input
                                  type="number"
                                  value={ep.durationMinutes}
                                  onChange={(e) =>
                                    updateEpisode(season.id, ep.id, {
                                      durationMinutes: Number(e.target.value),
                                    })
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFD700]/40"
                                />
                              </div>
                              <div className="col-span-4">
                                <label className="block text-xs text-white/40 mb-1">URL vidéo</label>
                                <input
                                  type="url"
                                  value={ep.videoUrl}
                                  placeholder="https://..."
                                  onChange={(e) =>
                                    updateEpisode(season.id, ep.id, { videoUrl: e.target.value })
                                  }
                                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-[#FFD700]/40"
                                />
                              </div>
                              <div className="col-span-1 flex justify-end">
                                <button
                                  type="button"
                                  onClick={() => removeEpisode(season.id, ep.id)}
                                  className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            onClick={() => addEpisode(season.id)}
                            className="w-full flex items-center justify-center gap-2 py-2 text-xs text-white/40 border border-dashed border-white/10 rounded-xl hover:text-white hover:border-white/20 transition-colors"
                          >
                            <Plus size={12} />
                            Ajouter un épisode
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}

                <button
                  type="button"
                  onClick={addSeason}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-sm text-white/40 border border-dashed border-white/10 rounded-xl hover:text-white hover:border-white/20 transition-colors"
                >
                  <Plus size={14} />
                  Ajouter une saison
                </button>
              </div>
            </Tabs.Content>
          )}
        </Tabs.Root>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" isLoading={isLoading}>
            <Save size={16} />
            {isLoading ? 'Enregistrement...' : 'Enregistrer'}
          </Button>
          <Link href="/admin/contents">
            <Button type="button" variant="ghost">
              Annuler
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
