import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

// Sections
import Hero from './sections/Hero';
import Story from './sections/Story';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Footer from './sections/Footer';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize scroll animations after loading
  useEffect(() => {
    if (!isLoading) {
      // Refresh ScrollTrigger after content loads
      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      {/* Custom cursor (desktop only) */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main ref={mainRef} className="relative bg-black min-h-screen">
        <Hero />
        <Story />
        <Experience />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </>
  );
}

export default App;
