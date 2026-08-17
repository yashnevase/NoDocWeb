import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks(): React.ReactElement {
  useGSAP(() => {
    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.2
    });

    gsap.fromTo(".step-card", 
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        stagger: 0.3, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#steps-container",
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <section id="hiw" className="common-padding bg-black relative">
      <div className="screen-max-width">
        {/* Three Steps Section */}
        <div className="flex flex-col items-center mb-24">
          <h2 className="hiw-title text-white">
            Three steps. That&apos;s it.
          </h2>
          <p className="hiw-subtitle text-gray-200">
            No accounts to create, no servers to connect to. Just get to work.
          </p>

          <div id="steps-container" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full px-4 md:px-0">
            {[
              { num: "01", title: "Open", desc: "Open a PDF directly from your local filesystem." },
              { num: "02", title: "Work", desc: "Edit text, add annotations, and organize pages natively." },
              { num: "03", title: "Save", desc: "Save the finished document securely back to your computer." }
            ].map((step, idx) => (
              <div key={idx} className="step-card bg-nodoc-surface p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-nodoc-red/50 transition-colors">
                <div className="text-7xl font-bold text-white/5 absolute -top-4 -right-4 transition-transform group-hover:scale-110">
                  {step.num}
                </div>
                <h3 className="text-3xl font-bold text-nodoc-accent mb-4">{step.title}</h3>
                <p className="text-gray-300 text-lg relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Section */}
        <div className="mt-32 pt-20 border-t border-white/10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-6">
            Your documents don&apos;t need a detour.
          </h2>
          
          <div className="w-full max-w-4xl flex flex-col items-center gap-10 mt-10">
            {/* Visual Graph */}
            <div className="flex items-center justify-center gap-4 md:gap-12 w-full px-4">
              <div className="flex flex-col items-center g_fadeIn opacity-0 translate-y-10">
                <div className="w-20 h-20 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600 shadow-lg">
                  <span className="text-3xl">💻</span>
                </div>
                <p className="mt-4 text-gray-300 font-medium">Computer</p>
              </div>

              <div className="w-8 md:w-24 h-1 bg-gradient-to-r from-gray-600 to-nodoc-red rounded-full g_fadeIn opacity-0 translate-y-10 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-nodoc-red rotate-45 transform translate-x-1/2"></div>
              </div>

              <div className="flex flex-col items-center g_fadeIn opacity-0 translate-y-10">
                <div className="w-24 h-24 bg-nodoc-red rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(215,25,47,0.4)]">
                  <span className="text-white font-bold text-2xl tracking-tighter">NoDoc</span>
                </div>
                <p className="mt-4 text-nodoc-accent font-bold">Local App</p>
              </div>

              <div className="w-8 md:w-24 h-1 bg-gradient-to-r from-nodoc-red to-white rounded-full g_fadeIn opacity-0 translate-y-10 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 transform translate-x-1/2"></div>
              </div>

              <div className="flex flex-col items-center g_fadeIn opacity-0 translate-y-10">
                <div className="w-20 h-24 bg-white rounded flex items-center justify-center relative shadow-lg">
                   <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-gray-200 border-r-transparent"></div>
                  <span className="text-nodoc-darkred font-bold text-xl">PDF</span>
                </div>
                <p className="mt-4 text-gray-300 font-medium">Document</p>
              </div>
            </div>

            <div className="mt-12 text-center max-w-2xl">
              <p className="text-xl md:text-2xl text-gray-200 font-medium g_fadeIn opacity-0 translate-y-10 leading-relaxed">
                NoDoc is designed around local desktop workflows, so you can work with your PDFs directly on your computer. No cloud processing, no subscription checks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
