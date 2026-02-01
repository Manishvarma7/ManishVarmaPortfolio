import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Building2, Calendar, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: 'Visteon Corporation',
    role: 'Software Engineer 1',
    project: 'Jaguar Land Rover - CCCM',
    period: 'Jul 2023 - Present',
    description: 'Designed and developed scalable Java-based backend services for connected in-vehicle systems.',
    achievements: [
      'Reduced UI-backend latency by 35% with event-driven architectures',
      'Built Spring Boot services deployed on AWS (EC2, S3)',
      'Developed 3D HMI screens using C++ and Godot',
      'Automated 500+ test cases, reducing crash rates by 10%',
    ],
  },
  {
    company: 'Visteon Corporation',
    role: 'Software Engineer Intern',
    project: 'Connected Car Systems',
    period: 'Jan 2023 - Jun 2023',
    description: 'Built foundational systems for connected vehicle platforms.',
    achievements: [
      'Built multi-threaded C++ TCP/IP server for vehicle telemetry',
      'Developed Java Android integration layer for infotainment',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

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

    // Cards stagger animation
    const cardElements = cards.querySelectorAll('.experience-card');
    gsap.fromTo(cardElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
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
      id="experience"
      className="relative min-h-screen w-full bg-black py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black" />
      
      {/* Decorative 3D element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] opacity-20 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/10 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-20">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            all that you deserve.
            <br />
            <span className="italic">and some more.</span>
          </h2>
          <p className="mt-8 text-lg text-white/60 max-w-xl">
            Software Engineer at Visteon, crafting connected car experiences 
            for Jaguar Land Rover's next-generation vehicles.
          </p>
        </div>

        {/* Experience Cards */}
        <div ref={cardsRef} className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card group relative bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 card-hover"
            >
              {/* Card header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-medium">{exp.company}</h3>
                    <div className="flex items-center gap-2 mt-1 text-white/50">
                      <Briefcase size={14} />
                      <span className="text-sm">{exp.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Calendar size={14} />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Project tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/70 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {exp.project}
              </div>

              {/* Description */}
              <p className="text-white/60 mb-6">{exp.description}</p>

              {/* Achievements */}
              <ul className="space-y-3">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                    <ArrowUpRight size={16} className="mt-0.5 flex-shrink-0 text-white/30 group-hover:text-white/60 transition-colors" />
                    {achievement}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
