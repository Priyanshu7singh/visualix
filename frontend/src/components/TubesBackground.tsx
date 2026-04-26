import { useEffect, useRef, useState } from 'react';

// Brand-aligned color palettes for Visualix
const GOLD_PALETTES = [
  {
    tubes: ['#D4AF37', '#F5E67A', '#C9962A'],
    lights: ['#F5E67A', '#D4AF37', '#A07820', '#F0D060'],
  },
  {
    tubes: ['#F5E67A', '#D4AF37', '#7A5C10'],
    lights: ['#D4AF37', '#F5E67A', '#C9962A', '#A07820'],
  },
  {
    tubes: ['#C9962A', '#F5E67A', '#D4AF37'],
    lights: ['#A07820', '#D4AF37', '#F5E67A', '#C9962A'],
  },
  {
    tubes: ['#D4AF37', '#9b59b6', '#F5E67A'],
    lights: ['#F5E67A', '#9b59b6', '#D4AF37', '#6d28d9'],
  },
  {
    tubes: ['#F5E67A', '#6d28d9', '#D4AF37'],
    lights: ['#D4AF37', '#7c3aed', '#F0D060', '#9b59b6'],
  },
];

let paletteIndex = 0;

interface TubesBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  enableClickInteraction?: boolean;
}

export function TubesBackground({
  children,
  className = '',
  enableClickInteraction = true,
}: TubesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;
    let resizeCleanup: (() => void) | undefined;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        // Dynamic import of the CDN-hosted threejs-components tubes effect
        // @ts-ignore – no type declarations for this CDN module
        const module = await import(
          /* @vite-ignore */
          'https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js'
        );
        const TubesCursor = module.default;

        if (!mounted) return;

        const palette = GOLD_PALETTES[0];

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: palette.tubes,
            lights: {
              intensity: 180,
              colors: palette.lights,
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {
          // threejs-components handles its own resize listener;
          // this is a safety net if the canvas ever de-syncs.
        };

        window.addEventListener('resize', handleResize);
        resizeCleanup = () => window.removeEventListener('resize', handleResize);
      } catch (err) {
        console.error('[TubesBackground] Failed to initialise:', err);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      resizeCleanup?.();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;

    paletteIndex = (paletteIndex + 1) % GOLD_PALETTES.length;
    const palette = GOLD_PALETTES[paletteIndex];

    tubesRef.current.tubes?.setColors?.(palette.tubes);
    tubesRef.current.tubes?.setLightsColors?.(palette.lights);
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {/* 3-D canvas layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
        aria-hidden="true"
      />

      {/* Very subtle dark vignette over the tubes so hero text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.55) 100%)',
        }}
      />

      {/* Content slot */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
