import { z } from 'zod';

// ── Content schema ───────────────────────────────────────
export const contentSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(200),
  type: z.enum(['movie', 'series', 'anime']),
  shortDescription: z.string().max(200, 'Maximum 200 caractères'),
  fullDescription: z.string().optional(),
  genres: z.array(z.string()).min(1, 'Sélectionnez au moins un genre'),
  languages: z.array(z.string()).min(1, 'Sélectionnez au moins une langue'),
  year: z.number().min(1900).max(new Date().getFullYear() + 2),
  durationMinutes: z.number().min(1).optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  trailerUrl: z.string().url().optional().or(z.literal('')),
  directorName: z.string().optional(),
  productionName: z.string().optional(),
  accessLevel: z.enum(['free', 'premium']),
  isForKids: z.boolean(),
  status: z.enum(['draft', 'published']),
  posterUrl: z.string().optional(),
  coverUrl: z.string().optional(),
  rating: z.number().min(0).max(10).optional(),
});

export type ContentFormData = z.infer<typeof contentSchema>;

// ── Event schema ─────────────────────────────────────────
export const eventSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().min(1, 'Description requise'),
  type: z.enum(['festival', 'masterclass', 'premiere']),
  startDate: z.string().min(1, 'Date de début requise'),
  endDate: z.string().optional(),
  location: z.string().min(1, 'Lieu requis'),
  city: z.string().optional(),
  country: z.string().optional(),
  isOnline: z.boolean(),
  isLive: z.boolean(),
  status: z.enum(['draft', 'published', 'ended']),
  imageUrl: z.string().optional(),
  participantsCount: z.number().min(0),
});

export type EventFormData = z.infer<typeof eventSchema>;

// ── Auth schema ──────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ── Newsletter schema ────────────────────────────────────
export const newsletterSchema = z.object({
  email: z.string().email('Email invalide'),
});
