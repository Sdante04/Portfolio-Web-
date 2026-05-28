import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const orb = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }
      orb.current.x += (mouse.current.x - orb.current.x) * 0.1;
      orb.current.y += (mouse.current.y - orb.current.y) * 0.1;
      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${orb.current.x - 24}px, ${orb.current.y - 24}px)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#22d3ee',
          willChange: 'transform',
          mixBlendMode: 'screen',
        }}
      />
      <div
        ref={orbRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden lg:block"
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)',
          filter: 'blur(4px)',
          willChange: 'transform',
        }}
      />
    </>
  );
}
