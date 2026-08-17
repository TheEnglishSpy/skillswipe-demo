# SkillSwipe

“Not what you say you can do. What people trust you to do.”

SkillSwipe is a mobile-first, consent-based professional recognition MVP. Reviewers respond to concrete behaviour claims in seconds; positive signals become an evidence-backed scorecard. “Not seen” and “Can’t judge” are always neutral.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The demo works without Supabase credentials. Key routes are `/review/demo`, `/onboarding`, `/dashboard`, `/profile/noor-van-dijk`, and `/scorecard`.

## Environment

- `NEXT_PUBLIC_SUPABASE_URL`: project API URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: low-privilege publishable key; never use a secret/service key in the browser

Add `skillswipe` to the project’s exposed Data API schemas. The browser client explicitly selects that schema.

## Database

The migrations create an isolated `skillswipe` schema so Playground’s existing products are untouched.

```bash
supabase link --project-ref <project-ref>
supabase db push
supabase gen types typescript --linked --schema skillswipe > src/lib/supabase/database.types.ts
```

`20260817120000_create_skillswipe.sql` creates the model, RLS, public security-invoker views, token-scoped review RPCs and access grants. `20260817121000_seed_taxonomy_demo.sql` seeds all 25 claims and Noor van Dijk with 12 signals across Account Management, Leadership, and Communication.

## Architecture

- Next.js App Router supplies the six product surfaces.
- Framer Motion powers tactile claim transitions and the evidence sheet.
- Supabase Auth owns profile identity. PostgreSQL RLS restricts raw data to its profile owner.
- Invite tokens are stored as SHA-256 hashes. Reviewers use narrow RPCs which reveal only profile context and active claim cards, then validate consent and write a single signal.
- Public views contain validated claim aggregates and written proof that has both reviewer consent and owner approval.
- Taxonomy lives in database records rather than UI branching.

## Scoring

`src/lib/scoring.ts` computes per-claim confidence from positive evidence strength, relationship relevance, specificity, recency, corroboration, and source diversity. It never computes a personality or global profile score. A claim remains “Building evidence” below three positive independent contributors. Validation also needs at least one practical signal and at least two relationship types.

The formula is intentionally a transparent v1 heuristic, not a statistical truth. Before production, calibrate weights against user research, add fraud/ring detection, define contributor independence more robustly, and snapshot versions of the scoring policy.

## Privacy and consent assumptions

- Reviewers must explicitly consent before submission.
- Quote display consent defaults off.
- A quote needs reviewer opt-in and separate profile-owner approval.
- Owners can hide public evidence without deleting aggregate history.
- “Not seen” and “skipped” add zero evidence and are never negative.
- The demo uses synthetic contributors and evidence.
- Production deletion/anonymisation behavior requires a jurisdiction-specific retention policy and legal review.

## Quality checks

```bash
npm test
npm run typecheck
npm run lint
npm run build
```
