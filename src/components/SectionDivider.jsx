import { useEffect, useRef } from 'react';

/**
 * SectionDivider
 * Same visual as HeroScrollTransition — gold line draws from center outward + glow dot.
 * Triggered by IntersectionObserver when it scrolls into view.
 */
function SectionDivider() {
  const lineRef = useRef(null);
  const dotRef  = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('section-divider--visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -80px 0px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-divider" ref={rootRef} aria-hidden="true">
      <div className="section-divider__line" ref={lineRef} />
      <div className="section-divider__dot"  ref={dotRef}  />
    </div>
  );
}

export default SectionDivider;
