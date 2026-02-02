const fs = require("fs-extra");
const path = require("path");

async function copyPackageDirectly() {
  const root = path.resolve(__dirname, "../");
  const distDir = path.join(root, "dist");
  const dest = path.resolve(
    __dirname,
    "../example/RNCoreUISample/node_modules/@estuary/rn-core-ui"
  );

  console.log("👉🏻🗑️ Removing old package in node_modules...");
  await fs.remove(dest);
  await fs.ensureDir(dest);
  console.log("✅ Remove success!");

  if (await fs.pathExists(distDir)) {
    const items = await fs.readdir(distDir);

    for (const item of items) {
      const srcPath = path.join(distDir, item);
      const destPath = path.join(dest, item);

      await fs.copy(srcPath, destPath);
    }
  }

  console.log("✅ All dist contents copied into node_modules success!");
}

copyPackageDirectly().catch(console.error);
