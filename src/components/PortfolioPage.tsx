/**
 * PortfolioPage.tsx
 * @file PortfolioPage.tsx
 * @description Home page of the portfolio: the welcome screen, then the
 * professional projects as a timeline, the personal ones as a showcase, and
 * an index of the school ones, whose reports have a page of their own.
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  Briefcase,
  ChevronDown,
  FileText,
  FolderGit2,
  GraduationCap,
} from "lucide-react";

import BackgroundLines from "./brand/BackgroundLines";
import Watermark from "./brand/Watermark";
import SectionTitle from "./brand/SectionTitle";
import { experienceNumber } from "./ExperiencesDiv";
import { PersonalProjects, ProfessionalProjects } from "./ProjectSections";
import { buttonClasses } from "./ui/button";
import { experiences } from "../data/experiences";
import { RESUME_URL } from "../config";
import { scrollToElement } from "../services/scrollToTopService";

/**
 * The clicked entry lends its number and title to the section they open, as
 * shared elements of the view transition. Named on click only: two elements
 * may not share a name.
 */
const nameSharedElements = (event: React.MouseEvent<HTMLAnchorElement>) => {
  const link = event.currentTarget;
  link
    .querySelector<HTMLElement>("[data-vt=num]")
    ?.style.setProperty("view-transition-name", "exp-num");
  link
    .querySelector<HTMLElement>("[data-vt=title]")
    ?.style.setProperty("view-transition-name", "exp-title");
};

/**
 * PortfolioPage component that returns the home page of the portfolio website
 * @returns PortfolioPage component
 */
const PortfolioPage: React.FC = () => {
  return (
    <>
      <section className="relative isolate flex min-h-svh items-center overflow-x-clip">
        {/* The lines fade into the plain background (see .backdrop-fade) */}
        <div aria-hidden className="backdrop-fade absolute inset-0 -z-10">
          <BackgroundLines />
        </div>
        {/* The watermark stays whole and crisp, without a fade: at 5 % over the
            dark background a fade shows bands. The section only clips sideways
            (overflow-x-clip), so its foot runs just under the intro uncut */}
        <Watermark className="top-1/2 -right-[12%] h-[85%] -translate-y-1/2 md:h-[105%]" />
        <div className="mx-auto w-full max-w-6xl animate-rise px-6 pt-24 pb-20 md:pt-28">
          {/* On a narrow phone the name breaks after the first name, never at the hyphen */}
          <h1 className="text-[1.75rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-6xl lg:leading-[1.05]">
            Florian <span className="whitespace-nowrap">Chapoullié-Pino</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Développeur Full-Stack IA
          </p>
          <p className="mt-6 max-w-prose leading-relaxed">
            Actuellement en alternance chez Leveria en tant que développeur
            full-stack IA, je suis en 2e année de Master Informatique
            (Architecte logiciel) à La Rochelle Université. Passionné par le
            développement web et l'intelligence artificielle, j'aime concevoir
            des solutions qui facilitent les tâches répétitives du quotidien.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                scrollToElement(document.getElementById("projets"))
              }
              className={buttonClasses()}
            >
              Voir mes projets
              <ArrowDown strokeWidth={1.75} />
            </button>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses({ variant: "outline" })}
            >
              <FileText strokeWidth={1.75} />
              Mon CV
            </a>
          </div>
        </div>
        {/* The intro fills the screen: a slow arrow says the projects are below */}
        <button
          type="button"
          aria-label="Découvrir mes projets"
          onClick={() =>
            scrollToElement(document.getElementById("projets"))
          }
          className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-full text-muted-foreground transition-colors duration-200 ease-soft hover:text-foreground"
        >
          <ChevronDown
            strokeWidth={1.75}
            className="size-6 animate-nudge motion-reduce:animate-none"
          />
        </button>
      </section>

      <section
        id="projets"
        aria-labelledby="pro-title"
        className="mx-auto max-w-6xl scroll-mt-16 px-6 pt-16 md:pt-20"
      >
        <SectionTitle id="pro-title" icon={Briefcase}>
          Projets professionnels
        </SectionTitle>
        <ProfessionalProjects />
      </section>

      <section
        aria-labelledby="perso-title"
        className="mx-auto max-w-6xl px-6 pt-16 md:pt-20"
      >
        <SectionTitle id="perso-title" icon={FolderGit2}>
          Projets personnels
        </SectionTitle>
        <PersonalProjects />
      </section>

      <section
        id="experiences"
        aria-labelledby="experiences-title"
        className="mx-auto max-w-6xl scroll-mt-16 px-6 pt-16 pb-20 md:pt-20 md:pb-24"
      >
        <SectionTitle id="experiences-title" icon={GraduationCap}>
          Projets scolaires
        </SectionTitle>
        {/* Only an index here: each entry opens the reports page at its section */}
        <ol data-list="index" className="mt-10 grid rounded-lg border border-border bg-card p-2 shadow-card sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {experiences.map(({ slug, title }, index) => (
            <li key={slug} data-reveal>
              <Link
                to={`/retours-experience#${slug}`}
                viewTransition
                onClick={nameSharedElements}
                className="group flex min-h-11 items-center gap-3 rounded-md px-4 py-3 transition-colors duration-150 ease-soft hover:bg-accent"
              >
                <span data-vt="num" className="text-xs font-semibold text-muted-foreground tabular-nums">
                  {experienceNumber(index)}
                </span>{" "}
                {/* The space keeps "07 Symfony" apart for screen readers; flex hides it */}
                <span data-vt="title" className="font-semibold">{title}</span>
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="ml-auto size-4 text-muted-foreground transition-[color,transform] duration-150 ease-soft group-hover:translate-x-0.5 group-hover:text-foreground"
                />
              </Link>
            </li>
          ))}
        </ol>
        <Link
          to="/retours-experience"
          viewTransition
          className={buttonClasses({ variant: "outline", className: "mt-6" })}
        >
          Tous les retours d'expérience
          <ArrowRight strokeWidth={1.75} />
        </Link>
      </section>
    </>
  );
};

export default PortfolioPage;
