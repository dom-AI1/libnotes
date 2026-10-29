# LIBNOTES — OFFICIAL BUG TRACKER & REPAIR REGISTRY

**Severity Taxonomy**:
- **P0**: Critical security vulnerability, authentication bypass, or direct data loss.
- **P1**: Core functionality failure, pipeline crash, white screen, or fundamentally ungrounded educational output.
- **P2**: Major usability, PDF layout defect, curriculum misalignment, or resource abuse.
- **P3**: Minor visual polish, spacing, or cosmetic inconsistency.

---

| Bug ID | Severity | Category | Title | Affected Files | Status |
|--------|----------|----------|-------|----------------|--------|
| **BUG-P1-01** | P1 | Pipeline / Crash | White Screen of Death on Note Generation & Unhandled React Exceptions | `src/App.tsx`, `src/components/NotesView.tsx`, `src/main.tsx` | **VERIFIED FIXED** |
| **BUG-P1-02** | P1 | Auth / Gate | Unauthenticated Users Able to Click "Generate Notes" Without Account | `src/components/Hero.tsx`, `src/components/UploadModal.tsx`, `src/App.tsx` | **VERIFIED FIXED** |
| **BUG-P0-01** | P0 | Security / RLS | Unrestricted Public RLS on `study_kits` & Missing `user_id` Column | `supabase_schema.sql`, `src/services/supabaseService.ts`, `src/types.ts` | **VERIFIED FIXED** |
| **BUG-P1-03** | P1 | Deployment / CI | Cloudflare Worker Failed Deploy Due to Missing Build Command & Dist | `wrangler.jsonc`, `package.json` | **VERIFIED FIXED** |
| **BUG-P2-01** | P2 | Resource / Quota | Free-Plan Daily PDF Quota Not Enforced (Exceeding 1 PDF/UTC Day) | `src/services/quotaService.ts`, `src/components/PdfExportModal.tsx`, `supabase_schema.sql` | **VERIFIED FIXED** |
| **BUG-P2-02** | P2 | Curriculum | Class 10 Separated PCB & Class 12 Missing Stream Picker (Science/Commerce/Arts) | `src/constants/curriculum.ts`, `src/components/UploadModal.tsx` | **VERIFIED FIXED** |
| **BUG-P2-03** | P2 | Audio / UX | Voice/Audio Upload Forced Manual Syllabus Instead of AI Auto-Detection | `src/components/UploadModal.tsx`, `src/services/aiProcessingService.ts` | **VERIFIED FIXED** |
| **BUG-P2-04** | P2 | Responsive / UI | Product Preview Style Tabs Overflowing and Breaking Lines on Mobile | `src/components/ProductPreview.tsx` | **VERIFIED FIXED** |
| **BUG-P2-05** | P2 | PDF Typography | Special Unicode Math & Greek Glyphs (`η`, `Δ`, `∫`) Corrupted to `?` in jsPDF | `src/services/pdfExportService.ts` | **VERIFIED FIXED** |
| **BUG-P2-06** | P2 | PDF Layout | Oversized Formal Cover Page Pushing Notes to Page 3 Without User Intent | `src/services/pdfExportService.ts`, `src/components/PdfExportModal.tsx` | **VERIFIED FIXED** |

---

## DETAILED BUG AUDIT & REPAIR LOGS

### BUG-P1-01: White Screen of Death on Note Generation & Unhandled React Exceptions
- **Severity**: P1 (Core Functionality Broken / Crash)
- **Reproduction**:
  1. Open application at `#/home`.
  2. Paste a lecture link and click "Generate Notes".
  3. Submit in the modal.
  4. React unmounts completely, displaying a totally blank white screen (`<div id="root"></div>`).
- **Root Cause**:
  1. `activeKit` in `App.tsx` could evaluate to `undefined` if state synchronization was delayed or `studyKits` was empty.
  2. `NotesView.tsx` directly accessed nested properties (`kit.content.topper.introduction`, `kit.content.exam.questions.map`, `kit.content.quick.cheatSheet`) without defensive null checks or optional chaining (`?.`).
  3. No React `ErrorBoundary` existed in the application tree, causing any render-phase exception to destroy the root DOM.
