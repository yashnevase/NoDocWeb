import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function EditorShowcase(): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { y: 100, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section id="editor" className="w-full common-padding bg-black relative">
      <div className="screen-max-width">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-4">
            A desktop editor that means business.
          </h2>
          <p className="text-gray-200 text-lg md:text-xl text-center max-w-2xl">
            Everything you expect from a premium PDF editor, working natively on your machine.
          </p>
        </div>

        {/* Realistic Editor Mockup */}
        <div 
          ref={containerRef}
          className="w-full aspect-[16/10] bg-nodoc-surface rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
        >
          {/* Top Toolbar */}
          <div className="h-14 bg-black/60 border-b border-white/10 flex items-center px-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="h-6 w-px bg-white/20 mx-2"></div>
              {/* Tools */}
              <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
                <button className="px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Edit</button>
                <button className="px-3 py-1.5 rounded bg-white/10 text-white">Highlight</button>
                <button className="px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Draw</button>
                <button className="px-3 py-1.5 rounded hover:bg-white/10 transition-colors">Annotate</button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <div className="flex items-center bg-black/50 rounded-md px-3 py-1.5 border border-white/10">
                <span className="opacity-50 mr-2">🔍</span> Search document...
              </div>
              <div className="flex items-center gap-2 border border-white/10 rounded-md">
                <button className="px-2 py-1 hover:bg-white/10">-</button>
                <span className="px-2 text-xs">100%</span>
                <button className="px-2 py-1 hover:bg-white/10">+</button>
              </div>
              <button className="bg-nodoc-red text-white px-4 py-1.5 rounded-md hover:bg-nodoc-darkred transition-colors">Save</button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar - Thumbnails */}
            <div className="w-48 bg-black/40 border-r border-white/10 p-4 flex flex-col gap-4 overflow-y-auto">
              {[1, 2, 3, 4].map((page) => (
                <div key={page} className={`aspect-[1/1.4] bg-white rounded flex items-center justify-center text-gray-400 font-bold text-xl relative ${page === 1 ? 'ring-2 ring-nodoc-red' : ''}`}>
                  {page}
                  <div className="absolute bottom-1 right-2 text-xs opacity-50">{page}</div>
                </div>
              ))}
            </div>

            {/* Center - Main Document */}
            <div className="flex-1 bg-neutral-900 flex items-center justify-center p-8 overflow-y-auto relative">
              <div className="w-full max-w-2xl bg-white aspect-[1/1.4] rounded shadow-lg shadow-black p-10 flex flex-col gap-4">
                <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
                <div className="w-full h-4 bg-gray-100 rounded mt-4"></div>
                <div className="w-5/6 h-4 bg-gray-100 rounded"></div>
                <div className="w-full h-4 bg-gray-100 rounded"></div>
                
                {/* Simulated highlight */}
                <div className="w-3/4 h-4 bg-yellow-200/60 rounded mt-2 relative">
                  <div className="absolute -top-6 -right-6 bg-nodoc-red text-white text-xs px-2 py-1 rounded shadow-md rounded-bl-none">
                    Review this section
                  </div>
                </div>
                
                <div className="w-full h-4 bg-gray-100 rounded mt-2"></div>
                <div className="w-2/3 h-4 bg-gray-100 rounded"></div>
              </div>
            </div>

            {/* Right Sidebar - Controls */}
            <div className="w-56 bg-black/40 border-l border-white/10 p-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Properties</div>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Size</span>
                  <span>A4</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Pages</span>
                  <span>14</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Color</span>
                  <span>RGB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
