import { motion } from 'motion/react';

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Orbe superior izquierdo — deriva lenta */}
      <motion.div
        className="absolute top-[-5%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full"
        animate={{
          x: [0, 40, -20, 30, 0],
          y: [0, -30, 20, -10, 0],
          scale: [1, 1.08, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orbe central derecho */}
      <motion.div
        className="absolute top-[30%] right-[5%] w-[600px] h-[600px] bg-violet-500/10 blur-[140px] rounded-full"
        animate={{
          x: [0, -50, 20, -30, 0],
          y: [0, 40, -25, 15, 0],
          scale: [1, 0.92, 1.1, 0.97, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Orbe inferior */}
      <motion.div
        className="absolute bottom-[5%] left-[25%] w-[450px] h-[450px] bg-cyan-500/6 blur-[120px] rounded-full"
        animate={{
          x: [0, 30, -40, 20, 0],
          y: [0, -20, 30, -15, 0],
          scale: [1, 1.05, 0.9, 1.08, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #22d3ee 1px, transparent 1px),
            linear-gradient(to bottom, #22d3ee 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Vignette para profundidad */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.6) 100%)',
        }}
      />
    </div>
  );
}
