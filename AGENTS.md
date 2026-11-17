<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Signed-in profiles and attempts use Cloud; anonymous progress stays local and is not silently attributed to a new account, preventing shared-browser data leakage.
- Store roles separately and authorize student linking in server functions only; verified exact email matches prevent forged links to another student's private progress.
- Global account corrections use an admin-only audited RPC limited to teacher/student; institutional membership does not assign global roles, preserving separate account, institution and payment permissions.
- Role lookup accepts self, verified administrators or service-role callers only; this preserves authorization checks without exposing other users' roles.
- Derive streaks from attempts in America/Costa_Rica without recurring jobs; this preserves local-day boundaries and keeps runtime cost low.
- Static metrology sheets and bilingual bank exercises share canonical answer indices; bank scoring is recomputed server-side and AI scores are labeled self-reported.
- Browser catalogs contain metadata only; canonical question banks load inside authenticated server handlers after my_access verification, including attempts and all quiz/game paths. This prevents subscription bypass via shipped browser data.
- AI practice generation runs in src/lib/ai.functions.ts server function, grounded on the question banks; why: keep prompts and keys server-side.
- Topic sheets use a shared bilingual library with stable grade-and-mode deck IDs; server scoring uses the same canonical keys to prevent client-reported grades.
- Teacher-entered subject progress is stored separately from scored attempts and protected by roster ownership policies; manual progress must never inflate verified quiz scores or streaks.
- Difficulty XP awards correct canonical answers 10/20/30 points, while grades remain accuracy percentages; persist points on attempts and preserve legacy keys through versioned expanded decks.
- Admin user tracing uses a role-checked database RPC and expiring private document links; support cases are internal records, not user-to-user messaging.
- Audit account status changes with a database trigger so all authorized update paths leave a history.
- PDF text extraction runs locally with a dynamically imported PDF reader; documents are not uploaded or stored by this flow.
- AI inference is blocked server-side until a verified spending authorization exists; client controls never establish free coverage.
- Personal AI history is owner-readable only and server-written; actual credits stay unknown until provider-confirmed, preventing fabricated billing totals.
- Specialty navigation shares one canonical deck mapping; pending specialties never link to unrelated exams.
- Payment access requires confirmed payments; the database starts the annual period on administrative confirmation, preventing reference-only activation.
- MEP study guides use a shared source-and-chapter catalog and prebuilt static PDF assets; this keeps downloads consistent with on-screen examples without runtime AI or PDF dependencies.
- Manuals are static PDFs; live checkout stays blocked until sandbox verification. Institution catalogs project approved metadata only; private drafts and keys retain role checks.
- Teacher PayPal orders use owner-scoped persisted exchange quotes and unique quote/capture references; verify approved orders and exact quoted amounts before capture so retries cannot extend access or change currency silently.
- Duplicate PayPal captures succeed only after reading the matching owner-scoped confirmed payment; uniqueness conflicts alone must never be treated as activation evidence.
- Payment history reads owner-filtered rows with RLS and refreshes after successful submissions/captures; only persisted status is displayed as confirmation.
- Skill progress uses canonical deck-to-area mappings and verified attempts only; teacher-entered progress remains separate so unrelated areas and self-reported scores never inflate mastery.
- Specialty search resolves aliases to canonical booklet codes and uses URL search selection; this keeps direct links and card selection consistent without exposing question banks.
- The library barrel imports its canonical stylesheet so consumers inherit the token mappings and base styles when importing library components.
- Timed exam routes delegate timing and completion to BlindExam so nested clocks cannot disagree about final feedback.
- Material citations resolve by exact subject and grade; use an explicitly unreviewed general catalog fallback rather than attributing unrelated programs to a material.
- The coverage inventory derives from canonical modality mappings and public bank metadata; primary mixed banks live in a separate review selection rather than under individual subjects.
- Arena uses private short decks through the existing authorized content handler and a pure local turn engine; recreational scores never create academic attempts or spend AI credits.
- Contextual language practice uses versioned private decks with public metadata for each language and didactic band; initial blocks must not be labeled full CEFR or HSK certification tests.
- Logic games use pure tested state transitions and local recreational results; electrical and financial scenarios are explicitly idealized simulations, never real-world operating instructions.

