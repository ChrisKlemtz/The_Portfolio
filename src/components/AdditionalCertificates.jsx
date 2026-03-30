import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

function AdditionalCertificates({ isOpen, onClose, onCloseAll, certificates }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => { if (e.key === 'Escape') onCloseAll(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onCloseAll]);

  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose();
    };
    const tid = setTimeout(() => {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    }, 100);

    return () => {
      clearTimeout(tid);
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Full view of selected cert
  if (selected) {
    return (
      <div className="modal-overlay modal-overlay--full" role="dialog" aria-modal="true" aria-label={selected.name}>
        <div className="modal-panel modal-panel--preview glass-card" ref={panelRef}>
          <button className="modal__close" onClick={onCloseAll} aria-label="Alles schließen">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <h2 className="modal__title">{selected.name}</h2>
          <div className="document-preview__viewer">
            <iframe src={selected.url} title={selected.name} className="document-preview__iframe" />
          </div>
          <div className="modal__btns modal__btns--row">
            <button onClick={() => setSelected(null)} className="btn btn--ghost btn--sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
              {t('downloads.backToOverview')}
            </button>
            <a href={selected.url} download className="btn btn--primary btn--sm">
              {t('downloads.download')}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Certificate grid overview
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={t('downloads.additionalCertificates')}>
      <div className="modal-panel glass-card" ref={panelRef}>
        <button className="modal__close" onClick={onCloseAll} aria-label="Alles schließen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="modal__title">{t('downloads.additionalCertificates')}</h2>
        <p className="modal__desc">{t('downloads.additionalCertificatesDesc')}</p>

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <button
              key={i}
              className="cert-card glass-card"
              onClick={(e) => { e.stopPropagation(); setSelected(cert); }}
            >
              <div className="cert-card__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6"/>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
              </div>
              <span className="cert-card__name">{cert.name}</span>
            </button>
          ))}
        </div>

        <div className="modal__btns modal__btns--row">
          <button onClick={onClose} className="btn btn--ghost btn--sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {t('downloads.backToOverview')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdditionalCertificates;
