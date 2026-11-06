# Awais Studio

Personal digital headquarters: two professional identities (Web Developer, MC / Event Host),
freelancing, projects, hosted websites, and seven platform slots.
React, Vite, Tailwind CSS v4 (Vite plugin), React Router, Framer Motion, GSAP + ScrollTrigger, Lenis, React Icons.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Routes

`/` Home | `/developer` | `/freelancing` | `/events` | `/projects` | `/projects/:slug` | `/socials` | `/about` | `/contact`
(`/portfolio`, `/services`, `/websites` from the first version redirect to the new pages.)
`/contact?type=event` opens the event-booking form, `?type=project` the web-project form.

## Edit your content (everything is in `src/config/`)

| File | Controls |
| --- | --- |
| `site.js` | Name, email, **WhatsApp number**, profile photo, navigation |
| `socials.js` | The seven platform slots. Paste a URL to activate a slot. `freelance` is the Freelancing Portfolio link |
| `projects.js` / `websites.js` | Projects (thumbnail, tech, live + GitHub links) and hosted websites |
| `freelancing.js` | Services, working phases, optional Upwork / Fiverr slots (appear once a URL is set) |
| `events.js` | MC services, occasions, **gallery photos / videos**, hosted events |
| `about.js` | Statement, identity card text, directions, interests |
| `identities.js`, `story.js` | Homepage flip cards and the horizontal journey scenes |
| `forms.js` | Fields of the contact and booking forms |

Empty URLs render as visibly disabled "coming soon" elements, so there are no broken links.
WhatsApp click-to-chat: set `site.whatsapp.number` (country code, digits only).
Images go in `/public`; reference them as `"/events/photo-1.jpg"`.

## Animation architecture (one job per library)

- **Lenis** smooths page scrolling (not on touch devices, not with reduced motion), driven by GSAP's ticker.
- **GSAP + ScrollTrigger** run the two pinned scenes: homepage horizontal journey, About split-screen convergence.
  Both switch off below 1024px and for reduced motion (scenes simply stack).
- **Framer Motion** runs everything state-driven: route curtain, loader, flip cards, tilt, magnetic buttons,
  masks, text reveals, scroll-linked values, navigation.
- Route tone: `data-tone` on `<html>` (brand / dev / event) switches the accent colour per page.
- Only opacity is animated on `<main>`: transforms there would break pinned scenes.
- The intro loader plays once per session.

## Deploying

`public/_redirects` handles SPA routing on Netlify. On Vercel add a rewrite of `/(.*)` to `/index.html`.
