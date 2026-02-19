// ── Content ──────────────────────────────────────────────
export type ContentType = 'movie' | 'series' | 'anime';
export type ContentStatus = 'draft' | 'published';
export type AccessLevel = 'free' | 'premium';

export interface Episode {
  id: string;
  title: string;
  number: number;
  durationMinutes: number;
  videoUrl: string;
  thumbnailUrl?: string;
  sizeMb?: number;
}

export interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  shortDescription: string;
  fullDescription?: string;
  genres: string[];
  languages: string[];
  year: number;
  durationMinutes?: number;
  videoUrl?: string;
  trailerUrl?: string;
  posterUrl: string;
  coverUrl?: string;
  rating: number;
  viewCount: number;
  likesCount: number;
  isFeatured: boolean;
  isTrending: boolean;
  directorName?: string;
  directorAvatarUrl?: string;
  productionName?: string;
  productionLogoUrl?: string;
  accessLevel: AccessLevel;
  isForKids: boolean;
  status: ContentStatus;
  seasons?: Season[];
  createdAt: string;
  updatedAt: string;
}

// ── Event ────────────────────────────────────────────────
export type EventType = 'festival' | 'masterclass' | 'premiere';
export type EventStatus = 'draft' | 'published' | 'ended';

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  startDate: string;
  endDate?: string;
  location: string;
  city?: string;
  country?: string;
  isOnline: boolean;
  isLive: boolean;
  status: EventStatus;
  imageUrl: string;
  participantsCount: number;
  createdAt: string;
}

// ── User ─────────────────────────────────────────────────
export type SubscriptionPlan = 'free' | 'premium' | 'family';
export type UserStatus = 'active' | 'suspended';

export interface User {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  plan: SubscriptionPlan;
  status: UserStatus;
  createdAt: string;
  lastLoginAt?: string;
}

// ── Payment ──────────────────────────────────────────────
export type PaymentOperator = 'orange_money' | 'wave' | 'free_money';
export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Payment {
  id: string;
  userId: string;
  userName: string;
  plan: SubscriptionPlan;
  amountFcfa: number;
  operator: PaymentOperator;
  status: PaymentStatus;
  createdAt: string;
}

// ── Comment ──────────────────────────────────────────────
export type CommentStatus = 'pending' | 'approved' | 'flagged';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  contentId: string;
  contentTitle: string;
  text: string;
  status: CommentStatus;
  createdAt: string;
}

// ── Category ─────────────────────────────────────────────
export interface Category {
  id: string;
  label: string;
  type: ContentType | 'kids';
  imageUrl: string;
}

// ── Testimonial ──────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  avatarUrl: string;
  text: string;
  rating: number;
  location?: string;
}

// ── Dashboard stats ──────────────────────────────────────
export interface DashboardStats {
  totalUsers: number;
  totalContents: number;
  premiumSubscribers: number;
  monthlyRevenueFcfa: number;
  usersGrowth: number;
  premiumGrowth: number;
  revenueGrowth: number;
}
