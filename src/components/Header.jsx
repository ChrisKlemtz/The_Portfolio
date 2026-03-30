import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useModal } from '../contexts/ModalContext';

const NAV_ITEMS = [
  { id: 'home', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'contact', key: 'nav.contact' },
];

function Header() {
  const { language, toggleLanguage, t } = useTranslation();
  const { openDownload } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const burgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section tracking via scroll position
      const sections = NAV_ITEMS.map(item => ({
        id: item.id,
        el: document.getElementById(item.id),
      })).filter(s => s.el);

      const current = sections.reduce((acc, section) => {
        const rect = section.el.getBoundingClientRect();
        if (rect.top <= 100) return section.id;
        return acc;
      }, 'home');

      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [menuOpen]);

  // Lock scroll when menu open (mobile)
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header__inner container">
        {/* Logo */}
        <button className="header__logo" onClick={() => scrollTo('home')} aria-label="Home">
          <span className="header__logo-bracket">&lt;</span>
          <span className="header__logo-name">CK</span>
          <span className="header__logo-bracket">/&gt;</span>
        </button>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  className={`header__nav-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <button
            className="header__action-btn header__download-btn"
            onClick={openDownload}
            aria-label={t('nav.downloads')}
            title={t('nav.downloads')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span className="header__action-label">{t('nav.downloads')}</span>
          </button>

          <button
            className="header__action-btn header__lang-btn"
            onClick={toggleLanguage}
            aria-label="Toggle language"
          >
            {language === 'de' ? 'EN' : 'DE'}
          </button>

          {/* Burger */}
          <button
            ref={burgerRef}
            className={`header__burger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`header__mobile-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav>
          <ul>
            {NAV_ITEMS.map(item => (
              <li key={item.id}>
                <button
                  className={`header__mobile-link${activeSection === item.id ? ' active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
            <li>
              <button className="header__mobile-link" onClick={() => { openDownload(); setMenuOpen(false); }}>
                {t('nav.downloads')}
              </button>
            </li>
          </ul>
        </nav>
        <div className="header__mobile-footer">
          <button className="header__lang-btn" onClick={toggleLanguage}>
            {language === 'de' ? 'Switch to EN' : 'Auf DE wechseln'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
