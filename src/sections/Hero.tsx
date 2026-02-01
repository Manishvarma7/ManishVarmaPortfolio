import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QrCode, ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const sideDecorationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const pillars = pillarsRef.current;
    const qr = qrRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const sideDecorations = sideDecorationsRef.current;

    if (!section || !content || !pillars || !qr || !scrollIndicator || !sideDecorations) return;

    const heading = content.querySelector('h1');
    const subheading = content.querySelector('p');
    const badge = content.querySelector('.badge');
    const cta = content.querySelector('.cta-container');

    // Initial reveal animation (plays once on load)
    const tl = gsap.timeline({ delay: 2.2 });

    tl.fromTo(badge,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    tl.fromTo(heading, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.3'
    );

    tl.fromTo(subheading,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    tl.fromTo(cta,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(qr,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    tl.fromTo(scrollIndicator,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    tl.fromTo(sideDecorations,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    );

    // Pillar animations - continuous floating
    const pillarElements = pillars.querySelectorAll('.pillar');
    pillarElements.forEach((pillar, i) => {
      gsap.to(pillar, {
        y: `${Math.sin(i * 0.5) * 20}`,
        duration: 4 + i * 0.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    // Particle animations
    const particles = section.querySelectorAll('.particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: -30 - Math.random() * 50,
        x: (Math.random() - 0.5) * 30,
        opacity: 0,
        duration: 3 + Math.random() * 2,
        ease: 'power1.out',
        repeat: -1,
        delay: i * 0.3,
      });
    });

    // Scroll-triggered animation - CONTENT STAYS FULLY VISIBLE AT TOP
    // Only start fading when user has scrolled significantly
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.8,
        onLeaveBack: () => {
          // Reset all elements to fully visible when scrolling back to top
          gsap.set([heading, subheading, badge, cta, qr, scrollIndicator, sideDecorations], {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
          });
          gsap.set(pillars, { scale: 1, opacity: 0.5 });
        }
      },
    });

    // Phase 1: 0-50% - Content stays fully visible (settle phase)
    // Nothing happens here - content stays as-is

    // Phase 2: 50-100% - Content starts fading only when leaving
    scrollTl.fromTo(content,
      { opacity: 1, y: 0 },
      { opacity: 0, y: -100, ease: 'power2.in' },
      0.5
    );

    scrollTl.fromTo(qr,
      { opacity: 1, x: 0 },
      { opacity: 0, x: 50, ease: 'power2.in' },
      0.5
    );

    scrollTl.fromTo(scrollIndicator,
      { opacity: 0.5 },
      { opacity: 0, ease: 'power2.in' },
      0.5
    );

    scrollTl.fromTo(sideDecorations,
      { opacity: 1 },
      { opacity: 0, ease: 'power2.in' },
      0.5
    );

    scrollTl.fromTo(pillars,
      { scale: 1, opacity: 0.5 },
      { scale: 1.2, opacity: 0.2, ease: 'power2.in' },
      0.5
    );

    return () => {
      tl.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${50 + Math.random() * 50}%`,
            }}
          />
        ))}
      </div>

      {/* 3D Pillars Background */}
      <div
        ref={pillarsRef}
        className="absolute inset-0 flex items-end justify-center gap-4 md:gap-8 opacity-50"
      >
        {/* Left pillars */}
        <div className="pillar w-8 md:w-16 h-[40vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
        <div className="pillar w-6 md:w-12 h-[55vh] bg-gradient-to-t from-white/15 to-transparent rounded-t-lg" />
        <div className="pillar w-10 md:w-20 h-[35vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
        <div className="pillar w-4 md:w-8 h-[70vh] bg-gradient-to-t from-white/20 to-transparent rounded-t-lg" />
        <div className="pillar w-8 md:w-14 h-[45vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
        
        {/* Center gap */}
        <div className="w-20 md:w-40" />
        
        {/* Right pillars */}
        <div className="pillar w-8 md:w-14 h-[45vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
        <div className="pillar w-4 md:w-8 h-[70vh] bg-gradient-to-t from-white/20 to-transparent rounded-t-lg" />
        <div className="pillar w-10 md:w-20 h-[35vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
        <div className="pillar w-6 md:w-12 h-[55vh] bg-gradient-to-t from-white/15 to-transparent rounded-t-lg" />
        <div className="pillar w-8 md:w-16 h-[40vh] bg-gradient-to-t from-white/10 to-transparent rounded-t-lg" />
      </div>

      {/* Spotlight effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[200px] pointer-events-none" />
      
      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="badge mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 opacity-0">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-white/60 uppercase tracking-wider">Available for opportunities</span>
        </div>

        <h1 className="font-serif text-[12vw] md:text-[10vw] lg:text-[8vw] leading-[0.9] tracking-tight text-white opacity-0">
          crafted for the
          <br />
          <span className="italic">code-worthy</span>
        </h1>
        
        <p className="mt-8 text-lg md:text-xl text-white/60 max-w-xl mx-auto opacity-0">
          Software Engineer building scalable systems for connected platforms
        </p>

        {/* CTA Buttons */}
        <div className="cta-container mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a
            href="#story"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full text-sm uppercase tracking-wider hover:bg-white/90 transition-all duration-300"
          >
            Explore
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#footer"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* QR Code Widget */}
      <div
        ref={qrRef}
        className="absolute bottom-24 right-6 md:right-12 qr-widget rounded-xl p-4 opacity-0 hidden md:block"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center">
            <QrCode className="w-12 h-12 text-black" />
          </div>
          <div className="text-left">
            <p className="text-xs text-white/50 uppercase tracking-wider">Connect</p>
            <p className="text-sm font-medium">Scan to reach out</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>

      {/* Side decorative elements */}
      <div
        ref={sideDecorationsRef}
        className="absolute inset-0 pointer-events-none opacity-0"
      >
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/30 [writing-mode:vertical-lr] tracking-widest">2024</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>

        <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="text-xs text-white/30 [writing-mode:vertical-lr] tracking-widest">PORTFOLIO</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
