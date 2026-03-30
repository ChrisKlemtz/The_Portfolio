import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [contactOpen, setContactOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const openContact = useCallback(() => setContactOpen(true), []);
  const closeContact = useCallback(() => setContactOpen(false), []);
  const openDownload = useCallback(() => setDownloadOpen(true), []);
  const closeDownload = useCallback(() => setDownloadOpen(false), []);

  return (
    <ModalContext.Provider value={{ contactOpen, openContact, closeContact, downloadOpen, openDownload, closeDownload }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within ModalProvider');
  return context;
}
