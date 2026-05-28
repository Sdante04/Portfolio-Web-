import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// Code chars + katakana for authentic feel
const CHARS = '01アイウエオカキクケコサシスセソタチツテトナニ{}[]()<>/*+-=;:.#$%&|~01アイウエオ';
const FONT_SIZE = 14;
const MAX_TRAIL = 18;
const SPAWN_CHANCE = 0.975; // probability to reset a column when it exits screen

interface Column {
  x: number;
  headRow: number;
  speed: number;
  acc: number;
  trail: string[];
  active: boolean;
}

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let rafId: number;
    let cols: Column[] = [];

    const randChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const buildCols = (w: number, h: number) => {
      const count = Math.floor(w / FONT_SIZE);
      cols = Array.from({ length: count }, (_, i) => ({
        x: i * FONT_SIZE,
        headRow: Math.floor(Math.random() * -(h / FONT_SIZE) * 1.5),
        speed: 0.18 + Math.random() * 0.38,
        acc: Math.random(),
        trail: Array.from({ length: MAX_TRAIL }, () => randChar()),
        active: true,
      }));
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildCols(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

      for (const col of cols) {
        col.acc += col.speed;

        // Advance head by accumulated whole rows
        const steps = Math.floor(col.acc);
        if (steps >= 1) {
          col.acc -= steps;
          for (let s = 0; s < steps; s++) {
            col.trail.unshift(randChar());
            if (col.trail.length > MAX_TRAIL) col.trail.pop();
            col.headRow++;
          }
        }

        const headY = col.headRow * FONT_SIZE;

        // Only draw if at least the head is near the screen
        if (headY < -FONT_SIZE * MAX_TRAIL) continue;

        for (let t = 0; t < col.trail.length; t++) {
          const charY = headY - t * FONT_SIZE;
          if (charY < -FONT_SIZE || charY > H) continue;

          // Alpha decreases along the trail (head = 0, oldest = MAX_TRAIL-1)
          const ratio = 1 - t / MAX_TRAIL;
          const alpha = Math.pow(ratio, 1.6);

          if (t === 0) {
            // Head: near-white glow
            ctx.fillStyle = `rgba(210, 252, 255, ${(alpha * 0.92).toFixed(3)})`;
          } else if (t % 7 === 0) {
            // Rare violet accent
            ctx.fillStyle = `rgba(167, 139, 250, ${(alpha * 0.55).toFixed(3)})`;
          } else {
            // Cyan body
            ctx.fillStyle = `rgba(34, 211, 238, ${(alpha * 0.65).toFixed(3)})`;
          }

          ctx.fillText(col.trail[t], col.x, charY);
        }

        // Reset column when head exits bottom
        if (headY > H + FONT_SIZE * MAX_TRAIL) {
          if (Math.random() > SPAWN_CHANCE) {
            col.headRow = Math.floor(Math.random() * -30);
            col.speed = 0.18 + Math.random() * 0.38;
            col.trail = Array.from({ length: MAX_TRAIL }, () => randChar());
          } else {
            col.headRow = Math.floor(Math.random() * -50);
          }
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Matrix rain canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.45 }}
      />

      {/* Animated depth orbs — sit on top of the rain for warmth */}
      <motion.div
        className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] bg-cyan-500/8 blur-[130px] rounded-full"
        animate={{ x: [0, 40, -20, 30, 0], y: [0, -30, 20, -10, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-violet-500/8 blur-[140px] rounded-full"
        animate={{ x: [0, -50, 20, -30, 0], y: [0, 40, -25, 15, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Vignette: darkens edges and center mass so content stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at 50% 40%, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.1) 50%, rgba(9,9,11,0.75) 100%)',
        }}
      />
    </div>
  );
}
