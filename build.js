const esbuild = require('esbuild');
const { join } = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const distPath = join(__dirname, 'dist');

// Xóa thư mục dist/ trước khi build
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

// 1. Build declaration files bằng tsc
console.log('📦 Building declaration files...');
execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' });

// 2. Bundle JS bằng esbuild
console.log('📦 Bundling JS with esbuild...');
esbuild.build({
  entryPoints: ['index.js'], // file entry point chính
  bundle: true,
  format: 'cjs',
  outfile: 'dist/index.js',
  external: [
    'react',
    'react-native',
    'react-native-device-info',
    'react-native-iphone-x-helper',
    'd4dpocket',
    '@react-native-camera-roll/camera-roll',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-permissions',
    'react-native-vector-icons',
  ],
  loader: {
    '.js': 'jsx',
  },
  minify: false,
  sourcemap: true,
  platform: 'node',
}).then(() => {
  console.log('✅ Build success!');
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
