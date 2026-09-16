export const owner = {
  name: "Yash",
  contact: "https://yashnevse-website.vercel.app/",
  github: "https://github.com/yashnevase",
};
export const release = {
  version: "0.1.1",
  notesUrl: "https://github.com/yashnevase/NoDoc-Releases/releases/tag/v0.1.1-early-access",
  downloads: [
    {
      platform: "Windows",
      version: "0.1.1",
      architecture: "Windows 10 / 11 · x64",
      format: ".exe",
      size: "110 MB",
      url: "https://github.com/yashnevase/NoDoc-Releases/releases/download/v0.1.1-early-access/NoDoc_0.1.1_x64-setup.exe",
      sha256: "a8cace2bf49a056ab34f3e2c96435cd38b779fed27b30911aaad20121ba59903",
      install:
        "Run the installer and follow the setup steps. Early-access build; unsigned. It should open without a separate Command Prompt window.",
    },
    {
      platform: "macOS",
      version: "0.1.0",
      architecture: "Apple silicon · M1 and later",
      format: ".dmg",
      size: "53.5 MB",
      url: "https://github.com/yashnevase/NoDoc-Releases/releases/download/v0.1.0-early-access/NoDoc_0.1.0_aarch64.dmg",
      sha256:
        "19fc75ea3ce038e08e2d490e43db6c20cf75d8407f956a4f78c6f166c9e7dcf4",
      install:
        "Open the disk image and drag NoDoc to Applications. Not notarized. Intel Macs are not supported by this build.",
    },
  ],
};
