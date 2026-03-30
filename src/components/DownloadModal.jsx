import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n/LanguageContext';
import { useModal } from '../contexts/ModalContext';
import DocumentPreview from './DocumentPreview';
import AdditionalCertificates from './AdditionalCertificates';

function DownloadModal() {
  const { t } = useTranslation();
  const { downloadOpen, closeDownload } = useModal();
  const [preview, setPreview] = useState(null);
  const [showAdditional, setShowAdditional] = useState(false);
  const [additionalCerts, setAdditionalCerts] = useState([]);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  // Load certificates.json
  useEffect(() => {
    fetch('/assets/documents/additional/certificates.json')
      .then(r => r.json())
      .then(data => {
        setAdditionalCerts(data.map(cert => ({
          name: cert.name,
          url: `/assets/documents/additional/${cert.filename}`,
        })));
      })
      .catch(() => setAdditionalCerts([]));
  }, []);

  // ESC key
  useEffect(() => {
    if (!downloadOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (showAdditional) setShowAdditional(false);
        else if (preview) setPreview(null);
        else closeDownload();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [downloadOpen, preview, showAdditional, closeDownload]);

  // Reset on close
  useEffect(() => {
    if (!downloadOpen) {
      setPreview(null);
      setShowAdditional(false);
    }
  }, [downloadOpen]);

  const closeAll = () => {
    setPreview(null);
    setShowAdditional(false);
    closeDownload();
  };

  const onOverlayClick = (e) => {
    if (e.target === overlayRef.current) closeDownload();
  };

  if (!downloadOpen) return null;

  const docs = [
    {
      label: t('downloads.cv'),
      url: '/assets/documents/CK_Resume.pdf',
      isCertificate: false,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      ),
    },
    {
      label: t('downloads.certificates'),
      url: '/assets/documents/Zertifikat_Klemtz, Christoph_FbW WD 24-D04 A-2.pdf',
      isCertificate: true,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6"/>
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {!preview && !showAdditional && (
        <div className="modal-overlay" ref={overlayRef} onClick={onOverlayClick} role="dialog" aria-modal="true" aria-label={t('downloads.title')}>
          <div className="modal-panel glass-card" ref={panelRef}>
            <button className="modal__close" onClick={closeDownload} aria-label="Schließen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div className="modal__icon-wrap" aria-hidden="true">
              <div className="modal__icon-bg" />
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </div>

            <h2 className="modal__title">{t('downloads.title')}</h2>
            <p className="modal__desc">{t('downloads.description')}</p>

            <div className="download-list">
              {docs.map((doc, i) => (
                <div key={i} className="download-item glass-card">
                  <div className="download-item__icon">{doc.icon}</div>
                  <div className="download-item__body">
                    <span className="download-item__label">{doc.label}</span>
                    <span className="download-item__hint">
                      {doc.isCertificate ? 'PDF · Zertifikat' : 'PDF · Lebenslauf'}
                    </span>
                  </div>
                  <div className="download-item__actions">
                    <button
                      className="btn btn--ghost btn--sm"
                      onClick={() => setPreview({ url: doc.url, name: doc.label, isCertificate: doc.isCertificate })}
                    >
                      Ansehen
                    </button>
                    <a
                      className="btn btn--primary btn--sm"
                      href={doc.url}
                      download
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <DocumentPreview
        isOpen={!!preview && !showAdditional}
        onClose={() => setPreview(null)}
        onCloseAll={closeAll}
        documentUrl={preview?.url}
        documentName={preview?.name}
        isCertificate={preview?.isCertificate}
        onShowAdditionalCerts={() => setShowAdditional(true)}
        additionalCertificates={additionalCerts}
      />

      <AdditionalCertificates
        isOpen={showAdditional}
        onClose={() => setShowAdditional(false)}
        onCloseAll={closeAll}
        certificates={additionalCerts}
      />
    </>
  );
}

export default DownloadModal;
