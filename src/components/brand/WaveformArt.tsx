import React from "react";

/**
 * A wide sound wave in ink, drawn to fill a project frame: the picture of a
 * project that has no logo of its own, such as the music generator.
 */
const BARS = [10, 22, 34, 18, 44, 28, 40, 16, 30, 20, 8];

const WaveformArt: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 120 56"
    fill="none"
    stroke="currentColor"
    strokeWidth={4}
    strokeLinecap="round"
    aria-hidden
    className={className}
  >
    {BARS.map((height, i) => (
      <line
        key={i}
        x1={10 + i * 10}
        x2={10 + i * 10}
        y1={28 - height / 2}
        y2={28 + height / 2}
      />
    ))}
  </svg>
);

export default WaveformArt;
