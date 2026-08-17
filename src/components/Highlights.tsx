import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg } from "../utils";
import PdfWorkflowCarousel from "./PdfWorkflowCarousel";

/** Section "Everyday PDF Workflow": heading + link + PdfWorkflowCarousel. */
function Highlights(): React.ReactElement {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
            Everything you need for everyday PDFs.
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Explore the editor
              <img src={rightImg} alt="right" className="ml-2 w-4 h-4" />
            </p>
          </div>
        </div>

        <PdfWorkflowCarousel />
      </div>
    </section>
  );
}

export default Highlights;
