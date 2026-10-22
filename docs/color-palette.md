# LingoLaab color palette

These three palettes are the visual direction to preserve during the platform rebuild. Existing CSS values remain unchanged. The implementation source is `frontend/src/assets/main.css`; use its semantic variables rather than introducing unrelated colors.

## Palette 1: The Core Gamified Interface (High Engagement)

Best for main dashboards, vocabulary flashcards, and gamified streak screens, similar to Duolingo or Babbel.

| Role | Color | Existing CSS token and value | Intended use |
| --- | --- | --- | --- |
| Primary Base | Crisp White | `--color-base: #FFFFFF`, `--color-surface: #FFFFFF` | Clean, non-distracting backgrounds |
| Brand Identifier | Cyan | `--color-brand-cyan: #00A8CC` | Primary navigation tabs, active states, logos |
| Action & Success | Lime Green | `--color-action-success: #58CC02` | Correct-answer banners, continue buttons, daily streaks |
| Error & Warning | Vermillion | `--color-error-vermillion: #E63946` | Incorrect answers, critical alerts, review flags |
| Accent Text | Deep Purple | `--color-text: #2E1065`, `--color-text-body: #3B185F` | Readable, high-contrast lesson text |

The existing supporting brand accent is `--color-accent-purple: #531D5C`. The light page background is `--color-bg: #F8FAFC`; white remains the primary base and surface color.

## Palette 2: The Proficiency Level Scale (Functional Separation)

Best for categorizing language courses, separating grammar modules, and color-coding difficulty from A1 to C2.

| Role | Color | Existing CSS token and value | Intended use |
| --- | --- | --- | --- |
| Beginner Modules (A1–A2) | Mint Blue | `--level-beginner: #38BDF8` | Calming, welcoming, low-pressure entry into learning |
| Intermediate Modules (B1–B2) | Mustard Yellow | `--level-intermediate: #F59E0B` | Energetic, focused progression as difficulty increases |
| Advanced Modules (C1–C2) | Deep Purple | `--level-advanced: #6B21A8` | Academic mastery and premium content |
| Global Accents | Cyan | `--color-brand-cyan: #00A8CC` | Universal actions that tie progression together |

“Mint Blue” and “Mustard Yellow” preserve the product palette's names; the hex values above record the existing implementation. Each proficiency token also has `-bg` and `-text` variants for badges and labels. Pair color with explicit level labels so difficulty is understandable without color alone.

## Palette 3: Accessible Dark Mode / Focus Mode (Late-Night Study)

Best for night-mode experiences and heavy reading or listening comprehension screens. Premium-tier use is a possible product application, not an implemented entitlement.

Activated by `[data-theme="dark"]` on the document root.

| Role | Color | Existing CSS token and value | Intended use |
| --- | --- | --- | --- |
| Background Base | Deep Purple / dark eggplant | `--color-bg: #120721`, `--color-base: #1A0B2E`, `--color-surface: #1E0D36` | Replace harsh black/gray backgrounds |
| Primary Text | Crisp White | `--color-text: #FFFFFF` | Legibility against dark purple |
| Interactive UI Elements | Cyan | `--color-brand-cyan: #00E5FF` | Buttons, active states, progress bars |
| Highlights / Achievements | Mustard Yellow or Mint Blue | `--level-intermediate: #F59E0B`, `--level-beginner: #38BDF8` | Unlocked badges and grammar tips |

Existing dark-mode success and error variants are `#4ADE80` and `#F87171`; body text is `#F1F5F9`. Proficiency colors currently inherit their root values. The palette name describes the design goal: contrast still needs checking for each foreground/background combination, text size, and interaction state. Existing screens have incomplete dark-mode coverage because some backgrounds are hardcoded.

## Preservation rules

- Keep these three palettes and their semantic roles when replacing prototype screens.
- Reuse existing hover, subtle-background, border, and text variants from `main.css`.
- Use cyan for navigation and universal actions; lime green indicates success and continuation.
- Keep errors visibly distinct and explain them in text.
- Document any deliberate future token-value change here alongside the CSS change.
