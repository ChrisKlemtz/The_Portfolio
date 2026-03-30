import { useTranslation } from '../i18n/LanguageContext';

const SKILL_CATEGORIES = [
  {
    titleKey: 'skills.devEnv',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: ['Linux', 'Git', 'GitHub', 'VS Code', 'Figma', 'Canva', 'GIMP'],
  },
  {
    titleKey: 'skills.frontend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    skills: ['HTML & CSS', 'SCSS', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'DOM Manipulation', 'React', 'React Router', 'Redux', 'Next.js', 'Vite', 'ESM Modules'],
  },
  {
    titleKey: 'skills.backend',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    skills: ['Node.js', 'NPM', 'Express.js', 'REST API', 'MongoDB', 'Mongoose', 'MySQL'],
  },
  {
    titleKey: 'skills.concepts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    skills: ['OOP', 'Functional Programming', 'Algorithms', 'Data Structures', 'Fetch API', 'Promises'],
  },
  {
    titleKey: 'skills.specializations',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    skills: ['Phaser.js', 'Game Development', 'Cybersecurity', 'JWT Auth', 'Cookies & Sessions', 'Shopify', 'A/B Testing', 'ABlyft', 'Tampermonkey', 'ClickUp'],
  },
];

function Skills() {
  const { t } = useTranslation();

  return (
    <section className="skills section" id="skills">

      {/* ── Section bg image + overlay ─────────────────────── */}
      <div className="skills__bg" aria-hidden="true" />
      <div className="skills__overlay" aria-hidden="true" />

      <div className="container">

        {/* ── Big glass window — all content inside ─────────── */}
        <div className="skills__window">

          {/* Header */}
          <div className="skills__window-header">
            <span className="section__label">{t('skills.section_label')}</span>
            <h2 className="section__title">{t('skills.title')}</h2>
            <p className="section__subtitle">{t('skills.subtitle')}</p>
          </div>

          {/* Category rows */}
          <div className="skills__rows">
            {SKILL_CATEGORIES.map((cat, i) => (
              <div key={i} className="skills__row">
                <div className="skills__row-header">
                  <span className="skills__row-icon">{cat.icon}</span>
                  <h3 className="skills__row-title">{t(cat.titleKey)}</h3>
                </div>
                <div className="skills__tags">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Currently Learning */}
          <div className="skills__learning">
            <div className="skills__learning-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div>
              <h3 className="skills__learning-title">{t('skills.learning_title')}</h3>
              <p className="skills__learning-text">{t('skills.learning_text')}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Skills;
