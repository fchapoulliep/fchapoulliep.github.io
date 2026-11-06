/**
 * @file App.tsx is the main component of the application. It lays out the
 * navigation bar, the current page and the footer, and holds the routing.
 * @module App
 * @see {@link https://reactrouter.com/}
 */

import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";

import Cursor from "./Cursor";
import NavigationBar from "./NavigationBar";
import SiteFooter from "./SiteFooter";
import PortfolioPage from "./PortfolioPage";
import DescriptionPage from "./DescriptionPage";
import ContactPage from "./ContactPage";
import ExperiencesPage from "./ExperiencesPage";
import StaggerReveal from "./StaggerReveal";
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
 * What every page shares: the bar, the footer and the cursor
 */
const Layout: React.FC = () => (
  <>
    <ScrollToTopOnNavigate />
    <PageTitle />
    <StaggerReveal />
    <Cursor />
    <div className="flex min-h-svh flex-col">
      <NavigationBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  </>
);

/**
 * The pages live under the base path of the site (/portfolio/ on GitHub
 * Pages). A data router, not BrowserRouter: only RouterProvider runs the view
 * transitions that <Link viewTransition> asks for.
 */
const createRouter = () =>
  createBrowserRouter(
    [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <PortfolioPage /> },
          { path: "/about", element: <DescriptionPage /> },
          { path: "/contact", element: <ContactPage /> },
          // Reached from the home page index, not from the navigation bar
          { path: "/retours-experience", element: <ExperiencesPage /> },
          { path: "*", element: <Navigate to="/" /> },
        ],
      },
    ],
    {
      basename: import.meta.env.BASE_URL,
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );

/**
 * The main component of the portfolio application
 */
const App: React.FC = () => {
  // One router per mounted app, created from the address of that moment
  const [router] = useState(createRouter);
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />;
};

export default App;
