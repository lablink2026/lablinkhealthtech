# Lablink Design System & UI Specification

This document details the visual layer design tokens, typography rules, glass utility recipes, and component architecture for Lablink.

---

## 1. Design Tokens

The palette is built around a dark, calm, premium atmosphere with a faint green tint in the blacks, floating glass surfaces, and warm off-white primary text. Both dark and light themes are supported via CSS variables mapped directly into Tailwind.

### Dark Theme (Default)

| Token | CSS Variable | Hex / RGBA Value | Usage |
|---|---|---|---|
| Page Background | `--bg` | `#0A0F0D` | Canvas background with faint dot grid |
| Raised Surface | `--bg-raised` | `#101815` | Opaque panels, clinical tables, input fields |
| Glass Surface | `--glass` | `rgba(255, 255, 255, 0.045)` | Floating cards, navigation bars, dropdowns |
| Strong Glass | `--glass-strong` | `rgba(255, 255, 255, 0.075)` | Active states, hover overlays, modal sheets |
| Hairline Border | `--border` | `rgba(255, 255, 255, 0.10)` | 1px borders, table dividers, card outlines |
| Inner Highlight | `--border-highlight` | `rgba(255, 255, 255, 0.08)` | Top inset highlight on glass surfaces |
| Primary Text | `--text` | `#F2F1EA` | Warm off-white headings and primary copy |
| Muted Text | `--text-muted` | `#A9B1AC` | Secondary labels, descriptions, metadata |
| Primary Accent | `--accent` | `#3DBE7A` | Primary green action buttons, active tags |
| Accent Deep | `--accent-deep` | `#1F9D6B` | Gradient end, pressed button states |
| Accent Glow | `--accent-glow` | `rgba(61, 190, 122, 0.35)` | Ambient button glow, active chart shadows |
| Verified Gold | `--gold` | `#E3B04B` | Digital signatures, cryptographic seals |
| Attention Flag | `--attention` | `#F2994A` | Out-of-range clinical values, pending review |
| Critical Flag | `--critical` | `#EF5B5B` | Critical biomarker flags, emergency alerts |

### Light Theme

| Token | CSS Variable | Hex / RGBA Value | Usage |
|---|---|---|---|
| Page Background | `--bg` | `#F6F7F4` | Crisp, warm daylight canvas |
| Raised Surface | `--bg-raised` | `#FFFFFF` | Opaque clinical cards, white card bodies |
| Glass Surface | `--glass` | `rgba(255, 255, 255, 0.72)` | Frosted white glass with soft drop shadow |
| Strong Glass | `--glass-strong` | `rgba(255, 255, 255, 0.90)` | Dropdown menus, floating sheets |
| Hairline Border | `--border` | `rgba(10, 15, 13, 0.08)` | Subtle hairline borders |
| Primary Text | `--text` | `#101815` | Deep obsidian high-contrast text |
| Muted Text | `--text-muted` | `#4A554F` | Body copy and secondary indicators |
| Primary Accent | `--accent` | `#1F9D6B` | Deep emerald green pill buttons |
| Verified Gold | `--gold` | `#A8730F` | Verification seals and accent underline |

---

## 2. Typography Rules

1. **Display & Headings**: **Geist** / **Inter Tight** (`font-sans`), weight 700 to 800, tight tracking (`-0.03em` to `-0.04em`), line-height `0.96` to `1.05`.
2. **Accent Phrase**: **Instrument Serif** (`font-serif`) *italic*, filled with green gradient (`from-[var(--accent)] to-[var(--accent-deep)]`), paired with the hand-drawn gold SVG underline `<GoldUnderline />`.
3. **Body Copy**: **Inter** / **Geist**, 16px to 18px, line-height 1.6, colored with `--text-muted`.
4. **Data Tags & Technical Eyebrows**: **Geist Mono** (`font-mono`), 10px to 12px, letter-spacing `0.12em`.
   * **Rule**: The underlying JSX text is written in **sentence case**, and styled uppercase via CSS (`.data-tag` or `.eyebrow-label`).
5. **Big Numerals**: Stat cards, scores, and large prices render in the italic serif at 36px to 56px (`font-serif italic font-normal`).

---

## 3. Glass Recipe & Styling Utilities

```css
/* Standard Glass Surface */
.glass {
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border: 1px solid var(--border);
  box-shadow: inset 0 1px 0 var(--border-highlight), var(--glass-shadow);
}

/* More Opaque Glass Surface (Hover/Dropdowns) */
.glass-strong {
  background: var(--glass-strong);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid var(--border);
  box-shadow: inset 0 1px 0 var(--border-highlight), var(--glass-shadow);
}

/* Mobile Performance: on viewports < 640px, blur is reduced to 8px */
@media (max-width: 640px) {
  .glass, .glass-strong {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
}
```

---

## 4. Universal Design Rules

* **Sentence Case Everywhere**: All navigation links, buttons, headers, tabs, table column headers, and badges use strict sentence case (only the first word and proper nouns capitalized: *Lablink*, *Paystack*, *MLSCN*, *Lagos*, *Abuja*).
* **No Emoji**: Icons must be thin-stroke line vector icons (1.5px to 2.0px stroke).
* **Opaque Clinical Data Surfaces**: In result pages, trend charts, lab consoles, and admin tables, clinical values and tables use opaque `--bg-raised` for maximum data density, contrast, and readability. Glass is reserved for outer chrome and headers.
* **Visible Keyboard Focus Rings**: All interactive controls feature visible `focus-visible:ring-2 focus-visible:ring-[var(--accent)]`.
* **Demo Badges**: Every demo record or sample code maintains a small amber "Demo" badge.
* **Gold Reservation**: The gold token is strictly reserved for "digitally signed", "verified", and the hand-drawn accent underline.

---

## 5. Reusable Component Inventory

* `<AccentHeading />`: Combines bold grotesque text with an italic serif accent phrase and organic gold SVG underline.
* `<GoldUnderline />`: Hand-drawn vector gold stroke SVG component.
* `<Navbar />`: Floating glass container (inset 24px, 1200px max width, 24px radius, 74px height) with Product ▾ and Solutions ▾ dropdown panels, "Find a lab" primary pill, and square glass theme toggle.
* `<ThemeToggle />`: Accessible square glass toggle with sun/moon line icons and persistent storage.
* `<HeroVerificationEngine />`: Bespoke Lablink artwork featuring a central glass shield with droplet, gold orbit rings, floating demo result cards, and verification toast chips.
* `<Footer />`: Newsletter signup block, brand statement, three link columns (Product, Company, Connect), and legal footer.
