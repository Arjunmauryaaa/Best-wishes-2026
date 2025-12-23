import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

const AudioControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a simple festive melody URL
    audioRef.current = new Audio('https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    
    setShowPrompt(false);

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio playback failed:', error);
      }
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-3"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      <motion.button
        onClick={toggleAudio}
        className={`glass-card rounded-full p-4 transition-all relative ${
          isPlaying 
            ? 'ring-2 ring-gold bg-gold/20' 
            : 'hover:bg-card/60'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
      >
        {isPlaying ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Volume2 className="w-6 h-6 text-gold" />
          </motion.div>
        ) : (
          <VolumeX className="w-6 h-6 text-foreground/70" />
        )}

        {/* Music note animation when playing */}
        {isPlaying && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              y: [-5, -15, -5],
              opacity: [1, 0.5, 1],
              rotate: [0, 10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Music className="w-4 h-4 text-gold" />
          </motion.div>
        )}
      </motion.button>

      {/* Play prompt */}
      {showPrompt && !isPlaying && (
        <motion.div
          className="glass-card rounded-lg px-4 py-2 text-sm text-foreground/80"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          🎵 Tap for music
        </motion.div>
      )}
    </motion.div>
  );
};

export default AudioControl;
