import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  type: 'star' | 'sparkle' | 'heart';
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: { angle: number; distance: number; delay: number }[];
}

interface AnimatedBackgroundProps {
  mode: 'party' | 'warm';
}

const AnimatedBackground = ({ mode }: AnimatedBackgroundProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const fireworkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const particleCount = mode === 'party' ? 80 : 50;

      for (let i = 0; i < particleCount; i++) {
        const types: ('star' | 'sparkle' | 'heart')[] = mode === 'warm' 
          ? ['star', 'sparkle', 'heart', 'heart', 'sparkle']
          : ['star', 'sparkle', 'star', 'sparkle', 'star'];
        
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 4 + 3,
          delay: Math.random() * 5,
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [mode]);

  useEffect(() => {
    const createFirework = () => {
      const colors = mode === 'party' 
        ? ['#fbbf24', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4']
        : ['#fbbf24', '#f472b6', '#fcd34d', '#fb7185'];
      
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 40 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        particles: Array.from({ length: 12 }, (_, i) => ({
          angle: (i * 30) * (Math.PI / 180),
          distance: Math.random() * 60 + 40,
          delay: Math.random() * 0.2,
        })),
      };

      setFireworks(prev => [...prev.slice(-5), newFirework]);
    };

    const interval = mode === 'party' ? 1500 : 3000;
    fireworkIntervalRef.current = setInterval(createFirework, interval);
    createFirework();

    return () => {
      if (fireworkIntervalRef.current) {
        clearInterval(fireworkIntervalRef.current);
      }
    };
  }, [mode]);

  const renderParticle = (particle: Particle) => {
    if (particle.type === 'heart') {
      return (
        <motion.div
          key={particle.id}
          className="absolute text-rose pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            fontSize: particle.size * 3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          ❤️
        </motion.div>
      );
    }

    if (particle.type === 'sparkle') {
      return (
        <motion.div
          key={particle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, particle.opacity, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={particle.size * 4}
            height={particle.size * 4}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z"
              fill="hsl(43 96% 56%)"
            />
          </svg>
        </motion.div>
      );
    }

    return (
      <motion.div
        key={particle.id}
        className="absolute rounded-full pointer-events-none"
        style={{
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: particle.size,
          height: particle.size,
          backgroundColor: 'hsl(43 96% 70%)',
          boxShadow: `0 0 ${particle.size * 2}px hsl(43 96% 56% / 0.5)`,
        }}
        animate={{
          opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: mode === 'warm'
            ? 'radial-gradient(ellipse at 50% 50%, hsl(350 80% 65% / 0.1) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 50% 20%, hsl(270 60% 30% / 0.3) 0%, transparent 60%)',
        }}
      />

      {/* Particles */}
      {particles.map(renderParticle)}

      {/* Fireworks */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
          }}
        >
          {firework.particles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: firework.color,
                boxShadow: `0 0 10px ${firework.color}, 0 0 20px ${firework.color}`,
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: Math.cos(particle.angle) * particle.distance,
                y: Math.sin(particle.angle) * particle.distance,
                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
          {/* Center burst */}
          <motion.div
            className="absolute w-4 h-4 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 30px ${firework.color}`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      ))}

      {/* Shooting stars */}
      {mode === 'party' && (
        <>
          <motion.div
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              boxShadow: '0 0 10px hsl(43 96% 56%), 20px 0 20px hsl(43 96% 56% / 0.5), 40px 0 30px hsl(43 96% 56% / 0.3)',
            }}
            animate={{
              x: ['-10vw', '110vw'],
              y: ['10vh', '60vh'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-1 h-1 bg-gold-light rounded-full"
            style={{
              boxShadow: '0 0 10px hsl(43 96% 70%), 20px 0 20px hsl(43 96% 70% / 0.5)',
            }}
            animate={{
              x: ['110vw', '-10vw'],
              y: ['5vh', '40vh'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 12,
              delay: 5,
              ease: "linear",
            }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedBackground;
