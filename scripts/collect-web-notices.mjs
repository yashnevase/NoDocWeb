import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath, URL } from "node:url";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
const root = fileURLToPath(new URL("../", import.meta.url));
const packages = [
  "react",
  "react-dom",
  "lucide-react",
  "three",
  "@react-three/fiber",
];
let output = "NoDoc website: runtime dependency notices\n\n";
const visited = new Set();
async function collect(name, from) {
  if (name.startsWith("@types/")) return;
  const resolve = createRequire(join(from, "package.json"));
  let entry;
  try {
    entry = resolve.resolve(name + "/package.json");
  } catch {
    entry = resolve.resolve(name);
  }
  let directory = dirname(entry);
  let meta;
  while (true) {
    try {
      meta = JSON.parse(
        await readFile(join(directory, "package.json"), "utf8"),
      );
    } catch {
      meta = null;
    }
    if (meta?.name === name) break;
    const parent = dirname(directory);
    if (parent === directory) throw new Error("Cannot locate package " + name);
    directory = parent;
  }
  if (visited.has(directory)) return;
  visited.add(directory);
  output += "\n" + name + " " + meta.version + "\n" + "=".repeat(60) + "\n";
  output += await readFile(
    name === "@react-three/fiber"
      ? join(root, "scripts/licenses/react-three-fiber.txt")
      : join(directory, "LICENSE"),
    "utf8",
  );
  output += "\n";
  for (const dependency of Object.keys(meta.dependencies || {}))
    await collect(dependency, directory);
}
for (const name of packages) await collect(name, root);
await mkdir(root + "public/legal", { recursive: true });
await writeFile(
  root + "public/legal/WEB-THIRD-PARTY.txt",
  output.replace(/\r\n/g, "\n").trimEnd() + "\n",
);
globalThis.console.log("Runtime notices collected from installed packages.");
