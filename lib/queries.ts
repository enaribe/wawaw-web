import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getUsers,
  getUser,
  updateUser,
  getUserPayments,
  getUserComments,
  getPayments,
  getComments,
  updateComment,
  deleteComment,
  getTestimonials,
  getDashboardStats,
  getSettings,
  updateSettings,
  type PlatformSettings,
} from './firestore';
import type { Content, Event, User, Comment } from '@/features/admin/types';

// ── Contents ─────────────────────────────────────────────

export function useContents(opts?: { status?: 'published' | 'draft'; type?: string; limitCount?: number }) {
  return useQuery({
    queryKey: ['contents', opts],
    queryFn: () => getContents(opts),
  });
}

export function useContent(id: string) {
  return useQuery({
    queryKey: ['contents', id],
    queryFn: () => getContent(id),
    enabled: !!id,
  });
}

export function useCreateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>) => createContent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contents'] }),
  });
}

export function useUpdateContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Content> }) => updateContent(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contents'] }),
  });
}

export function useDeleteContent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contents'] }),
  });
}

// ── Events ───────────────────────────────────────────────

export function useEvents(opts?: { status?: string; limitCount?: number }) {
  return useQuery({
    queryKey: ['events', opts],
    queryFn: () => getEvents(opts),
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: () => getEvent(id),
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Event, 'id' | 'createdAt'>) => createEvent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Event> }) => updateEvent(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['events'] }),
  });
}

// ── Users ────────────────────────────────────────────────

export function useUsers(opts?: { limitCount?: number }) {
  return useQuery({
    queryKey: ['users', opts],
    queryFn: () => getUsers(opts),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => updateUser(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}

export function useUserPayments(userId: string) {
  return useQuery({
    queryKey: ['payments', 'user', userId],
    queryFn: () => getUserPayments(userId),
    enabled: !!userId,
  });
}

export function useUserComments(userId: string) {
  return useQuery({
    queryKey: ['comments', 'user', userId],
    queryFn: () => getUserComments(userId),
    enabled: !!userId,
  });
}

// ── Payments ─────────────────────────────────────────────

export function usePayments(opts?: { limitCount?: number }) {
  return useQuery({
    queryKey: ['payments', opts],
    queryFn: () => getPayments(opts),
  });
}

// ── Comments ─────────────────────────────────────────────

export function useComments(opts?: { status?: string; limitCount?: number }) {
  return useQuery({
    queryKey: ['comments', opts],
    queryFn: () => getComments(opts),
  });
}

export function useUpdateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Comment> }) => updateComment(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['comments'] }),
  });
}

// ── Testimonials ─────────────────────────────────────────

export function useTestimonials(opts?: { limitCount?: number }) {
  return useQuery({
    queryKey: ['testimonials', opts],
    queryFn: () => getTestimonials(opts),
  });
}

// ── Settings ─────────────────────────────────────────────

export function useSettings() {
  return useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<PlatformSettings>) => updateSettings(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['settings'] }),
  });
}

// ── Dashboard ────────────────────────────────────────────

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    staleTime: 5 * 60 * 1000,
  });
}
