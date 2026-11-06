/**
 * ExperiencesPage.tsx
 * @file ExperiencesPage.tsx
 * @description The experience reports of the school projects, in full: image,
 * text and PDF of each, with a sticky table of contents on large screens. The
 * home page only indexes them, each entry opening this page at its anchor.
 */

import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import Watermark from "./brand/Watermark";
import ExperiencesDiv, { experienceNumber } from "./ExperiencesDiv";
import { experiences } from "../data/experiences";
import { scrollToElement } from "../services/scrollToTopService";

const ExperiencesPage: React.FC = () => {
  /**
   * References to each experience, in display order
   */
  const experienceRefs = useRef<(HTMLElement | null)[]>([]);

  /**
   * Experience marked as current in the table of contents
   */
  const [currentSlug, setCurrentSlug] = useState(experiences[0].slug);

  const { hash } = useLocation();

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

  useEffect(() => {
    // An entry of the home page index opens the page at its experience. The
    // browser looked for the anchor before the page was drawn, and the app
    // scrolls to the top on a new page, so the jump happens here, at once
    if (hash) {
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ block: "start" });
    }
  }, [hash]);

  return (
    // overflow-x-clip, not hidden: hidden would make the page a scroll
    // container and the table of contents would no longer stick
    <div className="relative isolate overflow-x-clip">
      <Watermark className="top-10 -right-[14%] h-[24rem] md:h-[34rem]" />
      <header className="mx-auto max-w-6xl animate-rise px-6 pt-28 pb-10 md:pt-36 md:pb-14">
        <h1 className="text-2xl leading-[1.2] sm:text-3xl sm:leading-[1.15] md:text-4xl md:leading-[1.1]">
          Retours d'expérience
        </h1>
        <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
          Mes projets scolaires : ce que chacun m'a appris, avec son retour
          d'expérience complet en PDF.
        </p>
      </header>

      <section
        aria-label="Projets scolaires"
        className="mx-auto max-w-6xl px-6 pb-20 md:pb-24 xl:grid xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-10"
      >
        <nav aria-label="Sommaire des expériences" className="hidden xl:block">
          <ol className="sticky top-24 border-l border-border">
            {experiences.map(({ slug, title }, index) => (
              <li key={slug}>
                <button
                  type="button"
                  aria-current={currentSlug === slug ? "true" : undefined}
                  onClick={() => scrollToElement(experienceRefs.current[index])}
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
      </section>
    </div>
  );
};

export default ExperiencesPage;