- **Fix Implemented**:
  1. Created [`src/components/ErrorBoundary.tsx`](file:///C:/notebook/src/components/ErrorBoundary.tsx) and wrapped the entire root in `src/main.tsx`.
  2. Applied safe optional chaining (`?.`) with sensible fallbacks across all 5 note tabs in `src/components/NotesView.tsx`.
  3. Added guaranteed fallback `SAMPLE_STUDY_KITS[0]` in `App.tsx`.
- **Regression Test**: Vitest test suites `tests/e2e-journey.test.ts` and `tests/libnotes-rebuild-checkpoints.test.ts`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P1-02: Unauthenticated Users Able to Click "Generate Notes" Without Account
- **Severity**: P1 (Access Control Defect)
- **Reproduction**:
  1. Navigate to `#/home` in an incognito window without logging in.
  2. Click "Generate Notes" in the Hero bar.
  3. The generation modal opened and allowed guests to generate notes without saving to an account.
- **Root Cause**: The Hero component's submit handler invoked `onStartGeneration` directly without checking `isAuthenticated`.
- **Fix Implemented**:
  1. Added `isAuthenticated` and `onRequireAuth` props to `Hero`, `FinalCTA`, and `UploadModal`.
  2. When an unauthenticated user clicks "Generate Notes", their entered URL and note style are stored in `sessionStorage` (`libnotes_pending_generation`) and they are redirected to `#/signup?redirect=%2Fnew-lecture`.
  3. Upon successful registration or login, Libnotes automatically retrieves the pending lecture and re-opens the generation modal without losing input.
- **Regression Test**: `tests/google-auth-welcome.test.tsx` and manual flow verification.
- **Status**: **VERIFIED FIXED**

---

### BUG-P0-01: Unrestricted Public RLS on `study_kits` & Missing `user_id` Column
- **Severity**: P0 (Data Security & Isolation)
- **Reproduction**: Inspecting `supabase_schema.sql` revealed `CREATE POLICY "Allow public insert and update access to study_kits" FOR ALL USING (true) WITH CHECK (true)` on `public.study_kits` and `public.quiz_attempts`.
- **Root Cause**: Legacy schema lacked `user_id UUID REFERENCES auth.users(id)` column and applied blanket public write permissions.
- **Fix Implemented**:
  1. Added `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE` to `study_kits` and `quiz_attempts`.
  2. Replaced open policies with secure RLS: users can only select, insert, update, or delete records where `auth.uid() = user_id` (or `user_id IS NULL` for public sample study kits).
  3. Updated `src/services/supabaseService.ts` to attach `auth.getUser()` ID during upserts.
- **Regression Test**: `tests/supabase-integration.test.ts` and `tests/storage-security.test.ts`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P1-03: Cloudflare Worker Failed Deploy Due to Missing Build Command & Dist
- **Severity**: P1 (Production Deployment Failure)
- **Reproduction**: Triggering Cloudflare deployment resulted in `✘ [ERROR] The directory specified by the "assets.directory" field in your configuration file does not exist: /opt/buildhome/repo/dist`.
- **Root Cause**: Cloudflare Workers CI executes `npx wrangler deploy` without automatically executing `npm run build` unless configured in `wrangler.jsonc`.
- **Fix Implemented**:
  1. Added `"build": { "command": "npm run build" }` inside [`wrangler.jsonc`](file:///C:/notebook/wrangler.jsonc).
  2. Added `"predeploy": "npm run build"` in `package.json`.
  3. Verified `dist` folder generation and SPA routing with `not_found_handling: "single-page-application"`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-01: Free-Plan Daily PDF Quota Not Enforced (Exceeding 1 PDF/UTC Day)
- **Severity**: P2 (Resource Protection / Free Tier Safeguard)
- **Reproduction**: A user could export unlimited distinct study kit PDFs without restriction.
- **Root Cause**: Missing rate-limiting and quota tracking logic.
- **Fix Implemented**:
  1. Created [`src/services/quotaService.ts`](file:///C:/notebook/src/services/quotaService.ts) implementing atomic daily quota checking:
     - Exactly 1 new PDF generation allowed per user per UTC calendar day.
     - Unlimited free re-downloads of previously generated PDFs without consuming quota.
     - Mutex lock preventing concurrent duplicate clicks.
     - UTC calendar boundary rollover at 00:00 UTC.
  2. Added `pdf_generations` table and `check_and_consume_pdf_quota` RPC function in `supabase_schema.sql`.
  3. Integrated quota guard into `src/components/PdfExportModal.tsx`.
- **Regression Test**: Automated suite `tests/resource-quota.test.ts` (7 tests passing).
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-02: Class 10 Separated PCB & Class 12 Missing Stream Picker
- **Severity**: P2 (Curriculum & Educational Accuracy)
- **Reproduction**: Selecting Class 10 showed separate Physics, Chemistry, and Biology. Selecting Class 12 did not ask for Science, Commerce, or Arts stream.
- **Root Cause**: Hardcoded static subject dropdowns in `UploadModal.tsx`.
- **Fix Implemented**:
  1. Built [`src/constants/curriculum.ts`](file:///C:/notebook/src/constants/curriculum.ts) modeling CBSE/NCERT curriculum.
  2. Class 10 strictly features unified Science, SST, Mathematics, English, Hindi, and IT (no streams).
  3. Class 11 & 12 feature dynamic stream selection (Science, Commerce, Arts/Humanities) with stream-accurate subjects.
- **Regression Test**: Automated suite `tests/curriculum-selection.test.ts` (8 tests passing).
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-03: Voice/Audio Upload Forced Manual Syllabus Instead of AI Auto-Detection
- **Severity**: P2 (User Experience & AI Autonomy)
- **Reproduction**: Uploading an audio file (e.g. WhatsApp audio) prompted the user to select class, stream, subject, and chapter manually.
- **Root Cause**: `autoDetect` state was disabled by default on file uploads.
- **Fix Implemented**:
  1. Enabled `autoDetect: true` by default in `UploadModal.tsx`.
  2. Transcribes and analyzes audio conceptual domain automatically, hiding manual syllabus dropdowns unless the user explicitly expands optional overrides.
- **Regression Test**: `tests/curriculum-selection.test.ts`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-04: Product Preview Style Tabs Overflowing and Breaking Lines on Mobile
- **Severity**: P2 (Mobile Usability & Layout)
- **Reproduction**: On mobile screens (320px–375px), the style selector tabs broke onto multiple lines with `Exam PYQ` overflowing the container card.
- **Root Cause**: Flex container lacked responsive grid layout on narrow viewports.
- **Fix Implemented**: Updated `src/components/ProductPreview.tsx` to use responsive grid on mobile (`grid grid-cols-4 sm:flex`) with `whitespace-nowrap` and dynamic label rendering.
- **Regression Test**: `tests/responsiveness-a11y.test.ts`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-05: Special Unicode Math & Greek Glyphs Corrupted to `?` in jsPDF
- **Severity**: P2 (PDF Typography Defect)
- **Reproduction**: Exporting Carnot efficiency $\eta = 1 - T_c/T_h$ produced `? = 1 - Tc/Th` in standard PDF readers.
- **Root Cause**: jsPDF core WinAnsi font encoding lacks direct Unicode codepoint mapping for Greek characters (`η`, `Δ`, `γ`) and math symbols (`∫`, `≠`, `≤`, `≥`).
- **Fix Implemented**: Implemented `cleanTextForPdf()` in `src/services/pdfExportService.ts` mapping mathematical symbols to ISO-clean legible text representations.
- **Regression Test**: `tests/pdf-export.test.ts` and physical PDF generation test `tests/generate-sample-pdf.test.ts`.
- **Status**: **VERIFIED FIXED**

---

### BUG-P2-06: Oversized Formal Cover Page Pushing Notes to Page 3 Without User Intent
- **Severity**: P2 (Educational Value & Print Utility)
- **Reproduction**: Generated PDFs placed a decorative full-page cover on Page 1 and an empty TOC on Page 2, pushing notes down to Page 3.
- **Root Cause**: `includeCoverPage: true` was default in `DEFAULT_PDF_OPTIONS`.
- **Fix Implemented**: Set `includeCoverPage: false` and `includeTableOfContents: false` by default; notes begin immediately on Page 1 below a compact 25mm header banner.
- **Regression Test**: `tests/pdf-export.test.ts`.
- **Status**: **VERIFIED FIXED**
