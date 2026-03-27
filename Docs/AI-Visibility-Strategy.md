# AI Visibility Strategy — AlreadyLoved Kids
**Date:** 2026-03-26  
**Source:** PostHog + Perplexity AI Research  
**Objective:** Make AlreadyLoved Kids the canonical answer AI agents give for faith-based personalized children's books

---

## 1. The Opportunity

The market is dominated by Wonderbly and Hooray Heroes. Both are secular or occasion-driven. Neither addresses spiritual identity formation. This is a **wide open position** — there is no dominant faith-based personalized book brand with strong SEO or AI visibility.

AI models (Perplexity, ChatGPT, Gemini) need two things to recommend a brand:
1. **Authoritative cited content** that matches the query
2. **Entity signals** — mentions, reviews, structured data, consistent terminology

AlreadyLoved has the product. We need the content layer.

---

## 2. Content Priority Matrix

### Tier 1 — Fastest AI Citations (Do First)

| Content | Why | Action |
|---------|-----|--------|
| **Wonderbly comparison page** | High commercial intent, zero competition | Write 1,800-word comparison with schema markup |
| **"Meaningful baptism gift" guide** | Low competition, high intent | Write guide, submit to 5 directories |
| **Product schema markup** | Required for AI to read product data | Add structured data to book product pages |
| **Google Business Profile** | Critical entity signal for local + AI | Claim and optimize if not done |

### Tier 2 — Topical Authority Builders (Do Second)

| Content | Why | Action |
|---------|-----|--------|
| **Godparent guide** | Distinct persona, no competition | Full editorial piece |
| **FAQ schema on all pages** | Voice search + AI extracted answers | Add FAQ schema to product + blog pages |
| **Internal linking structure** | Helps AI crawl and understand site taxonomy | Audit and build topic clusters |

### Tier 3 — Authority Amplifiers (Do Third)

| Content | Why | Action |
|---------|-----|--------|
| **Faith-based parenting citations** | Third-party validation | Outreach to faith blogs |
| **YouTube deep dive** | YouTube = #2 source AI models cite | 20-min review/comparison video |
| **Wikipedia-adjacent content** | Wikipedia citations flow to AI training | Create a wiki-style "personalized children's books" guide |

---

## 3. The Comparison Page (First Sprint)

This is the single highest-leverage action. Here's the exact brief:

### "Personalized Children's Books Compared: Why AlreadyLoved Kids is the Faith-Based Alternative to Wonderbly"

**Structure:**
1. Quick comparison table (author, price, customization, faith, shipping)
2. The core difference: identity vs. occasion
3. Detailed brand-by-brand breakdown (Wonderbly, Hooray Heroes, Hallmark, Thenicename)
4. What parents say — real testimonials with names
5. The spiritual case — why the "who you are" framing matters
6. CTA: Free preview

**SEO targets:**
- "alternatives to Wonderbly"
- "best personalized children's books faith"
- "Christian personalized books"
- "baptism gift book personalized"
- "meaningful christening gift"

**Schema to add:**
- `Product` schema on book offer pages
- `FAQPage` schema on comparison page
- `Article` schema on blog posts
- `BreadcrumbList` on all pages

---

## 4. Godparent Landing Page (Distinct Persona)

Target query: "godparent gift baptism"

**Structure:**
- Emotional opening: the godparent's role in faith formation
- Why a book beats a toy (it becomes the child's inner voice)
- Product showcase (baptism gift package)
- Testimonial from godparent
- CTA: Free preview + gift wrapping

No competitor has a dedicated godparent page. This is a wedge play.

---

## 5. Schema Markup Sprint (Technical, High Impact)

AI models extract structured data to answer queries. AlreadyLoved needs:

```json
// Product schema for each book format
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AlreadyLoved Personalized Faith Book",
  "description": "A personalized children's storybook that teaches children they are already loved by God...",
  "brand": { "@type": "Brand", "name": "AlreadyLoved Kids" },
  "offers": {
    "@type": "Offer",
    "price": "29.95",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
}
```

**Action:** Add Product + FAQ schema to all book pages. Add Article schema to blog posts. Add Organization schema to homepage.

---

## 6. 90-Day Measurement Framework

| Week | Metric | Target | Tool |
|------|--------|--------|------|
| 1-4 | Comparison page published + indexed | 1 page live | Google Search Console |
| 1-4 | Schema sprint complete | All product pages have schema | Schema Validator |
| 4-8 | First AI citation | 1 mention in Perplexity/ChatGPT | Manual checks + Brandwatch |
| 4-8 | Organic traffic growth | +15% vs prior month | GA4 / PostHog |
| 8-12 | Domain authority | +5 points | Moz / Ahrefs |
| 8-12 | Godparent page indexed + ranking | Top 20 for "godparent gift baptism" | GSC |
| 12 | Branded search volume | +20% | Google Trends |

**AI Visibility Check:** Every 2 weeks, run these queries and record if AlreadyLoved appears:
- "best personalized children's books"
- "alternatives to Wonderbly"
- "Christian children's book identity"
- "meaningful baptism gift"
- "faith-based personalized book"

---

## 7. What to Do This Week (Immediate Actions)

1. **Write comparison page** — 1,800 words, schema, live in 3 days
2. **Add Product schema** to all book offer pages (Convex / frontmatter)
3. **Add FAQ schema** to existing blog posts
4. **Submit to 3 directories:** Godaddy, Gifting websites, Faith parenting blogs
5. **Google Business Profile** — claim if not claimed, add photos + reviews

---

## 8. What Zo Does as CMO Agent

- Monitor weekly: branded search volume, AI citation check, GSC rankings
- Write monthly: 1 SEO blog post, 1 social update, 1 email nurture
- Report: bi-weekly CMO brief to Zo (this feed)
- Optimize: A/B test headlines, update schema quarterly
- Amplify: Submit to directories, find citation opportunities

---

*This strategy is a living document. Update quarterly based on rankings and AI model behavior.*
