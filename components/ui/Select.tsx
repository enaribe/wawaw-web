'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Sélectionner...',
  label,
  error,
  disabled,
  className,
}: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-medium text-white/60">{label}</label>}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          className={cn(
            'flex items-center justify-between w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#FFD700]/40 focus:border-[#FFD700]/40',
            error ? 'border-red-500/50' : 'border-white/10 hover:border-white/20',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <SelectPrimitive.Value
            placeholder={<span className="text-white/30">{placeholder}</span>}
          />
          <SelectPrimitive.Icon>
            <ChevronDown size={14} className="text-white/40 shrink-0" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="z-50 min-w-[var(--radix-select-trigger-width)] bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white/70 rounded-lg cursor-pointer outline-none hover:bg-white/5 hover:text-white focus:bg-white/5 data-[state=checked]:text-[#FFD700]"
                >
                  <SelectPrimitive.ItemIndicator>
                    <Check size={12} className="text-[#FFD700]" />
                  </SelectPrimitive.ItemIndicator>
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
