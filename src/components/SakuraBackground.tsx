import { useEffect, useRef, useState } from 'react';

interface SakuraBackgroundProps {
  enabled: boolean;
  petalCount?: number;
}

export default function SakuraBackground({ enabled, petalCount = 30 }: SakuraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [actualPetalCount, setActualPetalCount] = useState(petalCount);

  // Adjust petal count based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 1280;
      setActualPetalCount(isMobile ? Math.floor(petalCount / 2) : petalCount);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [petalCount]);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const petals: HTMLDivElement[] = [];

    // Create petals
    for (let i = 0; i < actualPetalCount; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';
      
      // Random starting position
      const startX = Math.random() * 100;
      petal.style.left = `${startX}vw`;
      
      // Random animation duration (slower fall)
      const duration = 15 + Math.random() * 15; // 15-30 seconds
      petal.style.animationDuration = `${duration}s`;
      
      // Random delay for staggered effect
      const delay = Math.random() * 10;
      petal.style.animationDelay = `${delay}s`;
      
      // Random drift amount
      const drift = (Math.random() - 0.5) * 100; // -50 to 50 vw
      petal.style.setProperty('--drift', `${drift}px`);
      
      // Random rotation
      const rotation = Math.random() * 720; // 0-720 degrees
      petal.style.setProperty('--rotation', `${rotation}deg`);
      
      // Random size variation
      const size = 8 + Math.random() * 8; // 8-16px
      petal.style.width = `${size}px`;
      petal.style.height = `${size}px`;
      
      // Random opacity
      const opacity = 0.3 + Math.random() * 0.4; // 0.3-0.7
      petal.style.opacity = opacity.toString();
      
      container.appendChild(petal);
      petals.push(petal);
    }

    // Cleanup
    return () => {
      petals.forEach(petal => petal.remove());
    };
  }, [enabled, actualPetalCount]);

  if (!enabled) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
