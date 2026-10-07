import React, { useEffect, useRef, useState } from 'react';

interface TrailParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
}

export default function AntigravityCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position refs for smooth 60fps spring lerp
  const mousePos = useRef({ x: -100, y: -100 });
  const trailPos = useRef({ x: -100, y: -100 });
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorAuraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<TrailParticle[]>([]);
  const requestRef = useRef<number>();

  useEffect(() => {
    // Only render on devices with a mouse/pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Add a stardust trail particle
      if (Math.random() > 0.3) {
        const colors = [
          'rgba(56, 189, 248, ', // sky
          'rgba(168, 85, 247, ', // purple
          'rgba(99, 102, 241, ', // indigo
          'rgba(52, 211, 153, ', // emerald
        ];
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1.5,
          alpha: 0.8,
          color: selectedColor,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3, // slight upward anti-gravity drift
        });
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Dynamic hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-hover') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT';
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Canvas resize
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const handleResize = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };
      window.addEventListener('resize', handleResize);
    }

    // Main animation loop
    const render = () => {
      // Smooth lerp for trailing aura (fluid inertia)
      const ease = 0.18;
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * ease;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * ease;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (cursorAuraRef.current) {
        cursorAuraRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0)`;
      }

      // Draw particle trail on canvas
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = particles.current.length - 1; i >= 0; i--) {
            const p = particles.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.025;
            p.size *= 0.96;

            if (p.alpha <= 0 || p.size <= 0.2) {
              particles.current.splice(i, 1);
              continue;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `${p.color}${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `${p.color}0.8)`;
            ctx.fill();
          }
        }
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  return (
    <>
      {/* Canvas for trailing stardust particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Main sharp focal pointer dot */}
      <div
        ref={cursorDotRef}
        className={`pointer-events-none fixed -top-1.5 -left-1.5 z-[9999] h-3 w-3 rounded-full transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: isHovered
            ? 'radial-gradient(circle, #38bdf8 0%, #a855f7 100%)'
            : '#38bdf8',
          boxShadow: isHovered
            ? '0 0 12px #38bdf8, 0 0 20px #a855f7'
            : '0 0 8px #38bdf8',
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
        }}
      />

      {/* Outer fluid trailing gravitational aura */}
      <div
        ref={cursorAuraRef}
        className={`pointer-events-none fixed z-[9999] rounded-full border transition-all duration-200 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovered
            ? '-top-6 -left-6 h-12 w-12 border-cyan-400/80 bg-cyan-400/10 shadow-[0_0_25px_rgba(56,189,248,0.4)] scale-125'
            : '-top-4 -left-4 h-8 w-8 border-violet-400/40 bg-violet-500/5 shadow-[0_0_15px_rgba(168,85,247,0.25)]'
        } ${isClicked ? 'scale-75 border-emerald-400 bg-emerald-400/20' : ''}`}
        style={{
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
      >
        {/* Antigravity orbital ring notch */}
        <div
          className={`absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-colors ${
            isHovered ? 'bg-cyan-300 animate-spin' : 'bg-violet-400/60'
          }`}
        />
      </div>
    </>
  );
}
