import { useRef } from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = '', strength = 0.28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    ref.current!.style.transform = `translate(${dx}px, ${dy}px)`;
    ref.current!.style.transition = 'transform 0.08s linear';
  };

  const handleMouseLeave = () => {
    ref.current!.style.transform = 'translate(0, 0)';
    ref.current!.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
  };

  return (
    <div
      ref={ref}
      className={`inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
