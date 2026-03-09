import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Skip on mobile for better native scroll performance
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Handle anchor links
    const handleClick = (e: Event) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const href = (anchor as HTMLAnchorElement).getAttribute("href");
      if (href) {
        const target = document.querySelector(href);
        if (target) lenis.scrollTo(target as HTMLElement, { offset: -80 });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
};
