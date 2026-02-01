import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Github, Phone, ArrowUpRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Mail, label: 'Email', href: 'mailto:manishvarma1969@gmail.com' },
];

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const light = lightRef.current;
    if (!section || !content || !light) return;

    // Light beam animation
    gsap.fromTo(light,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Content animation
    gsap.fromTo(content,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="footer"
      className="relative min-h-screen w-full bg-black flex items-center overflow-hidden"
    >
      {/* Light beam effect */}
      <div
        ref={lightRef}
        className="absolute left-0 top-0 bottom-0 w-[50%] pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[2px] h-[80%] bg-gradient-to-b from-transparent via-amber-500/50 to-transparent" />
        <div className="absolute left-[20%] top-1/4 w-32 h-32 bg-amber-500/20 rounded-full blur-[80px]" />
        <div className="absolute left-[30%] bottom-1/4 w-48 h-48 bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-neutral-950 to-black" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Main message */}
          <div>
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
              not everyone
              <br />
              <span className="italic">gets it</span>
            </h2>
            
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              Like all good things in life, earning a spot on the team is not easy; 
              but the possibility of unlocking a greater future makes the effort worthwhile.
            </p>
          </div>

          {/* Right side - Contact info */}
          <div className="flex flex-col justify-end">
            {/* Contact details */}
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Email</p>
                  <a
                    href="mailto:manishvarma1969@gmail.com"
                    className="text-lg hover:text-white/80 transition-colors link-underline"
                  >
                    manishvarma1969@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Phone</p>
                  <a
                    href="tel:+918688488715"
                    className="text-lg hover:text-white/80 transition-colors link-underline"
                  >
                    +91 86884 88715
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Location</p>
                  <p className="text-lg text-white/80">India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                    title={link.label}
                  >
                    <Icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-medium">MV</span>
            <span className="text-white/30">|</span>
            <span className="text-sm text-white/50">Manish Varma</span>
          </div>
          
          <p className="text-sm text-white/40">
            Software Engineer • Building the future, one line at a time
          </p>

          <a
            href="#"
            className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            Back to top
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
