/**
 * @file App.tsx is the main component of the application. It lays out the
 * navigation bar, the current page and the footer, and holds the routing.
 * @module App
 * @see {@link https://reactrouter.com/}
 */

import React, { useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Cursor from "./Cursor";
import NavigationBar from "./NavigationBar";
import SiteFooter from "./SiteFooter";
import PortfolioPage from "./PortfolioPage";
import DescriptionPage from "./DescriptionPage";
import ContactPage from "./ContactPage";
import ExperiencesPage from "./ExperiencesPage";
import { PAGES } from "../pageMeta";

/**
 * A new page opens at its top, at once
 */
const ScrollToTopOnNavigate: React.FC = () => {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

/**
 * The tab title follows navigation; the built HTML of each page already has it
 */
const PageTitle: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/^\/|\/$/g, "");
    document.title = (PAGES.find((page) => page.path === path) ?? PAGES[0]).title;
  }, [pathname]);
  return null;
};

/**
 * The main component of the portfolio application. The pages live under the
 * base path of the site (/portfolio/ on GitHub Pages).
 */
const App: React.FC = () => (
  <Router
    basename={import.meta.env.BASE_URL}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <ScrollToTopOnNavigate />
    <PageTitle />
    <Cursor />
    <div className="flex min-h-svh flex-col">
      <NavigationBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/about" element={<DescriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Reached from the home page index, not from the navigation bar */}
          <Route path="/retours-experience" element={<ExperiencesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  </Router>
);

export default App;
