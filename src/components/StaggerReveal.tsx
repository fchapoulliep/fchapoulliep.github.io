/**
 * The staggered entrance. Every element marked data-reveal is watched; those
 * that enter the window together come in one after the other, 50 ms apart,
 * five steps at most (index.css).
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// The elements wait hidden only where the browser can reveal them, and from
// the first paint: set in an effect, they would show for a frame, then hide
if ("IntersectionObserver" in window) {
  document.documentElement.setAttribute("data-stagger", "");
}

const StaggerReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          )
          .forEach((entry, step) => {
            const element = entry.target as HTMLElement;
            element.style.setProperty("--stagger", String(Math.min(step, 4)));
            element.setAttribute("data-revealed", "");
            observer.unobserve(element);
          });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default StaggerReveal;
