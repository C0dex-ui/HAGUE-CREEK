# SEO SYSTEM — The OrangeSky Website Build Standard

> \*\*What this file is:\*\* The SEO rules for \*\*every OrangeSky project — mockups AND launched production sites, on any stack (portable PHP/HTML or WordPress).\*\* SEO is not a later phase; it is structured into the markup from the first line. \*\*The bar is objective: every site must score A+ across a full website audit\*\* (On-Page SEO, GEO, Links, Usability, Performance, Social, Local SEO, Security). Use alongside `web-design-system.md`, `design-system.md`, and `mockup-rules.md`.

\---

## ROLE

You are a **local SEO + GEO specialist for small service businesses** (contractors, home services, real estate, auto, trades, pet care). You optimize for four audiences at once: **Google's local pack + organic**, **AI answer engines** (AI Overviews, ChatGPT, Perplexity, Claude), **automated audit graders**, and **the human who needs to call this business today.**

\---

## PRIME DIRECTIVE

Ship a site that (1) wins the local pack and map, (2) gets cited in AI answers, (3) **passes an A+ website audit with zero unresolved recommendations**, and (4) converts the click into a call or quote. On-page SEO and the Google Business Profile reinforce each other — the site must echo and extend the GBP.

\---

## ⚠️ MOCKUP vs PRODUCTION — read this before applying the rules

|Rule|Mockup (1 page)|Production build|
|-|-|-|
|Service pages, city pages|**Not built.** Interior links lock to the popup (`mockup-rules.md`).|**Required** — one page each.|
|Content length|Home page target only (1,200–2,000 words)|All page-type targets apply|
|Blog|1–2 teaser cards, locked|2 articles/month|
|Schema|Organization, LocalBusiness, WebSite, WebPage, FAQPage, Person, Review|Add `Service` + `BreadcrumbList` per page|
|Internal linking|On-page anchors only|Full linking matrix|

Everything else in this file applies to both.

\---

# PART 1 — THE BUILD STANDARD

## 1\. One keyword per page

No page targets more than one primary keyword. One page = one keyword = one intent. Never cannibalize.

```
Home         → Pet Care Chandler
Dog Walking  → Dog Walking Chandler
Cat Sitting  → Cat Sitting Chandler
About        → Pet Care Company Chandler
```

## 2\. Keyword placement — all eight, every page

The primary keyword must appear in:

☐ Title tag ☐ Meta description ☐ H1 ☐ **First 100 words** ☐ At least one H2 ☐ An image `alt` ☐ URL slug ☐ The closing/conclusion paragraph

Natural density. No stuffing. Use synonyms and location modifiers.

## 3\. Heading hierarchy

Exactly **one H1**. H2s carry natural variations. **Never skip a level** (H2 → H4 is a defect).

```
H1  Dog Walking in Chandler
H2  Professional Dog Walking Services
H2  Why Choose Our Chandler Dog Walkers
H2  Frequently Asked Questions
```

Eyebrow labels are styled `<span>`/`<p>`, **never headings** — they must not steal the hierarchy.

## 4\. The first paragraph

The opening paragraph answers **Who, What, Where, Why** within **75 words**. Google — and an LLM — should know exactly what the page is about before the second paragraph.

## 5\. Local signals

Reference, where truthful and natural: **city, county, state, neighborhoods, landmarks, cross streets.** Never fabricate a location the business doesn't serve.

## 6\. Every service gets its own page *(production)*

Never bury services on the home page. Each service page: **900–1,500 words**, optimized independently, one keyword.

## 7\. Every city gets its own page *(production)*

One page per city, one keyword per page, **900–1,300 words**. **Zero duplicate content** — each page needs genuinely local specifics, not a find-and-replace of the city name.

## 8\. Internal linking

Every page links to: **Home · Contact · About · 3–5 Services · 2–3 related pages · a blog article · a city page.**

Descriptive anchor text always. ❌ "Click Here" ✅ "Dog Walking Services in Chandler"

## 9\. Images

Every image: **WebP/AVIF** (with fallback) · compressed · **unique descriptive filename** · **keyword-relevant `alt`** · `loading="lazy"` below the fold · explicit `width`/`height`. Decorative images get `alt=""`. **Zero images missing alt.**

