import React, { useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { buttonClasses } from "./ui/button";
import { prefersReducedMotion } from "../lib/motion";

/**
 * Switches between the light and dark themes; the icon shows the theme it leads to.
 * The new theme opens as a circle from the button, through a view
 * transition; without the API or with less motion, the switch is instant.
 */
const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const label =
    theme === "dark" ? "Passer au thème clair" : "Passer au thème sombre";

  const switchTheme = () => {
    const button = buttonRef.current;
    if (
      !button ||
      !document.startViewTransition ||
      prefersReducedMotion()
    ) {
      toggleTheme();
      return;
    }
    // From the centre of the button, mouse or keyboard alike, to the farthest corner
    const { left, top, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement;
    root.classList.add("theme-vt");
    const transition = document.startViewTransition(() => {
      flushSync(toggleTheme);
    });
    transition.ready.then(() =>
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 350,
          easing: "cubic-bezier(0.2, 0, 0, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    );
    transition.finished.finally(() => root.classList.remove("theme-vt"));
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={switchTheme}
      aria-label={label}
      title={label}
      className={buttonClasses({ variant: "ghost", size: "icon", className })}
    >
      {theme === "dark" ? (
        <Sun strokeWidth={1.75} className="size-5" />
      ) : (
        <Moon strokeWidth={1.75} className="size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
