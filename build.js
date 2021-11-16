import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function* walk(rootPath) {
  for (const fileName of await fs.readdir(rootPath)) {
    const filePath = path.join(rootPath, fileName);
    if ((await fs.stat(filePath)).isDirectory()) {
      yield* walk(filePath);
    } else {
      yield filePath;
    }
  }
}

const src = path.join(__dirname, "src", "index.ts");
const entryPoints = [src];
if (process.argv[2] === "test") {
  for await (const test of walk(path.join(__dirname, "test"))) {
    if (test.endsWith(".spec.ts")) entryPoints.push(test);
  }
}

try {
  await build({
    bundle: true,
    sourcemap: true,
    format: "esm",
    external: ["jest", "@jest"],
    outdir: path.join(__dirname, "dist"),
    outbase: __dirname,
    outExtension: { ".js": ".mjs" },
    entryPoints,
  });
} catch {
  process.exitCode = 1;
}
