---
name: Dark Academia Scholar
colors:
  surface: '#19120e'
  surface-dim: '#19120e'
  surface-bright: '#403733'
  surface-container-lowest: '#130d09'
  surface-container-low: '#211a16'
  surface-container: '#251e1a'
  surface-container-high: '#302824'
  surface-container-highest: '#3b332f'
  on-surface: '#eee0d9'
  on-surface-variant: '#c3c8bc'
  inverse-surface: '#eee0d9'
  inverse-on-surface: '#372f2a'
  outline: '#8d9287'
  outline-variant: '#43483f'
  surface-tint: '#aed09c'
  primary: '#aed09c'
  on-primary: '#1b3711'
  primary-container: '#2d4a22'
  on-primary-container: '#97b986'
  inverse-primary: '#48663b'
  secondary: '#e2bfb0'
  on-secondary: '#412b21'
  secondary-container: '#5a4136'
  on-secondary-container: '#d0ae9f'
  tertiary: '#ffb872'
  on-tertiary: '#4a2800'
  tertiary-container: '#653800'
  on-tertiary-container: '#f19d44'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c9edb6'
  primary-fixed-dim: '#aed09c'
  on-primary-fixed: '#052101'
  on-primary-fixed-variant: '#314e26'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#e2bfb0'
  on-secondary-fixed: '#2a170e'
  on-secondary-fixed-variant: '#5a4136'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb872'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#19120e'
  on-background: '#eee0d9'
  surface-variant: '#3b332f'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  title-md:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: EB Garamond
    fontSize: 19px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: EB Garamond
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: EB Garamond
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Newsreader
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Newsreader
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Newsreader
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.12em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels an atmospheric, intellectual, and nostalgic dark academia aesthetic tailored for archival research, literary journals, collegiate platforms, and specialized cultural discovery. The tone evokes leather-bound volumes, historic libraries, botanical folios, and autumn afternoons spent studying beside tall mullioned windows.

The design philosophy synthesizes:
- **Literary Materiality:** Warm antique parchment surfaces, rich walnut framing, and tactile botanical detailing that mimic archival manuscripts without devolving into kitsch.
- **Modern Scholastic Discipline:** Balanced editorial grids, intentional proportioning, and rigorous typographic hierarchies inspired by classical typesetting.
- **Atmospheric Palette:** Dense walnut and espresso tones paired with lush forest moss greens, accented by glowing burnt amber and burnished gold.

The interface should feel contemplative, prestigious, patient, and tactile, encouraging immersive reading and serious scholarly engagement.

## Colors

The palette balances dark library environments with luminous parchment elements and forest-grounded accents:

- **Primary (`#2d4a22` / Moss & Deep Forest):** Used for primary action indicators, selected archival states, refined botanical motifs, and focused navigation highlights.
- **Secondary (`#382319` / Deep Walnut & Espresso):** Serves as structural containment, framing elevated cards, sidebars, dividers, and deep background canvases.
- **Tertiary (`#c47820` / Burnt Amber & Gold):** Applied sparingly to draw the eye to critical metadata, seals, bookmark markers, notification badges, and active interactive borders.
- **Neutral (`#211a16` / Peat Charcoal Base):** The primary canvas background, creating an intimate, dimly lit reading sanctuary that mitigates screen glare.
- **Surface & Text Contrast (Warm Parchment / Cream `#f4eedb` and `#dfd5be`):** Text levels, illuminated manuscript borders, and secondary container fills adopt warm cream and aged parchment hues to maintain accessible contrast against walnut grounds.

## Typography

Typesetting follows classical book design and academic folio standards:
- **EB Garamond** anchors all editorial headlines, titles, and continuous reading text. It carries the weight and literary dignity of vintage letterpress and handset type. Body text is typeset with generous leading (line-height) to simulate archival prose layout.
- **Newsreader** delivers small labels, metadata tags, catalog indexes, and folio numbers. Its structured italic and uppercase tracking lend academic rigor to auxiliary UI controls.
- Small caps and uppercase treatments with tracked letter spacing (`letterSpacing: 0.08em` to `0.12em`) are reserved strictly for index tags, dates, callout prefixes, and chapter headings.

## Layout & Spacing

Layout follows an editorial broadsheet approach using a 12-column dynamic grid on desktop, transitioning to an 8-column layout on tablets and a 4-column layout on mobile devices.

