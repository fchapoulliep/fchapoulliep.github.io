/**
 * @file pageMeta.ts holds what each page says about itself in search results
 * and link previews. The build writes it into the HTML file of each page and
 * into the sitemap (see vite.config.ts), and the app keeps the tab title in
 * step with navigation.
 * @module pageMeta
 */

/** The address of the site, the root of the GitHub Pages domain, with its trailing slash. */
export const SITE_URL = "https://fchapoulliep.github.io/";

export interface PageMeta {
  /** The route, without slashes: "" for the home page. */
  path: string;
  title: string;
  description: string;
}

export const PAGES: PageMeta[] = [
  {
    path: "",
    title: "Portfolio de Florian Chapoullié-Pino",
    description:
      "Portfolio de Florian Chapoullié-Pino, développeur full-stack IA en alternance chez Leveria et étudiant en Master Informatique à La Rochelle Université : projets professionnels, personnels et scolaires.",
  },
  {
    path: "about",
    title: "À propos | Florian Chapoullié-Pino",
    description:
      "Le parcours de Florian Chapoullié-Pino, développeur full-stack IA en alternance chez Leveria et étudiant en Master Informatique à La Rochelle Université.",
  },
  {
    path: "contact",
    title: "Contact | Florian Chapoullié-Pino",
    description:
      "Contactez Florian Chapoullié-Pino pour un projet ou une question, par le formulaire de message ou par e-mail.",
  },
  {
    path: "retours-experience",
    title: "Retours d'expérience | Florian Chapoullié-Pino",
    description:
      "Les projets scolaires de Florian Chapoullié-Pino, développeur full-stack IA : ce que chacun lui a appris, avec son retour d'expérience complet en PDF.",
  },
];
