import { logoImg, downloadImg } from "../utils";
import { navLists } from "../constants";

/** Maps nav label → section anchor id */
const NAV_LINKS: Record<string, string> = {
  Features: "#features",
  Editor:   "#editor",
  "How it works": "#hiw",
  Privacy:  "#privacy",
  Download: "#download",
};

/** Top nav: NoDoc logo (left), center nav links, download button (right). */
function Navbar(): React.ReactElement {
  return (
    <header className="w-full fixed top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      <div className="w-full min-h-[70px] py-3 sm:px-10 px-5 flex justify-between items-center screen-max-width">

        {/* Logo — click → scroll to top */}
        <a
          href="#"
          aria-label="NoDoc — home"
          className="flex shrink-0 items-center justify-center cursor-pointer group no-underline"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img
            src={logoImg}
            alt="NoDoc logo"
            className="h-8 w-auto object-contain block transition-transform group-hover:scale-105"
            fetchPriority="high"
          />
          <span className="ml-2.5 text-xl font-bold text-white tracking-tight hidden sm:block select-none">
            NoDoc
          </span>
        </a>

        {/* Center: nav links */}
        <nav className="flex flex-1 justify-center max-md:hidden" aria-label="Main navigation">
          {navLists.map((nav) => (
            <a
              key={nav}
              href={NAV_LINKS[nav] ?? "#"}
              className="px-5 text-sm font-medium cursor-pointer text-gray-200 hover:text-white transition-colors no-underline"
            >
              {nav}
            </a>
          ))}
        </nav>

        {/* Right: Download */}
        <div className="flex shrink-0 items-center gap-4 max-md:justify-end max-md:flex-1">
          <a
            href="#download"
            className="flex items-center gap-2 bg-nodoc-red text-white px-4 py-2 rounded-full text-sm font-medium
                       hover:bg-nodoc-darkred transition-all duration-300 shadow-lg shadow-nodoc-red/20
                       hover:shadow-nodoc-red/40 hover:-translate-y-0.5 no-underline"
          >
            <span className="hidden sm:inline">Download NoDoc</span>
            <span className="sm:hidden">Download</span>
            <img src={downloadImg} alt="" className="w-4 h-4 invert" aria-hidden="true" />
          </a>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
