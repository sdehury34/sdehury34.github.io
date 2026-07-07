# Somashekhar Dehury — Portfolio

Personal portfolio website. Dark, cinematic, motion-rich single page built with
React, Vite, and Framer Motion.

## Highlights

- Interactive "acoustic wavefield" hero background — ultrasound-style pulses
  propagate through a particle grid (heartbeat pulse, cursor-path pulses,
  click pulses) with a scrolling ECG trace
- Animated preloader with kinetic name reveal
- Custom cursor (dot + trailing spring ring, desktop only)
- Ambient light blobs, film-grain overlay, glassmorphism navbar
- Scroll-triggered section reveals and an infinite domain-keyword marquee
- Fully responsive, respects `prefers-reduced-motion`, keyboard-accessible

## Editing content

All text, projects, skills, links, and the photo path live in one file:
`src/data.js`. Edit it and the site updates — no component changes needed.
The profile photo is `public/profile.jpg`.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to /dist
npm run preview  # preview the production build
```

## Deploying to GitHub Pages

The Vite config uses relative asset paths (`base: './'`), so the `dist/`
folder works on GitHub Pages, Netlify, or Vercel without changes.
