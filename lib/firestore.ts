import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  onSnapshot,
  Timestamp,
  type QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  Content,
  Event,
  User,
  Payment,
  Comment,
  Testimonial,
  DashboardStats,
} from '@/features/admin/types';

// ── Helpers ──────────────────────────────────────────────

function toDate(val: unknown): string {
  if (!val) return new Date().toISOString();
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (typeof val === 'string') return val;
  return new Date().toISOString();
}

function mapDoc<T>(snapshot: { id: string; data(): Record<string, unknown> }): T {
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
    startDate: toDate(data.startDate),
    endDate: data.endDate ? toDate(data.endDate) : undefined,
    lastLoginAt: data.lastLoginAt ? toDate(data.lastLoginAt) : undefined,
  } as T;
}

// ── Contents ─────────────────────────────────────────────

export async function getContents(opts?: {
  status?: 'published' | 'draft';
  type?: string;
  limitCount?: number;
}): Promise<Content[]> {
  const constraints: QueryConstraint[] = [];
  if (opts?.status) constraints.push(where('status', '==', opts.status));
  if (opts?.type) constraints.push(where('type', '==', opts.type));
  constraints.push(orderBy('createdAt', 'desc'));
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));

  const snap = await getDocs(query(collection(db, 'contents'), ...constraints));
  return snap.docs.map((d) => mapDoc<Content>(d));
}

export async function getContent(id: string): Promise<Content | null> {
  const snap = await getDoc(doc(db, 'contents', id));
  if (!snap.exists()) return null;
  return mapDoc<Content>(snap);
}

export async function createContent(data: Omit<Content, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'contents'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updateContent(id: string, data: Partial<Content>): Promise<void> {
  await updateDoc(doc(db, 'contents', id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteContent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'contents', id));
}

// ── Events ───────────────────────────────────────────────

export async function getEvents(opts?: {
  status?: string;
  limitCount?: number;
}): Promise<Event[]> {
  const constraints: QueryConstraint[] = [];
  if (opts?.status) constraints.push(where('status', '==', opts.status));
  constraints.push(orderBy('startDate', 'desc'));
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));

  const snap = await getDocs(query(collection(db, 'events'), ...constraints));
  return snap.docs.map((d) => mapDoc<Event>(d));
}

export async function getEvent(id: string): Promise<Event | null> {
  const snap = await getDoc(doc(db, 'events', id));
  if (!snap.exists()) return null;
  return mapDoc<Event>(snap);
}

export async function createEvent(data: Omit<Event, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'events'), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return ref.id;
}

export async function updateEvent(id: string, data: Partial<Event>): Promise<void> {
  await updateDoc(doc(db, 'events', id), data);
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, 'events', id));
}

// ── Users ────────────────────────────────────────────────

export async function getUsers(opts?: { limitCount?: number }): Promise<User[]> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));
  const snap = await getDocs(query(collection(db, 'users'), ...constraints));
  return snap.docs.map((d) => mapDoc<User>(d));
}

export async function getUser(id: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', id));
  if (!snap.exists()) return null;
  return mapDoc<User>(snap);
}

export async function updateUser(id: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', id), data);
}

export async function getUserPayments(userId: string): Promise<Payment[]> {
  const snap = await getDocs(
    query(collection(db, 'payments'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
  );
  return snap.docs.map((d) => mapDoc<Payment>(d));
}

export async function getUserComments(userId: string): Promise<Comment[]> {
  const snap = await getDocs(
    query(collection(db, 'comments'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(20))
  );
  return snap.docs.map((d) => mapDoc<Comment>(d));
}

// ── Payments ─────────────────────────────────────────────

export async function getPayments(opts?: { limitCount?: number }): Promise<Payment[]> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));
  const snap = await getDocs(query(collection(db, 'payments'), ...constraints));
  return snap.docs.map((d) => mapDoc<Payment>(d));
}

// ── Comments ─────────────────────────────────────────────

export async function getComments(opts?: {
  status?: string;
  limitCount?: number;
}): Promise<Comment[]> {
  const constraints: QueryConstraint[] = [];
  if (opts?.status) constraints.push(where('status', '==', opts.status));
  constraints.push(orderBy('createdAt', 'desc'));
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));

  const snap = await getDocs(query(collection(db, 'comments'), ...constraints));
  return snap.docs.map((d) => mapDoc<Comment>(d));
}

export async function updateComment(id: string, data: Partial<Comment>): Promise<void> {
  await updateDoc(doc(db, 'comments', id), data);
}

export async function deleteComment(id: string): Promise<void> {
  await deleteDoc(doc(db, 'comments', id));
}

// ── Testimonials ─────────────────────────────────────────

export async function getTestimonials(opts?: { limitCount?: number }): Promise<Testimonial[]> {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (opts?.limitCount) constraints.push(limit(opts.limitCount));
  const snap = await getDocs(query(collection(db, 'testimonials'), ...constraints));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }) as Testimonial);
}

// ── Settings ─────────────────────────────────────────────

export interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  maintenanceMode: boolean;
  notifications: {
    newUser: boolean;
    payment: boolean;
    comment: boolean;
  };
}

const SETTINGS_DEFAULT: PlatformSettings = {
  platformName: 'WAWAW',
  supportEmail: 'support@wawaw.tv',
  maintenanceMode: false,
  notifications: { newUser: true, payment: true, comment: false },
};

export async function getSettings(): Promise<PlatformSettings> {
  const snap = await getDoc(doc(db, 'settings', 'platform'));
  if (!snap.exists()) return SETTINGS_DEFAULT;
  return { ...SETTINGS_DEFAULT, ...snap.data() } as PlatformSettings;
}

export async function updateSettings(data: Partial<PlatformSettings>): Promise<void> {
  await setDoc(doc(db, 'settings', 'platform'), data, { merge: true });
}

// ── Dashboard stats ───────────────────────────────────────
// Computed from Firestore counts

export async function getDashboardStats(): Promise<DashboardStats> {
  const [usersSnap, contentsSnap, paymentsSnap] = await Promise.all([
    getDocs(collection(db, 'users')),
    getDocs(query(collection(db, 'contents'), where('status', '==', 'published'))),
    getDocs(query(collection(db, 'payments'), where('status', '==', 'completed'))),
  ]);

  const users = usersSnap.docs.map((d) => d.data() as User);
  const premiumUsers = users.filter((u) => u.plan === 'premium' || u.plan === 'family');

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const payments = paymentsSnap.docs.map((d) => d.data() as Payment);
  const monthlyRevenue = payments
    .filter((p) => {
      const d = p.createdAt ? new Date(p.createdAt) : null;
      return d && d >= startOfMonth;
    })
    .reduce((sum, p) => sum + (p.amountFcfa ?? 0), 0);

  return {
    totalUsers: usersSnap.size,
    totalContents: contentsSnap.size,
    premiumSubscribers: premiumUsers.length,
    monthlyRevenueFcfa: monthlyRevenue,
    usersGrowth: 0,
    premiumGrowth: 0,
    revenueGrowth: 0,
  };
}
