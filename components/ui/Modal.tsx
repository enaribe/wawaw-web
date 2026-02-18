'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl shadow-2xl p-6 focus:outline-none',
            className
          )}
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              {title && (
                <Dialog.Title className="text-base font-semibold text-white">{title}</Dialog.Title>
              )}
              {description && (
                <Dialog.Description className="text-sm text-white/50 mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close asChild>
              <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors shrink-0">
                <X size={16} />
              </button>
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
