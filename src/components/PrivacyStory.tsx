import {
  ArrowRight,
  FileText,
  Cloud,
  Laptop,
  WifiOff,
  UserRoundCheck,
  Wallet,
} from "lucide-react";

export default function PrivacyStory() {
  return (
    <section
      id="why-nodoc"
      className="privacy-story section"
      aria-labelledby="privacy-title"
    >
      <div className="shell">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">YOUR FILE DOESN’T NEED A ROUND TRIP.</p>
            <h2 id="privacy-title">
              Edit the PDF.
              <br />
              <em>Skip the upload.</em>
            </h2>
          </div>
          <p>
            A résumé. An invoice. Your personal paperwork. Get the job done
            without sending a copy to a PDF-processing server.
          </p>
        </div>
        <div className="processing-paths reveal">
          <div className="processing-lane cloud-lane">
            <div className="lane-heading">
              <span className="lane-index">01</span>
              <div>
                <strong>With a server-based online tool</strong>
                <span>Your file leaves your device for processing.</span>
              </div>
            </div>
            <div className="path-nodes">
              <span>
                <FileText />
                <b>Your PDF</b>
              </span>
              <ArrowRight className="path-arrow" />
              <span>
                <Cloud />
                <b>Upload & process</b>
              </span>
              <ArrowRight className="path-arrow" />
              <span>
                <FileText />
                <b>Download a copy</b>
              </span>
            </div>
          </div>
          <div className="processing-lane local-lane">
            <div className="lane-heading">
              <span className="lane-index">02</span>
              <div>
                <strong>With NoDoc</strong>
                <span>The whole workflow stays on your computer.</span>
              </div>
              <span className="local-label">NO UPLOAD</span>
            </div>
            <div className="local-workspace">
              <Laptop />
              <span>
                Open
                <span className="local-dot" />
                Edit
                <span className="local-dot" />
                Save
              </span>
              <span className="local-caption">One device. Your document.</span>
            </div>
          </div>
        </div>
        <div className="benefit-grid">
          <article className="reveal">
            <WifiOff />
            <h3>Work without Wi-Fi.</h3>
            <p>
              Once installed, the desktop PDF tools work offline. No upload
              time. No connection needed to process your files.
            </p>
          </article>
          <article className="reveal">
            <UserRoundCheck />
            <h3>Your file. Not another account.</h3>
            <p>
              No signup, login, or email gate. Open NoDoc and get straight to
              the document.
            </p>
          </article>
          <article className="reveal">
            <Wallet />
            <h3>Useful tools. No subscription.</h3>
            <p>
              Merge, split, annotate, watermark, add image signatures, and use
              local OCR—all included free in this release.
            </p>
          </article>
        </div>
        <details className="privacy-context">
          <summary>A fair word about privacy and online tools</summary>
          <p>
            Uploading is not the same as making a file public. Reputable
            services describe encryption and deletion policies; some browser
            tools even process locally. The difference here is that NoDoc’s
            desktop processing does not require an upload at all. Your device’s
            security, backups, and any cloud-synced folders still matter. See{" "}
            <a href="/privacy">our privacy approach</a>, or the published
            policies of{" "}
            <a
              href="https://www.ilovepdf.com/help/legal"
              target="_blank"
              rel="noreferrer"
            >
              iLovePDF
            </a>{" "}
            and{" "}
            <a
              href="https://smallpdf.com/trust-center"
              target="_blank"
              rel="noreferrer"
            >
              Smallpdf
            </a>
            .
          </p>
        </details>
      </div>
    </section>
  );
}
