# COBRR — Image Generation Brief

A practical brief for every raster image slot on the COBRR TECH LABS website.
Each slot lists where the file goes, the size to render, what the site draws
on top of the image, and prompts you can paste straight into an image model.

Everything on the site is built so a missing image is not a broken page: every
slot has a procedural placeholder (ink surface + engineering grid + accent
wash). Images are an upgrade, not a dependency — so generate, review, and drop
them in one at a time.

---

## 1. House style (read once)

**Look.** Premium corporate engineering. Think architectural renderings and
technical drawings, not stock photography or "AI startup" art.

- **Palette.** Ink navy `#0a0e1a` as the ground; one cobalt accent `#2450e6`;
  warm sand `#f5f4f0` / `#ecebe4` as the light counterpoint. Secondary accents,
  used one at a time per image: teal `#0ea5a4`, violet `#7c5cff`, copper
  `#c1863c`, rose `#e0567a`. Mostly desaturated midtones; the accent is a
  highlight, not a flood.
- **Subject matter.** Isometric or line-art engineering scenes: server rooms,
  node graphs, layered platform diagrams, blueprint grids, cross-sections of
  systems, calm office and workshop interiors, hands on keyboards and
  whiteboards. Subtle depth (a shallow depth of field or a soft atmospheric
  haze), never a dramatic lens flare.
- **Light.** Soft, directional, one source. Gentle radial washes of the accent
  colour on the ink ground. Thin 1–1.5 px line details are welcome.
- **Never.** Neon glow, particles, bokeh confetti, lens flare, glassmorphism,
  HUD overlays, holograms, floating UI cards, chrome/3D-text, rainbow
  gradients, stock-photo smiles, faces in generated imagery, any readable text,
  any logo, watermark or signature.
- **Composition.** Most slots put a dark gradient "shade" over the lower part
  of the image and white text on top. Keep the important detail in the **upper
  half** (usually upper right); keep the **lower-left quadrant** quiet and
  low-contrast so the type reads.

**Base prompt** (prepend to every prompt below):

