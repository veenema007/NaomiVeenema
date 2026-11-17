# Project memory

## Product intent & audience

- Bilingual (Dutch/English) portfolio website for racing driver Naomi Veenema.
- Eight pages: home, biography, agenda, partners, news, photo gallery, merchandise, contact.
- Audience: fans, sponsors, partners, media; needs professional racing-driver presentation.
- NXTGP racing series context; Assen circuit referenced.

## Brand personality & voice

- Modern, sporty racing identity.
- User communicates in Dutch; assistant responses in Dutch unless context switches.
- News articles written in Dutch (English equivalents expected for bilingual support).

## Visual design & UX direction

- Color palette: black, burgundy, white, gold.
- Sporty, premium aesthetic — not generic; production-quality pages expected.
- Responsive across all eight pages.
- News articles support a hero/featured image plus inline photos within article body.
- Media files follow naming like `NXTGP_Assen-<number>.jpg`.

## Decisions, constraints & rationale

- Framework: vite-react with Tailwind CSS, React hooks, Lucide React icons.
- `@/` path alias maps to `src/`.
- No extra UI/icon packages beyond defaults unless explicitly requested.
- News content is date-based (e.g., "1 november" article) with structured photo attachment.
- Photos can serve as both hero image and first inline image in a news article.
- Build verification performed after content edits.

## Open questions & assumptions

- Bilingual toggle implementation and whether all eight pages have full EN/NL parity is unconfirmed.
- News articles likely sourced from a data structure or content file — exact storage mechanism not yet visible.
- Merchandise page scope (shop integration vs. display-only) unclear.
- Photo gallery organization and asset directory conventions need confirmation.