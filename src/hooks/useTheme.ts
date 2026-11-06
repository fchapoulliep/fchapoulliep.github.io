import { useCallback, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Key of the theme chosen with the toggle. The script in index.html reads it
 * before the first paint, so the page never flashes the other theme.
 */
const STORAGE_KEY = "theme";

/** Background of each theme, for the browser's bar (meta theme-color). */
const BAR_COLORS: Record<Theme, string> = { dark: "#121212", light: "#fafafa" };

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", BAR_COLORS[theme]);
};

/**
 * The current theme and the way to switch it. The site is dark until the
 * visitor picks light with the toggle: the system's theme is not followed
 * (Florian, 2026-11-06), so every visitor first sees the brand in dark.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Without storage the choice simply lasts until the page is reloaded
    }
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggleTheme };
};
