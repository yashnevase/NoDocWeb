import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import NoDocDocument from "./NoDocDocument";
import { WINDOWS_DOWNLOAD_URL, MACOS_DOWNLOAD_URL } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function DownloadSection(): React.ReactElement {
  useGSAP(() => {
    gsap.fromTo(".download-fade", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#download",
          start: "top 75%"
        }
      }
    );
  }, []);

  return (
    <section id="download" className="w-full min-h-screen bg-black relative flex flex-col items-center justify-center pt-20 pb-32 overflow-hidden">
      
      {/* 3D Background Document */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none">
        <Canvas className="w-full h-full" camera={{ position: [0, 0, 10], fov: 40 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[-10, 10, -10]} intensity={2} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <NoDocDocument />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </div>

      <div className="screen-max-width z-10 flex flex-col items-center text-center px-5">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 download-fade tracking-tight">
          PDFs, without the hassle.
        </h2>
        <p className="text-2xl text-nodoc-accent font-medium mb-6 download-fade">
          Open. Edit. Organize. Done.
        </p>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-16 download-fade">
          Download NoDoc for your desktop. Free, local and built for everyday PDF work.
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center download-fade">
          {/* Windows Card */}
          <div className="flex-1 bg-nodoc-surface border border-white/10 rounded-3xl p-10 flex flex-col items-center group hover:border-nodoc-red/50 hover:bg-black transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-nodoc-red/0 group-hover:bg-nodoc-red/5 transition-colors duration-500"></div>
            <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="text-4xl">⊞</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Windows</h3>
            <p className="text-gray-400 mb-8 relative z-10">Windows 10 and 11</p>
            
            <a 
              href={WINDOWS_DOWNLOAD_URL || "#"} 
              className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg relative z-10 flex items-center justify-center gap-2 ${
                WINDOWS_DOWNLOAD_URL 
                  ? "bg-nodoc-red text-white hover:bg-nodoc-darkred hover:-translate-y-1 hover:shadow-nodoc-red/40" 
                  : "bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => { if (!WINDOWS_DOWNLOAD_URL) e.preventDefault(); }}
            >
              {WINDOWS_DOWNLOAD_URL ? "Download .exe" : "Coming soon"}
              {WINDOWS_DOWNLOAD_URL && <span className="group-hover:translate-y-1 transition-transform">↓</span>}
            </a>
          </div>

          {/* macOS Card */}
          <div className="flex-1 bg-nodoc-surface border border-white/10 rounded-3xl p-10 flex flex-col items-center group hover:border-nodoc-red/50 hover:bg-black transition-all duration-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-nodoc-red/0 group-hover:bg-nodoc-red/5 transition-colors duration-500"></div>
            <div className="w-20 h-20 bg-gray-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <span className="text-4xl"></span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">macOS</h3>
            <p className="text-gray-400 mb-8 relative z-10">macOS 12.0 or later</p>
            
            <a 
              href={MACOS_DOWNLOAD_URL || "#"} 
              className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg relative z-10 flex items-center justify-center gap-2 ${
                MACOS_DOWNLOAD_URL 
                  ? "bg-white text-black hover:bg-gray-200 hover:-translate-y-1 hover:shadow-white/20" 
                  : "bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
              onClick={(e) => { if (!MACOS_DOWNLOAD_URL) e.preventDefault(); }}
            >
              {MACOS_DOWNLOAD_URL ? "Download .dmg" : "Coming soon"}
              {MACOS_DOWNLOAD_URL && <span className="group-hover:translate-y-1 transition-transform">↓</span>}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
