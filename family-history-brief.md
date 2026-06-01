# Family History Site — Project Brief & Architecture

*A kickoff document for building a narrative family-history website from the Eesley and Wildermuth family records. Paste this into a new Claude Project as knowledge, or hand it to Claude Code in the repo, so a fresh session starts fully oriented.*

---

## 1. Goal

Build a **narrative, archive-quality family-history website** — not just a data tree. Ancestry/FamilySearch handle the structured tree; this site is for the *stories*: war journals, letters, memoirs, catalogued photographs, and per-person biographies, all cross-linked.

**Hosting decision (pending final call):** Build as a **separate site sharing the existing Astro/GitHub workflow** rather than a section of chuckeesley.com. Rationale: different audience (relatives/descendants vs. professional), different longevity (the archive should outlast any current title or institution), and a privacy posture suited to living people. Link to it *lightly* from chuckeesley.com (e.g. a footer/"personal" item), not the main professional nav.

- **Open question:** subdomain (free, tidy) vs. its own surname domain (~$12/yr, reads better to relatives, survives independently). For an archive meant to be permanent, a dedicated domain is the slightly better choice.

---

## 2. Source materials (in hand)

| Source | Author | What it is | Role in the site |
|---|---|---|---|
| **Eesley Family History (1985)** | Mary Eesley Bean | Narrative front-matter (Goldie immigration, the flour mill) + indented descendant register (gens I–VII) + address appendix | The relationship **backbone** for the paternal clan |
| **"Four Generations" navigation deck** | Maggie (Margaret) Eesley | Hyperlinked PowerPoint photo archive, four generations of Eesley/Chenoweth + McMaster/Anderson, with full archival metadata per item, close-ups, and document scans (Rev. Anderson's 1894 letter; Will's 1942 ration-card Christmas card) | Pre-built, catalogue-grade **image/artifact layer** |
| **"Robert Earl Wildermuth" (life story, ~1989)** | Robert Earl Wildermuth | Full first-person autobiography: Marietta boyhood → WWII → Korea → Pentagon → teaching → genealogy | Flagship **long-form document** (maternal line) |
| **"The Big One: World War II"** | Robert Earl Wildermuth | The WWII **combat mission log**: dated missions Nov 1944–May 1945 (90th Bomb Group "Jolly Rogers," 400th Sq "Black Pirates," B-24s out of Biak/Leyte/Mindoro) + a roster of his 10-man crew with a portrait of each | Long-form document **+ introduces non-family "people"** (the crew) |
| **Ruth Irene Wildermuth memoir; "Return to Germany" (1993); ancestor sketches** | Robert Earl Wildermuth | Sister's memoir; a 1993 trip to the German home villages; researched bios of German/Fleming ancestors back to the early 1700s, with a Lineage page | Additional **documents** + deep ancestor data |

**Note:** Maggie's deck uses archival cataloguing fields per item — Title, Type, Medium, Measurement, Condition, Creator, Date Created, Place Created, ID Number, Provenance, Description, Inscription, Location/Rights. This maps almost 1:1 onto an `artifacts` schema (below), so her work imports nearly losslessly.

---

## 3. Family map (two lines converging on Chuck)

Chuck = **Charles Eric Eesley**, b. Dec 4, 1979.

**Paternal — Eesley / Chenoweth / McMaster / Anderson** (from Bean register + Maggie deck):

- John Eesley & Hannah Bubb (Stratford-on-Avon, England) — emigrated ~1858
- → Albert Robert Eesley (1837–1902) m. **Jeanie Goldie** (Scotland) — Albert came to work in the Goldie flour mill (the 1985 cover drawing)
- → Charles Leonard Eesley (1879–1972) m. Lillie Dale Chenoweth (1877–1970)
  - Chenoweth line: Joseph Hill Chenoweth & Mary Ohio Timmons Chenoweth → John K. Timmons
