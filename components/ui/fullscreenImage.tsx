'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FullscreenImageProps {
  imageSrc: string | null;
  onClose: () => void;
}

export default function FullscreenImage({ imageSrc, onClose }: FullscreenImageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (imageSrc) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [imageSrc]);

  if (!imageSrc) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-full h-full max-w-6xl max-h-[90vh] p-4 transform transition-transform duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageSrc}
          alt="Fullscreen"
          fill
          className="object-contain rounded-xl shadow-2xl"
        />

        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white group transition-colors duration-200"
          onClick={onClose}
        >
          <X size={24} className="group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
}