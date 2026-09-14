# NoDoc interview guide

Use this document to explain NoDoc accurately. It is a guide to your project,
not a script to memorize. Say what you personally built, changed, tested, or
reviewed. If another person or tool did work, say so plainly.

## One-minute description

NoDoc is an early-access desktop PDF application for Windows x64 and Apple
silicon Macs. Its value proposition is local-first document work: users can
read, search, organize, merge, split, crop, rotate, watermark, annotate, draw,
place image signatures, protect PDFs with passwords, and use local English OCR
without sending the PDF to NoDoc's document-processing server. The desktop UI
is React, packaged through Tauri/Rust, and communicates with a local Python
PDF-processing sidecar. The public site is a separate React/Vite repository
that publishes real screenshots, release facts, checksums, notices, and early-
access limitations.

Do **not** say it works on every device, supports every PDF, is the best PDF
editor, uses no network under any circumstance, or is production-ready. The
website needs a network connection and installers/updates are downloaded from
the internet. Local output folders, computer backups, or cloud-sync software
can still copy documents outside NoDoc.

## Why local-first matters

A server-based PDF workflow normally needs the browser to transmit a file to a
provider before it can process and return a result. NoDoc's PDF engine runs on
the installed computer, so NoDoc does not require that processing upload. That
helps when documents are personal, confidential, large, or when the user has
no connection.

This is not an accusation that every online PDF provider mishandles files.
Reputable providers publish security and deletion policies, and some products
offer local processing. The honest distinction is: **NoDoc's normal desktop
processing path does not need the upload at all.**

## Architecture you should understand

```text
React desktop UI
  -> Tauri/Rust shell
    -> persistent local Python sidecar / HTTP API
      -> PDF engines (pikepdf/QPDF, PDFium, Pillow, Tesseract)
    <- jobs, paths, metadata, previews
  <- React renders the resulting revision with PDF.js
```

- **React / PDF.js**: reader UI, canvas page rendering, selectable text,
  search, editor controls, and application state.
- **Tauri / Rust**: desktop shell, native process lifecycle, and packaging.
- **Python sidecar**: long-lived local process that exposes the application API
  and runs jobs. It avoids starting a fresh Python interpreter for each action.
- **pikepdf / QPDF**: structural PDF work such as page organization, saved
  content streams, metadata, and encryption operations.
- **PDFium / pypdfium2**: rendering and thumbnail/preview operations.
- **Pillow and Tesseract**: image preparation and local OCR.

The boundary is mostly file/path based, not one giant in-memory PDF buffer. A
job writes an output revision and returns its path; the reader then opens that
saved revision. That makes results inspectable and keeps the UI responsive, but
also means temporary files and cleanup need careful ownership rules.

## Concrete design decisions to explain

### Reader performance

The reader uses PDF.js because it needs actual page rendering, text selection,
and search. A backend page-count or dimensions manifest cannot replace the PDF
content PDF.js needs. Earlier work removed one unnecessary metadata parse from
the normal reader path and introduced page virtualization: visible/nearby pages
have surfaces; distant pages preserve scroll geometry as placeholders.

Recorded development-browser measurements on a 500-page fixture improved
median first-page time from 504.2 ms to 350.7 ms. Do not call that a packaged
Windows benchmark: OS caches were not flushed and the measurement did not
include every real-machine condition.

### Fidelity and trust

PDF output cannot be trusted just because the app preview looks right. The
project's verification work used independent tools such as Poppler and pikepdf
to inspect saved files. Examples include checking output page rotation,
password behavior, text extraction, visible pixels, and PDF annotation
objects. A highlight implementation initially painted a rectangle instead of
creating a standard Highlight annotation; it was corrected and given a
regression test. Draw output was checked as standard Ink annotations with
appearance streams and external rendering.

### Jobs and lifecycle

Long-running operations are asynchronous jobs. The UI enters a busy state,
polls while active, materializes the returned revision, and opens that saved
version. Preview sessions/handles need explicit release and expiry, because
native PDF handles and image caches consume memory even after a user stops
looking at a page.