- **Margins & Safe Zones:** Canvas margins remain generous to emulate the wide unprinted borders of rare manuscripts, establishing calm reading boundaries.
- **Proportions:** Vertical rhythm scales in multiples of 8px. Text-heavy columns must never exceed 68–72 characters per line to protect long-form legibility.
- **Reflow & Breakpoints:** Desktop layouts (>1024px) utilize dual-margin spreads (e.g., sidebar catalog column alongside the main manuscript canvas). Tablet screens (768px–1023px) collapse auxiliary annotation rails into collapsible footers or sliding drawers. Mobile (<768px) adapts into an uninterrupted, single-column reading column with a sticky top metadata ledger.

## Elevation & Depth

Depth is established through rich tonal layering and low-contrast borders rather than modern synthetic drop shadows.

- **Tonal Layers:** The lowest stratum is the deep neutral background (`#211a16`). Raised panels, library cases, and navigation surfaces step upward into deep espresso walnut (`#2e231d` to `#382319`). Focal reading scrolls and card insets sit upon muted parchment tiers (`#dfd5be` text over `#2b201a` or muted parchment slabs `#ece5d0` for highlighted editorial inserts).
- **Archival Insets & Borders:** Visual boundaries rely on delicate 1px borders colored in oxidized amber (`rgba(196, 120, 32, 0.25)`) or muted forest green (`rgba(45, 74, 34, 0.4)`), mimicking blind debossing and gold-foil tool marks on leather binding.
- **Ambient Glows:** Where elevation is necessary for popovers and modal folios, use low-radius, warm-tinted shadows: `0 12px 32px -4px rgba(10, 8, 7, 0.75)`, paired with a fine gold-tinted hairline stroke.

## Shapes

The design system implements a soft, understated curvature (`roundedness: 1`). Corners are gently trimmed rather than overtly rounded:

- Base elements (buttons, inputs, chips) carry a subtle `0.25rem` (4px) radius, resembling hand-cut heavy paper, trimmed archival boards, and book spine corners.
- Large containers and showcase cards utilize `rounded-lg` (`0.5rem` / 8px).
- Modals, folios, and botanical exhibition plates reach `rounded-xl` (`0.75rem` / 12px).
- Circular or pill forms are avoided except for round wax-seal badges and bookmark tabs, reinforcing architectural and bookish geometry.

## Components

### Buttons
- **Primary:** Forest moss green background (`#2d4a22`) with warm parchment white typography (`#f4eedb`), bordered with a 1px deep spruce line (`#1e3317`). Hover state transitions to deep moss (`#3a5e2c`) with an inner burnished amber highlight glow.
- **Secondary / Archival:** Rich espresso background (`#382319`) with antique cream text (`#dfd5be`) and an aged amber hairline border (`rgba(196, 120, 32, 0.35)`).
- **Text / Scholastic Action:** Plain serif typography in gold amber (`#c47820`) accompanied by an understated arrow or botanical flourish icon, featuring an animated underline on hover.

### Chips & Index Tags
- Enclosed with a 1px border (`rgba(196, 120, 32, 0.3)`), using subdued dark walnut surfaces (`#2b201a`). Text uses uppercase Newsreader labels with tracking (`label-sm`).
- Active and filter-selected chips switch to forest moss fills (`#2d4a22`) with crisp parchment text.

### Cards (Botanical & Scholastic)
- Constructed with deep espresso framing, framed with a double-rule hairline border (1px solid amber outer, 1px faint moss inner).
- Header areas feature EB Garamond titles over faint watermark-style botanical linework or etched scholastic vignettes.
- Metadata ledgers along card footers use small Newsreader labels separated by diamond bullet points (`◆`).

### Input Fields & Controls
- Form controls adopt an antique ledger aesthetic: deep walnut-toned fields (`#261d18`), inset shadow, and a 1px mute border (`#4a372c`).
- Focus states trigger a 1px burnished amber outline (`#c47820`) with no harsh outer glow rings.
- Checkboxes and radio buttons resemble stamped ledger marks: square with clipped corners, filled with forest green when checked, featuring an engraved parchment glyph or checkmark.

### Lists & Folio Catalogs
- Itemized indices display thin horizontal dividers with alternating row tinting (`rgba(56, 35, 25, 0.4)`).
- Prefix numbering is rendered in Newsreader italic numerals with a muted gold tint (`#c47820`).

### Additional Domain Components
- **Marginalia Note:** Aside callout with a thick left border in moss green (`#2d4a22`) or amber (`#c47820`), rendering commentary in italicized EB Garamond.
- **Bookplate Monogram:** Decorative corner accents on featured study modules and archival transcripts simulating library provenance stamps.