import { useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const PROJECTS = [
  {
    titleKey: 'projects.tile_title',
    descKey: 'projects.tile_desc',
    roleKey: 'projects.tile_role',
    image: '/assets/projects/projectScreenshot_Tile.me-website2.png',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Responsive Design'],
    liveUrl: 'https://tile-me-website-remake.vercel.app/',
    githubUrl: 'https://github.com/ChrisKlemtz/Tile.me-Website_Remake',
    accentColor: '#7c3aed',
  },
  {
    titleKey: 'projects.ai_title',
    descKey: 'projects.ai_desc',
    roleKey: 'projects.ai_role',
    image: '/assets/projects/projectScreenshot_AI-Multi-Tool.png',
    tech: ['React', 'TypeScript', 'Vite', 'SCSS', 'OpenAI API', 'Anthropic API', 'DeepSeek API'],
    liveUrl: null,
    githubUrl: 'https://github.com/ChrisKlemtz/AI-Collect',
    accentColor: '#3b82f6',
  },
  {
    titleKey: 'projects.midgard_title',
    descKey: 'projects.midgard_desc',
    roleKey: 'projects.midgard_role',
    image: '/assets/projects/projectScreenshot_Midgard-Tattoo-Website.png',
    tech: ['React', 'Node.js', 'JavaScript', 'CSS', 'SCSS'],
    liveUrl: 'https://midgard-final.vercel.app/',
    githubUrl: 'https://github.com/ChrisKlemtz/Midgard_FINAL',
    accentColor: '#6d28d9',
  },
];

function ProjectCard({ project, index, t }) {
  const cardRef = useRef(null);

  // 3D tilt on mouse move (desktop only)
  const onMouseMove = useCallback((e) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  }, []);

  return (
    <article
      ref={cardRef}
      className="project-card glass-card reveal-card"
      style={{ '--delay': `${index * 0.12}s`, '--accent': project.accentColor }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Image */}
      <div className="project-card__image-wrap">
        {project.image ? (
          <img
            src={project.image}
            alt={t(project.titleKey)}
            className="project-card__image"
            loading="lazy"
          />
        ) : (
          <div className="project-card__image-placeholder" aria-label="Project screenshot placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            <span>Screenshot</span>
          </div>
        )}
        <div className="project-card__image-overlay" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="project-card__content">
        <div className="project-card__meta">
          <span className="project-card__role">{t(project.roleKey)}</span>
        </div>
        <h3 className="project-card__title">{t(project.titleKey)}</h3>
        <p className="project-card__desc">{t(project.descKey)}</p>

        <div className="project-card__tech">
          {project.tech.map((tech, j) => (
            <span key={j} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-card__links">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary btn--sm"
            >
              {t('projects.live_demo')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--glass btn--sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08 }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section__header">
          <span className="section__label">{t('projects.section_label')}</span>
          <h2 className="section__title">{t('projects.title')}</h2>
          <p className="section__subtitle">{t('projects.subtitle')}</p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
