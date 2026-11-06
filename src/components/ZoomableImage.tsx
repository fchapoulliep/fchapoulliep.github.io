import React, { useRef } from "react";
import { Maximize2, X } from "lucide-react";
import { buttonClasses } from "./ui/button";
import { cn } from "../lib/cn";

interface ZoomableImageProps {
  src: string;
  alt: string;
  /** "contain" shows the whole image, for diagrams on a white background */
  fit?: "cover" | "contain";
  /** Size and shape of the frame, usually an aspect ratio and a radius */
  className?: string;
  /** The "Agrandir" label on hover, left out on a thumbnail too small for it */
  hint?: boolean;
}

/**
 * An image in a frame of fixed ratio, which opens in full size on click.
 * The native <dialog> traps the focus and closes with Escape.
 */
const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  fit = "cover",
  className,
  hint = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        aria-label={`Agrandir l'image : ${alt}`}
        onClick={() => dialogRef.current?.showModal()}
        className={cn(
          "group relative block w-full cursor-zoom-in overflow-hidden",
          // The white of the diagrams themselves, so the margins blend in
          fit === "contain" ? "bg-white" : "bg-muted",
          className
        )}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={cn(
            "size-full transition-transform duration-300 ease-soft group-hover:scale-[1.03]",
            fit === "contain" ? "object-contain p-2" : "object-cover"
          )}
        />
        {hint && (
          <span
            aria-hidden
            className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground opacity-0 transition-opacity duration-200 ease-soft group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            <Maximize2 strokeWidth={1.75} className="size-3.5" />
            Agrandir
          </span>
        )}
      </button>
      <dialog
        ref={dialogRef}
        aria-label={alt}
        // A click outside the image lands on the dialog itself and closes it
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-0 backdrop:bg-background/85 backdrop:backdrop-blur-sm"
      >
        <img
          src={src}
          alt={alt}
          className="block max-h-[85svh] max-w-[min(92vw,72rem)] animate-rise rounded-lg border border-border bg-white object-contain"
        />
        <button
          type="button"
          onClick={close}
          aria-label="Fermer l'image"
          className={buttonClasses({
            variant: "outline",
            size: "icon",
            className: "fixed top-4 right-4 bg-card",
          })}
        >
          <X strokeWidth={1.75} className="size-5" />
        </button>
      </dialog>
    </>
  );
};

export default ZoomableImage;
