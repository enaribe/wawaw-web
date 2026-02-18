'use client';

import { cn } from '@/lib/utils';
import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from 'react';

const fieldBase = (error?: string, className?: string) =>
  cn(
    'w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40',
    error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20',
    className
  );

function Label({ text }: { text?: string }) {
  return text ? <label className="block text-xs font-medium text-white/60">{text}</label> : null;
}

function FieldMessage({ error, hint }: { error?: string; hint?: string }) {
  if (error) return <p className="text-xs text-red-400">{error}</p>;
  if (hint) return <p className="text-xs text-white/30">{hint}</p>;
  return null;
}

// ── Input ─────────────────────────────────────────────────

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...props }, ref) => (
    <div className="space-y-1.5">
      <Label text={label} />
      <input ref={ref} className={fieldBase(error, className)} {...props} />
      <FieldMessage error={error} hint={hint} />
    </div>
  )
);
Input.displayName = 'Input';

// ── Textarea ──────────────────────────────────────────────

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, rows = 4, ...props }, ref) => (
    <div className="space-y-1.5">
      <Label text={label} />
      <textarea
        ref={ref}
        rows={rows}
        className={cn(fieldBase(error, className), 'resize-none')}
        {...props}
      />
      <FieldMessage error={error} hint={hint} />
    </div>
  )
);
Textarea.displayName = 'Textarea';
