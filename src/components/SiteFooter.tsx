import React from "react";
import { FileText } from "lucide-react";
import Logo from "./brand/Logo";
import SocialLinks from "./SocialLinks";
import { buttonClasses } from "./ui/button";
import { RESUME_URL } from "../config";

/**
 * Footer of every page: who I am, the CV and the ways to reach me
 */
const SiteFooter: React.FC = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Logo aria-hidden className="h-10 shrink-0" />
        <div>
          <p className="font-display text-base font-bold">
            Florian Chapoullié-Pino
          </p>
          <p className="text-sm text-muted-foreground">Développeur Full-Stack IA</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses({ variant: "outline" })}
        >
          <FileText strokeWidth={1.75} />
          Mon CV
        </a>
        <SocialLinks />
      </div>
    </div>
    <div className="border-t border-border">
      <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Florian Chapoullié-Pino
      </p>
    </div>
  </footer>
);

export default SiteFooter;