## What was actually tested

These are recorded results in the repository diagnostics, not claims of total
coverage:

- A prior closeout recorded 73 backend tests and 5 frontend tests passing.
- Browser-driven checks independently verified merge, split, password, and
  rotation output with Poppler/pikepdf inspection.
- Highlight and Draw defects were reproduced, fixed, and given regression
  checks for real PDF annotations and external rendering.
- Development browser checks measured reader virtualization and parsing work.
- The website has production checks for responsive layouts, public downloads,
  interactive controls, reduced motion, legal routes, and no unexpected
  external page requests.

The Rust test command had zero Rust tests in the reported run. Do not imply
Rust unit-test coverage. Some visual capture requirements and broad real-PDF
compatibility checks remain unfinished.

## Important current limitations

- A blank or glitched reader has been reported in the Windows installed app.
  This is the highest-priority product issue because it affects opening PDFs.
- Manual testing of the Apple silicon installed app remains incomplete.
- Current installers are unsigned; the Mac DMG is not notarized. Updates are
  manual.
- Windows download is about 110 MB; Apple-silicon DMG is about 53.5 MB.
- Image signature placement is not certificate-backed digital signing.
- New text placement is not rewriting existing PDF paragraphs like a word
  processor.
- PDF variants with unusual fonts, forms, layers, corrupted structures, or
  complex scanned content may reveal failures not yet tested.
- Third-party Windows OCR/native dependency licensing and source-obligation
  review is incomplete. Notices are provided; that is not legal certification.

If asked why the site publishes an early-access build with this known issue,
answer that it is labelled early access, documents the limitation, provides
checksums and release notes, and should not be presented as a stable release.
The correct next action is fixing and testing the reader—not hiding the issue.

## Questions you may be asked

### Why not use a browser-only PDF tool?

The desktop approach is useful when a user wants an installed, account-free,
local workflow. Browser tools can be convenient and some are secure; the design
choice is about avoiding a required processing upload and supporting offline
work, not claiming browser tools are inherently bad.

### How do you know redaction or annotations are real?

Do not trust the UI alone. Inspect the saved PDF independently: extract text,
inspect content/annotation objects with pikepdf, and render it with a separate
renderer such as Poppler. For redaction specifically, search the saved file for
the original sensitive content after the operation.

### What is the hardest engineering problem?

Maintaining fidelity and lifecycle correctness across three layers: the React
preview, the local job result, and the externally opened PDF. Rendering speed
matters, but a fast editor that silently produces the wrong document loses
trust.

### How would you release it safely?

First reproduce and fix the Windows reader issue in a packaged build. Then run
clean-machine open/render/edit/export/reopen smoke tests on Windows and macOS,
complete license review, sign/notarize installers, publish a versioned release
with hashes and notes, and keep a rollback path. Only then change messaging
from early access to stable.

## A truthful CV line

Use only if it reflects your own contribution:

> Built and deployed an early-access local-first PDF desktop application with
> React, Tauri/Rust, and a Python processing engine; developed independent
> PDF-output checks and a versioned release website.

If you cite the performance number, retain the condition:

> Reduced median first-page load for a 500-page development-browser fixture
> from 504 ms to 351 ms through reader parsing and virtualization improvements.

Never invent user counts, revenue, security certifications, complete test
coverage, or production readiness. Being precise about a limitation and the
next engineering step makes you more credible, not less.

## Website repository ownership and scope

The NoDocWeb source repository is owned and maintained by Yash Nevase and is
licensed under its root MIT license. Original website work belongs to its
copyright holder; third-party libraries retain their own licenses and
ownership. The public `NoDoc-Releases` repository is for release assets; the
desktop application source is separate. Repository privacy does not erase
licenses already granted for older distributed copies.

See `DIAGNOSTIC_REPORT.md` and the batch reports under the parent project's
`diagnostics/` directory for underlying evidence.
