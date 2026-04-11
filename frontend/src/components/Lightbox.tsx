import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface MediaItem {
  id: number;
  title: string;
  category: string;
  mediaUrl: string;
  thumbnailUrl: string;
  description: string;
}

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

const isVideo = (url: string) => {
  if (!url) return false;
  const lower = url.toLowerCase();
  return lower.includes('.mp4') || lower.includes('.webm') || lower.includes('.mov') || lower.includes('.ogg');
};

const Lightbox = ({ item, onClose }: LightboxProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [item]);

  return (
    <AnimatePresence>
      {item && (
        // Backdrop
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Blurred backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* Modal panel */}
          <motion.div
            className="relative z-10 w-full max-w-5xl bg-[#0d0d0d] rounded-2xl overflow-hidden border border-royal-gold/20 shadow-[0_0_80px_rgba(212,175,55,0.15)]"
            initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1.0] }}
            style={{ perspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-royal-gold/30 text-royal-gold hover:bg-royal-gold hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {/* Media area */}
            <div className="relative bg-black w-full aspect-video flex items-center justify-center">
              {item.mediaUrl && isVideo(item.mediaUrl) ? (
                <video
                  src={item.mediaUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster={item.thumbnailUrl || undefined}
                />
              ) : item.mediaUrl ? (
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              ) : item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-royal-gold font-serif text-6xl opacity-30">♛</div>
              )}
            </div>

            {/* Info bar */}
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <span className="text-xs text-royal-purple-light uppercase tracking-widest font-semibold">
                  {item.category}
                </span>
                <h3 className="text-2xl font-serif text-royal-gold mt-1">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{item.description}</p>
                )}
              </div>
              {item.mediaUrl && (
                <a
                  href={item.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-royal-gold/40 text-royal-gold rounded hover:bg-royal-gold/10 transition text-sm"
                >
                  <ExternalLink size={15} />
                  Open
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lightbox;
