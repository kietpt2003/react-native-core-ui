const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve(process.cwd(), "dist/package.json");

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

pkg.main = "dist/index.js";
pkg.types = "dist/index.d.ts";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

console.log("✅ Override package.json success!");
