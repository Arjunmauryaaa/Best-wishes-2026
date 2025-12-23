import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Copy, Check, Heart } from 'lucide-react';

interface ShareButtonProps {
  recipientName: string;
}

const ShareButton = ({ recipientName }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = recipientName 
      ? `${baseUrl}?for=${encodeURIComponent(recipientName)}`
      : baseUrl;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setShowTooltip(true);
      setTimeout(() => {
        setCopied(false);
        setShowTooltip(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <motion.button
        onClick={handleShare}
        className="glass-card rounded-full px-5 py-3 flex items-center gap-2 hover:bg-card/60 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Check className="w-5 h-5 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Copied!</span>
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2"
            >
              <Share2 className="w-5 h-5 text-foreground/80 group-hover:text-gold transition-colors" />
              <span className="text-sm text-foreground/80 font-medium group-hover:text-gold transition-colors">
                Share
              </span>
              <Heart className="w-4 h-4 text-rose/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Success tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute top-full right-0 mt-2 glass-card rounded-lg px-4 py-2 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <span className="text-foreground/80">Link copied! Share the love 💕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShareButton;
