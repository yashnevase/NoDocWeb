import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import DocumentShowcase from "./components/Model";
import EditorShowcase from "./components/EditorShowcase";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DownloadSection from "./components/DownloadSection";
import Footer from "./components/Footer";
import * as Sentry from "@sentry/react";

/** Root App: single-page layout. */
function AppRoot(): React.ReactElement {
  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <DocumentShowcase />
      <EditorShowcase />
      <Highlights />
      <Features />
      <HowItWorks />
      <DownloadSection />
      <Footer />
    </main>
  );
}

const App = import.meta.env.VITE_SENTRY_DSN ? Sentry.withProfiler(AppRoot) : AppRoot;
export default App;
