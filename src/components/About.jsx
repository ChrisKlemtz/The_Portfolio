import { useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useModal } from '../contexts/ModalContext';

function About() {
  const { t } = useTranslation();
  const { openDownload } = useModal();
  const sectionRef = useRef(null);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">

        {/* ── Label ─────────────────────────────────────────── */}
        <div className="about__label-row">
          <span className="section__label">{t('about.section_label')}</span>
        </div>

        {/* ── Main editorial block ──────────────────────────── */}
        <div className="about__editorial">

          {/* Left — headline */}
          <div className="about__headline-col">
            <h2 className="about__headline">{t('about.title')}</h2>
            <div className="about__headline-line" aria-hidden="true" />
          </div>

          {/* Right — intro text */}
          <div className="about__intro-col">
            <p className="about__intro">{t('about.whoIAm_text')}</p>
          </div>

        </div>

        {/* ── Three pillars — horizontal ────────────────────── */}
        <div className="about__pillars">

          <div className="about__pillar">
            <span className="about__pillar-index">01</span>
            <h3 className="about__pillar-title">{t('about.approach_title')}</h3>
            <p className="about__pillar-text">{t('about.approach_text')}</p>
          </div>

          <div className="about__pillar-divider" aria-hidden="true" />

          <div className="about__pillar">
            <span className="about__pillar-index">02</span>
            <h3 className="about__pillar-title">{t('about.drives_title')}</h3>
            <p className="about__pillar-text">{t('about.drives_text')}</p>
          </div>

          <div className="about__pillar-divider" aria-hidden="true" />

          <div className="about__pillar">
            <span className="about__pillar-index">03</span>
            <h3 className="about__pillar-title">{t('about.beyond_title')}</h3>
            <p className="about__pillar-text">{t('about.beyond_text')}</p>
          </div>

        </div>

        {/* ── CV download strip ─────────────────────────────── */}
        <div className="about__cv-strip">
          <div className="about__cv-text">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <div>
              <strong>{t('about.docs_title')}</strong>
              <span>{t('about.docs_text')}</span>
            </div>
          </div>
          <button className="btn btn--primary" onClick={openDownload}>
            {t('about.docs_btn')}
          </button>
        </div>

      </div>
    </section>
  );
}

export default About;