- → **Wilbur "Will" Eesley** (1910–1986), *architect* — drew the 1985 cover and the 1942 ration-card Christmas card — m. Margaret "Peggy" McMaster (1914–2007)
  - McMaster/Anderson line: Robert Thompson McMaster (civil engineer; a bridge of his appeared in textbooks) & Alice Anderson McMaster (schoolteacher); Rev. Abraham Ramsey Anderson (1894 letter) & Nancy Jane Shaw; Gilbert Clement McMaster & Margaret Thompson McMaster; Alice's brother Donald A. McMaster ran the NE U.S. communications power grid in WWII
- → **Charles McMaster Eesley** (1947–2015, Marietta) m. Terrie Lee Wildermuth → **Chuck**
  - Will & Peggy's daughter **Maggie** (b. 1951) built the archive deck — Chuck's paternal aunt

**Maternal — Wildermuth / Fleming** (from the memoirs):

- German line back to the early 1700s (Werner, Landai, Schmidgall, Wild) in Württemberg / Rhineland-Pfalz villages (Grossaspach, Breitenbach, Rohrach)
- → Johann Michael Wildermuth (1830, Grossaspach – 1903), emigrated 1847, Marietta shoemaker, m. Catherina Boeshar (1840, Breitenbach – 1933)
- → Earl Adam Wildermuth (machinist) m. **Sadye Irene Fleming**
  - Fleming line includes **John Roe, a Revolutionary War veteran**
- → **Robert Earl Wildermuth** (b. ~1924; WWII B-24 navigator; later attended **Stanford** on the GI Bill; Korea; Pentagon; Lt. Col.) m. Dorothy "Dottie" Davis
- → **Terrie Lee Wildermuth** (1949–2017, Marietta), m. Charles Eesley → **Terrie Lee Eesley** (later Bain) — *Chuck's mother. Confirmed: this is the hinge joining the maternal and paternal lines.*

**Resonance worth surfacing on the site:** Robert Earl attended Stanford a generation before Chuck joined the faculty, and he closed his family history explicitly addressing "future genealogists." This project is the next generation answering that.

---

## 4. Architecture

**Stack:** Astro 5 (content layer) + GitHub + existing deploy workflow. Same muscle memory as chuckeesley.com; new repo.

**Three content collections.** The key insight: *long-form narrative* and *catalogued objects* are different things and deserve different schemas. Both link to people.

```
src/
  content.config.ts
  content/
    people/              # one entry per person (family AND crew)
    documents/           # long-form narrative: memoirs, combat log, register, travelogue, ancestor sketches, letters
    artifacts/           # catalogued objects: photos, letters, cards (Maggie's metadata lives here)
  pages/
    family/[...slug].astro      # person page
    docs/[...slug].astro        # document page
    archive/[...slug].astro     # artifact page
    tree.astro                  # overview pedigree
    index.astro                 # landing / "enter here"
src/assets/family/
  photos/   scans/   originals/
```

```ts
// content.config.ts  (Astro 5)
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    aka: z.string().optional(),                 // "Will", "Fuzzy", "Bus"
    line: z.enum(['paternal', 'maternal', 'crew', 'other']).optional(),
    birth: z.object({ date: z.string().optional(), place: z.string().optional() }).optional(),
    death: z.object({ date: z.string().optional(), place: z.string().optional() }).optional(),
    parents: z.array(reference('people')).default([]),
    spouses: z.array(reference('people')).default([]),
    // children/siblings are DERIVED from parents — never stored, to avoid drift
    living: z.boolean().default(false),         // privacy gate (see §5)
    portrait: image().optional(),
    generation: z.number().optional(),
  }),
  // Body (Markdown) = the biography prose.
});

const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    type: z.enum(['memoir', 'combat-log', 'travelogue', 'register', 'ancestor-sketch', 'letter']),
    author: reference('people').optional(),
    people: z.array(reference('people')).default([]),   // who appears in it
    dateRange: z.object({ start: z.string(), end: z.string().optional() }).optional(),
    summary: z.string(),                                // 1–2 sentence header context
    source: z.string().optional(),                      // original filename, for provenance
    scans: z.array(image()).default([]),
  }),
  // Body (Markdown) = the transcription.
});

const artifacts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artifacts' }),
  schema: ({ image }) => z.object({          // maps directly to Maggie's catalogue fields
    title: z.string(),
    type: z.string(),                        // "Photograph", "Letter", "Christmas Card"
    image: image(),
    medium: z.string().optional(),
    measurement: z.string().optional(),
    condition: z.string().optional(),
    creator: z.string().optional(),
    dateCreated: z.string().optional(),
    placeCreated: z.string().optional(),
    idNumber: z.string().optional(),
    provenance: z.string().optional(),
    inscription: z.string().optional(),
    rights: z.string().optional(),
    people: z.array(reference('people')).default([]),       // who is pictured
    relatedDocument: reference('documents').optional(),     // e.g. a scanned letter -> its transcription
  }),
  // Body (Markdown) = description / story behind the object.
});

export const collections = { people, documents, artifacts };
```

