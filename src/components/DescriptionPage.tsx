/**
 * DescriptionPage.tsx
 * @file DescriptionPage.tsx
 * @description About page: who I am. The projects are on the home page.
 */

import React from "react";
import Watermark from "./brand/Watermark";

/**
 * DescriptionPage component
 * @returns DescriptionPage component
 */
const DescriptionPage: React.FC = () => (
  <div className="relative isolate overflow-hidden">
    <Watermark className="top-10 -right-[14%] h-[24rem] md:h-[34rem]" />
    <section className="mx-auto max-w-6xl animate-rise px-6 pt-28 pb-14 md:pt-36 md:pb-20">
      <h1 className="text-2xl leading-[1.2] sm:text-3xl sm:leading-[1.15] md:text-4xl md:leading-[1.1]">
        Que faut-il savoir sur moi&nbsp;?
      </h1>
      <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
        <strong className="font-semibold text-foreground">
          Actuellement en alternance chez Leveria en tant que développeur
          full-stack IA,
        </strong>{" "}
        en parallèle de mon Master 2 Informatique, je suis motivé à construire
        une expérience professionnelle solide.
        J'ai toujours souhaité vivre dans un monde dans lequel les tâches
        fastidieuses seraient facilitées par la technologie, c'est pourquoi ma
        carrière future était toute tracée ! Je reste toujours à la recherche
        de nouvelles connaissances.
      </p>
    </section>
  </div>
);

export default DescriptionPage;