## 10\. Schema — see Part 2. Every site emits the full graph.

## 11\. URLs

Short, lowercase, hyphenated, keyword-based, extensionless.

✅ `/services/dog-walking` ❌ `/services/our-amazing-professional-dog-walking-program`

## 12\. Titles

**55–60 characters.** Keyword first, brand last. Never exceed 60 (the audit fails outside 50–60).

`Dog Walking Chandler | Andria's Pet Care`

## 13\. Meta descriptions

**145–160 characters.** Include keyword + benefit + CTA. (Audit range is 120–160; target the top of it.)

## 14\. Content length

|Page|Words|
|-|-|
|Home|1,200–2,000|
|Service|900–1,500|
|City|900–1,300|
|About|700–1,200|

More is fine when it earns its place. Thin pages fail.

## 15\. E-E-A-T

Every business shows: **real owner · real photos · story · years in business · credentials · experience · awards · mission.** This is the strongest single differentiator for both Google and AI citation.

## 16\. Trust signals — throughout the page, not one strip

Insurance · Bonded · Licensed (+ license #) · BBB · Google reviews · Awards · Years in business · Memberships · Guarantees.

## 17\. Conversion

* A **CTA every 2–3 sections**.
* **Sticky call/quote button on mobile.**
* **Phone number visible** in the header on every page.
* **Contact form above the fold** where the intent warrants it.

## 18\. Blog strategy *(production)*

Minimum **2 articles/month**. Each targets **one keyword, one intent, one problem.**

## 19\. FAQ

**10–20 real customer questions** — the ones people actually ask on the phone. Not marketing questions. Answer-first (2–3 sentences), then elaborate. Mark up with `FAQPage`.

## 20\. Page speed — Core Web Vitals

* **LCP < 2.5 s**
* **INP < 200 ms**
* **CLS < 0.1**
* Mobile PageSpeed **≥ 90**

Preload the LCP hero asset; set media dimensions; defer non-critical JS.

## 21\. Technical

Canonical (self-referencing) · XML sitemap · `robots.txt` · Open Graph · X/Twitter Cards · favicon · custom 404 · 301s for any moved URL · SSL with HTTP→HTTPS redirect.

## 22\. Accessibility

Contrast (WCAG AA) · keyboard navigation · alt text · form labels · heading hierarchy · readable font sizes. See the ADA section in `design-system.md`.

## 23\. Footer — on every page

**NAP · service areas · main services · copyright · Privacy Policy · Terms · internal links · social icons** (Facebook, Instagram, LinkedIn, X) · the OrangeSky signature.

## 24\. No AI fluff

Every paragraph must add value. **Banned openers and filler:**

> "Nowadays…" · "In today's world…" · "At the end of the day…" · "We pride ourselves…" · "Whether you need…" · "When it comes to…" · "Look no further" · "In conclusion"

If a sentence would survive being deleted, delete it.

## 25\. Writing rules

Short paragraphs (**3–5 sentences**). No walls of text. Bullets only when they beat prose. Simple English. **Active voice.** Second person.

## 26\. Entity optimization

Reinforce the **entities** Google associates with the business, not just the keyword string. A pet-care site shouldn't repeat "pet care" — it should naturally reference *dog walking, cat sitting, pet medication, in-home visits, puppy care, senior pets, boarding alternatives*, plus the named service area. This is what builds topical relevance and is what AI answer engines actually match on.

## 27\. Originality signals

Every page should carry content a competitor **cannot copy**:

* **Original photography** — the client's own, of their real work, team, and premises *(best, when provided)*
* Owner/team insights and opinions
* Local experience and specifics
* Customer stories and case examples
* Unique processes, named and explained
* Business-specific FAQs
* Custom graphics or diagrams

> \*\*Imagery policy — use what's available, never ship a bare page.\*\* Original photos are the strongest signal \*when the client provides them\*. \*\*When they don't, license-safe stock or AI-generated imagery is completely acceptable\*\* and is always better than no imagery. Never block a build waiting on photos, and never re-ask for photos already provided.
>
> Originality then comes from the \*\*other six items\*\* on the list — the owner's insights, local specifics, real customer stories, named processes, real FAQs. Those are what a competitor can't copy, and they carry the E-E-A-T weight regardless of who shot the photos.
>
> \*\*The one hard limit:\*\* never present a stock or AI-generated person as the real owner, team, or a real customer. Everything else is fair game. Note stock/AI images in the handoff so the client can swap in their own later.

\---

# PART 2 — STRUCTURED DATA (the local schema graph)

**Every site emits a single connected JSON-LD `@graph`.** Nodes reference each other by `@id`, which is what lets Google resolve the business as one entity rather than several loose objects. Never mark up anything not visible on the page.

**Required nodes:** `Organization` · `LocalBusiness` (correct subtype) · `WebSite` · `WebPage` · `Service` (per service) · `BreadcrumbList` (inner pages) · `FAQPage` · `Review` + `aggregateRating` (**real only**) · `Person` (owner, where applicable)

### The local graph skeleton

```json
{
  "@context": "https://schema.org",
  "@graph": \[
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Andria's Pet Care LLC",
      "url": "https://example.com/",
      "logo": { "@type": "ImageObject", "@id": "https://example.com/#logo",
                "url": "https://example.com/assets/logo/logo.png", "width": 512, "height": 512 },
      "sameAs": \[
        "https://facebook.com/…", "https://instagram.com/…",
        "https://linkedin.com/…", "https://x.com/…"
      ]
    },
    {
      "@type": \["LocalBusiness", "ProfessionalService"],
      "@id": "https://example.com/#localbusiness",
      "name": "Andria's Pet Care LLC",
      "parentOrganization": { "@id": "https://example.com/#organization" },
      "url": "https://example.com/",
      "telephone": "+1-586-435-4690",
      "priceRange": "$$",
      "image": { "@id": "https://example.com/#logo" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "…",
        "addressLocality": "Phoenix",
        "addressRegion": "AZ",
        "postalCode": "85048",
        "addressCountry": "US"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 33.30, "longitude": -111.98 },
      "areaServed": \[
        { "@type": "City", "name": "Ahwatukee" },
        { "@type": "City", "name": "Chandler" },
        { "@type": "AdministrativeArea", "name": "Maricopa County" }
      ],
      "openingHoursSpecification": \[
        { "@type": "OpeningHoursSpecification",
          "dayOfWeek": \["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
          "opens": "07:00", "closes": "21:00" }
      ],
      "hasMap": "https://www.google.com/maps/place/?q=place\_id:…",
      "founder": { "@id": "https://example.com/#owner" },
      "employee": { "@id": "https://example.com/#owner" },
      "sameAs": \["https://www.google.com/maps/place/…"],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0", "reviewCount": "5",
        "bestRating": "5", "worstRating": "1"
      },
      "review": \[
        { "@type": "Review",
          "author": { "@type": "Person", "name": "Jacob Malburg" },
          "datePublished": "2026-05-12",
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "…verbatim…" }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://example.com/#owner",
      "name": "Andria …",
      "jobTitle": "Owner",
      "worksFor": { "@id": "https://example.com/#organization" },
      "knowsAbout": \["Dog walking", "Cat sitting", "Senior pet care"],
      "hasCredential": "Fear Free Certified"
    },
    {
      "@type": "Service",
      "@id": "https://example.com/services/dog-walking#service",
      "serviceType": "Dog Walking",
      "name": "Dog Walking in Chandler",
      "provider": { "@id": "https://example.com/#localbusiness" },
      "areaServed": { "@type": "City", "name": "Chandler" },
      "url": "https://example.com/services/dog-walking"
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com/",
      "name": "Andria's Pet Care",
      "publisher": { "@id": "https://example.com/#organization" },
      "inLanguage": "en-US"
    },
    {
      "@type": "WebPage",
      "@id": "https://example.com/services/dog-walking#webpage",
      "url": "https://example.com/services/dog-walking",
      "name": "Dog Walking Chandler | Andria's Pet Care",
      "isPartOf": { "@id": "https://example.com/#website" },
      "about": { "@id": "https://example.com/#localbusiness" },
      "primaryImageOfPage": { "@id": "https://example.com/#hero" },
      "inLanguage": "en-US"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://example.com/services/dog-walking#breadcrumb",
      "itemListElement": \[
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://example.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Dog Walking" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://example.com/#faq",
      "mainEntity": \[
        { "@type": "Question", "name": "Do you offer overnight care?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. …" } }
      ]
    }
  ]
}
```

### Local schema rules

1. **Pick the most specific `LocalBusiness` subtype** that exists (`HomeAndConstructionBusiness`, `AutoRepair`, `RealEstateAgent`, `Plumber`, `Electrician`, `VeterinaryCare`, `ProfessionalService`…). Generic `LocalBusiness` is the fallback, not the default. Use an array when two apply.
2. **NAP in schema must byte-match the GBP and the visible page.** Phone in E.164 (`+1-586-435-4690`).
3. **`areaServed`** lists real cities/counties — mirrors the service-areas section and the GBP.
4. **`geo`** carries real coordinates; **`hasMap`** points at the GBP place URL; put the GBP URL in `sameAs`.
5. **`@id` everything and cross-reference.** `LocalBusiness.parentOrganization` → `Organization`; `Service.provider` → `LocalBusiness`; `WebPage.about` → `LocalBusiness`; `Person.worksFor` → `Organization`. This is what makes it a *graph* rather than disconnected blobs.
6. **`aggregateRating` and `review` must be real and verbatim**, matching the visible reviews block. **If there are no real reviews, emit neither.** Fake rating markup violates Google's structured-data policy and risks a manual action.
7. **`Person`** for the owner on any owner-led business — it carries E-E-A-T and is an entity Google can resolve.
8. **`Service`** node per service page, with `areaServed` — this is what surfaces in service+city queries.
9. **`BreadcrumbList`** on every page below the root.
10. Validate every page in Google's Rich Results Test **and** Schema.org validator before delivery. Zero errors, zero warnings you can't justify.

\---

# PART 3 — AI / ANSWER-ENGINE OPTIMIZATION (AEO / GEO)

AI Overviews and chat assistants intercept a large share of search intent and cite sources that overlap less and less with the top blue links.

* **Answer-first structure** — every section and FAQ leads with a direct, self-contained answer in 2–3 short sentences, then elaborates.
* **Entity coverage** (see §26) — AI matches concepts, not keyword strings.
* **Originality** (see §27) — first-hand experience is what gets cited.
* **Scannable formatting** — short paragraphs and lists an LLM can lift verbatim.
* **Server-rendered content** — NAP, services, hours and all key copy in crawlable HTML, never JS-only. **The single biggest GEO win.**
* **`HowTo` schema** where a process is explained.

### llms.txt (mandatory — the agent auto-generates it)

Every site ships `/llms.txt`. **Not a manual step.** The agent generates it from Step 0 + GBP data and the site's real page structure. No `\[PLACEHOLDERS]` may remain.

1. Source business name, summary, primary keyword, NAP, hours, service areas, rating from the GBP intake; the page list from the site just built.
2. Follow `llms-template.txt`; strip its builder-notes block.
3. Real absolute URLs, real descriptions. **Never list a page that wasn't built.**
4. Write to the site root, serve as `text/plain`, reference it in `robots.txt` beside the sitemap.
5. Regenerate whenever pages or services change. Optionally emit `/llms-full.txt`.

\---

# PART 4 — THE A+ AUDIT SCORECARD

### On-Page SEO

* Title **55–60** chars, keyword first, brand last. Meta **145–160** chars.
* One H1 with keyword + location; no skipped heading levels.
* Keyword in all **eight** placements (§2). First paragraph answers who/what/where/why in 75 words.
* Content volume per page type (§14). Zero images missing `alt`. Canonical present. No `noindex`.
* `lang` set (+`hreflang` if multilingual). HTTPS + redirect. `robots.txt`, XML sitemap. Analytics installed. JSON-LD present.

### GEO

* Content server-rendered, readable with JS disabled. `Organization` + `LocalBusiness` + `Person` identity schema.
* `llms.txt` auto-generated at root, zero placeholders, referenced in `robots.txt`.

### Links

* Short, lowercase, hyphenated, extensionless URLs.
* Full internal-linking matrix (§8) with descriptive anchors.
* **Zero broken links.** Every internal link 200; every `#anchor` has a matching `id`.

### Usability

* Mobile viewport; responsive; legible fonts; tap targets ≥44px; mobile PageSpeed ≥90.
* **LCP <2.5s · INP <200ms · CLS <0.1**.
* No iFrames. No plain-text email addresses.
* Inline links ≥4.5:1 contrast on their actual background, underlined in body copy.

### Performance

* No inline styles; minified CSS/JS; Gzip/Brotli; HTTP/2; optimized images; favicon; zero JS errors.
* Versioned asset URLs (`?v=<filemtime>`) so caches never serve stale CSS/JS.

### Social

* Facebook, Instagram, LinkedIn, X linked in the footer **and** in `sameAs` (+ YouTube where it exists).
* Open Graph + X Cards on every page. FB Pixel only with client consent.

### Local SEO

* NAP matches the GBP exactly, in header, footer, contact, and schema.
* Full `LocalBusiness` graph (Part 2) with `areaServed`, `geo`, `openingHoursSpecification`, `hasMap`.
* GBP linked and complete; primary category mirrored in H1/title.
* **Real** `aggregateRating` + `review`, or none at all.

### Content quality

* No banned fluff phrases (§24). Paragraphs 3–5 sentences, active voice.
* Entity coverage (§26). Originality signals present (§27). FAQ has 10–20 real questions.
* E-E-A-T block: owner, photos, story, years, credentials.

### Security

* SSL enforced; valid **DMARC** and **SPF** (launched sites).

\---

## STEP 0 DEPENDENCY — pull from the GBP first

Extract and reuse verbatim: **NAP** (byte-exact), **primary category** (mirror in H1 + title), **services + descriptions**, **service areas**, **hours**, **reviews + rating**, **social profile URLs**, **geo coordinates + place ID**.

If NAP, category, coordinates, or a social URL is missing, **flag it and ask** — never invent an address, phone, coordinate, or profile link.

\---

## BILINGUAL SEO (when applicable)

`lang` on `<html>` and mixed-language blocks; parallel translated URLs (`/es/…`, `/en/…`) with `hreflang` alternates (incl. `x-default`); translate title/meta/alt/schema and **localize keywords** ("agente de bienes raíces" ≠ word-for-word); align GBP language with the site's primary language.

\---

## LOCAL SEO \& GBP GROWTH (post-launch engine)

Nail the **primary category** and complete every GBP field. **Steady review flow** — a trickle over 90 days beats a burst then silence. **\~2 GBP posts/week.** Keep the services catalog full (feeds Maps AI answers). **Build citations** with byte-consistent NAP. **Track AI-surface share** alongside pack rankings.

\---

## MEASUREMENT (launched sites)

Google Search Console + GA4/GTM at launch; verify the property; submit the sitemap. Track local-pack position, organic clicks, quote submissions and calls, and AI-surface share. Mockups leave the tags ready to drop in.

\---

## CONSISTENCY WITH THE DESIGN SYSTEM

* Eyebrow labels are non-heading elements; real `<h1>`/`<h2>` carry the keywords.
* The reviews block's visible rating = the `aggregateRating` value. Real, or omitted.
* The FAQ accordion content = the `FAQPage` schema.
* Footer social icons = the `sameAs` array = the Social audit checks.
* Semantic landmarks serve SEO **and** ADA at once.
* Server-rendered HTML serves GEO **and** WordPress-convertibility.
* Original photography serves §27 **and** the imagery rule in `design-system.md`.

\---

## CLARIFYING QUESTIONS

Before optimizing, ask what you can't source. Prioritize: (1) the **GBP link**, exact NAP, and **geo coordinates / place ID**; (2) the **primary service + target city/areas** and the top 3–5 keywords customers actually search; (3) all **social profile URLs**; (4) available **E-E-A-T proof** (license #, years, awards, credentials, real reviews, original photos) and whether the site is **bilingual**; (5) the main **conversion goal** (calls vs. quote form) and any analytics/pixel to wire up. Ask only what's essential (1–5 questions). If told "just build it," proceed with GBP-derived data, ship the full A+ structure, and flag every assumption in one line. **Never invent NAP, coordinates, or reviews.**

