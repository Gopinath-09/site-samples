# COBRR site — working context

Written so a fresh session can continue without re-deriving any of this. Read
this before touching the site; it records what is true, what was decided and
why, and the traps in this particular stack.

Branch: `redesign/home` (28 commits ahead of `main`).
`main` holds `b7626b6 Checkpoint: full site build before home page redesign` —
the revert point for the entire redesign.

**Nothing has been committed since `1fd8559` (this file's own commit).**
Everything in §4a (the brand mark) and the current hero implementation exists
only as uncommitted working-tree changes: `git status --short` shows
`globals.css`, `heroSection.tsx`, `Logo.tsx`, `Navbar.tsx` modified and
`src/components/brand/` untracked. Commit before assuming any of it is safe.

---

## 1. The company — every fact here is confirmed

Taken from the company portfolio document the client supplied. **Nothing else
about the company is confirmed.**

| | |
|---|---|
| Legal name | COBRR TECH LABS PRIVATE LIMITED |
| Tagline | Innovate. Build. Evolve. |
| Base | **Coimbatore**, Tamil Nadu (not Bangalore) |
| Address | No. 41, Sri Illam, Jayalakshmi Nagar, near Lakshmi Nagar Arch, Thondamuthur Road, Coimbatore 641046 |
| Phone | **+91 76393 55177** |
| Email | cobrr.tech@gmail.com |
| Founded | 2026 |

**Officers:** Rishi Vardhan S. (CEO), Gopinath S. R. (CTO), Sachindra P. (COO).

**Six services:** Artificial Intelligence, Enterprise Software, Cloud Solutions,
Mobile Applications, UI/UX Design, Digital Transformation.

**Nine delivered platforms:** Orthomentors, OnPremBox, YHAI Tamil Nadu, GPS
Transport Management, Complete School ERP, Hospital Management System (Clinic),
Rajiv Gandhi Hospital AI Chatbot, Stock Management, Matrimony Application.

**Ten sectors:** Education, Healthcare, Government, Tourism, Manufacturing,
Retail, Logistics, Enterprise, Startups, NGOs.

**Eight-stage methodology:** requirement analysis → business consultation →
architecture design → UI/UX design → agile development → quality assurance →
deployment → support and enhancement.

**No products are for sale.** The document records a *roadmap* (AI Agents,
Enterprise Automation, Cloud SaaS, Healthcare AI, Educational AI, Logistics
Intelligence, Tourism Ecosystems, Government Digital Platforms). `products` in
`content.ts` is deliberately an empty array.

### What was removed as fabricated

The site previously carried invented content that a prospect could disprove:
Bangalore as the base, a placeholder phone number, four fictional leaders, three
non-existent SaaS products (Workship, Satisfy, Custom Stack Studio), six
invented case studies, "120+ projects", "40+ clients", "99.99% uptime SLA",
"32% drop in patient no-shows", "40,000+ patients", and claimed HIPAA / GDPR /
PCI-DSS certifications. **Do not reintroduce any of it.**

---

## 2. The rule that governs content

`content.ts` ends with a **proof gate**:

```ts
export const verifiedClients / verifiedProjects / verifiedTestimonials / verifiedMetrics
```

Records carry a required `verified: boolean`. Home-page sections read **only**
the filtered accessors, and remove themselves entirely when the list is empty.
This makes publishing unverified proof structurally impossible rather than
something anyone has to remember.

Current state: 9 projects and 2 clients verified; **testimonials and metrics all
false**, so those sections do not render.

Two related principles that came out of this work:

- **A required field is a field that will be invented.** `PortfolioProject`
  originally required `results`, a client quote, a duration and a per-project
  stack — which is exactly how the old records ended up with fabricated
  metrics. Those are optional now and the case-study page renders each block
  only when data exists.
- **Being a real client and agreeing to be named publicly are different
  things.** Only YHAI Tamil Nadu and Rajiv Gandhi Hospital are named. SATISFY,
  SUDESI A&F, TRACKER BOX, UNION COLLEGE, DUDUK and DECYRE are in the data but
  hidden pending confirmation.

---

## 3. Design system — `src/app/globals.css`

**Surfaces are neutral black.** Any blue is a bug; the tokens were navy-tinted
once and it read as dark blue rather than black.

```
--color-ink        #000000   deepest wells, overlays
--color-paper      #08080a   the page
--color-sand       #0e0e11   alternate band
--color-sand-deep  #16161a   nested surfaces
--color-line       #26262b   hairlines
--color-fg         #f4f4f5   primary text
--color-muted      #a1a1aa   secondary text
--color-brand      #e3b964   GOLD — the only hue on the site
```

`--color-brand` is the *lit* gold deliberately: saturated gold falls below
4.5:1 on these surfaces. Use `--color-brand-strong` (#c9962f) for solid fills
where text sits on top.

### Type scale — four heading steps, two body steps, nothing else

```
.heading-display  clamp(2.15rem, 4.6vw, 4rem)   hero h1 only
.heading-xl       clamp(2rem, 3.4vw, 2.9rem)    page titles
.heading-lg       clamp(1.75rem, 2.8vw, 2.35rem) section titles
.heading-md       1.125rem  (fixed)              card / item titles
.lead             1.0625rem (fixed)              section intros
.body             0.9375rem (fixed)              default paragraph
.body-sm          0.8125rem (fixed)              meta, captions
```

Only the top two scale with the viewport. A card heading and a paragraph are
read at the same distance whatever the screen — fixing them is what makes the
size uniform rather than uniform *per breakpoint*.

There were 13 heading treatments and 5 paragraph sizes across 32 files before
this. **Do not add a size outside the scale.** Two deliberate exceptions: the
pinned stage states its problem at the section step, and `.mono-label` keeps its
own size as furniture.

### Motion — `src/components/ui/Reveal.tsx`

One easing curve, two durations, read off the reference site's computed styles:

```
EASE  cubic-bezier(0.22, 1, 0.36, 1)
0.55s transform + opacity (entering content)
0.85s clip-path (wipes, headline lines)
```

Primitives: `Reveal`, `RevealGroup`/`RevealItem`, `RevealLines` (headline lines
rising out of their own clip box), `RevealWipe`.

**Every motion element carries `data-reveal`**, and a CSS rule under
`prefers-reduced-motion` forces `transform/opacity/clip-path` back to their
finished values. This is not belt-and-braces — without it the hero headline was
*invisible* for reduced-motion users, because framer writes the starting
transform inline and the reveal never ran. Component-level detection cannot fix
that, since the server renders before the preference is known.

---

## 4. Where things are

Home page order (`src/app/page.tsx`):

| # | Section | Component | Device |
|---|---|---|---|
| 01 | Hero | `heroSection.tsx` | Full-bleed looping video (drifts + a breathing gold pool behind the statement), centred statement, drawn scene, fact strip floated as one glass card over it |
| 02 | Clients | `TrustedBy` | Hairline wall; hides if no verified client |
| 03 | Who we are | `WhoWeAre` | |
| 04 | Core services | `CoreServices` | Bento grid, drawn visual per card |
| 05 | Problems we solve | `ProblemsWeSolve` | **Pinned stage**, 4 viewports, figure per problem |
| 06 | Product roadmap | `FeaturedProducts` | 3-up cards, 900ms hover reveal |
| 07 | Technologies | `TechnologiesSection` | ⚠ still generic |
| 08 | How we work | `EngineeringProcess` | Sticky stack, 8 real stages |
| 09 | Delivered systems | `FeaturedProjects` | Client-wins wall, hover media |
| 10 | Key industries | `IndustriesServed` | Tabs, challenges vs solutions |
| 11 | Why COBRR | `WhyChoose` | Sticky split, IntersectionObserver |
| 12 | Testimonials | `Testimonials` | Hidden — none verified |
| 13 | FAQ | `FaqSection` | |
| 14 | CTA | `FinalCta` | |

**Drawn graphics** (`src/components/graphics/`) — no photography anywhere on the
site. `HeroScene`, `ServiceVisual`, `ProblemDiagram`, `RoadmapVisual`,
`SystemDiagram`. All recolour from the tokens.

**Shared UI:** `Media` (image or designed placeholder — lets sections ship
before photography exists), `HoverMedia` (video/figure revealed on hover),
`BackgroundVideo` (poster-only under reduced motion), `Reveal`, `Button`.

### Assets in `public/`

- `hero/ambient.mp4` + poster — **generated**, five gold lights orbiting in
  closed loops so the loop point is seamless, no crossfade. Not real footage.
- `hero/Hero1.mp4` (88MB), `hero/Hero2.mp4` (19MB) — **untracked, unused.**
  Dropped into the repo but never wired into `heroSection.tsx`; nothing in
  code references them. Confirm with the user what these are before either
  deleting them or swapping them in for the generated clip — see §7.
- `projects/yhai-tamil-nadu.mp4` — **real capture** of the live YHAI platform
- `roadmap/placeholder-*.mp4` — generated abstract clips, deliberately
  non-representational so they cannot read as product footage
- Empty dirs for `clients/`, `products/`, `team/`, `og/`

Videos were generated with `ffmpeg-static` installed into the scratchpad, not
into this project.

### 4a. The brand mark — `src/components/brand/`

`CobrrMark.tsx` (the monogram) and `CobrrLockup.tsx` (mark + wordmark) replace
what `Logo.tsx` used to render inline; `Logo.tsx` now just delegates to
`CobrrLockup`, so every call site (`Navbar`, the mobile drawer) picked up the
new mark for free.

**`CobrrMark`** — the C/K outlines traced from the client's supplied artwork as
real SVG paths (not an image), so they stay crisp at any size. Three layers,
clipped to the glyphs: a stone gradient fill, a **generated** gold-crack
veining (see below), and a `.mark-shine` — one soft diagonal band that sweeps
across the glyph every 7s and is otherwise parked off-canvas
(`transform: translateX(-100%)` via `transform-box: fill-box`, so "off-canvas"
costs nothing extra — it just stops overlapping the clip region). A dim gold
`.mark-rail` outline sits on top of everything.

**No frame.** An earlier version wrapped the mark in a rounded gold-bordered
badge with a dot orbiting it — reverted on explicit instruction ("I want a
golden lining... simple, no border") once the client showed the actual
reference artwork: plain marble letterform, no badge. The lesson generalises —
*ask to see the reference before building a stand-in for it.*

**The vein texture is tuned, not guessed.** `feComponentTransfer type="table"`
(the first attempt) interpolates linearly between entries, and even a narrow
"on" entry still ramps across roughly a third of the noise range — the result
read as a blobby camouflage pattern, not cracks. Switched to `type="discrete"`
(hard on/off buckets, no ramp) and found the right bucket by rendering a grid
of ~10 candidates side by side in a standalone HTML file rather than
guess-and-check one at a time — see §6. Current tuning:
`baseFrequency=0.011, numOctaves=4`, 30 discrete buckets, bucket 19 "on".
Buckets near the tails of the noise distribution rendered almost nothing
(fractalNoise clusters near its centre); the usable range was mid-distribution
with a narrow single bucket.

**`CobrrLockup`** — the wordmark runs *continuously*, not on hover. Each
letter is its own `lockup-run` animation (slide in from behind the mark, hold,
slide out), all five sharing one keyframe timeline and differing only in
`animation-delay` (`--i` steps of 0.3s) — that stagger alone produces the
sequence "C, then O, then B, then R, then R" forever. This replaced two earlier
designs: a hover-triggered reveal-and-stay, then a static word with a
glow-chase overlay riding over it — both reverted on explicit feedback that the
letters themselves needed to visibly run, not just glow. Reduced motion settles
every letter to `opacity: 1, transform: none` rather than freezing mid-cycle.

---

## 5. Stack traps — all of these cost real time

**This is Next 16 + Tailwind v4. Read `node_modules/next/dist/docs/` before
assuming an API.**

1. **`priority` is deprecated on `next/image`** — use `preload`.
2. **`qualities` must be an explicit allowlist** in `next.config.ts`.
3. **Tailwind v4 animates the `translate` property, not `transform`.** A probe
   reading `transform` sees `none` in both states and concludes nothing moved.
4. **Unlayered CSS beats every layered rule**, regardless of specificity. A bare
   `* { border-color }` silently overrode `border-color` on every class in
   `@layer components` — *no button variant's border was ever the colour it
   declared*. It now lives in `@layer base`.
5. **`useScroll` measures its target at setup and never re-measures** when a ref
   goes from `null` to an element. If a component swaps between two branches,
   attach the ref in **both**.
6. **`pointer-events-none` elements receive no `mouseenter`.** Hover handlers
   must go on the hovered ancestor.
7. **Regex sweeps: `<p` matches `<path>` and `<polygon>`.** Use a lookahead.
8. **Framer strands content under reduced motion** — see §3.
9. **A multi-line SVG attribute string is a hydration mismatch waiting to
   happen.** Node's SSR serializer collapses the embedded newlines/indentation
   in something like a `feColorMatrix` `values` string into single spaces;
   client-side `setAttribute` keeps them verbatim. The two disagree and React
   flags it. Write such attributes on one line.
10. **`feComponentTransfer type="table"` interpolates; `type="discrete"`
    doesn't.** `table` ramps linearly either side of an "on" entry — even a
    narrow one covers a wide effective band and reads as soft blobs, not fine
    detail. `discrete` is a hard on/off step with no ramp. Reach for
    `discrete` whenever the target look has a crisp edge (cracks, contour
    lines) rather than a glow.
11. **A CSS basic-shape passed to `offset-path` is measured against the
    element's *own* border box, not its parent's.** `offset-path: inset(0
    round 20%)` on a 7px dot traces a path the size of the dot, not whatever
    it sits inside. To move something around a parent's shape, compute that
    shape's real outline in pixels and hand it down (a CSS custom property
    works and stays overridable; an inline `offset-path` does not — inline
    styles beat every stylesheet rule, including a `prefers-reduced-motion`
    override).
12. **A long-running `next dev` can silently serve stale CSS.** After many
    hot-reloads in one session, an edited `@media (prefers-reduced-motion:
    reduce)` block was present in the source and in a fresh `next build`, but
    missing from the bytes the dev server actually served — confirmed by
    curling the served CSS chunk directly and diffing it against the source.
    If a computed style disagrees with the file on disk, check the served
    bytes before assuming the CSS logic is wrong; restart the dev server if
    they've drifted.

---

## 6. How to verify — do not trust the markup

Everything here was checked in a real browser. `playwright-core` is installed in
the scratchpad (not this project) and drives system Chrome via
`channel: 'chrome'`.

What that caught that reading code would not have: hover video never playing,
the pinned stage stuck on problem 01, the headline invisible under reduced
motion, borders never taking their declared colour, a lattice escaping its
shape, a grey block where a grid cell was empty.

Two cautions learned the hard way:

- **Chrome's `--screenshot` CLI renders at a different width than the layout
  viewport.** It once showed a broken mobile layout that did not exist. Use
  Playwright viewports and measure `scrollWidth`.
- **A contrast checker must handle `oklab()` / `lab()`.** Tailwind v4 emits
  them; an RGB parser reports white-on-black as failing.
- Screenshots taken immediately after `networkidle` miss anything with an
  entrance delay. Wait ~2.5s before judging "it is missing".
- **For CSS animation timing, read `element.getAnimations()[0]` — don't infer
  from a `setTimeout` polling loop.** A polling loop's own start time isn't
  phase-aligned with when the animation actually began, so spaced samples can
  look like broken timing (a sweep arriving "too early", gaps that don't match
  the keyframe percentages) when the animation is correct and the *sampling
  window* is just misaligned. `getAnimations()[0].currentTime` and
  `.effect.getComputedTiming()` give ground truth instead of an inference.
- **Cloning a live element into a scratch DOM node is fragile against a
  running dev server.** Turbopack HMR can push a refresh mid-script that
  causes React to reconcile from its root and silently overwrite a manual
  `document.body.innerHTML = ""` hack, producing a screenshot of the normal
  page instead of the isolated test. For side-by-side comparison of many
  parameter variants (the vein tuning above needed ~10), write a fully static
  standalone HTML file and open it via a `file://` URL instead — no React, no
  HMR, no race.

---

## 7. Outstanding

1. **Technologies page** — still generic. Real stack: React, Next.js, Angular,
   HTML/CSS/Tailwind, Node.js, Java, Python, .NET, PostgreSQL, MySQL, MongoDB,
   vector DBs, AWS, VPS, Docker, Kubernetes, Jenkins, GitHub, GitLab, RAG,
   Agentic RAG, Deep Research Agent, Internal Software AI Assistant.
2. **About page** body copy still reads from the invented era.
3. **Six client names** hidden pending permission to display.
4. **Roadmap `video` fields** are set but unused since the cards changed —
   either use or remove.
5. **Navbar** shows only the mark; the reference has visible routes. Added once
   and reverted on request — do not re-add without asking.
6. From the original audit, still true: **the contact form does not send
   anything** (`ContactForm.tsx` has a TODO and discards the lead), and there is
   no `sitemap.ts`, `robots.ts`, JSON-LD or analytics.
7. **`public/hero/Hero1.mp4` and `Hero2.mp4`** (88MB, 19MB) sit untracked in the
   repo, unreferenced by any code — the hero still runs on the generated
   gradient loop. Find out what these are intended for before doing anything
   with them: if they're the real footage to replace the generated clip, wire
   one in and delete the rest; if they're leftover from testing, delete both.
   Do not commit either as-is — 88MB is not a reasonable asset size, and it
   almost certainly needs compressing regardless of which one is used.
8. **Everything in §4a (the brand mark) is uncommitted.** Commit it as its own
   change before starting anything else, so a revert of later work can't take
   the mark with it — the exact mistake the navbar/hero-scene bundling made
   once already (§8).

---

## 8. Working agreements

- **Never invent proof.** Not a client, a metric, a certification, a
  testimonial, or footage that implies a product exists. If a section needs
  evidence there isn't any for, say so on the page or hide the section.
- **Do not copy the reference sites' copy.** Take the mechanism, write our own
  words. The Accenture and Phenomenon text describes their companies.
- Reference sites used so far: **Phenomenon Studio** (motion vocabulary, problem
  rows, client-wins wall, industries tabs), **Accenture** (sliding card),
  **Paradigm/Dribbble** (hero composition).
- Ask before restyling something outside the stated scope; the navbar change was
  reverted for exactly this reason.
- Commit per coherent change, and **do not bundle an in-scope change with an
  out-of-scope one** — reverting the navbar also lost the hero scene, which cost
  two extra steps to unpick.
- **"Revoke the previous prompt" means revert exactly the files that prompt's
  response touched**, back to their state before it — not a general rollback,
  and not a pretext to redo the same request differently. It has been used
  more than once to mean precisely this.
- **When asked to change something already built the same way twice, check
  whether a reference image or file has just been supplied before rebuilding
  again from description alone** — the mark's frame was removed the moment the
  actual reference artwork was shown; the words alone ("golden lining", "small
  dot of light") had been read as a badge-with-orbiting-dot, reasonably, but
  differently from what was wanted.
- For a visual tuning question with more than two or three plausible answers
  (vein density, animation timing, colour), **render several candidates side
  by side in one comparison image** rather than iterating on the live app one
  guess at a time — found the right vein tuning in two comparison passes this
  way instead of many individual rebuild-and-check cycles.
