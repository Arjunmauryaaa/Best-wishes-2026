import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send } from 'lucide-react';

interface PersonalizationInputProps {
  onNameChange: (name: string) => void;
  currentName: string;
}

const PersonalizationInput = ({ onNameChange, currentName }: PersonalizationInputProps) => {
  const [inputValue, setInputValue] = useState(currentName);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameChange(inputValue.trim());
  };

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 md:p-8 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-6">
        <motion.div
          className="inline-flex items-center gap-2 mb-3"
          animate={{ scale: isFocused ? 1.05 : 1 }}
        >
          <Sparkles className="w-5 h-5 text-gold" />
          <span className="text-foreground font-medium">Make it Personal</span>
          <Heart className="w-5 h-5 text-rose" />
        </motion.div>
        <p className="text-muted-foreground text-sm">
          Add a name to personalize this wish
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter a name..."
            className="w-full px-4 py-3 bg-night-light/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all"
          />
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            animate={{
              boxShadow: isFocused 
                ? '0 0 20px hsl(43 96% 56% / 0.3)' 
                : '0 0 0px transparent',
            }}
          />
        </div>
        <motion.button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark rounded-xl text-primary-foreground font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Apply</span>
        </motion.button>
      </form>

      {currentName && (
        <motion.p
          className="mt-4 text-center text-muted-foreground text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✨ This wish is for: <span className="text-rose font-medium">{currentName}</span>
        </motion.p>
      )}
    </motion.div>
  );
};

export default PersonalizationInput;
