import { useState, useEffect } from 'react';

export function useCountUp(
  target: number,
  duration = 1800,
  active = false,
  decimals = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parseFloat((eased * target).toFixed(decimals));
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, active, decimals]);

  return value;
}
