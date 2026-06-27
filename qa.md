# JR Contracting Perth QA

## Source / Fact Audit

- Business name: JR Contracting - PASS
- Location/service area: Perth WA - PASS
- Phone: `0498 084 872` / `+61 498 084 872` from public snippets - PASS
- Facebook: `https://www.facebook.com/profile.php?id=61566973957416` - PASS
- Services: pre-concrete pressure testing, post-concrete pool cleaning, pool water testing, leak detection, green pool recovery, lighting/customisation/water monitoring - PASS
- Email: no verified public email found - not used
- Street address: no verified street address found - not shown as storefront
- Testimonials: no real written customer testimonials found - no testimonial cards used

## Asset Audit

- `image-map.md` created before final QA - PASS
- Real business logo/profile image used in header/footer/schema - PASS
- Three real Facebook video thumbnails used in gallery - PASS
- Generated hero image used as atmosphere only, recorded in `image-map.md` - PASS
- No generated image presented as JR project proof - PASS
- Gallery copy does not imply a broad completed-project portfolio - PASS

## Form / CTA Audit

- One primary enquiry form in first viewport - PASS
- No fake email route - PASS
- Form sends typed service/suburb/details into an SMS to verified phone number - PASS
- Call fallback present - PASS
- No upload/photo CTA - PASS

## Local Build Checks

- `npm run build` - PASS
- `npm run build:github` - PASS
- `.nojekyll` present and empty in `out/` - PASS
- One H1 - PASS
- One primary form - PASS
- One map iframe - PASS
- Forbidden copy/source-mechanics scan - PASS

## Responsive QA To Complete

- Desktop hero/form screenshot - PASS (`qa-hero-desktop.png`)
- Mobile hero/form screenshot - PASS (`qa-hero-mobile.png`)
- Gallery desktop screenshot - PASS (`qa-gallery-desktop.png`)
- Gallery mobile screenshot - PASS (`qa-gallery-mobile.png`)
- Contact/map/footer screenshot - PASS (`qa-contact-desktop.png`, `qa-contact-mobile.png`)
- Typography readability check on desktop/mobile - PASS

## Live QA To Complete

- GitHub Pages live URL returns HTTP 200
- CSS and hero image return HTTP 200
- Live HTML contains JR Contracting, SMS/call route, gallery, one iframe, schema and latest asset markers
- Live screenshots match local QA
