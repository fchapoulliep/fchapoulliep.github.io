/**
 * PortfolioPage.tsx
 * @file PortfolioPage.tsx
 * @description Home page of the portfolio: the welcome screen, then the
 * professional, personal and school projects; the school ones with a sticky
 * table of contents on large screens.
 */

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronDown, FileText } from "lucide-react";

import BackgroundLines from "./brand/BackgroundLines";
import Watermark from "./brand/Watermark";
import SectionTitle from "./brand/SectionTitle";
import ExperiencesDiv, { experienceNumber } from "./ExperiencesDiv";
import { PersonalProjects, ProfessionalProjects } from "./ProjectSections";
import { buttonClasses } from "./ui/button";
import { experiences } from "../data/experiences";
import { RESUME_URL } from "../config";
import { scrollToElement } from "../services/scrollToTopService";

/**
 * PortfolioPage component that returns the home page of the portfolio website
 * @returns PortfolioPage component
 */
const PortfolioPage: React.FC = () => {
  /**
   * References to each experience, in display order
   */
  const experienceRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * Experience marked as current in the table of contents
   */
  const [currentSlug, setCurrentSlug] = useState(experiences[0].slug);

  useEffect(() => {
    // The current experience is the one crossing a thin band at mid-height of the window
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSlug(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    experienceRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);

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
        <SectionTitle id="pro-title">Projets professionnels</SectionTitle>
        <ProfessionalProjects />
      </section>

      <section
        aria-labelledby="perso-title"
        className="mx-auto max-w-6xl px-6 pt-16 md:pt-20"
      >
        <SectionTitle id="perso-title">Projets personnels</SectionTitle>
        <PersonalProjects />
      </section>

      <section
        id="experiences"
        aria-labelledby="experiences-title"
        className="scroll-mt-16 pt-16 pb-20 md:pt-20 md:pb-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle id="experiences-title">Projets scolaires</SectionTitle>
          <div className="mt-10 md:mt-12 xl:grid xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-10">
            <nav
              aria-label="Sommaire des expériences"
              className="hidden xl:block"
            >
              <ol className="sticky top-24 border-l border-border">
                {experiences.map(({ slug, title }, index) => (
                  <li key={slug}>
                    <button
                      type="button"
                      aria-current={currentSlug === slug ? "true" : undefined}
                      onClick={() =>
                        scrollToElement(experienceRefs.current[index])
                      }
                      className="-ml-px flex w-full items-baseline gap-2.5 border-l-2 border-transparent py-1.5 pl-4 text-left text-sm text-muted-foreground transition-colors duration-150 ease-soft hover:text-foreground aria-[current=true]:border-foreground aria-[current=true]:font-semibold aria-[current=true]:text-foreground"
                    >
                      <span className="text-xs tabular-nums">
                        {experienceNumber(index)}
                      </span>{" "}
                      {/* The space keeps "07 Symfony" apart for screen readers; flex hides it */}
                      {title}
                    </button>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="divide-y divide-border">
              {experiences.map((experience, index) => (
                <ExperiencesDiv
                  key={experience.slug}
                  experience={experience}
                  index={index}
                  ref={(element) => {
                    experienceRefs.current[index] = element;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioPage;
