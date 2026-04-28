# Insights - How to add a post

## File naming

`/insights/kebab-case-slug.html`

Keep slugs short, keyword-led, and lowercase. No dates in the slug.

## Checklist for every new post

### Head
- [ ] `<title>` ≤60 chars, keyword first
- [ ] Meta description ≤155 chars, direct answer to the post's core question
- [ ] Canonical: `https://www.smoothvectorsolutions.com/insights/slug.html`
- [ ] `og:type` = `article`
- [ ] `og:article:published_time` set to publish date

### Schema (two blocks required)
- [ ] `BreadcrumbList` - three items: Home → Insights → Post title
- [ ] `Article` - include `headline`, `description`, `datePublished`, `dateModified`, `url`, `author` (org, not person), `publisher`

### Content structure
- H1: the core question or comparison, with `<em>` on the key phrase
- Lede paragraph (class `insight-lede`): direct answer upfront - one paragraph that answers the post's question before any explanation
- H2s phrased as questions where possible - this is what AI Overviews extract
- First sentence of each H2 section answers the question directly
- At least one internal link back to `https://www.smoothvectorsolutions.com/` in body copy
- No anonymised case studies, no fake testimonials

### After creating the post
1. Add a card to `insights/index.html` (copy the existing card pattern)
2. Add the URL to `/sitemap.xml` with today's date, `changefreq: monthly`, `priority: 0.7`
3. Update the `lastmod` on `insights/index.html`'s sitemap entry to today

## Post template (minimal)

```html
<!-- HEADER -->
<section class="faq-header">
  <div class="section-label">Insights</div>
  <h1 class="faq-h1">Your title with <em>key phrase.</em></h1>
  <div class="insight-meta">
    <span>DD Month YYYY</span>
    <span>&middot;</span>
    <span>Smooth Vector Solutions</span>
    <span>&middot;</span>
    <span>~X min read</span>
  </div>
  <nav class="faq-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="/insights/">Insights</a></li>
      <li aria-current="page">Post title</li>
    </ol>
  </nav>
</section>

<article class="insight-body">
  <p class="insight-lede">Direct answer here.</p>
  <h2>First question as H2?</h2>
  <p>Direct answer in first sentence. Then expand.</p>
</article>
```

The `insight-body`, `insight-lede`, `insight-meta`, and `tool-verdict` styles are defined inline in each post's `<style>` block - copy them from the existing post rather than adding to `main.css`.

## Adding a card to the index

Copy this pattern into `insights/index.html`:

```html
<a href="/insights/your-slug.html" class="insight-card reveal">
  <div class="insight-card-meta">
    <span>DD Month YYYY</span>
    <span>&middot;</span>
    <span>~X min read</span>
  </div>
  <div class="insight-card-title">Your post title</div>
  <p class="insight-card-desc">One or two sentence description of what the post covers.</p>
  <span class="insight-card-cta">Read &rarr;</span>
</a>
```

Add new posts at the top of the grid (newest first).
