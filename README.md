# fchapoulliep.github.io

The root of my GitHub Pages domain. My sites live in their own repositories and are served under it (`/portfolio/`, `/3dpokedex/`, `/bleachdex3d/`, and so on); this repository only answers the root itself.

## Files

- `index.html` sends visitors and search engines to my [portfolio](https://fchapoulliep.github.io/portfolio/) with an instant redirect, and carries the Google Search Console verification tag for the whole domain. Removing that tag would lose the verification.
- `index.html` also holds the favicon and the site name (`WebSite` structured data) that Google shows above every result of the domain. Google reads them on the root only, one per hostname, so the sites under it cannot set their own. The `WebSite` block is repeated in the portfolio's `index.html` (the redirect target) and the two must stay identical.
- `favicon.ico`, `icon-192.png` and `apple-icon.png` are the FC monogram from my brand kit, the same files as in the portfolio. Google wants an icon larger than 48 px, hence the PNG next to the ICO.
- `robots.txt` lists the sitemap of every site. Crawlers only read `robots.txt` at the domain root, so the copies inside each project site are ignored.
- `.nojekyll` tells GitHub Pages to publish the files as they are, without a Jekyll build.

When a new site gets a sitemap, add its `Sitemap:` line to `robots.txt`.
