# Components

Component catalog for **PracticaTecnica**. Import all components from `@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8`.

### AccessGate

```ts
import { AccessGate } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### AccountProvider

```ts
import { AccountProvider } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### AdminUserDetails

```ts
import { AdminUserDetails } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### AiPractice

```ts
import { AiPractice } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### AuthorizedContent

```ts
import { AuthorizedContent } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Load access-checked private content, reusing the exact owner-scoped question form when an unfinished local draft exists.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `id` | string | `—` |
| `lang` | es · en | `es` |
| `exam` | boolean | `false` |
| `children` | function | `—` |

**Examples:**

_Authorized examination_
```tsx
<AuthorizedContent id="mep-math-01-v1" exam>{deck => <BlindExam deck={deck} onExit={close} />}</AuthorizedContent>
```

**Avoid:**

- Do not bypass access verification or publish private banks.
- Do not claim option permutations create new concepts or guarantee unique tests.

### BlindExam

```ts
import { BlindExam } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Final-feedback exam with owner-scoped local resume of responses, item and remaining time for identical question forms; canonical scoring remains server-side.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `deck` | any | `—` |
| `onExit` | function | `—` |

**Examples:**

_Authorized examination_
```tsx
<BlindExam deck={catalogDeck} onExit={close} />
```

**Avoid:**

- Do not certify trivia, game, partial or guided-practice attempts; do not treat short introductory banks as complete examinations.

### BottomNav

```ts
import { BottomNav } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Mobile navigation to Home, downloadable Books, all Games and private Learning progress.

**Examples:**

_Mobile navigation_
```tsx
<BottomNav />
```

**Avoid:**

- Do not label a link Games while routing only to the roulette or Arena.

### Button

```ts
import { Button } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

**Props:**

| Prop | Type | Default |
|---|---|---|
| `variant` | default · destructive · outline · secondary · ghost · link | `default` |
| `size` | default · sm · lg · icon | `default` |
| `asChild` | boolean | `false` |

### CitedSources

```ts
import { CitedSources } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Show documentary references alongside an independent material, preserving review status and printable URLs.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `sources` | any | `—` |

**Examples:**

_Curricular reference_
```tsx
<CitedSources sources={sourcesForMaterial('Español', 1)} />
```

**Avoid:**

- Do not imply official endorsement or completed review from a source link alone.
- Do not attribute unrelated grades or subjects to a material.

### Constants

```ts
import { Constants } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### DiscountBox

```ts
import { DiscountBox } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### EventName

```ts
import { EventName } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### Greeting

```ts
import { Greeting } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### IdDocumentUpload

```ts
import { IdDocumentUpload } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### IndicatorBank

```ts
import { IndicatorBank } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### InstallAppButton

```ts
import { InstallAppButton } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### InviteBox

```ts
import { InviteBox } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### LearningRecords

```ts
import { LearningRecords } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### LevelTest

```ts
import { LevelTest } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### MepBooks

```ts
import { MepBooks } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Browse independent specialty summaries with examples, chapter-level official curriculum links and existing sourced PDFs.

**Examples:**

_Specialty library_
```tsx
<MepBooks />
```

**Avoid:**

- Do not describe these summaries as official MEP publications or complete programs.

### MyAIHistory

```ts
import { MyAIHistory } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### MyPaymentStatus

```ts
import { MyPaymentStatus } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### PaymentTestModeBanner

```ts
import { PaymentTestModeBanner } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### PaypalButtons

```ts
import { PaypalButtons } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### PortalDoors

```ts
import { PortalDoors } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Use for discovery of study areas, specialties and institution-specific admission paths; UTN is academic preparation, not an entrance exam.

**Examples:**

_Study navigation_
```tsx
<PortalDoors />
```

**Avoid:**

- Do not claim unavailable exercises exist or route a specialty to an unrelated question bank.

### Progress

```ts
import { Progress } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### PromoBanners

```ts
import { PromoBanners } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### QuickBar

```ts
import { QuickBar } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Single bounded study search with exact curriculum results and direct access to canonical subject practice/exam blocks.

**Examples:**

_Study navigation_
```tsx
<QuickBar />
```

**Avoid:**

- Do not substitute unrelated subjects for scoped grade or institution queries.

### Quiz

```ts
import { Quiz } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Guided practice with immediate feedback and owner-scoped local resume of item, answers and option order.

**Props:**

| Prop | Type | Default |
|---|---|---|
| `deck` | any | `—` |
| `onExit` | function | `—` |
| `onMore` | function | `—` |
| `lang` | es · en | `es` |

**Examples:**

_Guided practice_
```tsx
<Quiz deck={deck} onExit={close} />
```

**Avoid:**

- Do not treat local draft scores as verified academic attempts.

### SchoolPractice

```ts
import { SchoolPractice } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### SiteHeader

```ts
import { SiteHeader } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

Compact navigation, initially collapsed on every viewport. More is independently collapsed; drawer supports Escape and focus trapping.

**Examples:**

_Page navigation_
```tsx
<SiteHeader />
```

**Avoid:**

- Do not use visible navigation as authorization.
- Do not open the navigation or More automatically.

### SkillProgress

```ts
import { SkillProgress } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### TeacherHub

```ts
import { TeacherHub } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

### ThemeToggle

```ts
import { ThemeToggle } from "@ws-zjiy9uovp0yxxlsz6zow/bda1855d-052a-47b1-a65b-3d9cd58491b8"
```

