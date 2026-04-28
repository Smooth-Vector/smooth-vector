# Smooth Vector Solutions - Site Notes

## Stack

Plain static HTML. No framework, no build step, no package manager.
Hosted on GitHub Pages (`CNAME`, `.nojekyll`).

- Styles: `/assets/css/main.css` - single file, CSS variables for theming
- JS: `/assets/js/main.js` - handles nav toggle, scroll reveals, tweaks panel
- Fonts: Google Fonts (Syne, DM Sans, DM Mono) - loaded in `<head>`

## Pages

| File | URL | Purpose |
|---|---|---|
| `index.html` | `/` | Homepage |
| `faq.html` | `/faq.html` | FAQ |
| `insights/index.html` | `/insights/` | Insights index |
| `insights/*.html` | `/insights/slug.html` | Individual posts |

## Adding a new page

1. Copy the closest existing page as a template
2. Update `<title>`, meta description, canonical URL, OG/Twitter tags
3. Update the breadcrumb schema and any page-specific JSON-LD
4. Add the URL to `sitemap.xml`
5. Add at least one internal link to the page from an existing page (nav, footer, or body)
6. Add `aria-current="page"` to the correct nav item

Never change an existing page's URL without setting up a 301 redirect first.

## Nav pattern

Every page uses the same `<nav>` block. Keep all pages in sync when adding nav items.
Current nav items: Services, Process, About, FAQ, Insights, Book a consultation (CTA).

## Footer pattern

Every page uses the same `<footer>` block with the company address and copyright.
The Calendly modal, tweaks panel, and their scripts are duplicated on every page - keep them in sync.

## SEO conventions

- `<title>`: ≤60 chars
- Meta description: ≤155 chars
- Every page has: canonical, geo meta tags, OG tags, Twitter tags, at least one JSON-LD block
- JSON-LD types in use: `ProfessionalService`, `WebSite`, `BreadcrumbList`, `Article`, `FAQPage`
- The homepage `ProfessionalService` schema is the master business entity - `@id` is `https://www.smoothvectorsolutions.com/#business`

## Sitemap

`sitemap.xml` is maintained manually. Update it every time a page is added or removed.
`changefreq`: homepage = `monthly`, insights index = `weekly`, posts = `monthly`.

## Design system (key CSS variables)

```
--fg        main foreground
--fg2       secondary text
--fg3       muted/meta text
--accent    teal highlight colour
--border    subtle borders
--surface   card/panel background
--font-display   Syne
--font-sans      DM Sans
--font-mono      DM Mono
```

The tweaks panel lets users switch theme and accent at runtime - don't hardcode colours, always use CSS variables.

## What NOT to do

- Don't add a build system or package.json unless explicitly asked
- Don't change existing page URLs without 301 redirects
- Don't deploy (push to main/origin) without the user saying "deploy" or "ship it"
- Don't add a `telephone` field to schema - user has chosen to omit it
- Don't write anonymised case studies or fake testimonials
- Don't keyword-stuff titles or H1s

## Business context

- **Company:** Smooth Vector Solutions (legal: Tech Shapers Ltd, Co. No. 15921823)
- **Owner:** Yanis Kampe - LinkedIn: https://www.linkedin.com/in/jkampe/
- **Company LinkedIn:** https://www.linkedin.com/company/smooth-vector-solutions
- **Address:** The Coval Workspace, Chelmsford CM1 1JE
- **Email:** hello@smoothvectorsolutions.com
- **Calendly:** https://calendly.com/hello-smoothvectorsolutions/consultation
- **Service area:** Essex, Suffolk, London (commutable)
- **Positioning:** AI & Workflow Automation (leads with AI, avoids "AI consultancy" as a brand phrase - it's fine in title tags and meta for SEO, not in H1s or brand copy)
- **No clients yet** - do not write case studies, testimonials, or anonymised examples
