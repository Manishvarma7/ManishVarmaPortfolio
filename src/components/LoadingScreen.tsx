import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Logo pulse animation
    tl.to(logoRef.current, {
      scale: 1.1,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: 1,
    });

    // Progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 1.2,
      ease: 'power2.inOut',
    }, '-=1.5');

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="loading-screen"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div
          ref={logoRef}
          className="text-6xl md:text-8xl font-serif font-medium tracking-tighter opacity-50"
        >
          MV
        </div>
        
        {/* Progress bar */}
        <div className="w-32 h-[1px] bg-white/20 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-white w-0"
          />
        </div>
      </div>
    </div>
  );
}
