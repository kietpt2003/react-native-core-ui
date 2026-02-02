const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, "..");
const DIST_DIR = path.join(ROOT, "dist");

function getBin(cmd) {
  const binPath = path.join(ROOT, "node_modules", ".bin", cmd);
  if (fs.existsSync(binPath)) {
    return `"${binPath}"`;
  }
  return cmd;
}

async function removeDist() {
  if (fs.existsSync(DIST_DIR)) {
    await fsPromises.rm(DIST_DIR, { recursive: true, force: true });
  }
}

async function build() {
  await removeDist();

  try {
    console.log("📦 Building...");

    const tsc = getBin(process.platform === "win32" ? "tsc.cmd" : "tsc");
    const tscAlias = getBin(
      process.platform === "win32" ? "tsc-alias.cmd" : "tsc-alias"
    );

    execSync(
      `${tsc} -p tsconfig.web.json && ${tscAlias} -p tsconfig.web.json`,
      {
        cwd: ROOT,
        stdio: "inherit",
      }
    );

    console.log("📦 Copying package.json...");
    await fsPromises.copyFile(
      path.join(ROOT, "package.json"),
      path.join(DIST_DIR, "package.json")
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

    const tsConfigPath = path.join(ROOT, "tsconfig.json");
    if (fs.existsSync(tsConfigPath)) {
      console.log("📦 Copying tsconfig.json...");
      await fsPromises.copyFile(
        tsConfigPath,
        path.join(DIST_DIR, "tsconfig.json")
      );
      console.log("✅ tsconfig.json copied!");
    } else {
      console.warn("⚠️ tsconfig.json file not found in the root.");
    }

    const tsConfigWebPath = path.join(ROOT, "tsconfig.web.json");
    if (fs.existsSync(tsConfigWebPath)) {
      console.log("📦 Copying tsconfig.web.json...");
      await fsPromises.copyFile(
        tsConfigWebPath,
        path.join(DIST_DIR, "tsconfig.web.json")
      );
      console.log("✅ tsconfig.web.json copied!");
    } else {
      console.warn("⚠️ tsconfig.web.json file not found in the root.");
    }
    
    console.log('✅ Build complete!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

build();
