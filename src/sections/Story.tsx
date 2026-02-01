import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const storyWords = [
  'the', 'story', 'of', 'Manish', 'begins', 'with', 'code.',
  'we', 'believe', 'engineers', "who've", 'proven', 'their',
  'technical', 'excellence', 'deserve', 'better', 'opportunities.',
  'better', 'challenges.', 'better', 'rewards.',
  'this', 'is', 'the', 'status', 'quo', "we're", 'building.',
  'make', 'it', 'to', 'the', 'team,', 'and', 'experience',
  'the', 'ascension', 'yourself.'
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const wordsContainer = wordsContainerRef.current;
    if (!section || !wordsContainer) return;

    const words = wordsContainer.querySelectorAll('.story-word');

    // Set initial state - all words dim
    gsap.set(words, { opacity: 0.15 });

    // Create scroll-triggered word reveal
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5,
      },
    });

    // Reveal words sequentially
    words.forEach((word, i) => {
      scrollTl.to(word, {
        opacity: 1,
        duration: 0.05,
        ease: 'none',
      }, i * 0.02);
    });

    return () => {
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative min-h-screen w-full bg-black flex items-center justify-center py-32"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-950" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        <div
          ref={wordsContainerRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight md:leading-tight text-center"
        >
          {storyWords.map((word, index) => (
            <span
              key={index}
              className="story-word inline-block mr-[0.25em] transition-colors duration-300"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: '3+', label: 'Years Experience' },
            { value: '500+', label: 'Test Cases Automated' },
            { value: '35%', label: 'Latency Reduced' },
            { value: '10%', label: 'Crash Rate Reduced' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-4xl md:text-5xl text-white">{stat.value}</div>
              <div className="mt-2 text-sm text-white/50 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
