import { Copyright } from "lucide-react";
import { footerLinks } from "../constants";

export default function Footer(): React.ReactElement {
  return (
    <footer className="py-10 sm:px-10 px-5 bg-black border-t border-white/10">
      <div className="screen-max-width">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
          <div>
            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">NoDoc</h3>
            <p className="font-medium text-gray-400 text-sm max-w-sm">
              The free, local, and offline PDF manager and editor for Windows and macOS.
            </p>
          </div>
        </div>

        <div className="bg-neutral-800 my-8 h-[1px] w-full" />

        <div className="flex md:flex-row flex-col md:items-center justify-between gap-5">
          <p className="font-medium text-gray-400 text-xs flex items-center gap-1">
            <Copyright className="w-3.5 h-3.5 shrink-0" aria-hidden />
            {new Date().getFullYear()} NoDoc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="font-medium text-gray-400 hover:text-white transition-colors text-xs">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
