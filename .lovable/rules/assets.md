---
description: "Brand assets shipped by the PracticaTecnica design system (logos, icons, illustrations, photography, fonts, videos) with exact import paths. Read before adding any logo, icon, illustration, image, video, or font to the app: use these real assets instead of placeholders, stock photos, or generated images."
---

# PracticaTecnica — Assets

These files are copied into `src/design-system/{slug}/assets/` in this project — never generate, placeholder, or substitute an asset that exists here.

Raw files import directly, e.g. `import logo from "@/design-system/{slug}/assets/logos/logo.svg"`.
R2 pointer files (`.asset.json`) are imported as JSON — use the `url` property, e.g. `import hero from "@/design-system/{slug}/assets/hero.png.asset.json"` then `<img src={hero.url} />`.
The full machine-readable catalog lives in this library's `design-system.json` (`assets` array).

## Logos

- `@/design-system/{slug}/assets/gicm-logo.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/promo/logo_cuadrado.jpg.asset.json` (jpg, R2 pointer)

## Illustrations

- `@/design-system/{slug}/assets/illustrations/learning-achievements.jpg` (jpg)
- `@/design-system/{slug}/assets/illustrations/road-safety-campus.jpg` (jpg)
- `@/design-system/{slug}/assets/illustrations/technical-arena.jpg` (jpg)

## Images

- `@/design-system/{slug}/assets/hero-niveles.jpg` (jpg)
- `@/design-system/{slug}/assets/inicio-compartir.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/promo/promo_aprende.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/promo/promo_probala.jpg.asset.json` (jpg, R2 pointer)
- `@/design-system/{slug}/assets/promo/promo_trivias.jpg.asset.json` (jpg, R2 pointer)

