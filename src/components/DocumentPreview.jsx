import { useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';

function DocumentPreview({ isOpen, onClose, onCloseAll, documentUrl, documentName, isCertificate, onShowAdditionalCerts, additionalCertificates }) {
  const { t } = useTranslation();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => { if (e.key === 'Escape') onCloseAll(); };
    const tid = setTimeout(() => {
      document.addEventListener('keydown', onKey);
    }, 100);

    return () => {
      clearTimeout(tid);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onCloseAll]);

  const onOverlayClick = (e) => {
    if (!panelRef.current?.contains(e.target)) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay modal-overlay--full" onClick={onOverlayClick} role="dialog" aria-modal="true" aria-label={documentName}>
      <div className="modal-panel modal-panel--preview glass-card" ref={panelRef}>
        <button className="modal__close" onClick={onCloseAll} aria-label="Alles schließen">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <h2 className="modal__title">{documentName}</h2>

        <div className="document-preview__viewer">
          <iframe src={documentUrl} title={documentName} className="document-preview__iframe" />
        </div>

        <div className="modal__btns modal__btns--row">
          <button onClick={onClose} className="btn btn--ghost btn--sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            {t('downloads.backToOverview')}
          </button>
          {isCertificate && additionalCertificates?.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onShowAdditionalCerts(); }}
              className="btn btn--glass btn--sm"
            >
              {t('downloads.moreCertificates')}
            </button>
          )}
          <a href={documentUrl} download className="btn btn--primary btn--sm">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            {t('downloads.download')}
          </a>
        </div>
      </div>
    </div>
  );
}

export default DocumentPreview;
