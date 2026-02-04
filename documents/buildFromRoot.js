const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function run(cmd, args, options) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: true,
    ...options,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

try {
  const rootPath = path.resolve(__dirname, "../");
  const samplePath = path.resolve(__dirname, "../example/RNCoreUISample");
  const rootNodeModules = path.join(rootPath, "node_modules");
  const sampleNodeModules = path.join(samplePath, "node_modules");

  if (!fs.existsSync(rootNodeModules)) {
    console.log("📥 node_modules not found in root → running yarn install...");
    run("yarn", [], { cwd: rootPath });
  } else {
    console.log("✅ node_modules already exists in root → skip yarn install");
  }

  console.log("🔨 Building root package...");
  run("node", ["documents/buildV2.js"], { cwd: rootPath });

  console.log("🔨 Override dist/package.json...");
  run("node", ["documents/overridePackageJson.js"], { cwd: rootPath });

  if (!fs.existsSync(sampleNodeModules)) {
    console.log(
      "📥 node_modules not found in example/RNCoreUISample → running yarn install...",
    );
    run("yarn", [], { cwd: samplePath });
  } else {
    console.log(
      "✅ node_modules already exists in example/RNCoreUISample → skip yarn install",
    );
  }

  console.log("📂 Copy package to example...");
  run("node", ["documents/copyPackageToExample.js"], {
    cwd: rootPath,
  });

  console.log("🎉 Done");
} catch (err) {
  console.error("❌ Error occur:", err);
  process.exit(1);
}
