'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { cn } from '@/lib/utils';
import { X, Film, ImageIcon } from 'lucide-react';

interface FileUploadProps {
  storagePath: string;
  value?: string;
  onChange: (url: string) => void;
  accept?: 'image' | 'video';
  maxSizeMb?: number;
  label?: string;
  error?: string;
  className?: string;
}

export function FileUpload({
  storagePath,
  value,
  onChange,
  accept = 'image',
  maxSizeMb = 5,
  label,
  error,
  className,
}: FileUploadProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File) => {
      setUploadError(null);
      if (file.size > maxSizeMb * 1024 * 1024) {
        setUploadError(`Fichier trop volumineux (max ${maxSizeMb} Mo)`);
        return;
      }
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const fileRef = storageRef(storage, `${storagePath}/${fileName}`);
      const task = uploadBytesResumable(fileRef, file);
      task.on(
        'state_changed',
        (snap) =>
          setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        (err) => {
          setUploadError(err.message);
          setProgress(null);
        },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          onChange(url);
          setProgress(null);
        }
      );
    },
    [storagePath, maxSizeMb, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && upload(files[0]),
    accept:
      accept === 'image'
        ? { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] }
        : { 'video/*': ['.mp4', '.webm', '.mov'] },
    multiple: false,
  });

  const displayError = error ?? uploadError;

  return (
    <div className={cn('space-y-1.5', className)}>
      {label && <label className="block text-xs font-medium text-white/60">{label}</label>}

      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-xl transition-all cursor-pointer flex flex-col items-center justify-center gap-2 p-4 min-h-[120px]',
          isDragActive
            ? 'border-[#FFD700]/50 bg-[#FFD700]/5'
            : 'border-white/10 hover:border-white/20'
        )}
      >
        <input {...getInputProps()} />

        {progress !== null ? (
          <div className="w-full space-y-2">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD700] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/40 text-center">Envoi en cours... {progress}%</p>
          </div>
        ) : value ? (
          <>
            {accept === 'image' ? (
              <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
                <img src={value} alt="preview" className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute top-1 right-1 p-1 bg-black/70 rounded-full text-white hover:bg-red-500/90 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div
                className="flex items-center gap-2 text-sm text-white/60"
                onClick={(e) => e.stopPropagation()}
              >
                <Film size={16} className="text-[#FFD700] shrink-0" />
                <span className="truncate max-w-[180px] text-xs">
                  {value.split('?')[0].split('/').pop()}
                </span>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="p-1 hover:text-red-400 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            <p className="text-xs text-white/30">Cliquer pour remplacer</p>
          </>
        ) : (
          <>
            {accept === 'video' ? (
              <Film size={24} className="text-white/20" />
            ) : (
              <ImageIcon size={24} className="text-white/20" />
            )}
            <p className="text-xs text-white/40 text-center">
              Glisser-déposer ou <span className="text-[#FFD700]">parcourir</span>
              <br />
              <span className="text-white/20">
                {accept === 'video' ? 'MP4, WebM, MOV' : 'JPG, PNG, WebP'} — max {maxSizeMb} Mo
              </span>
            </p>
          </>
        )}
      </div>

      {displayError && <p className="text-xs text-red-400">{displayError}</p>}
    </div>
  );
}
