## Portfolio de Florian Chapoullié-Pino

Portfolio personnel de Florian Chapoullié-Pino, étudiant en deuxième année de Master Informatique à l'Université de La Rochelle et développeur Full-Stack en devenir.
**Site en ligne :** [fchapoulliep.github.io/portfolio](https://fchapoulliep.github.io/portfolio/)

## Contenu du portfolio
- **Accueil :** présentation, puis les expériences avec leur texte complet, et un sommaire qui suit le défilement sur grand écran.
- **À propos :** parcours, intérêts pour le développement web et projets personnels.
- **Thèmes sombre et clair :** le site s'ouvre en sombre ; un bouton de la barre bascule en clair, le nouveau thème s'ouvrant en cercle depuis le bouton.
- **Contact :** formulaire d'envoi de message et adresse e-mail de contact.
- **CV :** accès direct au CV au format PDF.
- **Retours d'expérience :** documents détaillés sur les projets suivants :
	- Odomo
	- Biosphere 7
	- Machine virtuelle
	- SQL
	- Site web
	- SWOT
	- Symfony
	- Chiffrement de Kifli
	- Tableau associatif

Le portfolio propose également des liens vers [LinkedIn](https://www.linkedin.com/in/florianpino/) et [GitHub](https://github.com/fchapoulliep).

## Technologies utilisées
- React 18 et TypeScript
- React Router (routeur de données, `createBrowserRouter`) pour la navigation entre les pages, avec de vraies adresses (`/portfolio/contact`). Seul ce routeur joue les View Transitions demandées par `<Link viewTransition>` : depuis l'index de l'accueil, le numéro et le titre cliqués glissent jusqu'à leur section des retours d'expérience. GitHub Pages ne connaît que des fichiers : le build copie `index.html` pour chaque route (`about.html`, `contact.html`) et en `404.html`. Une nouvelle route s'ajoute donc aussi dans `vite.config.ts`.
- Tailwind CSS 4, avec les tokens du design system personnel (couleurs, polices Comfortaa et Nunito, rayons, monogramme FC) dans `src/index.css`
- Icônes Lucide (`lucide-react`) ; les entreprises de la frise et les outils des projets se montrent par leur logo officiel (`public/logos/`), qui appartient à sa marque et ne sert qu'à l'identifier
- IntersectionObserver du navigateur pour les apparitions au défilement (décalées de 50 ms sur l'accueil) et le sommaire des retours d'expérience ; la frise des expériences se dessine au défilement, et survoler une ligne d'une liste estompe ses voisines. Tout reste immobile quand le système demande moins d'animations.

## Lancer en local
- `npm install`, puis `npm start` (serveur de développement Vite)
- `npm test` pour les tests, `npm run build` pour le build dans `build/`
- `npm run deploy` publie `build/` sur GitHub Pages
- EmailJS (`@emailjs/browser`) pour l'envoi du formulaire de contact
- Vite pour le développement et le build, Vitest pour les tests