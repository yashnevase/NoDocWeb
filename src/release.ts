export const owner = {
  name: "Yash",
  contact: "https://yashnevse-website.vercel.app/",
  github: "https://github.com/yashnevase",
};
export const release = {
  version: "0.1.2",
  notesUrl: "https://github.com/yashnevase/NoDoc-Releases/releases/tag/v0.1.2-early-access",
  downloads: [
    {
      platform: "Windows",
      version: "0.1.2",
      architecture: "Windows 10 / 11 · x64",
      format: ".exe",
      size: "110 MB",
      url: "https://github.com/yashnevase/NoDoc-Releases/releases/download/v0.1.2-early-access/NoDoc_0.1.2_x64-setup.exe",
      sha256: "e5226e3493fa7a6aac3f57e3138f60cbee52fed0818329bdb89f4f0d7817d33f",
      install:
        "Run the installer and follow the setup steps. Early-access build; unsigned. It opens without a separate Command Prompt window.",
    },
    {
      platform: "macOS",
      version: "0.1.3",
      architecture: "Apple silicon · M1 and later",
      format: ".dmg",
      size: "51 MB",
      url: "https://github.com/yashnevase/NoDoc-Releases/releases/download/v0.1.3-early-access/NoDoc_0.1.3_aarch64.dmg",
      sha256:
        "54643d5f8ab003003ef038005aa1ebe5ca421a923dff2a99c5ff757d2bea432a",
      install:
        "Open the disk image and drag NoDoc to Applications. The app bundle is verified, but it is not notarized. Intel Macs are not supported by this build.",
    },
  ],
};
