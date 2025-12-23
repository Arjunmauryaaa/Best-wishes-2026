import { motion } from 'framer-motion';
import { PartyPopper, Heart } from 'lucide-react';

interface ModeToggleProps {
  mode: 'party' | 'warm';
  onModeChange: (mode: 'party' | 'warm') => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={() => onModeChange('party')}
        className={`glass-card rounded-full p-4 transition-all ${
          mode === 'party' 
            ? 'ring-2 ring-gold bg-gold/20' 
            : 'hover:bg-card/60'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Party Mode"
      >
        <PartyPopper className={`w-6 h-6 ${mode === 'party' ? 'text-gold' : 'text-foreground/70'}`} />
      </motion.button>

      <motion.button
        onClick={() => onModeChange('warm')}
        className={`glass-card rounded-full p-4 transition-all ${
          mode === 'warm' 
            ? 'ring-2 ring-rose bg-rose/20' 
            : 'hover:bg-card/60'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Warm Mode"
      >
        <Heart className={`w-6 h-6 ${mode === 'warm' ? 'text-rose' : 'text-foreground/70'}`} fill={mode === 'warm' ? 'currentColor' : 'none'} />
      </motion.button>
    </motion.div>
  );
};

export default ModeToggle;
