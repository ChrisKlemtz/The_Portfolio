import { useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useModal } from '../contexts/ModalContext';

function Contact() {
  const { t } = useTranslation();
  const { openContact, openDownload } = useModal();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      {/* Background accent */}
      <div className="contact__bg-orb" aria-hidden="true" />

      <div className="container">
        <div className="section__header">
          <span className="section__label">{t('contact.section_label')}</span>
          <h2 className="section__title contact__title">
            {t('contact.title').split('\n').map((line, i) => (
              <span key={i}>
                {i === 1 ? <span className="gradient-text">{line}</span> : line}
                {i === 0 && <br />}
              </span>
            ))}
          </h2>
          <p className="section__subtitle">{t('contact.subtitle')}</p>
        </div>

        <div className="contact__layout">
          {/* Quick info panel */}
          <div className="contact__info glass-card reveal-card" style={{ '--delay': '0s' }}>
            <h3 className="contact__info-title">Quick Info</h3>

            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                ),
                label: t('contact.location'),
                value: t('contact.location_val'),
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                label: t('contact.response'),
                value: t('contact.response_val'),
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                ),
                label: t('contact.status'),
                value: t('contact.status_val'),
                highlight: true,
              },
            ].map((item, i) => (
              <div key={i} className={`contact__info-row${item.highlight ? ' contact__info-row--highlight' : ''}`}>
                <span className="contact__info-icon">{item.icon}</span>
                <div>
                  <span className="contact__info-label">{item.label}</span>
                  <span className="contact__info-value">{item.value}</span>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="contact__socials">
              <a
                href="https://github.com/ChrisKlemtz"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                aria-label="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/christoph-klemtz-8558b8349/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__social-link"
                aria-label="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:dev.christophklemtz@outlook.com"
                className="contact__social-link"
                aria-label="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Main CTA panel */}
          <div className="contact__cta glass-card reveal-card" style={{ '--delay': '0.12s' }}>
            <div className="contact__cta-inner">
              <h3 className="contact__cta-heading">Bereit loszulegen?</h3>
              <p className="contact__cta-text">
                Jedes großartige Projekt beginnt mit einem ersten Gespräch.
              </p>

              <div className="contact__cta-btns">
                <button className="btn btn--primary btn--lg" onClick={openContact}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  {t('contact.email_btn')}
                </button>

                <a
                  href="https://github.com/ChrisKlemtz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--glass btn--lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {t('contact.github_btn')}
                </a>

                <a
                  href="https://www.linkedin.com/in/christoph-klemtz-8558b8349/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--ghost btn--lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  {t('contact.linkedin_btn')}
                </a>
              </div>
            </div>

            {/* Documents sub-section */}
            <div className="contact__docs">
              <div className="contact__docs-divider" aria-hidden="true" />
              <div className="contact__docs-content">
                <div>
                  <h4>{t('contact.docs_title')}</h4>
                  <p>{t('contact.docs_text')}</p>
                </div>
                <button className="btn btn--glass btn--sm" onClick={openDownload}>
                  {t('contact.docs_btn')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
