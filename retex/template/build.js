// Génère les retours d'expérience : un PDF A4 par fichier data/<slug>.json et par variante (out/neutre/, out/teinte/), plus un PNG par page rendu par pdf.js.
//
// Prérequis : le dossier retex/ servi en local (depuis retex/ : python3 -m http.server 8765 --bind 127.0.0.1).
// Lancement : coller cette fonction dans l'outil Playwright browser_run_code_unsafe (paramètre code ; le paramètre
// filename refuse les fichiers hors du workspace). Tout se fait dans des pages ouvertes puis refermées ici, pour
// ne pas toucher à l'onglet courant du navigateur.
//
// Le rapport renvoyé donne, par retex : nombre de pages, densité retenue (normal ou compact), remplissage de
// chaque page en %, images chargées, polices chargées, et la dernière ligne de texte de chaque page du PDF.
async (page) => {
  const ROOT = '/home/florian_pino/perso/fchapoulliep.github.io/retex/';
  const BASE = 'http://127.0.0.1:8765/';
  const SLUGS = ['retourOdomo', 'retourBiosphere', 'retourMachine', 'retourSQL', 'retourWeb', 'retourSWOT', 'retourSymfony', 'retourKifli', 'retourTableauAssociatif'];
  // Deux variantes : neutre (fond blanc) et teinte (fond doux propre à chaque retex, champ "teinte" du fichier de données).
  const VARIANTS = ['neutre', 'teinte'];
  const report = {};
  for (const variant of VARIANTS) for (const slug of SLUGS) {
    const p = await page.context().newPage();
    await p.emulateMedia({ media: 'print' });
    await p.goto(BASE + 'template/retex.html?d=' + slug + '&v=' + variant);
    await p.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
    const layout = await p.evaluate(() => window.__layout);
    await p.pdf({ path: ROOT + 'out/' + variant + '/' + slug + '.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
    await p.close();

    // Contrôle : rendu de chaque page du PDF produit par pdf.js, en PNG, et texte réellement présent.
    const v = await page.context().newPage();
    await v.setViewportSize({ width: 1300, height: 1800 });
    await v.goto(BASE + 'extract/extract.html');
    await v.waitForFunction(() => window.ready === true, null, { timeout: 60000 });
    for (let i = 1; i <= layout.pages; i++) {
      const r = await v.evaluate(([u, n]) => window.renderPage(u, n, 2), ['/out/' + variant + '/' + slug + '.pdf?t=' + Date.now(), i]);
      layout.pdfPages = r.num;
      await v.locator('#cv').screenshot({ path: ROOT + 'out/' + variant + '/' + slug + '-p' + i + '.png' });
    }
    const info = await v.evaluate((u) => window.extractInfo(u), '/out/' + variant + '/' + slug + '.pdf?t=' + Date.now());
    layout.pdfText = info.pages.map((pg) => pg.lines.length + ' lignes, dernière : ' + pg.lines[pg.lines.length - 1]);
    await v.close();
    report[variant + '/' + slug] = layout;
  }
  return report;
}
