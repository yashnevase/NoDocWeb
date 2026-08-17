import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import NoDocDocument from "./NoDocDocument";

gsap.registerPlugin(ScrollTrigger);

/** Hero: title, responsive 3D NoDoc document, CTA with scroll-driven rotation. */
function Hero(): React.ReactElement {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance: title and CTA fade in
  useGSAP(() => {
    gsap.to("#hero-eyebrow", { opacity: 1, y: 0, delay: 0.3, duration: 0.8 });
    gsap.to("#hero", { opacity: 1, delay: 0.5, duration: 0.9 });
    gsap.to("#hero-sub", { opacity: 1, delay: 0.7, duration: 0.8 });
    gsap.to("#cta", { opacity: 1, y: -50, delay: 1, duration: 0.9 });

    // Scroll trigger — drives scrollY (0-1) into the 3D document
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setScrollY(self.progress);
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full nav-height bg-black relative flex flex-col justify-between pt-32 pb-10 overflow-hidden"
    >
      {/* ── Text overlay ─────────────────────────────────────────────────────── */}
      <div className="w-full flex-center flex-col z-10 relative pointer-events-none">
        <p
          className="text-nodoc-accent text-sm font-semibold tracking-widest uppercase mb-4 opacity-0 translate-y-5"
          id="hero-eyebrow"
        >
          FREE • LOCAL • OFFLINE
        </p>
        <p id="hero" className="hero-title opacity-0">
          Your PDFs.
          <br />
          Your computer.
        </p>
        <p
          className="text-gray-200 text-lg md:text-xl text-center max-w-2xl mt-4 px-4 opacity-0"
          id="hero-sub"
        >
          A free, local PDF manager and editor for Windows and macOS. Edit,
          organize and manage your documents directly on your desktop.
        </p>
      </div>

      {/* ── 3D Canvas ────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center mt-20">
        <Canvas
          className="w-full h-full"
          camera={{ position: [0, 0.5, 8], fov: 42 }}
          shadows
          gl={{ antialias: true }}
        >
          {/* Studio lighting matching the logo reference */}
          <ambientLight intensity={0.6} />
          {/* Key light — top left */}
          <directionalLight
            position={[-4, 6, 5]}
            intensity={2.8}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          {/* Fill light — right */}
          <directionalLight position={[5, 2, 3]} intensity={1.1} color="#ffeedd" />
          {/* Rim light — back */}
          <directionalLight position={[0, -3, -6]} intensity={0.5} color="#cc2233" />
          {/* Environment (subtle) */}
          <Environment preset="studio" />

          <Suspense fallback={null}>
            <NoDocDocument action="hero" isHero={true} scrollY={scrollY} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20 z-10 pointer-events-auto"
      >
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <a
            href="#download"
            className="btn !my-0 shadow-lg shadow-nodoc-red/30"
          >
            Download for Windows
          </a>
          <a
            href="#download"
            className="btn !my-0 bg-transparent border-white hover:bg-white hover:text-black"
          >
            Download for macOS
          </a>
        </div>
        <p className="font-normal text-sm text-gray-300">
          Free forever • Windows + macOS • Works offline
        </p>
      </div>
    </section>
  );
}

export default Hero;
