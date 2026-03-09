import { useEffect, useRef } from "react";

/**
 * Lightweight IntersectionObserver-based scroll reveal.
 * Replaces heavy GSAP ScrollTrigger for simple fade-in animations.
 */
export const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial state via CSS
    const targets = el.children.length > 1 ? Array.from(el.children) as HTMLElement[] : [el];
    targets.forEach((t, i) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(30px)";
      t.style.transition = `opacity 0.6s ease-out ${i * 0.08}s, transform 0.6s ease-out ${i * 0.08}s`;
      t.style.willChange = "opacity, transform";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.forEach((t) => {
              t.style.opacity = "1";
              t.style.transform = "translateY(0)";
            });
            observer.unobserve(entry.target);
            // Clean up willChange after animation
            setTimeout(() => {
              targets.forEach((t) => { t.style.willChange = "auto"; });
            }, 800);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
