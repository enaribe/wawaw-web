import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'gold' | 'green' | 'red' | 'orange' | 'blue' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ label, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full border',
        {
          'text-xs px-2 py-0.5': size === 'sm',
          'text-sm px-3 py-1': size === 'md',
          'bg-white/10 border-white/20 text-white/80': variant === 'default',
          'bg-[#FFD700]/10 border-[#FFD700]/30 text-[#FFD700]': variant === 'gold',
          'bg-emerald-500/10 border-emerald-500/30 text-emerald-400': variant === 'green',
          'bg-red-500/10 border-red-500/30 text-red-400': variant === 'red',
          'bg-orange-500/10 border-orange-500/30 text-orange-400': variant === 'orange',
          'bg-blue-500/10 border-blue-500/30 text-blue-400': variant === 'blue',
          'bg-neutral-500/10 border-neutral-500/30 text-neutral-400': variant === 'gray',
        },
        className
      )}
    >
      {label}
    </span>
  );
}
