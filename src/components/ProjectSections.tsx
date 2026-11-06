/**
 * ProjectSections.tsx
 * @file ProjectSections.tsx
 * @description The professional and personal projects of the home page.
 */

import React from "react";
import { ArrowUpRight } from "lucide-react";

import { buttonClasses } from "./ui/button";
import ZoomableImage from "./ZoomableImage";
import { cn } from "../lib/cn";
import {
  personalProjects,
  professionalProjects,
} from "../data/projects";

/**
 * A row of technologies, as small pills
 */
const Technologies: React.FC<{ names: string[]; className?: string }> = ({
  names,
  className,
}) => (
  <ul aria-label="Technologies" className={cn("flex flex-wrap gap-2", className)}>
    {names.map((name) => (
      <li
        key={name}
        className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground"
      >
        {name}
      </li>
    ))}
  </ul>
);

/**
 * The professional experiences, most recent first
 */
export const ProfessionalProjects: React.FC = () => (
  <ol className="mt-10 grid gap-6 md:mt-12">
    {professionalProjects.map((project) => (
      <li
        key={project.company}
        className="rounded-lg border border-border bg-card p-5 shadow-card md:p-6"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="text-lg md:text-xl">{project.company}</h3>
          <p className="text-sm text-muted-foreground">{project.period}</p>
        </div>
        <p className="mt-1 font-semibold text-muted-foreground">{project.role}</p>
        {project.highlights && (
          <ul className="mt-4 grid gap-3 md:grid-cols-2 md:gap-x-8">
            {project.highlights.map((highlight) => (
              <li key={highlight.title} className="leading-relaxed">
                <span className="font-semibold">{highlight.title}</span>
                <span className="text-muted-foreground"> : {highlight.detail}</span>
              </li>
            ))}
          </ul>
        )}
        {project.technologies && (
          <Technologies names={project.technologies} className="mt-5" />
        )}
      </li>
    ))}
  </ol>
);

/**
 * The personal projects: those with a screenshot as large cards, then the
 * others as small cards that only name their technologies
 */
export const PersonalProjects: React.FC = () => {
  const shown = personalProjects.filter((project) => project.image);
  const listed = personalProjects.filter((project) => !project.image);
  return (
    <>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12">
        {shown.map((project) => (
          <li
            key={project.title}
            className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-[border-color,transform] duration-200 ease-soft hover:-translate-y-0.5 hover:border-border-strong"
          >
            <ZoomableImage
              src={project.image as string}
              alt={project.alt ?? project.title}
              className="aspect-[1200/572] border-b border-border"
            />
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <h3 className="text-lg md:text-xl">{project.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {/* At the bottom of the card, so that buttons line up from one card to the next;
                  several sites share a two-column grid, which never leaves one button alone on a row */}
              {project.links && (
                <div
                  className={
                    project.links.length > 1
                      ? "mt-auto grid grid-cols-2 gap-2 pt-6"
                      : "mt-auto flex pt-6"
                  }
                >
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={buttonClasses({ variant: "outline" })}
                    >
                      {link.label}
                      <ArrowUpRight strokeWidth={1.75} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {listed.map((project) => (
          <li
            key={project.title}
            className="rounded-lg border border-border bg-card p-5 shadow-card md:p-6"
          >
            <h3 className="text-lg">{project.title}</h3>
            {project.technologies && (
              <Technologies names={project.technologies} className="mt-4" />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
