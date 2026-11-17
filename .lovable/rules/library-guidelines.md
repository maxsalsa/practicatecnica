# PracticaTecnica — Guidelines

## Components

The design system exports these components — import them from `@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8` and compose them before building anything from scratch:

`AccessGate`, `AccountProvider`, `AdminUserDetails`, `AiPractice`, `AuthorizedContent`, `BlindExam`, `BottomNav`, `Button`, `CitedSources`, `Constants`, `DiscountBox`, `EventName`, `Greeting`, `IdDocumentUpload`, `IndicatorBank`, `InstallAppButton`, `InviteBox`, `LearningRecords`, `LevelTest`, `MepBooks`, `MyAIHistory`, `MyPaymentStatus`, `PaymentTestModeBanner`, `PaypalButtons`, `PortalDoors`, `Progress`, `PromoBanners`, `QuickBar`, `Quiz`, `SchoolPractice`, `SiteHeader`, `SkillProgress`, `TeacherHub`, `ThemeToggle`

Per-component details (import stanzas, props, variants, examples) live in `.lovable/rules/libraries/{slug}/components.md` — on disk, not auto-loaded. Read that file or the component source when the name alone isn't enough.

## Theme Files

The design system's theme is delivered through the following files. The author's original source files carry the full wiring the design system needs — variable declarations, framework-specific directives, provider objects, etc. — and are the canonical import target.

- `@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8/styles.css` (source — preferred import)
- `@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8/dist/tokens.css` (auto-generated flat list of CSS custom properties — a raw-values fallback only; does NOT carry framework-specific wiring that the source files above provide)

