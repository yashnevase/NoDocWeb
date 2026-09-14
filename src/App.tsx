import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Download,
  FileText,
  Fingerprint,
  Layers,
  Menu,
  Moon,
  Monitor,
  ScanText,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { release, owner } from "./release";
import Legal from "./Legal";
import HeroExperience from "./components/HeroExperience";
import PrivacyStory from "./components/PrivacyStory";
import useScrollReveal from "./useScrollReveal";

const workflows = [
  {
    title: "Read, with room to think.",
    short: "Read & search",
    icon: FileText,
    image: "reader-light",
    desc: "Move between pages, search your document, and settle into a workspace that lets the page take the lead.",
    tags: ["Text search", "Page thumbnails", "Light & dark"],
  },
  {
    title: "A place for every page.",
    short: "Organize pages",
    icon: Layers,
    image: "organize-dark",
    desc: "Bring PDFs together. Split them apart. Rotate, extract, and rearrange pages until the document tells the right story.",
    tags: ["Merge & split", "Reorder pages", "Crop & rotate"],
  },
  {
    title: "Leave your mark.",
    short: "Edit & annotate",
    icon: Sparkles,
    image: "edit-dark",
    desc: "Add text, highlights, drawings, and watermarks. Place an image signature and export a new version when you’re ready.",
    tags: ["Watermarks", "Highlights & drawing", "Image signatures"],
  },
];
const faqs = [
  [
    "Is NoDoc really free?",
    "Yes. The current desktop release is free to download and use. There is no required account or subscription. NoDoc is independently built by Yash.",
  ],
  [
    "Do my documents get uploaded?",
    "PDF processing happens on your computer, in NoDoc’s local desktop engine. The website is a download and information site; it does not accept or process your PDFs.",
  ],
  [
    "Can I edit the original text in a PDF?",
    "You can place new text, annotations, and image signatures. This release is not a word processor: rewriting existing paragraphs and converting PDFs to Word are not supported. An image signature is not a certificate-backed digital signature.",
  ],
  [
    "What does early access mean?",
    "The app is still being tested on real machines. A blank or glitched PDF reader has been reported on Windows; macOS manual validation is still pending. Keep your originals and check exported files before relying on them.",
  ],
  [
    "How do I install or update?",
    "Download the installer for your system below. On Windows, run the .exe installer. On an Apple silicon Mac, open the .dmg and drag NoDoc to Applications. For updates, close NoDoc and install the newer release. Updates are manual; there is no automatic updater in this version.",
  ],
  [
    "Will Windows or macOS show a security warning?",
    "These early-access builds are not code-signed or Apple-notarized. Your system may warn or block them. Verify the source and checksum, and follow your device’s security policy. NoDoc does not ask you to disable system protection.",
  ],
  [
    "Can I use it on my phone or an Intel Mac?",
    "NoDoc currently ships for 64-bit Windows and Apple silicon Macs. This website works on phones, but the PDF editor is a desktop application. An Intel Mac build is not available yet.",
  ],
];
function Brand() {
  return (
    <a className="brand" href="/" aria-label="NoDoc home">
      <img src="/favicon.png" width="34" height="34" alt="" />
      <span className="brand-wordmark">
        NoDoc<span className="brand-dot">.</span>
      </span>
    </a>
  );
}

