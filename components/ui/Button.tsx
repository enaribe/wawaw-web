import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50',
          {
            // Variants
            'bg-[#FFD700] text-black hover:bg-[#E2B93B] active:scale-[0.98] shadow-lg hover:shadow-[#FFD700]/20 hover:shadow-xl': variant === 'primary',
            'border border-[#FFD700]/60 text-[#FFD700] hover:bg-[#FFD700]/10 hover:border-[#FFD700]': variant === 'outline',
            'text-white/70 hover:text-white hover:bg-white/5': variant === 'ghost',
            'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20': variant === 'danger',
            // Sizes
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-5 py-2.5': size === 'md',
            'text-base px-8 py-3.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
