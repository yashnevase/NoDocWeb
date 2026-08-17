import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

export default function Features(): React.ReactElement {
  useGSAP(() => {
    animateWithGsap("#features_title", { y: 0, opacity: 1 });
    animateWithGsap(".g_text", {
      y: 0,
      opacity: 1,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.2
    });
  }, []);

  const workflows = [
    { title: "Edit", desc: "Change what matters. Add annotations, fix typos, and leave comments directly on your PDF pages." },
    { title: "Organize", desc: "Put every page where it belongs. Drag, drop, and rearrange your document flow visually." },
    { title: "Merge", desc: "Bring documents together. Combine multiple PDFs into a single, cohesive file in seconds." },
    { title: "Split", desc: "Break one document into exactly what you need. Extract pages to create new, focused PDFs." },
    { title: "Search", desc: "Find it instantly. Lightning-fast local search across all your open documents." },
    { title: "Offline", desc: "Your PDFs stay on your computer. No cloud uploads, no forced accounts. True local-first software." },
  ];

  return (
    <section className="h-full common-padding bg-zinc relative overflow-hidden">
      <div className="screen-max-width">
        <div className="mb-16 w-full text-center">
          <h1 id="features_title" className="section-heading text-4xl md:text-6xl text-white font-bold">
            Built for everyday workflows.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {workflows.map((wf, idx) => (
            <div key={idx} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:bg-white/5 transition-colors duration-300">
              <h3 className="text-2xl font-semibold text-nodoc-accent mb-4 g_text opacity-0 translate-y-10">{wf.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed g_text opacity-0 translate-y-10">{wf.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
