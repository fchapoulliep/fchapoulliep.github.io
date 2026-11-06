/**
 * ProjectSections.tsx
 * @file ProjectSections.tsx
 * @description The professional and personal projects of the home page:
 * the professional ones as a timeline, the personal ones as a showcase.
 */

import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import { buttonClasses } from "./ui/button";
import ZoomableImage from "./ZoomableImage";
import { cn } from "../lib/cn";
import {
  personalProjects,
  professionalProjects,
} from "../data/projects";
import { prefersReducedMotion } from "../lib/motion";

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
 * The professional experiences as a timeline, most recent first: the period
 * on the left, a dot with an icon on a thin vertical rule, then the company,
 * the role and what the work was. On a phone the period moves above the
 * company, next to the dot, and the timeline keeps a single column.
 */
/**
 * The ink line of the timeline follows a reading line at 60 % of the window,
 * and the dots it has passed light up. Full and still with less motion.
 */
const useTimelineProgress = (timeline: React.RefObject<HTMLOListElement>) => {
  useEffect(() => {
    const list = timeline.current;
    if (!list) {
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const dots = [...list.querySelectorAll<HTMLElement>("[data-dot]")];
      if (dots.length < 2) {
        return;
      }
      const box = list.getBoundingClientRect();
      const centers = dots.map((dot) => {
        const r = dot.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      const reading = prefersReducedMotion()
        ? Infinity
        : window.innerHeight * 0.6;
      const progress = Math.min(
        1,
        Math.max(0, (reading - first.y) / (last.y - first.y))
      );
      list.style.setProperty("--line-top", `${first.y - box.top}px`);
      list.style.setProperty("--line-left", `${Math.round(first.x - box.left)}px`);
      list.style.setProperty("--line-height", `${last.y - first.y}px`);
      list.style.setProperty("--progress", String(progress));
      dots.forEach((dot, i) =>
        dot.toggleAttribute("data-reached", centers[i].y <= reading)
      );
    };
    const schedule = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      list
        .querySelectorAll("[data-reached]")
        .forEach((dot) => dot.removeAttribute("data-reached"));
    };
  }, [timeline]);
};

export const ProfessionalProjects: React.FC = () => {
  const timeline = useRef<HTMLOListElement>(null);
  useTimelineProgress(timeline);
  return (
  <ol ref={timeline} data-list="timeline" className="relative mt-10 md:mt-12">
    <span
      aria-hidden
      data-timeline-ink
      className="pointer-events-none absolute w-px bg-foreground"
    />
    {professionalProjects.map(
      ({ company, role, period, icon: Icon, logo, highlights, technologies }) => (
        <li
          key={company}
          data-reveal
          className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-10 last:pb-0 md:grid-cols-[9rem_2.5rem_minmax(0,1fr)] md:gap-x-6 md:pb-12"
        >
          {/* The rule runs from this dot down to the next one, under the dot's center */}
          <span
            aria-hidden
            className="absolute top-12 bottom-2 left-5 w-px bg-border group-last:hidden md:left-[11.75rem]"
          />
          <p className="col-start-2 row-start-1 flex h-10 items-center text-sm font-semibold text-muted-foreground md:col-start-1 md:justify-end md:text-right">
            {period}
          </p>
          <span
            aria-hidden
            data-dot
            className={cn(
              "relative z-10 col-start-1 row-start-1 grid size-10 place-items-center overflow-hidden rounded-full border border-border-strong text-foreground md:col-start-2",
              // A logo keeps the white it was drawn for, in both themes
              logo ? "bg-white" : "bg-card"
            )}
          >
            {logo ? (
              <img src={logo} alt="" className="size-full object-contain p-1.5" />
            ) : (
              <Icon strokeWidth={1.75} className="size-4" />
            )}
          </span>
          <div className="col-start-2 md:col-start-3 md:row-start-1">
            {/* As high as the dot, so the company sits level with it and the period */}
            <h3 className="text-lg md:flex md:min-h-10 md:items-center md:text-xl">
              {company}
            </h3>
            <p className="mt-1 font-semibold text-muted-foreground md:mt-0">
              {role}
            </p>
            {highlights && (
              <ul className="mt-4 grid max-w-prose gap-3 lg:max-w-none lg:grid-cols-2 lg:gap-x-8">
                {highlights.map((highlight) => (
                  <li key={highlight.title} className="leading-relaxed">
                    <span className="font-semibold">{highlight.title}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      : {highlight.detail}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {technologies && (
              <Technologies names={technologies} className="mt-4" />
            )}
          </div>
        </li>
      )
    )}
  </ol>
  );
};

/**
 * The personal projects as a showcase: the featured ones as large cards with
 * their screenshot and links, then the others as compact rows. A row starts
 * with a thumbnail (a site) or an icon (a tool) in a frame of the same size,
 * so that titles and details line up from one row to the next.
 */
export const PersonalProjects: React.FC = () => {
  const featured = personalProjects.filter((project) => project.featured);
  const listed = personalProjects.filter((project) => !project.featured);
  return (
    <>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12">
        {featured.map((project) => (
          <li
            key={project.title}
            data-reveal
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
      <ul data-list="rows" className="mt-6 divide-y divide-border rounded-lg border border-border bg-card shadow-card">
        {listed.map(({ title, description, image, alt, icon: Icon, logo, logoBackground, art: Art, technologies }) => (
          <li
            key={title}
            data-reveal
            className="grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-x-4 gap-y-1 px-4 py-4 md:px-6 lg:grid-cols-[6rem_14rem_minmax(0,1fr)] lg:gap-x-6"
          >
            {/* On a phone the frame spans the title and its detail, level with the title */}
            <div className="row-span-2 self-start pt-1 lg:row-span-1 lg:self-center lg:pt-0">
              {image ? (
                <ZoomableImage
                  src={image}
                  alt={alt ?? title}
                  hint={false}
                  className="aspect-[1200/572] rounded-md border border-border"
                />
              ) : (
                (logo || Art || Icon) && (
                  <span
                    aria-hidden
                    style={logo ? { backgroundColor: logoBackground } : undefined}
                    className="relative grid aspect-[1200/572] place-items-center overflow-hidden rounded-md border border-border bg-muted text-foreground"
                  >
                    {/* The logo fills the frame's height on its own background, like a screenshot */}
                    {logo ? (
                      <img src={logo} alt="" className="absolute inset-0 size-full object-contain" />
                    ) : Art ? (
                      <Art className="size-full px-1 py-1.5" />
                    ) : (
                      Icon && <Icon strokeWidth={1.75} className="size-6 lg:size-7" />
                    )}
                  </span>
                )
              )}
            </div>
            <h3 className="text-base">{title}</h3>
            {description ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            ) : (
              technologies && <Technologies names={technologies} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
