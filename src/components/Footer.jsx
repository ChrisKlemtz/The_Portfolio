import { useTranslation } from '../i18n/LanguageContext';

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <span className="footer__logo">
            <span className="footer__logo-bracket">&lt;</span>CK<span className="footer__logo-bracket">/&gt;</span>
          </span>
          <span className="footer__tagline">{t('footer.tagline')}</span>
        </div>

        <div className="footer__links">
          <a href="mailto:dev.christophklemtz@outlook.com" className="footer__link">Email</a>
          <a href="https://github.com/ChrisKlemtz" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
          <a href="https://www.linkedin.com/in/christoph-klemtz-8558b8349/" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
        </div>

        <div className="footer__copy">
          &copy; {year} Christoph Klemtz &mdash; {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