**Deliberate choices**

- **Dates are strings, not `z.date()`** — genealogy is full of "abt. 1890," "before 1945," and conflicting sources. Don't force real dates.
- **Store only `parents`; derive everything else.** Children, siblings, and the tree all come from reverse-lookups on `parents`. Storing both directions is how trees drift out of sync.
- **Reciprocal links are automatic.** A person page queries `documents` and `artifacts` for any that reference it; a document page turns its `author`/`people` into links back. No hand-maintained back-links.

**Navigation** (honoring both Bean's register and Maggie's "click for more" model)

- Landing page → choose a line, or a four-generation pedigree view.
- **Family-group navigation** on each person page (parents, siblings, spouse, children — each a link). Trivial to generate from `parents`; this is how people actually browse. Build this first.
- A **single overview chart** (Mermaid, generated from `parents` edges) for the bird's-eye view — added later, not a separate dataset.
- **Stories** index (the documents) and an **Archive/Collection** index (the artifacts) as the two long-form entry points.

---

## 5. Privacy rules (enforced, not optional)

The source documents contain living people and, in Bean's appendix, **home addresses** of (then-)living relatives.

- **No street addresses anywhere on the public site.** The appendix is research data, not web content.
- **Living people get a light touch:** first name or initials, no birth date, no place — unless they explicitly opt in. Enforce at build time via the `living: true` flag, which suppresses detail in templates and the tree.
- When in doubt, omit. Default to protecting the living.

---

## 6. Content pipeline

1. **Transcribe** the long-form PDFs into Markdown `documents` (the memoir, the combat log with its crew roster, Ruth's memoir, "Return to Germany," the ancestor sketches). Keep the originals; optionally show scans alongside via `scans`.
2. **Import Maggie's catalogue** — each deck slide → one `artifacts` entry (her metadata fields map straight to the schema). Link each to the `people` pictured.
3. **Seed `people`** from Bean's register (relationships/dates) + Maggie's metadata (which gives portraits and provenance) + the combat-log roster (the crew, `line: 'crew'`).
4. **Optimize images** into `src/assets/family/` (Astro's image pipeline handles responsive sizes).

---

## 7. First slice (pick one to start)

- **Slice A — structure + photos:** scaffold the Astro project, define the three collections, import a handful of Maggie's catalogued photos as the first working person-pages with the archive view. Proves the whole pipeline end-to-end quickly.
- **Slice B — the crown jewel:** transcribe Robert Earl's combat log + crew roster and lay it out as the first long-form `document`, with the crew as linked `people`. Highest emotional payoff first.

Either is a clean vertical slice. A then B is the lowest-risk order.

---

## 8. Open decisions

1. Subdomain vs. dedicated surname domain (§1).
2. Which line to build out first (paternal has Maggie's ready-made photo corpus; maternal has the flagship memoirs).
3. How to surface scans of originals — interleaved with transcription, or a lightbox gallery per document.

---

## 9. How to run the build

- **For continuity/context:** a Claude **Project** (or Claude **Cowork**) holding this brief as knowledge, so every session starts oriented.
- **For the actual code-and-commit loop:** **Claude Code**, working directly in the repo — best fit given the existing Astro/GitHub CLI workflow. It edits files and commits, which a chat Project connected to GitHub does not do as fluidly.
- Recommended: use both — Project/Cowork for planning and content decisions, Claude Code for the build.