> Premium corporate engineering illustration for a software company website.
> Deep navy ink background (#0a0e1a), a single cobalt blue accent (#2450e6)
> used as a soft radial light and thin highlight lines, warm sand neutrals
> (#f5f4f0) for secondary surfaces. Isometric / technical-drawing aesthetic,
> thin 1px line-art details, subtle depth, calm and quiet, matte finish,
> high detail, no text, no logos, no people's faces.

**Base negative prompt** (append to every negative below):

> neon, glow, glowing edges, particles, sparkles, bokeh, lens flare,
> glassmorphism, hologram, HUD, floating UI, 3D text, chrome, rainbow,
> oversaturated, purple-pink gradient, stock photo, smiling people, faces,
> text, letters, watermark, signature, logo, blurry, low detail, noisy,
> jpeg artifacts, cropped subject, frame, border.

**Light and dark themes.** The site has both. Images sit on two kinds of
surface:

- **Ink surfaces** (hero, `ShadedImage` tiles, product headers, OG image) are
  dark in *both* themes. One image serves both — keep it dark-grounded.
- **Paper/sand surfaces** (case-study and blog cards) flip between white and
  navy. If you add card-header images there, render them on an ink ground
  inside a rounded header (see §5, §6) so a single file works in both themes.
  Avoid pure-white edges, which would look cut-out in dark mode.

---

## 2. Hero slides (5)

Component: `src/components/sections/Hero.tsx` — each slide has an optional
`image` field. The image renders full-bleed at **40 % opacity** under a
geometric arc motif and a `from-ink via-ink/70 to-ink/30` bottom-to-top shade.
Headline, subtitle and CTAs sit in the **left ~55 %**, vertically centred.

| Slot | Path | Size | Accent |
| --- | --- | --- | --- |
| Slide 1 — GenAI Engineering | `/public/images/hero/genai.jpg` | 2400 × 1400 (12:7) | cobalt `#2450e6` |
| Slide 2 — Web Engineering | `/public/images/hero/web.jpg` | 2400 × 1400 | teal `#0ea5a4` |
| Slide 3 — SaaS & ERP | `/public/images/hero/saas-erp.jpg` | 2400 × 1400 | violet `#7c5cff` |
| Slide 4 — Digital Marketing | `/public/images/hero/digital-marketing.jpg` | 2400 × 1400 | copper `#c1863c` |
| Slide 5 — Software Services | `/public/images/hero/software-services.jpg` | 2400 × 1400 | rose `#e0567a` |

**On top:** 40 % opacity + full-height ink shade + concentric arc motif on the
right. **Keep detail centre-right**, mid-height. The left third can be almost
featureless. Images are viewed at 100 svh on every viewport, so the subject must
survive both a 21:9 desktop crop and a 9:16 phone crop — centre it.

**Slide 1 — GenAI Engineering**

> Base prompt. Isometric cross-section of a production AI system: a retrieval
> pipeline shown as a stack of thin translucent navy layers, a vector index
> drawn as a lattice of small nodes, an orchestration graph of connected boxes
> with thin cobalt edges, a calm data stream flowing through. Cobalt radial
> light from the upper right. Subject in the centre-right, lower-left corner
> empty and dark.
>
> Negative: base negative + robot, android, brain, glowing brain, neural
> network cliché, chatbot bubble, sci-fi.

**Slide 2 — Web Engineering**

> Base prompt. Isometric architectural model of a web platform: layered
> wireframe panels of a customer portal floating in a shallow stack, a thin
> teal (#0ea5a4) accent instead of cobalt, blueprint grid on the ground plane,
> a few thin measurement lines. Soft teal radial light upper right. Subject
> centre-right, lower-left corner empty.
>
> Negative: base negative + browser chrome, cursor, actual website
> screenshots, readable UI, devices with screens showing content.

**Slide 3 — SaaS & ERP**

> Base prompt. Isometric diagram of a multi-tenant platform: one central
> engine block connected to a ring of identical modular units (finance,
> inventory, HR) drawn as clean line-art boxes, thin violet (#7c5cff)
> connectors, an orderly grid floor. Soft violet radial light upper right.
> Subject centre-right, lower-left corner empty.
>
> Negative: base negative + org chart, spreadsheet, dashboard screenshot,
> pie chart, icons.

**Slide 4 — Digital Marketing**

> Base prompt. Isometric line-art scene of a growth funnel rendered as a
> stack of thin architectural rings narrowing downward, with a calm rising
> bar-and-line chart drawn in warm copper (#c1863c) accents, sand-coloured
> surfaces, a technical grid. Soft copper radial light upper right. Subject
> centre-right, lower-left corner empty.
>
> Negative: base negative + megaphone, social media icons, like/heart
> symbols, rocket, coins, dollar signs.

**Slide 5 — Software Services**

> Base prompt. Isometric engineering workshop scene: an open system
> blueprint on a drafting table, a calm rack of servers behind it,
> calipers and a small set of technical tools, thin rose (#e0567a) accent
> lines marking test points on the blueprint. Soft rose radial light upper
> right. Subject centre-right, lower-left corner empty.
>
> Negative: base negative + wrench icon, gears cliché, hard-hat, factory
> smoke, sci-fi.

**Theme notes.** Hero is always ink; one file per slide.

---

## 3. "Who we are" bento tiles (4)

Component: `src/components/sections/WhoWeAre.tsx` — fill the `IMAGES` map at
the top of the file. Rendered through `ShadedImage`: a bottom-to-top shade
(`from-ink/92 via-ink/45 to-ink/10`) and eyebrow + title + description in the
**bottom-left**. **Keep detail in the upper right; the lower 40 % is under
heavy shade.** These may be real photography of the actual team/office if
available — in which case faces are fine.

| Slot | Path | Size | Aspect on site | Accent |
| --- | --- | --- | --- | --- |
| Our team (large) | `/public/images/about/team.jpg` | 1600 × 1200 | ~1:1 desktop, ~2:1 tablet, ~16:10 phone | cobalt |
| Our studio | `/public/images/about/studio.jpg` | 1200 × 1200 | 1:1 | teal |
| Craft | `/public/images/about/craft.jpg` | 1200 × 1200 | 1:1 | violet |
| Partnership | `/public/images/about/partnership.jpg` | 1600 × 800 | 2:1 desktop, 16:9 tablet | copper |

**Our team**

> Base prompt. Quiet, high-end engineering office late afternoon: a long
> shared desk seen from a low three-quarter angle, two monitors showing
> abstract code blocks (unreadable), a whiteboard with a faint system
> diagram, warm sand walls, navy furniture, one cobalt desk lamp as the
> accent light. Photoreal rendering, shallow depth of field, no people or
> people seen from behind only. Subject upper right, foreground lower left
> soft and dark.
>
> Negative: base negative + faces, crowd, open-plan chaos, plants
> everywhere, ping-pong table, neon signage.

**Our studio**

> Base prompt. Product studio corner: a wall of printed wireframes and
> architecture diagrams pinned in a neat grid, a small navy desk with a
> closed laptop and a notebook, a soft teal (#0ea5a4) accent light from a
> window blind. Square composition, subject in the upper two thirds, base
> of the frame dark and quiet.
>
> Negative: base negative + faces, sticky-note rainbow, messy, logo wall.

**Craft**

> Base prompt. Close-up of engineering craft: hands (no face) drawing a
> clean system diagram with a fine pen on sand-coloured paper, a mechanical
> keyboard and a navy mug at the edge of frame, thin violet (#7c5cff)
> accent light. Square composition, subject upper right, lower-left corner
> in shadow.
>
> Negative: base negative + faces, wristwatch close-up, jewellery, tattoos,
> readable handwriting.

**Partnership**

> Base prompt. Two chairs at a long navy meeting table with a printed
> roadmap and an open notebook between them, morning light, warm copper
> (#c1863c) accent from a wooden wall panel, sand-coloured surfaces.
> Wide 2:1 composition, subject in the centre band and upper right,
> lower-left corner dark and empty.
>
> Negative: base negative + faces, handshake cliché, suits, stock photo,
> boardroom crowd.

**Theme notes.** `ShadedImage` is always ink; one file per tile.

---

## 4. About page — mission card (1)

Component: `src/app/about/page.tsx` — the "Our mission" card is currently a
plain `card bg-ink` block. Recommended: swap it for `ShadedImage` (align
`center`, accent `cobalt`) or place the image absolutely under the card's
content at low opacity. Either way the text is centred/left and the shade is a
flat `ink/55`, so detail can live anywhere but should be **low contrast**
throughout.

| Slot | Path | Size |
| --- | --- | --- |
| Mission backdrop | `/public/images/about/mission.jpg` | 1400 × 1000 (7:5) |

> Base prompt. Abstract technical drawing of a long-lived system: a large,
> calm isometric structure of stacked navy plates with thin cobalt
> construction lines and dimension marks, seen from a distance so the whole
> frame is low-contrast texture rather than a subject. Matte, even lighting,
> nothing sharp in any corner.
>
> Negative: base negative + focal object, bright highlights, high
> contrast, busy detail.

**Theme notes.** Card is `bg-ink` in both themes; one file.

---

## 5. Product visual headers (3)

Component: `src/components/sections/FeaturedProducts.tsx` (the `h-40` header)
and, once product pages get a hero, `src/app/products/[slug]/page.tsx`. The
header is an ink strip with a grid overlay, a cobalt blur in the top right and
the **product name in large white text bottom-left**. Add the image as a
`next/image` with `fill` + `object-cover` at ~50 % opacity under the existing
layers.

| Slot | Path | Size | Notes |
| --- | --- | --- | --- |
| OnPremBox | `/public/images/products/onprembox.jpg` | 1200 × 480 (2.5:1) | operations / workflow |
| Satisfy | `/public/images/products/satisfy.jpg` | 1200 × 480 | feedback / signal |
| Upcoming SaaS | `/public/images/products/upcoming.jpg` | 1200 × 480 | studio / incubation |

Also render a **2400 × 1000** version of each if you plan a product-page hero.

**OnPremBox**

> Base prompt. Isometric line-art of an operations cockpit: a set of
> parallel workflow lanes drawn as thin navy rails with small task blocks
> moving along them, a central control node with thin cobalt connectors,
> orderly and calm. Wide 2.5:1 strip, subject in the upper right, left
> third dark and empty.
>
> Negative: base negative + kanban screenshot, avatars, checkmarks,
> calendar.

**Satisfy**

> Base prompt. Isometric line-art of feedback signals converging: many thin
> incoming lines from the edges gathering into a single calm cobalt
> waveform in the centre-right, sand-coloured chips along the base
> representing categories, matte navy ground. Wide 2.5:1 strip, left third
> dark and empty.
>
> Negative: base negative + emoji, star ratings, speech bubbles with text,
> thumbs-up, faces.

**Upcoming SaaS**

> Base prompt. Isometric drafting scene: a partially assembled modular
> platform, some modules still drawn as ghosted blueprint outlines, thin
> copper (#c1863c) construction marks, a soft cobalt light. Wide 2.5:1
> strip, subject in the upper right, left third dark and empty.
>
> Negative: base negative + "coming soon" text, question marks, crane,
> construction site cliché.

**Theme notes.** Header is `bg-ink` in both themes; one file each.

---

## 6. Case studies (3)

Component: `src/components/sections/CaseStudiesSection.tsx` and
`src/app/case-studies/[slug]/page.tsx`. Cards live on **paper** (theme-flips).
Recommended placement: a rounded **16:9 ink header** at the top of each card
(same construction as the product header) with the industry pill overlaid,
and a full-width `ShadedImage` (aspect `wide`) at the top of the detail page.

| Slot | Path | Size | Accent |
| --- | --- | --- | --- |
| Manufacturing ERP modernisation | `/public/images/case-studies/manufacturing-erp-modernisation.jpg` | 1600 × 900 | cobalt |
| Healthcare patient platform | `/public/images/case-studies/healthcare-patient-platform.jpg` | 1600 × 900 | teal |
| Retail AI personalisation | `/public/images/case-studies/retail-ai-personalisation.jpg` | 1600 × 900 | violet |

**Manufacturing ERP modernisation**

> Base prompt. Isometric plant-floor cross-section: a row of calm line-art
> machines connected by thin cobalt data lines to a single central system
> block, sand-coloured floor grid, matte navy ground, one soft cobalt light.
> 16:9, subject upper right, lower-left quiet.
>
> Negative: base negative + sparks, smoke, robots with faces, yellow
> hazard stripes, forklift.

**Healthcare patient platform**

> Base prompt. Isometric line-art of a secure patient platform: a calm
> layered building section with a scheduling grid, a records vault drawn as
> a thin-lined block with a lock outline, teal (#0ea5a4) access lines,
> clean and clinical. 16:9, subject upper right, lower-left quiet.
>
> Negative: base negative + red cross, DNA helix, pills, syringes, heart
> icon, faces, hospital bed.

**Retail AI personalisation**

> Base prompt. Isometric diagram of a recommendation layer: a grid of small
> product tiles (blank) with a few tiles lifted and connected by thin violet
> (#7c5cff) lines to a central ranking node, sand and navy surfaces, calm.
> 16:9, subject upper right, lower-left quiet.
>
> Negative: base negative + shopping cart icon, price tags with numbers,
> mannequins, storefront signage, faces.

**Theme notes.** Render on ink and place inside an ink header so the same
file works in light and dark. Do not let white paper show at the edges.

---

## 7. Blog posts (4)

Component: `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`.
Cards live on **paper**. Recommended placement: a rounded **16:9 ink header**
on each card, and the same image as a `ShadedImage` (aspect `wide`) above the
article body.

| Slot | Path | Size |
| --- | --- | --- |
| Designing for total cost of ownership | `/public/images/blog/designing-for-total-cost-of-ownership.jpg` | 1600 × 900 |
| Putting GenAI into production, safely | `/public/images/blog/putting-genai-into-production-safely.jpg` | 1600 × 900 |
| Multi-tenant SaaS foundations | `/public/images/blog/multi-tenant-saas-foundations.jpg` | 1600 × 900 |
| Modernising legacy without a rewrite | `/public/images/blog/modernising-legacy-without-a-rewrite.jpg` | 1600 × 900 |

**Total cost of ownership**

> Base prompt. Isometric section of a building's foundations under a
> small, simple structure above ground — the foundation drawn far larger
> and more detailed than the visible building, thin cobalt dimension lines,
> sand ground plane. 16:9, subject centre-right, lower-left quiet.
>
> Negative: base negative + money, coins, calculator, graph with numbers.

**GenAI in production, safely**

> Base prompt. Isometric line-art of a guarded pipeline: a data stream
> passing through a sequence of thin navy gates and check stations before
> reaching a calm output node, cobalt highlights only on the gates, orderly
> and quiet. 16:9, subject centre-right, lower-left quiet.
>
> Negative: base negative + robot, brain, chatbot bubbles, padlock icon
> cliché, shield icon.

**Multi-tenant SaaS foundations**

> Base prompt. Isometric diagram of a multi-tenant platform: one shared
> base slab supporting a row of identical, separated line-art units with
> thin partition walls between them, cobalt meter lines along the base.
> 16:9, subject centre-right, lower-left quiet.
>
> Negative: base negative + apartment building photo, people, windows
> with lights, city skyline.

**Modernising legacy without a rewrite**

> Base prompt. Isometric scene of a strangler-fig migration: an old,
> heavier navy structure gradually enveloped by a new lattice of thin
> cobalt line-art, both still standing, some parts of the old block fading
> to blueprint outlines. 16:9, subject centre-right, lower-left quiet.
>
> Negative: base negative + wrecking ball, rubble, demolition, cracks,
> fire, literal tree or vines.

**Theme notes.** As §6: ink ground inside an ink header; one file each.

---

## 8. Open Graph fallback (1)

Used by `metadata.openGraph.images` in `src/app/layout.tsx` (not yet set) and
as the background for any `next/og` `ImageResponse` route you add later
(`src/app/opengraph-image.tsx`). Social crops are unforgiving: keep a **safe
area of 1120 × 560 centred**. The site name and tagline will be drawn on top,
centred-left, in white.

| Slot | Path | Size |
| --- | --- | --- |
| OG background | `/public/images/og/default.jpg` | 1200 × 630 (1.91:1) |

> Base prompt. Very quiet abstract engineering backdrop: a matte navy
> ground with a faint 56 px blueprint grid, a single large concentric-arc
> motif in thin cobalt lines on the right third, one soft cobalt radial
> light in the upper right, nothing else. Left two thirds almost empty.
> Low contrast overall.
>
> Negative: base negative + focal object, subject, text, high contrast.

**Theme notes.** OG images are seen outside the site; ink in all cases.

---

## 9. How to drop images in

1. **Paths.** Put files under `public/images/<area>/<name>.jpg` exactly as
   listed above. Reference them as `/images/<area>/<name>.jpg` (no `public`).
2. **Format & weight.** Prefer `.jpg` (quality 80–85) or `.webp`. Keep every
   file **under 400 KB**; hero slides may go to ~600 KB at 2400 px if they are
   clean. `next.config.ts` already serves AVIF/WebP derivatives and
   allow-lists `qualities: [60, 75, 90]` — pass `quality={90}` only for hero
   backgrounds.
3. **`next/image`.** Use `Image` with `fill` + `sizes` for every slot;
   `ShadedImage` already does this — you only pass `src`. For a new slot,
   copy the `Image` usage from `src/components/ui/ShadedImage.tsx` and keep
   `object-cover`.
4. **Preload.** In this Next version `priority` is deprecated; use
   `preload`. Set `preload` on **only the hero's first slide** (the LCP
   element). Leave it off everywhere else, including every `ShadedImage`
   tile — lazy loading is the default and correct.
5. **Hero.** `Hero.tsx` currently renders the slide `image` with a plain
   `<img>`; when the images exist, swap it for `next/image` with `fill`,
   `sizes="100vw"`, `quality={90}` and `preload={index === 0}`.
6. **WhoWeAre.** Fill the `IMAGES` map at the top of
   `src/components/sections/WhoWeAre.tsx`. Undefined entries keep rendering
   the procedural placeholder, so you can add the four images one at a time.
7. **Review in both themes.** Toggle `data-theme` and check that no image
   shows a white or pale edge on dark paper. Anything on a card header should
   be inside an ink container with a rounded mask.
8. **Alt text.** `ShadedImage` requires `alt`; keep it descriptive
   (what is in the picture), not the marketing title.
