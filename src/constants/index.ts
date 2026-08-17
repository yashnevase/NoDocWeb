export const navLists = ["Features", "Editor", "How it works", "Privacy", "Download"];

export interface HighlightSlide {
  id: number;
  textLists: string[];
  duration: number; // replacing videoDuration
  action: string;
}

export const highlightsSlides: HighlightSlide[] = [
  {
    id: 1,
    textLists: [
      "Edit what matters.",
      "Modify text and add annotations",
      "directly on your PDF pages.",
    ],
    duration: 4,
    action: "edit",
  },
  {
    id: 2,
    textLists: ["Organize freely.", "Put every page exactly where it belongs."],
    duration: 5,
    action: "organize",
  },
  {
    id: 3,
    textLists: [
      "Merge & Split.",
      "Bring documents together,",
      "or break them apart.",
    ],
    duration: 4,
    action: "merge-split",
  },
  {
    id: 4,
    textLists: ["Work locally.", "Your PDFs never leave your computer."],
    duration: 4,
    action: "local",
  },
];

export interface ModelItem {
  id: number;
  title: string;
  action: string;
}

export const models: ModelItem[] = [
  {
    id: 1,
    title: "Edit text and annotations",
    action: "edit",
  },
  {
    id: 2,
    title: "Organize your pages",
    action: "organize",
  },
  {
    id: 3,
    title: "Merge multiple documents",
    action: "merge",
  },
  {
    id: 4,
    title: "Split into new documents",
    action: "split",
  },
  {
    id: 5,
    title: "Search instantly",
    action: "search",
  },
];

export const footerLinks = [
  "Features",
  "Editor",
  "Privacy",
  "Download",
  "GitHub",
  "Contact",
];

export const WINDOWS_DOWNLOAD_URL = "";
export const MACOS_DOWNLOAD_URL = "";
