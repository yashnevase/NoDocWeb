import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { highlightsSlides } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function PdfWorkflowCarousel(): React.ReactElement {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Horizontal scroll for slides
  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * activeSlide}%)`,
      duration: 1.5,
      ease: "power2.inOut",
    });

    ScrollTrigger.create({
      trigger: "#carousel-container",
      start: "top 80%",
      onEnter: () => setIsPlaying(true),
    });
  }, [activeSlide]);

  // Handle progress bars
  useEffect(() => {
    if (!isPlaying) return;

    const currentDuration = highlightsSlides[activeSlide]?.duration || 5;
    let progress = 0;

    const interval = setInterval(() => {
      progress += 100 / (currentDuration * 10); // assuming 10 updates per second
      
      if (progressRefs.current[activeSlide]) {
        gsap.set(progressRefs.current[activeSlide], { width: `${Math.min(progress, 100)}%` });
      }

      if (progress >= 100) {
        clearInterval(interval);
        if (activeSlide < highlightsSlides.length - 1) {
          setActiveSlide((prev) => prev + 1);
        } else {
          setIsPlaying(false); // End of carousel
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeSlide, isPlaying]);

  const renderVisual = (action: string) => {
    switch(action) {
      case "edit":
        return <div className="w-full h-full bg-nodoc-surface flex items-center justify-center text-nodoc-red font-bold text-4xl">Edit Mockup</div>;
      case "organize":
        return <div className="w-full h-full bg-nodoc-surface flex items-center justify-center text-nodoc-red font-bold text-4xl">Organize Mockup</div>;
      case "merge-split":
        return <div className="w-full h-full bg-nodoc-surface flex items-center justify-center text-nodoc-red font-bold text-4xl">Merge Mockup</div>;
      case "local":
        return <div className="w-full h-full bg-nodoc-surface flex items-center justify-center text-nodoc-red font-bold text-4xl">Local Mockup</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div id="carousel-container" className="flex items-center overflow-hidden">
        {highlightsSlides.map((list) => (
          <div key={list.id} id="slider" className="min-w-full sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black/50 border border-white/10 relative">
                {/* Visual Representation */}
                {renderVisual(list.action)}
                
                {/* Text Overlay */}
                <div className="absolute top-12 left-10 z-10">
                  {list.textLists.map((text, j) => (
                    <p key={j} className="md:text-2xl text-xl font-medium text-white shadow-black drop-shadow-md">
                      {text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300/20 backdrop-blur rounded-full">
          {highlightsSlides.map((_, i) => (
            <span
              key={i}
              ref={(el) => { containerRefs.current[i] = el; }}
              className={`mx-2 h-3 rounded-full relative cursor-pointer transition-all duration-300 ${i === activeSlide ? "w-10 bg-gray-200" : "w-3 bg-gray-500"}`}
              onClick={() => {
                setActiveSlide(i);
                setIsPlaying(true);
                // Reset all progress bars
                progressRefs.current.forEach((el, idx) => {
                  if (el) gsap.set(el, { width: idx < i ? "100%" : "0%" });
                });
              }}
            >
              <span
                ref={(el) => { progressRefs.current[i] = el; }}
                className="absolute h-full rounded-full bg-white top-0 left-0"
                style={{ width: i < activeSlide ? "100%" : "0%" }}
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
