import React, { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "../../lib/cn";

interface SectionTitleProps {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "h2" | "h3" | "p";
  /** A Lucide icon set before the words, at the size of the capitals */
  icon?: LucideIcon;
}

/**
 * Section title centered between two rules, in small spaced capitals
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  id,
  className,
  as: Tag = "h2",
  icon: Icon,
}) => (
  <Tag
    id={id}
    className={cn(
      "flex items-center gap-4 font-sans text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase",
      "before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border",
      className
    )}
  >
    {Icon ? (
      // Icon and words stay one item of the flex row, so the rules keep their gap
      <span className="inline-flex items-center gap-2">
        <Icon aria-hidden strokeWidth={1.75} className="size-4" />
        {children}
      </span>
    ) : (
      children
    )}
  </Tag>
);

export default SectionTitle;
