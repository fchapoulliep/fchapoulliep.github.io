# fchapoulliep.github.io

The root of my GitHub Pages domain. My sites live in their own repositories and are served under it (`/portfolio/`, `/3dpokedex/`, `/bleachdex3d/`, and so on); this repository only answers the root itself.

## Files

- `index.html` sends visitors and search engines to my [portfolio](https://fchapoulliep.github.io/portfolio/) with an instant redirect, and carries the Google Search Console verification tag for the whole domain. Removing that tag would lose the verification.
- `robots.txt` lists the sitemap of every site. Crawlers only read `robots.txt` at the domain root, so the copies inside each project site are ignored.
- `.nojekyll` tells GitHub Pages to publish the files as they are, without a Jekyll build.

When a new site gets a sitemap, add its `Sitemap:` line to `robots.txt`.
