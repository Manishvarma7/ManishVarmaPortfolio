import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Sparkles, Home, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'StayEase',
    subtitle: 'Property Rental Platform',
    description: 'A full-stack property rental platform with real-time availability, booking management, and secure authentication.',
    tech: ['Spring Boot', 'PostgreSQL', 'Spring Security', 'JWT', 'REST APIs'],
    icon: Home,
    gradient: 'from-blue-500/10 to-purple-500/10',
    links: {
      github: '#',
      live: '#',
    },
  },
  {
    title: 'AI Email Assist',
    subtitle: 'Smart Email Automation',
    description: 'AI-powered email assistant integrated with Gmail via Chrome Extension, providing intelligent context-aware reply suggestions.',
    tech: ['Spring Boot', 'Gemini AI', 'Chrome Extension', 'Gmail API'],
    icon: Mail,
    gradient: 'from-green-500/10 to-emerald-500/10',
    links: {
      github: '#',
      live: '#',
    },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const projectsContainer = projectsRef.current;
    if (!section || !heading || !projectsContainer) return;

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

    // Projects animation
    const projectElements = projectsContainer.querySelectorAll('.project-card');
    gsap.fromTo(projectElements,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: projectsContainer,
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
      id="projects"
      className="relative min-h-screen w-full bg-black py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-950" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-sm text-white/60 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Featured Work</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            the proof
            <br />
            <span className="italic">writes itself</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={index}
                className={`project-card group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${project.gradient} p-8 md:p-10 hover:border-white/20 transition-all duration-500`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Icon className="w-8 h-8 text-white/70" />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.links.github}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5 text-white/60" />
                    </a>
                    <a
                      href={project.links.live}
                      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-white/60" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-3xl md:text-4xl font-serif mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm mb-4">{project.subtitle}</p>
                <p className="text-white/60 mb-8 leading-relaxed">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-white/60 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Corner accent */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* View more link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors link-underline"
          >
            <Github className="w-5 h-5" />
            <span>View more on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
