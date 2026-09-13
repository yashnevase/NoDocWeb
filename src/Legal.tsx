import { owner } from "./release";

export default function Legal({ path }: { path: string }) {
  const type = path.slice(1);
  return (
    <main id="main" className="shell legal-page">
      <a href="/">← Back to NoDoc</a>
      <p className="eyebrow" style={{ marginTop: 35 }}>
        LAST UPDATED · 13 SEPTEMBER 2026
      </p>
      <h1>
        {type === "privacy"
          ? "Privacy, in plain words."
          : type === "terms"
            ? "Terms of use."
            : "Licenses & credits."}
      </h1>
      {type === "privacy" ? (
        <>
          <p>
            NoDoc is an independent desktop PDF application made by Yash. This
            page distinguishes the desktop app from this website and the
            services used to distribute it.
          </p>
          <h2>Your documents</h2>
          <p>
            The desktop app processes PDF files locally on your computer. Its
            interface communicates with a local processing engine. NoDoc does
            not require an account or upload your PDFs to a document-processing
            service. Temporary files, preferences, and working history can be
            stored locally; local processing does not mean no files are written
            to disk.
          </p>
          <h2>This website</h2>
          <p>
            This website does not offer document uploads or PDF processing. We
            do not include advertising trackers, analytics, or session replay in
            this version of the website. Your light/dark preference is saved in
            your browser’s local storage under <code>nodoc-site-theme</code>.
            You can clear it through your browser’s site-data settings.
          </p>
          <p>
            The website host, Vercel, and the download host, GitHub, receive
            normal connection information such as IP addresses and request
            details when you visit or download. Their processing is governed by
            their own policies:{" "}
            <a href="https://vercel.com/legal/privacy-policy">
              Vercel Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub Privacy Statement
            </a>
            .
          </p>
          <h2>Contact and feedback</h2>
          <p>
            Contact links open Yash’s portfolio or GitHub. Information you
            choose to send through those services is subject to their policies.
            Please share a description of a bug and your app version, not
            private PDFs, passwords, or confidential content.
          </p>
          <h2>Changes and questions</h2>
          <p>
            If the website or application’s data practices change, this notice
            will be updated. For questions,{" "}
            <a href={owner.contact}>
              contact Yash through the portfolio website
            </a>
            .
          </p>
        </>
      ) : type === "terms" ? (
        <>
          <p>
            These terms describe the NoDoc website and its early-access
            downloads. They do not replace the software licenses supplied with
            the app or limit rights that applicable law does not allow to be
            limited.
          </p>
          <h2>Early-access software</h2>
          <p>
            NoDoc 0.1.0 is provided for evaluation and everyday testing. It may
            contain bugs. Blank or glitched PDF rendering has been reported on
            Windows; macOS manual validation remains pending. Keep backups of
            original documents and review outputs before using or sharing them.
          </p>
          <h2>What is included</h2>
          <p>
            Features are described for the current release only. Planned
            improvements are not promises of delivery. The text tool places new
            text; it does not offer full paragraph editing. Image signature
            placement does not certify identity, verify a certificate, or create
            a certificate-backed digital signature.
          </p>
          <h2>Your use of documents</h2>
          <p>
            You retain your rights in your documents. You are responsible for
            having the permissions needed to process or share them. NoDoc does
            not provide legal advice or determine whether a document, signature,
            redaction, or output meets a particular legal or regulatory
            requirement.
          </p>
          <h2>License and warranties</h2>
          <p>
            The software license governs your permission to use, copy, or modify
            the licensed code. NoDoc uses third-party components under their own
            licenses. See <a href="/licenses">Licenses & credits</a>. The
            applicable MIT license provides the software “as is,” without
            warranties, and limits liability as stated in that license, subject
            to applicable law.
          </p>
          <h2>Downloads and updates</h2>
          <p>
            The early-access downloads are unsigned; the macOS build is not
            notarized. Platform security policies may prevent installation.
            Updates are manual. The website lists the release version, platform,
            file size, and checksum to help you identify each download.
          </p>
          <h2>Contact</h2>
          <p>
            This project is maintained by Yash.{" "}
            <a href={owner.contact}>Visit the portfolio for contact details</a>.
          </p>
        </>
      ) : (
        <>
          <p>
            NoDoc and this website are maintained by Yash. Copyright in original
            contributions belongs to their respective authors. Third-party code,
            libraries, fonts, and brand marks retain their own ownership and
            license terms.
          </p>
          <h2>Project licenses</h2>
          <p>
            The website’s existing source is distributed under the MIT license,
            with its original attribution to Yash Nevase retained. The desktop
            source’s MIT notice credits PrivatePDF Suite Contributors. A private
            source repository does not revoke licenses already granted for
            previously distributed copies.
          </p>
          <ul>
            <li>
              <a href="/legal/WEBSITE-LICENSE.txt">Website MIT license</a>
            </li>
            <li>
              <a href="/legal/APPLICATION-LICENSE.txt">
                Application MIT license
              </a>
            </li>
            <li>
              <a href="/legal/THIRD_PARTY_LICENSES.md">
                Desktop component notice index
              </a>
            </li>
            <li>
              <a href="/legal/WEB-THIRD-PARTY.txt">
                Website runtime license texts
              </a>
            </li>
          </ul>
          <h2>Software that makes NoDoc possible</h2>
          <p>
            The desktop application uses React, Tauri, PDF.js, pikepdf, QPDF,
            pypdfium2/PDFium, Pillow, and Tesseract, among other components.
            Their licenses differ, including MIT, Apache, BSD, and MPL terms.
            The downloadable notice index identifies these components and their
            upstream license sources. Release-specific license materials
            accompany the downloads.
          </p>
          <h2>Website assets</h2>
          <p>
            The application screenshots show NoDoc’s real interface using a
            sample document created for this website. The document illustration
            and page design were made for NoDoc. Interface screenshots
            demonstrate the product; their appearance is not a guarantee that
            every file or platform will render identically.
          </p>
          <h2>Names and marks</h2>
          <p>
            Windows and macOS are names of their respective owners. References
            identify compatible platforms and do not imply endorsement or
            affiliation. NoDoc does not claim ownership of third-party software
            or trademarks.
          </p>
          <h2>Attribution questions</h2>
          <p>
            If you have a question about an attribution or believe material
            needs correction, <a href={owner.contact}>contact Yash</a>.
          </p>
        </>
      )}
    </main>
  );
}
