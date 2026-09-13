import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
const packages = ["react", "react-dom", "scheduler", "lucide-react"];
let output = "NoDoc website: runtime dependency notices\n\n";
for (const name of packages) {
  const meta = JSON.parse(
    await readFile(root + "node_modules/" + name + "/package.json", "utf8"),
  );
  output += "\n" + name + " " + meta.version + "\n" + "=".repeat(60) + "\n";
  output += await readFile(root + "node_modules/" + name + "/LICENSE", "utf8");
  output += "\n";
}
await mkdir(root + "public/legal", { recursive: true });
await writeFile(root + "public/legal/WEB-THIRD-PARTY.txt", output.trimEnd() + '\n');
globalThis.console.log("Runtime notices collected from installed packages.");
