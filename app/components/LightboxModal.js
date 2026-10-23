'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onNext,
  onPrev,
  imageSrc,
  imageAlt,
  caption,
  title,
}) {
  // Normalize single image vs image array
  const currentItem =
    images && images.length > 0
      ? images[currentIndex] || images[0]
      : { src: imageSrc, alt: imageAlt, title, caption };

  const total = images && images.length > 0 ? images.length : 1;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !currentItem?.src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title || 'Image Preview Lightbox'}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 select-none transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Top Bar with Counter and Close Button */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
        {total > 1 ? (
          <div className="font-mono text-xs text-white/80 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 pointer-events-auto">
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
        ) : <div />}

        <button
          onClick={onClose}
          aria-label="Close image lightbox"
          className="p-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev Arrow */}
      {total > 1 && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous image"
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Next Arrow */}
      {total > 1 && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next image"
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full aspect-[16/10] max-h-[72vh] rounded-xl overflow-hidden border border-white/20 bg-[#0A0A0E] shadow-2xl">
          <Image
            src={currentItem.src}
            alt={currentItem.alt || 'Expanded view'}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Caption Bar */}
        {(currentItem.title || currentItem.caption) && (
          <div className="w-full mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            {currentItem.title && (
              <span className="font-bold text-sm text-[var(--accent)]">
                {currentItem.title}
              </span>
            )}
            {currentItem.caption && (
              <span className="text-xs text-white/80">
                {currentItem.caption}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
