const esbuild = require('esbuild');
const { join } = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const tsconfigPaths = require('@esbuild-plugins/tsconfig-paths').default;

// Xóa thư mục dist
const distPath = join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

// 1. Build declaration files bằng tsc (Chỉ cần nếu cần file .d.ts riêng)
console.log('📦 Building declaration files...');
execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' });

// 2. Bundle JS với esbuild
console.log('📦 Bundling JS with esbuild...');
esbuild.build({
  entryPoints: ['index.ts'],
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
  plugins: [
    tsconfigPaths({ tsconfig: join(__dirname, 'tsconfig.json') })
  ],
  loader: {
    '.js': 'jsx',
    '.ts': 'ts',
    '.tsx': 'tsx',
  },
  minify: false,
  sourcemap: true,
  platform: 'node', // Platform node cho package backend
  target: 'esnext', // Đảm bảo target esnext cho cú pháp mới
}).then(() => {
  console.log('✅ Build success!');
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
