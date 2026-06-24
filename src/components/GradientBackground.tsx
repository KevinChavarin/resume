import { useEffect, useRef, useState } from 'react';

export default function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('themeChange', checkTheme);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    const animate = () => {
      const { x, y } = mouseRef.current;
      blobsRef.current.forEach((blob, i) => {
        if (!blob) return;
        const offsetX = (x - 0.5) * 60 * (i + 1);
        const offsetY = (y - 0.5) * 60 * (i + 1);
        blob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('themeChange', checkTheme);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      class="fixed inset-0 -z-10 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#fafafa' }}
    >
      <div
        class="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(88,28,135,0.4), transparent, rgba(21,94,117,0.3))'
            : 'linear-gradient(135deg, rgba(216,180,254,0.5), rgba(255,255,255,0.3), rgba(165,243,252,0.4))',
        }}
      />

      <div
        ref={(el) => { if (el) blobsRef.current[0] = el; }}
        class="absolute -top-1/4 -left-1/4 w-[70vmax] h-[70vmax] rounded-full blur-[120px] transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(147,51,234,0.25), rgba(147,51,234,0.15), transparent)'
            : 'radial-gradient(circle, rgba(216,180,254,0.6), rgba(196,181,253,0.4), transparent)',
        }}
      />
      <div
        ref={(el) => { if (el) blobsRef.current[1] = el; }}
        class="absolute -bottom-1/4 -right-1/4 w-[70vmax] h-[70vmax] rounded-full blur-[120px] transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(6,182,212,0.2), rgba(34,211,238,0.1), transparent)'
            : 'radial-gradient(circle, rgba(165,243,252,0.6), rgba(103,232,249,0.4), transparent)',
        }}
      />
      <div
        ref={(el) => { if (el) blobsRef.current[2] = el; }}
        class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vmax] h-[50vmax] rounded-full blur-[100px] transition-colors duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(124,58,237,0.15), rgba(217,70,239,0.1), transparent)'
            : 'radial-gradient(circle, rgba(196,181,253,0.55), rgba(245,208,254,0.4), transparent)',
        }}
      />
    </div>
  );
}
