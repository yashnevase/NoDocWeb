import { useEffect } from "react";

// Content stays readable if animations are unavailable or disabled.
export default function useScrollReveal() {
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          if (media.matches || !entry.target.animate) continue;
          const animation = entry.target.animate(
            [
              { opacity: 0.35, transform: "translateY(24px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(
        ".reveal, .section-heading:not(.reveal), .workflow-panel, .center-heading, .download-card, .maker-section",
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (media.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      }
    };
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      media.removeEventListener("change", stop);
    };
  }, []);
}
