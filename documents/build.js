const esbuild = require("esbuild");
const path = require("path");
const glob = require("fast-glob");
const fsPromises = require("fs").promises; // Rename the promises API import
const fs = require("fs"); // Import the standard synchronous fs module
const { execSync } = require("child_process");
const alias = require("esbuild-plugin-alias");

const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "src");
const DIST_DIR = path.join(ROOT, "dist");

async function getAllTSFilesRecursively(dir) {
  return await glob(`${dir}/**/*.{ts,tsx}`, { absolute: false });
}

async function removeDist() {
  if (fs.existsSync(DIST_DIR)) {
    await fsPromises.rm(DIST_DIR, { recursive: true, force: true });
  }
}

async function build() {
  await removeDist();

  // 1. Build declaration files bằng tsc (Chỉ cần nếu cần file .d.ts riêng)
  console.log("📦 Building declaration files...");
  execSync("tsc --emitDeclarationOnly --declaration --outDir dist", {
    cwd: ROOT,
    stdio: "inherit",
  });

  // 2. Bundle JS với esbuild
  console.log("📦 Bundling JS with esbuild...");
  try {
    await esbuild.build({
      outdir: DIST_DIR,
      entryPoints: await getAllTSFilesRecursively("src"),
      bundle: true,
      format: "cjs",
      external: [
        "react",
        "react-native",
        "react-native-device-info",
        "react-native-iphone-x-helper",
        "react-native-svg",
        "react-native-fast-image",
      ],
      loader: {
        ".js": "jsx",
        ".ts": "ts",
        ".tsx": "tsx",
      },
      minify: false,
      sourcemap: true,
      platform: "node",
      target: "esnext",
      plugins: [
        alias({
          "@": path.join(SRC_DIR, "index.ts"),
          "@constant": path.join(SRC_DIR, "constants/index.ts"),
          "@utils": path.join(SRC_DIR, "utils/index.ts"),
          "@hooks": path.join(SRC_DIR, "hooks/index.ts"),
          "@themes": path.join(SRC_DIR, "themes/index.ts"),
        }),
      ],
    });
    console.log("✅ JS Bundle success!");

    console.log("📦 Copying package.json...");
    await fsPromises.copyFile(
      path.join(ROOT, "package.json"),
      path.join(DIST_DIR, "package.json"),
    );
    console.log("✅ package.json copied!");

    const licensePath = path.join(ROOT, "LICENSE");
    if (fs.existsSync(licensePath)) {
      console.log("📦 Copying LICENSE...");
      await fsPromises.copyFile(licensePath, path.join(DIST_DIR, "LICENSE"));
      console.log("✅ LICENSE copied!");
    } else {
      console.warn("⚠️ LICENSE file not found in the root.");
    }

    const readmePath = path.join(ROOT, "README.md");
    if (fs.existsSync(readmePath)) {
      console.log("📦 Copying README.md...");
      await fsPromises.copyFile(readmePath, path.join(DIST_DIR, "README.md"));
      console.log("✅ README.md copied!");
    } else {
      console.warn("⚠️ README.md file not found in the root.");
    }

    console.log("✅ Build complete!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

build();
