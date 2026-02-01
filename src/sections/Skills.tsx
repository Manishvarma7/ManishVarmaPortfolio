import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Cloud, 
  Database, 
  Layers, 
  Cpu, 
  GitBranch,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Java & Spring Boot',
    subtitle: 'Building robust microservices',
    icon: Code2,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    glow: 'shadow-pink-500/20',
    skills: ['Java', 'Spring Boot', 'Spring MVC', 'Spring Security', 'Hibernate', 'REST APIs'],
  },
  {
    title: 'AWS & Cloud',
    subtitle: 'Deploying at scale',
    icon: Cloud,
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent',
    glow: 'shadow-purple-500/20',
    skills: ['AWS EC2', 'AWS S3', 'PostgreSQL', 'Cloud Architecture'],
  },
  {
    title: 'System Design',
    subtitle: 'Architecting for millions',
    icon: Layers,
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    glow: 'shadow-green-500/20',
    skills: ['Microservices', 'Event-Driven', 'OOP', 'Data Structures', 'Algorithms'],
  },
  {
    title: 'Additional Skills',
    subtitle: 'The complete toolkit',
    icon: Cpu,
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    glow: 'shadow-amber-500/20',
    skills: ['C++', 'Python', 'Git', 'Postman', '3D HMI (Godot)', 'Android'],
  },
];

const certifications = [
  {
    name: 'Oracle Certified Generative AI Professional',
    issuer: 'Oracle',
    year: '2024',
  },
  {
    name: 'Spring Boot Development',
    issuer: 'Coding Shuttle',
    year: '2023',
  },
  {
    name: 'Silver Award - JLR CCCM Project',
    issuer: 'Visteon',
    year: '2024',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const certs = certsRef.current;
    if (!section || !heading || !cards || !certs) return;

    // Heading animation
    gsap.fromTo(heading,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Cards stagger animation with scale
    const cardElements = cards.querySelectorAll('.skill-card');
    gsap.fromTo(cardElements,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Certifications animation
    gsap.fromTo(certs,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: certs,
          start: 'top 85%',
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
      id="skills"
      className="relative min-h-screen w-full bg-black py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            upgrade your stack.
            <br />
            <span className="italic">bit by bit.</span>
          </h2>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`skill-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${category.gradient} p-8 hover:border-white/20 transition-all duration-500 card-hover ${category.glow} hover:shadow-2xl`}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                  <Icon className="w-7 h-7 text-white/70" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium mb-2">{category.title}</h3>
                <p className="text-white/50 text-sm mb-6">{category.subtitle}</p>

                {/* Skills list */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/70 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-5 h-5 text-white/50" />
                </div>

                {/* Glow effect */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div ref={certsRef} className="mt-20">
          <h3 className="text-lg font-medium mb-8 flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-white/50" />
            Certifications & Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <Database className="w-5 h-5 text-white/40" />
                  <span className="text-xs text-white/30">{cert.year}</span>
                </div>
                <h4 className="text-sm font-medium mb-1">{cert.name}</h4>
                <p className="text-xs text-white/40">{cert.issuer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
