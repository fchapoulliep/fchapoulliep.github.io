/**
 * Whether the system asks for less motion: every animation of the site then
 * stays still (see the reduced motion rule in index.css)
 */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
