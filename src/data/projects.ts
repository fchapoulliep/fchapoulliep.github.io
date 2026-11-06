/**
 * projects.ts
 * @file projects.ts
 * @description The professional and personal projects shown on the home
 * page. The school projects are the experiences (experiences.ts).
 */

import {
  Building2,
  Clapperboard,
  FlaskConical,
  Image as ImageIcon,
  Music,
  type LucideIcon,
} from "lucide-react";

import fah from "../images/fah.webp";
import chp from "../images/chp-services.webp";
import pokedex3d from "../images/3dpokedex.webp";
import dex3dMosaic from "../images/dex3d-mosaic.webp";

/**
 * A professional experience, most recent first
 */
export interface ProfessionalProject {
  company: string;
  role: string;
  period: string;
  /** Drawn in the dot of the timeline: a company, a laboratory */
  icon: LucideIcon;
  /** What the work was, as short lines; none when only the role is public */
  highlights?: { title: string; detail: string }[];
  technologies?: string[];
}

export const professionalProjects: ProfessionalProject[] = [
  {
    company: "Leveria",
    role: "Alternance, développeur full-stack IA",
    period: "En cours",
    icon: Building2,
  },
  {
    company: "Laboratoire L3I, La Rochelle Université",
    role: "Stage, recherche en analyse de données et IA",
    period: "Avril à juin 2026",
    icon: FlaskConical,
    highlights: [
      {
        title: "Projet Habimob",
        detail:
          "Pipeline multimodal de détection d'incohérences : reconnaissance de la parole, reconnaissance optique de caractères, traitement du langage naturel et LLM-as-a-Judge.",
      },
      {
        title: "Bibliothèque mutualisée",
        detail:
          "Architecture multithreadée avec un scheduler, déploiement et maintenance.",
      },
      {
        title: "Tableau de bord",
        detail: "Suivi des traitements en Vanilla JS et Chart.js, sur une API FastAPI.",
      },
    ],
    technologies: ["Python", "FastAPI", "Chart.js", "ASR", "OCR", "LLM"],
  },
  {
    company: "Savane Vision, Rhinov",
    role: "Stage, développeur front-end",
    period: "Février à juin 2025",
    icon: Building2,
    highlights: [
      {
        title: "Montée en version du back-office",
        detail:
          "Migration d'une application Angular vers Qwik : refonte technique, optimisation des performances et extension de l'API NestJS.",
      },
      {
        title: "Explorateur de fichiers",
        detail:
          "Pour le serveur de médias interne : étude de l'existant et des besoins, refonte graphique et ergonomique, implémentation des fonctionnalités.",
      },
    ],
    technologies: ["TypeScript", "Angular", "Qwik", "NestJS"],
  },
];

/**
 * A personal project. A featured one gets a large card with its screenshot
 * (1200 x 572) and its links; the others a compact row, with a thumbnail and
 * a short phrase for a site, or an icon and the technologies for a tool.
 */
export interface PersonalProject {
  title: string;
  featured?: boolean;
  /** A few lines on a featured card, one short phrase on a row */
  description?: string;
  image?: string;
  alt?: string;
  /** Stands for a project without a screenshot on its row */
  icon?: LucideIcon;
  technologies?: string[];
  /** The live sites, when the project has one to show */
  links?: { label: string; href: string }[];
}

export const personalProjects: PersonalProject[] = [
  {
    title: "DragonDex, NarutoDex, MarioDex et BleachDex 3D",
    featured: true,
    description:
      "Encyclopédies 3D de personnages des univers Dragon Ball, Naruto, Super Mario et Bleach, sur la même base React et Three.js, avec des modèles posés et animés dans Blender.",
    image: dex3dMosaic,
    alt: "Captures des encyclopédies 3D Dragon Ball, Naruto, Super Mario et Bleach",
    links: [
      { label: "DragonDex", href: "https://fchapoulliep.github.io/dragondex3d/" },
      { label: "NarutoDex", href: "https://fchapoulliep.github.io/narutodex3d/" },
      { label: "MarioDex", href: "https://fchapoulliep.github.io/mariodex3d/" },
      { label: "BleachDex", href: "https://fchapoulliep.github.io/bleachdex3d/" },
    ],
  },
  {
    title: "3D Pokédex",
    featured: true,
    description:
      "Pokédex 3D des 151 Pokémon originaux, réalisé avec React et Three.js, avec des modèles interactifs rendus avec Blender.",
    image: pokedex3d,
    alt: "Capture du 3D Pokédex : modèle 3D de Venusaur dans une forêt",
    links: [
      {
        label: "Ouvrir le 3D Pokédex",
        href: "https://fchapoulliep.github.io/3dpokedex/",
      },
    ],
  },
  {
    title: "FAH",
    technologies: ["React", "TypeScript", "Ant Design", "React Router"],
    image: fah,
    alt: "Capture du projet FAH",
  },
  {
    title: "CHP Services",
    technologies: ["React", "TypeScript", "Ant Design", "EmailJS"],
    image: chp,
    alt: "Capture du projet CHP Services",
  },
  {
    title: "Montage vidéo automatisé",
    icon: Clapperboard,
    technologies: [
      "TypeScript",
      "Remotion",
      "Python",
      "Whisper",
      "RoFormer",
      "Chatterbox",
      "Orpheus (LoRA)",
      "FFmpeg",
    ],
  },
  {
    title: "Génération d'images",
    icon: ImageIcon,
    technologies: [
      "ComfyUI",
      "SDXL",
      "LoRA",
      "Inpainting",
      "Real-ESRGAN",
      "BiRefNet",
    ],
  },
  {
    title: "Générateur de musique",
    icon: Music,
    technologies: ["Python", "Flask", "Docker", "MusicGen"],
  },
];