function App() {
  useScrollReveal();
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("nodoc-site-theme") || "light";
    } catch {
      return "light";
    }
  });
  const [menu, setMenu] = useState(false);
  const [workflow, setWorkflow] = useState(0);
  const [split, setSplit] = useState(51);
  const [zoom, setZoom] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const compare = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("nodoc-site-theme", theme);
    } catch {
      /* storage may be unavailable */
    }
  }, [theme]);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = compare.current;
    if (!el) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min((now - start) / 2200, 1);
          setSplit(51 + 22 * Math.sin(t * Math.PI * 2) * Math.sin(t * Math.PI));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (zoom) dialog.current?.showModal();
    else dialog.current?.close();
  }, [zoom]);
  const legal = ["/privacy", "/terms", "/licenses"].includes(
    window.location.pathname,
  );
  const active = workflows[workflow]!;
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell nav-row">
          <Brand />
          <nav
            className={menu ? "nav-links is-open" : "nav-links"}
            aria-label="Main navigation"
          >
            {["Product", "Why NoDoc", "Downloads"].map((label, i) => (
              <a
                key={label}
                href={
                  (legal ? "/" : "") +
                  "#" +
                  ["product", "why-nodoc", "download"][i]
                }
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a href={owner.contact} target="_blank" rel="noopener noreferrer">
              Meet the maker <ArrowUpRight size={13} />
            </a>
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button"
              aria-label={
                "Switch to " + (theme === "light" ? "dark" : "light") + " mode"
              }
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a
              className="button button-small"
              href={(legal ? "/" : "") + "#download"}
            >
              Get NoDoc <ArrowDown size={15} />
            </a>
            <button
              className="icon-button mobile-menu"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      {legal ? (
        <Legal path={window.location.pathname} />
      ) : (
        <main id="main">
          <section className="hero shell">
            <div className="hero-copy">
              <a className="release-pill" href="#release-notes">
                <span className="status-dot" /> Offline PDF tools. No account.
                Free.
                <ArrowUpRight size={14} />
              </a>
              <h1>
                Your PDFs.
                <br />
                Not the cloud<span className="brand-dot">.</span>
              </h1>
              <p className="hero-description">
                Read, edit, and organize on your own computer.
                <br className="desktop-break" /> No uploads. No signup. No
                subscription.
              </p>
              <div className="hero-actions">
                <a className="button" href="#download">
                  Download NoDoc <Download size={17} />
                </a>
                <a className="text-link" href="#product">
                  Take a look inside <ArrowRight size={17} />
                </a>
              </div>
              <div className="hero-meta">
                <span>Windows & macOS</span>
                <i /> <span>v{release.version} · Early access</span>
              </div>
            </div>
            <HeroExperience />
          </section>
          <PrivacyStory />
          <section
            className="product-preview shell"
            aria-label="NoDoc reader preview"
          >
            <div className="preview-top">
              <span>
                <span className="status-dot" /> THE WORKSPACE, IN REAL LIFE
              </span>
              <span>Less noise. More document.</span>
            </div>
            <button
              className="screenshot-button hero-screen"
              onClick={() => setZoom("reader-light")}
              aria-label="Enlarge NoDoc reader screenshot"
            >
              <img
                src="/screens/reader-light.webp"
                alt="Real NoDoc reader showing the four-page Fieldnotes sample document"
                width="1800"
                height="1175"
                fetchPriority="high"
              />
              <span className="enlarge">
                Explore the details <ArrowUpRight size={16} />
              </span>
            </button>
            <div className="trust-row">
              <span>
                <Monitor /> On your computer
              </span>
              <span>
                <ShieldCheck /> No document uploads
              </span>
              <span>
                <Fingerprint /> No account required
              </span>
              <span>
                <Check /> Free to use
              </span>
            </div>
          </section>
          <section id="product" className="section shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A SMALL APP. A USEFUL TOOLKIT.</p>
                <h2>
                  From first page
                  <br />
                  to final export.
                </h2>
              </div>
              <p>
                For the everyday document work that shouldn’t need a
                subscription, a new account, or a cloud upload.
              </p>
            </div>
            <div
              className="workflow-tabs"
              role="tablist"
              aria-label="Product workflows"
            >
              {workflows.map((item, i) => (
                <button
                  role="tab"
                  id={"tab-" + i}
                  aria-controls="workflow-panel"
                  aria-selected={workflow === i}
                  tabIndex={workflow === i ? 0 : -1}
                  key={item.short}
                  onClick={() => setWorkflow(i)}
                  onKeyDown={(event) => {
                    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
                    if (!keys.includes(event.key)) return;
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? workflows.length - 1
                          : (i +
                              (event.key === "ArrowRight" ? 1 : -1) +
                              workflows.length) %
                            workflows.length;
                    setWorkflow(next);
                    document.getElementById("tab-" + next)?.focus();
                  }}
                >
                  <item.icon size={19} />
                  <span>{item.short}</span>
                  <span className="tab-number">0{i + 1}</span>
                </button>
              ))}
            </div>
            <div
              className="workflow-panel"
              role="tabpanel"
              id="workflow-panel"
              aria-labelledby={"tab-" + workflow}
            >
              <div className="workflow-copy">
                <span className="index-label">0{workflow + 1} / WORKFLOW</span>
                <h3>{active.title}</h3>
                <p>{active.desc}</p>
                <ul className="tag-list">
                  {active.tags.map((t) => (
                    <li key={t}>
                      <Check size={14} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="screenshot-button workflow-image"
                onClick={() => setZoom(active.image)}
                aria-label={"Enlarge " + active.short + " screenshot"}
              >
                <img
                  src={"/screens/" + active.image + ".webp"}
                  alt={
                    "NoDoc " +
                    active.short.toLowerCase() +
                    " interface with the Fieldnotes sample PDF"
                  }
                  width="1800"
                  height="1175"
                  loading="lazy"
                />
                <span className="enlarge">
                  View full screen <ArrowUpRight size={15} />
                </span>
              </button>
            </div>
            <div className="utility-grid">
              <article>
                <ScanText />
                <h3>Find words in scans.</h3>
                <p>
                  Use local OCR to create a searchable PDF. English recognition
                  is included.
                </p>
              </article>
              <article>
                <FileText />
                <h3>Finish the small things.</h3>
                <p>
                  Add page numbers, convert PDF pages to images, or turn images
                  into a PDF.
                </p>
              </article>
              <article>
                <ShieldCheck />
                <h3>Choose how to share.</h3>
                <p>
                  Add password protection and inspect metadata before sharing a
                  copy.
                </p>
              </article>
            </div>
          </section>
          <section className="appearance-section">
            <div className="shell">
              <div className="center-heading">
                <p className="eyebrow">SAME DOCUMENT. YOUR KIND OF LIGHT.</p>
                <h2>
                  A workspace that
                  <br />
                  feels like yours.
                </h2>
                <p>
                  Bright mornings. Late-night reading. Slide to find your side.
                </p>
              </div>
              <div
                className="comparison"
                ref={compare}
                style={{ "--split": split + "%" } as CSSProperties}
              >
                <img
                  src="/screens/reader-dark.webp"
                  alt="NoDoc reader in dark appearance"
                  width="1800"
                  height="1175"
                  loading="lazy"
                />
                <div className="comparison-light">
                  <img
                    src="/screens/reader-light.webp"
                    alt="The same NoDoc reader in light appearance"
                    width="1800"
                    height="1175"
                    loading="lazy"
                  />
                </div>
                <div className="comparison-divider">
                  <span>↔</span>
                </div>
                <label className="sr-only" htmlFor="appearance-slider">
                  Compare light and dark appearance
                </label>
                <input
                  id="appearance-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={split}
                  onChange={(e) => {
                    touched.current = true;
                    setSplit(Number(e.target.value));
                  }}
                  onPointerDown={() => {
                    touched.current = true;
                  }}
                  aria-valuetext={
                    Math.round(split) + " percent light appearance"
                  }
                />
                <span className="compare-label light-label">
                  <Sun size={13} /> LIGHT
                </span>
                <span className="compare-label dark-label">
                  <Moon size={13} /> DARK
                </span>
              </div>
              <p className="caption">
                Actual NoDoc interface captured with a sample document. Desktop
                window decoration may vary by platform.
              </p>
            </div>
          </section>
          <section id="download" className="download-section">
            <div className="shell">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">MAKE ROOM FOR BETTER PDF WORK</p>
                  <h2>
                    At home on
                    <br />
                    your desktop.
                  </h2>
                </div>
                <div>
                  <span className="version-badge">
                    v{release.version} · EARLY ACCESS
                  </span>
                  <p>
                    One download. No account.
                    <br />
                    Choose the version made for your computer.
                  </p>
                </div>
              </div>
              <div className="download-grid">
                {release.downloads.map((file) => (
                  <article className="download-card" key={file.platform}>
                    <div className="download-card-top">
                      <span className="os-symbol" aria-hidden="true">
                        {file.platform === "Windows" ? "⊞" : "⌘"}
                      </span>
                      <span className="format-label">
                        {file.format.toUpperCase()}
                      </span>
                    </div>
                    <h3>{file.platform}</h3>
                    <p>{file.architecture}</p>
                    <a
                      className="button"
                      href={file.url || undefined}
                      aria-disabled={!file.url}
                      onClick={(e) => {
                        if (!file.url) e.preventDefault();
                      }}
                    >
                      {file.url
                        ? "Download for " + file.platform
                        : "Release being prepared"}
                      <Download size={17} />
                    </a>
                    <div className="download-meta">
                      <span>v{release.version}</span>
                      <span>{file.size || "Size pending"}</span>
                    </div>
                    <p className="install-note">{file.install}</p>
                    {file.sha256 && (
                      <details className="checksum">
                        <summary>
                          Verify SHA-256 <ChevronDown size={13} />
                        </summary>
                        <code>{file.sha256}</code>
                      </details>
                    )}
                  </article>
                ))}
              </div>
              <p className="release-disclosure">
                <span className="status-dot" /> Early access: Windows reader
                rendering issues have been reported. macOS manual testing is
                pending. These builds are unsigned. Keep original files and
                review exports. <a href="#release-notes">Release details ↗</a>
              </p>
            </div>
          </section>
          <section id="release-notes" className="section shell release-section">
            <div>
              <p className="eyebrow">A WORK IN PROGRESS, WITH A PAPER TRAIL</p>
              <h2>
                Small releases.
                <br />
                Steady progress.
              </h2>
              <p>
                Every new version will live here. Download the latest installer
                and install it over your existing version with NoDoc closed.
              </p>
              <span className="caption">
                Updates are manual in this release.
              </span>
            </div>
            <article className="release-entry">
              <div>
                <span className="version-badge">v{release.version}</span>
                <time dateTime="2026-09-13">13 September 2026</time>
              </div>
              <h3>The first early-access build.</h3>
              <p>
                Read and search PDFs, organize pages, add watermarks and
                annotations, use local OCR, and export your work.
              </p>
              <ul>
                <li>
                  Windows installer build and startup health check passed in CI.
                </li>
                <li>
                  Apple silicon DMG available; manual app testing remains
                  pending.
                </li>
                <li>
                  Known issue: blank or glitched PDF rendering reported on
                  Windows.
                </li>
              </ul>
              <a href={release.notesUrl || "#download"} className="text-link">
                Release files & notes <ArrowUpRight size={15} />
              </a>
            </article>
          </section>
          <section id="faq" className="section shell faq-section">
            <div>
              <p className="eyebrow">A FEW THINGS TO KNOW</p>
              <h2>
                Good questions.
                <br />
                Clear answers.
              </h2>
              <p>Something else on your mind?</p>
              <a
                href={owner.contact}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask Yash <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <ChevronDown size={18} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="maker-section shell">
            <div className="maker-mark" aria-hidden="true">
              Y.
            </div>
            <div>
              <p className="eyebrow">AN INDEPENDENT PROJECT</p>
              <h3>Made by Yash. Made for everyday work.</h3>
              <p>
                NoDoc is growing one useful improvement at a time. Found a rough
                edge? Tell me what happened—without sharing private documents.
              </p>
            </div>
            <a
              className="button button-outline"
              href={owner.contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              Say hello <ArrowUpRight size={16} />
            </a>
          </section>
        </main>
      )}
      <footer className="shell site-footer">
        <div className="footer-top">
          <div>
            <Brand />
            <p>A little more space for your documents.</p>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/licenses">Licenses</a>
            <a href={owner.github} target="_blank" rel="noopener noreferrer">
              Yash on GitHub <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Yash. Third-party rights and applicable licenses are
            preserved.
          </span>
          <span>Built with care. Works locally.</span>
        </div>
      </footer>
      <dialog
        ref={dialog}
        className="image-dialog"
        onCancel={() => setZoom(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setZoom(null);
        }}
      >
        <button
          className="icon-button"
          aria-label="Close screenshot"
          onClick={() => setZoom(null)}
        >
          <X />
        </button>
        {zoom && (
          <img
            src={"/screens/" + zoom + ".webp"}
            alt="Enlarged NoDoc application screenshot"
          />
        )}
        <p>Actual NoDoc interface · Sample document · Press Escape to close</p>
      </dialog>
    </>
  );
}
export default App;
