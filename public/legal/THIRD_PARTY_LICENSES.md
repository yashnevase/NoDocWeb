# Third-Party License Notices

This file records the third-party software intentionally included in NoDoc's
desktop release path. It is a notice index, not legal advice. A release must
ship the referenced license texts and any attribution files included with the
exact binary wheels and portable OCR bundle used for that release.

## PDF and OCR components

| Component | Release use | License | License/reference |
| --- | --- | --- | --- |
| [pikepdf 9.4.0](https://github.com/pikepdf/pikepdf) | PDF read/write sidecar library | MPL-2.0 | [pikepdf license](https://github.com/pikepdf/pikepdf/blob/main/LICENSE) |
| [QPDF](https://github.com/qpdf/qpdf) | Native PDF library redistributed by the applicable pikepdf wheel | Apache-2.0 | [QPDF license](https://github.com/qpdf/qpdf/blob/main/LICENSE.txt) |
| [pypdfium2 4.30.0](https://pypdfium2-team.github.io/pypdfium2/readme.html) | PDF rendering and text extraction | Apache-2.0 OR BSD-3-Clause; includes PDFium and its third-party notices | [pypdfium2 licensing](https://pypdfium2-team.github.io/pypdfium2/readme.html#licensing) and [BSD-3-Clause text](https://github.com/pypdfium2-team/pypdfium2/blob/main/LICENSES/BSD-3-Clause.txt) |
| [PDFium](https://pdfium.googlesource.com/pdfium/) | Native renderer redistributed by pypdfium2 | BSD-style plus component-specific notices | Ship the `BUILD_LICENSES/` material supplied with the exact pypdfium2 wheel; see [pypdfium2 licensing](https://pypdfium2-team.github.io/pypdfium2/readme.html#licensing). |
| [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) | Bundled OCR executable/library in desktop OCR bundles | Apache-2.0 | [Tesseract license](https://github.com/tesseract-ocr/tesseract/blob/main/LICENSE) |
| [Tesseract traineddata](https://github.com/tesseract-ocr/tessdata) | Bundled OCR language data, including `eng.traineddata` | Apache-2.0 | [tessdata license](https://github.com/tesseract-ocr/tessdata/blob/main/LICENSE) |
| [Pillow](https://python-pillow.github.io/) | Image conversion, watermarking, and raster editing in the sidecar | HPND | [Pillow license](https://github.com/python-pillow/Pillow/blob/main/LICENSE) |

The pikepdf and pypdfium2 binary wheels can each redistribute native
components. Preserve the wheel-provided license directories/attribution
manifests for the exact wheel version and platform packaged into a release.
The portable OCR bundle can also contain Tesseract's runtime libraries (for
example Leptonica, libjpeg-turbo, libpng, libtiff, libwebp, zlib, and zstd).
Those libraries' notices are bundle-specific and must be copied from the
portable bundle's own license manifest before publishing a release artifact.

## Application runtime

| Component | Release use | License | License/reference |
| --- | --- | --- | --- |
| [FastAPI](https://github.com/fastapi/fastapi) | Loopback sidecar HTTP API | MIT | [FastAPI license](https://github.com/fastapi/fastapi/blob/master/LICENSE) |
| [Starlette](https://github.com/Kludex/starlette) | FastAPI web framework dependency | BSD-3-Clause | [Starlette license](https://github.com/Kludex/starlette/blob/master/LICENSE.md) |
| [Uvicorn](https://github.com/Kludex/uvicorn) | Loopback ASGI server | BSD-3-Clause | [Uvicorn license](https://github.com/Kludex/uvicorn/blob/master/LICENSE.md) |
| [Pydantic and pydantic-core](https://github.com/pydantic/pydantic) | API request/response validation | MIT | [Pydantic license](https://github.com/pydantic/pydantic/blob/main/LICENSE) |
| [python-multipart](https://github.com/Kludex/python-multipart) | Multipart PDF/image uploads | Apache-2.0 | [python-multipart license](https://github.com/Kludex/python-multipart/blob/master/LICENSE.txt) |
| [React / React DOM / Scheduler](https://github.com/facebook/react) | Frontend UI runtime | MIT | [React license](https://github.com/facebook/react/blob/main/LICENSE) |
| [PDF.js / pdfjs-dist](https://github.com/mozilla/pdf.js) | Frontend PDF reader | Apache-2.0 | [PDF.js license](https://github.com/mozilla/pdf.js/blob/master/LICENSE) |
| [Tauri 2 and official plugins](https://github.com/tauri-apps/tauri) | Desktop shell, dialog, filesystem, and opener integration | MIT OR Apache-2.0 | [Tauri licenses](https://github.com/tauri-apps/tauri/tree/dev) |
| [serde_json](https://github.com/serde-rs/json) | Rust JSON handling | MIT OR Apache-2.0 | [serde_json license](https://github.com/serde-rs/json/blob/master/LICENSE-MIT) |
| [uuid](https://github.com/uuid-rs/uuid) | Rust UUID generation | MIT OR Apache-2.0 | [uuid license](https://github.com/uuid-rs/uuid/blob/main/LICENSE-MIT) |

## Build-time components whose distributed output has notice requirements

| Component | Release relationship | License | License/reference |
| --- | --- | --- | --- |
| [PyInstaller](https://pyinstaller.org/) | Produces the Python sidecar executable; its bootloader is included in that executable | GPL-2.0-or-later with PyInstaller's special exception | [PyInstaller license and exception](https://pyinstaller.org/en/stable/license.html) |

`pytest` and `httpx` are currently in `backend/requirements.txt` for tests;
they are not intentionally included by the application runtime. Vite and the
React build tooling are build-time dependencies, not intentionally bundled as
runtime application code.

## Release checklist

Before publishing any installer, the releaser must:

1. Copy the exact license/notice directories shipped by the pikepdf and
   pypdfium2 wheels used by that release.
2. Copy the license manifest for the exact portable Tesseract bundle and every
   runtime library included with it.
3. Retain all required copyright, attribution, license, and disclaimer text in
   the distributed installer or an accompanying notice bundle.
4. Review this inventory whenever dependency versions or the portable OCR
   bundle change.