- Home uses progressive disclosure for the extended practice catalog; the shared search keeps a scroll-bounded result list dismissible with Escape to prevent growing content from overwhelming navigation.

- Recreational sessions are owner-reported private records separate from academic attempts; only server-issued full-bank exam sessions can support new certificates after two scores strictly above the policy threshold in the same canonical subject.
- Versioned study blocks share an explicit canonical subject key for exam evidence; preview catalogs expose metadata only, so different blocks can support the same subject without leaking answer banks.
- Learning notices and badges derive from owner-scoped verified attempts; device notices require opt-in and an open progress screen, avoiding claims of background push delivery.

- Persist question-form IDs with attempts and exam sessions and reconstruct forms in authorized scoring; never change canonical bank keys or score a shuffled variant against its base order.
- Conversation practice uses opt-in device speech and local transient transcripts, never certified pronunciation scores or user-to-user messaging.
- Teacher group membership and assignments remain owner-scoped with roster ownership checks; certificate lookup uses a server-verified linked student, and completion derives from later verified same-bank exams.
- Assessment drafts store only owner/mode-scoped responses, position, form and remaining time locally; reload questions through authorized content and restore only an identical bank signature to avoid scoring mismatched forms or sharing anonymous progress.
- Free student access codes are admin-created rows redeemed via a security-definer RPC that my_access counts as a paid period; clients never grant access directly.
- Board and piece colors use dedicated global semantic tokens independent of page theme, so both chess sides remain legible in every theme.
- Network learning blocks use private canonical decks and one mixed exam subject; public summaries and catalog metadata never import answer banks.
- Book reading progress uses versioned topic IDs and owner-scoped records, separate from scores; teachers read only their linked roster and exam associations use exact canonical deck mappings to avoid invented mastery.
- Home grade links derive from published book topics and exact public deck IDs; missing exam mappings stay explicit to avoid invented grade coverage.
- Teacher templates stay session-local; regulations link unchanged. Teacher RPC/RLS enforce role plus trial or confirmed teacher payment to prevent student-plan privilege escalation.
- Assessment sizes use a shared helper; preserve canonical indices so shorter practices keep server scoring valid.
- Family enrollment requests are guardian-owned rows reviewed via review_enrollment RPC; files live in private enrollment-files {inst}/{guardian}/; approval hashes SHA-256 so links are verifiable and never client-granted.
- Additional institutional roles use separate audited assignments and explicit aggregate-report grants; honorific roles never grant private access or global privileges.
- Institutional JSON backups use a role-checked database RPC projecting users, issued grades and permission metadata; medical details, attachments and credentials are excluded.
- PayPal provider captures are recorded pending administrative review; only confirmed payment rows grant access, and live checkout remains blocked until verification.
- Introductory subject missions use separate public recreational scenarios, never private exam banks or academic grades; institution game tariffs match explicit juego:<subject> scope rather than unrelated service prices.
- Migration review parses backups locally without importing accounts or permissions, preserving source IDs and flagging unresolved links before any destination-specific conversion.

- Poster drafts render photos locally to a token-themed canvas and export PNG only; downloads neither publish institutional resources nor bypass approvals.
- Institution contact profiles are member-readable and direccion/admin-editable through RLS; contact names and links never assign roles or grant publication rights.
- Permission edits use an owner-only pending-request RPC with before/after audit; resolved decisions and verification payloads remain immutable.
- GradeBook shares REAC weight resolution by exact subject/explicit grade for all viewers; ambiguous modalities retain entered weights without bulk private-data writes.
- Schedule file imports validate weekly loads locally and generate preview options through the existing scheduler before explicit owner-authorized saving.
- Section schedule views read saved cells; optional room/time fields stay unassigned when absent, avoiding invented institutional allocations.
