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
  AudioWaveform,
  type LucideIcon,
} from "lucide-react";

import fah from "../images/fah.webp";
import chp from "../images/chp-services.webp";
import dex3dMosaic from "../images/dex3d-mosaic.webp";
import WaveformArt from "../components/brand/WaveformArt";

/**
 * The official square logos of the companies and tools, in public/logos/.
 * They belong to their brands and only identify them.
 */
const logo = (file: string) => `${import.meta.env.BASE_URL}logos/${file}`;

/**
 * A professional experience, most recent first
 */
export interface ProfessionalProject {
  company: string;
  role: string;
  period: string;
  /** Drawn in the dot of the timeline: a company, a laboratory */
  icon: LucideIcon;
  /** The company's official square logo, in its colours, in place of the icon */
  logo?: string;
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
    logo: logo("leveria.jpg"),
    highlights: [
      {
        title: "Plateforme des cabinets clients",
        detail:
          "Espace privé des cabinets de gestion de patrimoine accompagnés par Leveria : formation en vidéo, bibliothèque de skills IA à télécharger, et communauté avec profils, publications, messagerie et notifications en temps réel.",
      },
      {
        title: "Architecture et déploiement",
        detail:
          "Monorepo TypeScript : API Fastify, worker de files de tâches pour les e-mails et les notifications, PostgreSQL, authentification, temps réel par WebSocket, déploiement sous Docker avec Dokploy.",
      },
    ],
    technologies: [
      "TypeScript",
      "React",
      "TanStack",
      "Fastify",
      "PostgreSQL",
      "Redis",
      "Socket.IO",
      "Docker",
      "Dokploy",
    ],
  },
  {
    company: "Laboratoire L3I, La Rochelle Université",
    role: "Stage, recherche en analyse de données et IA",
    period: "Avril à juin 2026",
    icon: FlaskConical,
    logo: logo("l3i.png"),
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
    logo: logo("rhinov.svg"),
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
  /** The logo of the project's central tool, filling its frame */
  logo?: string;
  /** The background the logo was drawn on, carried to the whole frame */
  logoBackground?: string;
  /** A drawing in ink that fills the frame, for a project without a logo */
  art?: React.FC<{ className?: string }>;
  technologies?: string[];
  /** The live sites, when the project has one to show */
  links?: { label: string; href: string }[];
}

export const personalProjects: PersonalProject[] = [
  {
    title: "3D Pokédex, DragonDex, NarutoDex, MarioDex et BleachDex",
    featured: true,
    description:
      "Encyclopédies 3D de personnages des univers Pokémon, Dragon Ball, Naruto, Super Mario et Bleach, dont les 151 Pokémon originaux, sur la même base React et Three.js, avec des modèles posés et animés dans Blender.",
    image: dex3dMosaic,
    alt: "Captures des encyclopédies 3D Dragon Ball, Naruto, Bleach, Pokémon et Super Mario",
    links: [
      { label: "3D Pokédex", href: "https://fchapoulliep.github.io/3dpokedex/" },
      { label: "DragonDex", href: "https://fchapoulliep.github.io/dragondex3d/" },
      { label: "NarutoDex", href: "https://fchapoulliep.github.io/narutodex3d/" },
      { label: "MarioDex", href: "https://fchapoulliep.github.io/mariodex3d/" },
      { label: "BleachDex", href: "https://fchapoulliep.github.io/bleachdex3d/" },
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
    logo: logo("remotion.png"),
    logoBackground: "#ffffff",
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
    logo: logo("comfyui.svg"),
    logoBackground: "#211927",
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
    // No logo of its own for MusicGen: a sound wave in ink
    icon: AudioWaveform,
    art: WaveformArt,
    technologies: ["Python", "Flask", "Docker", "MusicGen"],
  },
];
