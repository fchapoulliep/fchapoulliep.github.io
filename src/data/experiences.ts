/**
 * The school projects, in display order: indexed on the home page, told in
 * full on the experience reports page (/retours-experience)
 */
import odomo from "../images/odomo.png";
import biosphere7 from "../images/biosphere7.webp";
import machine from "../images/machine.png";
import sql from "../images/SQL.png";
import web from "../images/web.webp";
import swot from "../images/swot.png";
import symfony from "../images/symfony.webp";
import kifli from "../images/kifli.webp";
import associativeArray from "../images/associativeArray.png";

export interface Experience {
  /** Anchor of the experience on the reports page */
  slug: string;
  title: string;
  image: string;
  /**
   * Diagrams and console captures on a white background are shown whole
   * ("contain"), photos and screens fill their frame ("cover")
   */
  imageFit?: "cover" | "contain";
  /** Experience report (PDF) */
  report: string;
  paragraphs: string[];
}

const report = (file: string) => `${import.meta.env.BASE_URL}experiences/${file}`;

export const experiences: Experience[] = [
  {
    slug: "odomo",
    title: "Odomo",
    image: odomo,
    imageFit: "contain",
    report: report("retourOdomo.pdf"),
    paragraphs: [
      "La réalisation de ce projet a été pour moi une véritable opportunité de démontrer les compétences que je vais développer tout au long de ma carrière professionnelle. J'ai pu identifier les moyens nécessaires pour répondre aux besoins d'un client à l'aide d'un langage de programmation, tout en fournissant un rapport détaillé et en expliquant clairement le code et son fonctionnement.",
      "Ce projet m'a apporté de nombreux bénéfices, tels que la mise en place d'un planning optimisé pour un travail d'équipe efficace dans des conditions optimales, ainsi que le développement d'un sens des responsabilités, étant donné l'importance de livrer un code fonctionnel qui répond aux attentes du client.",
    ],
  },
  {
    slug: "biosphere-7",
    title: "Biosphere 7",
    image: biosphere7,
    report: report("retourBiosphere.pdf"),
    paragraphs: [
      "Ce projet a été extrêmement enrichissant pour moi en termes d'apprentissage. Au cours des deux phases du projet, j'ai notamment contribué à la mise en place de deux stratégies destinées à une intelligence artificielle.",
      "Cela m'a permis de comprendre comment aborder une tâche donnée, qu'il s'agisse du cahier des charges et des règles associées ou des méthodes de travail à adopter.",
      "Le principal bénéfice de ce projet a été, pour moi, l'éveil de mon esprit logique, qui m'a permis de déterminer quelles actions étaient possibles et préférables selon chaque situation.",
    ],
  },
  {
    slug: "machine-virtuelle",
    title: "Machine virtuelle",
    image: machine,
    report: report("retourMachine.pdf"),
    paragraphs: [
      "Ce projet consistait à installer une machine virtuelle pour permettre à une équipe de développeurs de créer un nouveau jeu en utilisant le langage Go, qu'il a donc fallu installer, ainsi qu'un IDE pour l'utiliser.",
      "L'objectif était d'installer une machine avec un matériel adapté, ainsi que de configurer un compte administrateur et un compte développeur, chacun ayant des droits spécifiques selon leur statut. Il a également été nécessaire de mettre en place l'outil Git pour effectuer un git clone et de modifier le prompt Bash pour afficher l'état de ce Git depuis n'importe où.",
      "Ce projet nous a permis, à mes camarades et moi, de maîtriser l'installation d'une machine selon des caractéristiques bien définies, ainsi que de comprendre le fonctionnement d'un terminal de commande et comment le modifier pour y afficher des informations utiles.",
    ],
  },
  {
    slug: "sql",
    title: "SQL",
    image: sql,
    imageFit: "contain",
    report: report("retourSQL.pdf"),
    paragraphs: [
      "Ce travail de groupe dans le cadre d'un projet universitaire m'a permis de développer mes connaissances et de maîtriser adéquatement le langage SQL.",
      "Le défi principal de ce projet était d'établir une cohésion d'équipe avec mon binôme, en veillant à se répartir les tâches de manière efficace pour optimiser le temps de travail. Au-delà de cet esprit d'équipe, l'aspect le plus crucial de cette activité a été de garantir la qualité des données, en s'assurant qu'elles soient cohérentes, complètes et précises.",
      "Ainsi, mes compétences en bases de données se sont considérablement améliorées, notamment en ce qui concerne la création et le remplissage d'une base de données, ainsi que l'élaboration d'un schéma entité-association.",
    ],
  },
  {
    slug: "site-web",
    title: "Site web",
    image: web,
    report: report("retourWeb.pdf"),
    paragraphs: [
      "Ce projet m'a permis de développer mon esprit créatif et de maîtriser de manière approfondie les langages HTML et CSS pour réaliser un site web pour une entreprise.",
      "Le site devait respecter des critères précis et la législation en vigueur, car il s'agissait d'une société produisant des boissons alcoolisées. J'ai ainsi appris à intégrer les normes légales requises pour un site internet, tout en veillant à créer une interface ergonomique et pratique pour le client.",
      "Cette expérience a été pour moi une grande leçon, m'enseignant non seulement le HTML et le CSS, mais aussi l'ergonomie web et les réglementations à respecter dans ce domaine.",
    ],
  },
  {
    slug: "swot",
    title: "SWOT",
    image: swot,
    imageFit: "contain",
    report: report("retourSWOT.pdf"),
    paragraphs: [
      "Ce projet m'a permis de mieux appréhender ma vision d'une entreprise.",
      "En collaboration avec mes camarades, nous avons réalisé une analyse fonctionnelle d'une entreprise. De plus, nous avons identifié les différentes opportunités et menaces auxquelles elle était confrontée.",
      "J'en retire de nombreux aspects positifs, tels que la mise en place d'un planning optimisé pour travailler en équipe dans de bonnes conditions, ainsi que la maîtrise des outils de recherche. Il était crucial de fournir des informations vérifiées et pertinentes afin de mieux comprendre l'environnement de l'entreprise.",
    ],
  },
  {
    slug: "symfony",
    title: "Symfony",
    image: symfony,
    report: report("retourSymfony.pdf"),
    paragraphs: [
      "Ce projet m'a permis de développer mon esprit créatif et de maîtriser de manière approfondie les langages HTML et CSS, ainsi que PHP avec le framework Symfony, pour réaliser une application full-stack.",
      "L'application devait respecter des critères précis définis lors d'une réunion avec le Product Owner. J'ai ainsi appris à créer un site ergonomique et pratique pour le client.",
      "Cette expérience a été pour moi une grande leçon, m'enseignant non seulement le PHP et l'utilisation de Symfony, mais aussi l'ergonomie web et les normes à respecter dans ce domaine.",
    ],
  },
  {
    slug: "chiffrement-de-kifli",
    title: "Chiffrement de Kifli",
    image: kifli,
    report: report("retourKifli.pdf"),
    paragraphs: [
      "Ce projet m'a permis de développer mes compétences en Python et de comprendre le fonctionnement du chiffrement de Kifli.",
      "Le défi principal de ce projet était de comprendre le fonctionnement de l'algorithme de chiffrement de Kifli et de l'implémenter en Python.",
      "Ainsi, mes compétences en Python se sont considérablement améliorées, notamment en ce qui concerne la manipulation des chaînes de caractères et la gestion des fichiers.",
    ],
  },
  {
    slug: "tableau-associatif",
    title: "Tableau associatif",
    image: associativeArray,
    imageFit: "contain",
    report: report("retourTableauAssociatif.pdf"),
    paragraphs: [
      "Ce projet consistait à créer notre propre tableau associatif en Java, en réalisant deux implémentations : une statique et une dynamique. L'objectif était ensuite de comparer les performances des deux implémentations à l'aide de benchmarks.",
      "La première implémentation statique utilisait un tableau de taille fixe pour stocker les clés et les valeurs associées. La deuxième implémentation dynamique utilisait une structure de données telle qu'une liste chaînée ou un arbre pour permettre une taille variable du tableau associatif.",
      "Ce projet nous a permis de mieux comprendre les concepts de base des tableaux associatifs et d'apprécier les avantages et les inconvénients des différentes approches d'implémentation.",
    ],
  },
];
