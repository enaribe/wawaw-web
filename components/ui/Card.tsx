import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gold';
  hover?: boolean;
}

export function Card({ children, className, variant = 'default', hover }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-6 border transition-all duration-300',
        {
          'bg-[#1A1A1A] border-white/5': variant === 'default',
          'glass': variant === 'glass',
          'glass-gold': variant === 'gold',
          'hover:border-[#FFD700]/30 hover:bg-[#1A1A1A]/80 cursor-pointer': hover,
        },
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  title,
  value,
  growth,
  icon,
  className,
}: {
  title: string;
  value: string;
  growth?: number;
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn('flex items-start gap-4', className)}>
      <div className="p-3 rounded-xl bg-[#FFD700]/10 text-[#FFD700]">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white/50 font-medium">{title}</p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        {growth !== undefined && (
          <p className={cn('text-xs mt-1 font-medium', growth >= 0 ? 'text-emerald-400' : 'text-red-400')}>
            {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)}% ce mois
          </p>
        )}
      </div>
    </Card>
  );
}
