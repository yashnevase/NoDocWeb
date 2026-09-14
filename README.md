# NoDoc website

The product website for NoDoc, an independent desktop PDF application by Yash.

Live website: https://getnodoc.vercel.app/
Vercel project: `yashs-projects-1a0458f9/nodoc`.

## Development

Use Node.js 22 or later. Run `npm ci`, then `npm run dev`.
Run `npm run build` and `npm run lint` before deployment.

The site uses React, TypeScript, Vite, and a lazy-loaded Three.js / React Three Fiber hero. The interactive document stack demonstrates organize, merge, and split; screenshots elsewhere are from the real app. Animation pauses offscreen and in background tabs, respects reduced motion, and has a static fallback. No analytics or session replay code is loaded.

### Source map

- `src/App.tsx` — page composition, content, downloads, and interaction state.
- `src/components/HeroExperience.tsx` and `ProductScene.tsx` — the isolated 3D hero.
- `src/components/PrivacyStory.tsx` — local-first explanation.
- `src/Legal.tsx`, `src/release.ts` — legal routes and release facts.
- `src/index.css`, `src/useScrollReveal.ts` — styling and optional motion.
- `public/screens/` — real NoDoc screenshots; `public/legal/` — notices served by the site.

The source tree intentionally excludes the old showcase template, Sentry configuration, GSAP animation layer, Netlify configuration, Vite/React placeholder assets, and duplicate unused 3D components. `src/components/NoDocDocument.tsx` is excluded from compilation only because it has pre-existing uncommitted local edits; it is not used by the website and should be reviewed or removed in a separate, recoverable change.

## Release a new application version

1. Build and manually test the new Windows and macOS installers. Keep the app's embedded version, filename, tag, and website version consistent.
2. Preserve existing release files. Create a new release in the public `yashnevase/NoDoc-Releases` repository with the matching installers, complete license/source materials, release notes, and SHA-256 checksums.
3. Update `src/release.ts` with the real version, platform, architecture, size, checksum, and stable public asset URL. Never link users to expiring CI artifact downloads or private repository assets.
4. Update the release-note entry, date, and current known issues in `src/App.tsx`. Test the downloads without signing in to GitHub.
5. Update screenshots only from the real application, using non-sensitive sample documents. Do not present mockups as app screenshots.
6. Run the production build and lint, verify desktop/mobile layouts and links, then push the website repository and deploy its Vercel project.

Downloads are manual updates. The site does not claim the application auto-updates.

## Content and ownership

Public owner name: Yash. Contact: https://yashnevse-website.vercel.app/
Donations are deferred until the owner supplies a destination.

The existing website MIT notice is preserved. Third-party ownership is not transferred. See `/licenses` and `public/legal/`. `scripts/collect-web-notices.mjs` regenerates the runtime notices from installed dependency licenses during each build.

The privacy notice distinguishes local desktop processing from website hosting and release downloads. No claim of legal certification, guaranteed fidelity, or certificate-backed signing is made.

## Deployment

The deployment configuration is in `vercel.json`. Only this website directory should be deployed.
Vercel project linkage and credentials belong in ignored `.vercel/` or the local CLI store, never in Git.
The app source repository is separate from both this site and the public binary-release repository.

Current downloads are version 0.1.0 early access. The Windows reader issue and pending macOS manual testing are disclosed.
