import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import NoDocDocument from "./NoDocDocument";
import { models } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Action → display label mapping
const ACTION_LABELS: Record<string, { label: string; desc: string }> = {
  edit:   { label: "Edit", desc: "Modify text, add annotations, sign or highlight — all on your desktop." },
  organize: { label: "Organize", desc: "Drag pages into any order. The animation says it all." },
  merge:  { label: "Merge", desc: "Combine two or more PDFs into a single polished document." },
  split:  { label: "Split", desc: "Break a large PDF into focused, shareable sections." },
  search: { label: "Search", desc: "Find any word across every page instantly." },
};

export default function DocumentShowcase(): React.ReactElement {
  const [activeAction, setActiveAction] = useState(models[0] ?? { action: "edit", title: "Edit", id: 1 });
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.to("#doc-heading", {
      y: 0, opacity: 1, duration: 1, ease: "power2.out",
      scrollTrigger: { trigger: "#doc-heading", start: "top 80%" },
    });
    gsap.to("#doc-subheading", {
      y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: "#doc-subheading", start: "top 80%" },
    });
    gsap.fromTo(
      "#doc-canvas-wrap",
      { opacity: 0, scale: 0.92 },
      {
        opacity: 1, scale: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: "#doc-canvas-wrap", start: "top 85%" },
      }
    );
  }, []);

  const info = ACTION_LABELS[activeAction.action] ?? { label: activeAction.action, desc: "" };

  return (
    <section ref={sectionRef} className="common-padding bg-nodoc-surface" id="features">
      <div className="screen-max-width">
        {/* ── Heading ─────────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center mb-10">
          <h2
            id="doc-heading"
            className="section-heading text-center opacity-0 translate-y-10"
          >
            The document, reimagined.
          </h2>
          <p
            id="doc-subheading"
            className="text-gray-300 text-xl md:text-2xl mt-4 opacity-0 translate-y-10 text-center max-w-2xl"
          >
            Everything you need to work with PDFs, without the clutter.
          </p>
        </div>

        {/* ── 3D Canvas ───────────────────────────────────────────────────────── */}
        <div
          id="doc-canvas-wrap"
          className="w-full h-[62vh] md:h-[72vh] overflow-hidden relative rounded-3xl
                     bg-gradient-to-b from-[#100008] to-[#0a0005]
                     border border-white/10 shadow-2xl shadow-black/70"
        >
          <Canvas
            className="w-full h-full"
            camera={{ position: [0, 0.4, 9.5], fov: 42 }}
            shadows
            gl={{ antialias: true }}
          >
            {/* Studio lighting */}
            <ambientLight intensity={0.55} />
            <directionalLight position={[-4, 7, 5]} intensity={2.6} castShadow shadow-mapSize={[2048, 2048]} />
            <directionalLight position={[5, 2, 3]} intensity={1.0} color="#ffeedd" />
            <directionalLight position={[0, -3, -6]} intensity={0.4} color="#cc2233" />
            <Environment preset="studio" />

            <Suspense fallback={null}>
              <NoDocDocument action={activeAction.action} />
            </Suspense>
          </Canvas>

          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
            }}
          />
        </div>

        {/* ── Feature selector ────────────────────────────────────────────────── */}
        <div className="mx-auto w-full mt-8 flex flex-col items-center gap-6">
          {/* Active label */}
          <div className="text-center transition-all duration-500">
            <p className="text-2xl font-bold text-white">{info.label}</p>
            <p className="text-gray-400 mt-1 text-base max-w-md">{info.desc}</p>
          </div>

          {/* Pill buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {models.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveAction(item)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeAction?.id === item.id
                    ? "bg-nodoc-red text-white shadow-lg shadow-nodoc-red/40 scale-105"
                    : "bg-white/15 text-white border border-white/20 hover:bg-white/25 hover:border-white/40"
                }`}
              >
                {item.action.charAt(0).toUpperCase() + item.action.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
