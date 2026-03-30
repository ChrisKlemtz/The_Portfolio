import { useEffect, useRef } from 'react';

/**
 * HeroScrollTransition
 *
 * What it does as you scroll:
 * 1. The hero glass-window fades out + lifts upward (cover "turns over")
 * 2. The scroll-hint disappears immediately
 * 3. A gold divider line draws itself across the full width
 * 4. The About section rises in from below via CSS reveal class
 */
function HeroScrollTransition() {
  const lineRef  = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const heroSection  = document.getElementById('home');
    const heroWindow   = document.getElementById('hero-window');
    const scrollHint   = document.getElementById('hero-scroll-hint');
    const aboutSection = document.getElementById('about');

    if (!heroSection) return;

    let ticking = false;

    const update = () => {
      const scrollY  = window.scrollY;
      const heroH    = heroSection.offsetHeight;

      // — progress 0→1 over first 55% of hero height
      const progress = Math.min(Math.max(scrollY / (heroH * 0.55), 0), 1);

      // 1. Fade + lift the glass window
      if (heroWindow) {
        heroWindow.style.opacity   = `${1 - progress}`;
        heroWindow.style.transform = `translateY(${-progress * 50}px) scale(${1 - progress * 0.04})`;
        heroWindow.style.pointerEvents = progress > 0.8 ? 'none' : '';
      }

      // 2. Hide scroll hint quickly
      if (scrollHint) {
        scrollHint.style.opacity = `${Math.max(1 - progress * 4, 0)}`;
      }

      // 3. Gold line — draws from center outward after hero is 60% scrolled
      if (lineRef.current) {
        const lineProgress = Math.min(Math.max((progress - 0.5) * 2.5, 0), 1);
        lineRef.current.style.transform = `scaleX(${lineProgress})`;
        lineRef.current.style.opacity   = `${lineProgress > 0.05 ? 1 : 0}`;
      }

      // 4. Trigger About section reveal
      if (aboutSection) {
        if (progress > 0.35) {
          aboutSection.classList.add('section-revealed');
        } else {
          aboutSection.classList.remove('section-revealed');
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Run once on mount for correct initial state
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="hero-transition" ref={trackRef} aria-hidden="true">
      {/* Gold divider line — drawn by scroll */}
      <div className="hero-transition__line" ref={lineRef} />

      {/* Glow dot in center */}
      <div className="hero-transition__dot" />
    </div>
  );
}

export default HeroScrollTransition;
