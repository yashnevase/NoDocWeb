import {
  Component,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowUpRight,
  Layers,
  Combine,
  Scissors,
  MousePointer2,
} from "lucide-react";
const ProductScene = lazy(() => import("./ProductScene"));
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <img
        className="scene-fallback"
        src="/assets/logo/nodoc-logo.png"
        alt="NoDoc document logo"
      />
    ) : (
      this.props.children
    );
  }
}
export default function HeroExperience() {
  const [action, setAction] = useState("organize");
  const [visible, setVisible] = useState(true);
  const [foreground, setForeground] = useState(true);
  const [reduced, setReduced] = useState(false);
  const region = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries[0]?.isIntersecting ?? false),
      { rootMargin: "100px" },
    );
    if (region.current) observer.observe(region.current);
    const visibility = () => setForeground(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div className="hero-experience" ref={region}>
      <div className="scene-halo" />
      <div className="scene-orbit" />
      <div className="scene-orbit orbit-inner" />
      <div className="scene-status">
        <span className="status-dot" /> YOUR WORKSPACE. OFFLINE.
      </div>
      <div
        className="scene-canvas"
        role="img"
        aria-label="Interactive 3D document illustration. The controls demonstrate organizing, merging, and splitting pages."
      >
        <SceneBoundary>
          <Suspense
            fallback={
              <img
                className="scene-fallback"
                src="/assets/logo/nodoc-logo.png"
                alt="NoDoc document logo"
              />
            }
          >
            <ProductScene
              action={action}
              active={visible && foreground}
              reduced={reduced}
            />
          </Suspense>
        </SceneBoundary>
      </div>
      <div className="scene-note note-one">
        <Layers size={16} />
        <div>
          <strong>
            {action === "merge"
              ? "Bring it together."
              : action === "split"
                ? "Just the pages you need."
                : "Everything in its place."}
          </strong>
          <span>
            {action === "merge"
              ? "Many documents. One PDF."
              : action === "split"
                ? "One document. New possibilities."
                : "A little order goes a long way."}
          </span>
        </div>
        <ArrowUpRight size={14} />
      </div>
      <div className="scene-controls" aria-label="3D document actions">
        {[
          { id: "organize", label: "Organize", icon: Layers },
          { id: "merge", label: "Merge", icon: Combine },
          { id: "split", label: "Split", icon: Scissors },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setAction(item.id)}
            aria-pressed={action === item.id}
          >
            <item.icon size={14} />
            {item.label}
          </button>
        ))}
      </div>
      <span className="scene-hint">
        <MousePointer2 size={11} /> Move your cursor. Try a tool.
      </span>
    </div>
  );
}
