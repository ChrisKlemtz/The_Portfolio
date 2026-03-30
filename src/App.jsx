import { LanguageProvider } from './i18n/LanguageContext';
import { ModalProvider } from './contexts/ModalContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HeroScrollTransition from './components/HeroScrollTransition';
import SectionDivider from './components/SectionDivider';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
import ContactModal from './components/ContactModal';
import DownloadModal from './components/DownloadModal';

function App() {
  return (
    <LanguageProvider>
      <ModalProvider>
        <ScrollProgress />
        <Header />

        <main>
          <Hero />
          <HeroScrollTransition />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Contact />
        </main>

        <Footer />
        <BackToTop />

        {/* Global modals */}
        <ContactModal />
        <DownloadModal />
      </ModalProvider>
    </LanguageProvider>
  );
}

export default App;
