import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useModal } from '../contexts/ModalContext';

function Hero() {
  const { t } = useTranslation();
  const { openContact } = useModal();
  const [typedTitle, setTypedTitle] = useState('');
  const [titleDone, setTitleDone] = useState(false);

  // Typing animation — starts after entrance animation settles
  const fullTitle = t('hero.title');
  useEffect(() => {
    setTypedTitle('');
    setTitleDone(false);
    let i = 0;
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setTypedTitle(fullTitle.slice(0, i));
        if (i >= fullTitle.length) {
          clearInterval(interval);
          setTitleDone(true);
        }
      }, 52);
      return () => clearInterval(interval);
    }, 1200);
    return () => clearTimeout(delay);
  }, [fullTitle]);

  const scrollToSection = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <section className="hero" id="home" aria-label="Hero">

      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      {/* Glass cover window */}
      <div className="hero__window" id="hero-window">
        <div className="hero__window-content">

          {/* Avatar */}
          <div className="hero__visual hero-anim hero-anim--visual">
            <div className="hero__avatar-ring" aria-hidden="true">
              <div className="hero__avatar-ring-dot" />
            </div>
            <div className="hero__avatar">
              <img
                src="/assets/hero/avatar.jpg"
                alt="Profilbild Christoph Klemtz"
                className="hero__avatar-img"
                draggable="false"
              />
            </div>
            <div className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              {t('hero.badge_available')}
            </div>
          </div>

          {/* Text */}
          <div className="hero__content">
            <p className="hero__greeting hero-anim hero-anim--1">{t('hero.greeting')}</p>

            <h1 className="hero__name hero-anim hero-anim--2">
              <span className="hero__name-first">Christoph</span>{' '}
              <span className="hero__name-last gradient-text">Klemtz</span>
            </h1>

            <div className="hero__title-wrap hero-anim hero-anim--3" aria-live="polite">
              <h2 className="hero__title">
                {typedTitle}
                {!titleDone && <span className="hero__cursor" aria-hidden="true" />}
              </h2>
            </div>

            <p className="hero__subtitle hero-anim hero-anim--4">
              {t('hero.subtitle')}
            </p>

            <div className="hero__cta hero-anim hero-anim--5">
              <button
                className="btn btn--primary"
                onClick={() => scrollToSection('projects')}
              >
                {t('hero.cta_projects')}
                <svg className="btn__icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
              <button className="btn btn--ghost" onClick={openContact}>
                {t('hero.cta_contact')}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero__scroll-hint"
        id="hero-scroll-hint"
        aria-hidden="true"
        onClick={() => scrollToSection('about')}
      >
        <span>{t('hero.scroll_hint')}</span>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </div>

    </section>
  );
}

export default Hero;
