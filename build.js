const esbuild = require('esbuild');
const { join } = require('path');
const fsPromises = require('fs').promises; // Rename the promises API import
const fs = require('fs'); // Import the standard synchronous fs module
const { execSync } = require('child_process');

// Xóa thư mục dist
const distPath = join(__dirname, 'dist');
async function removeDist() {
  if (fs.existsSync(distPath)) { // Use the synchronous existsSync
    await fsPromises.rm(distPath, { recursive: true, force: true });
  }
}

async function build() {
  await removeDist();

  // 1. Build declaration files bằng tsc (Chỉ cần nếu cần file .d.ts riêng)
  console.log('📦 Building declaration files...');
  execSync('tsc --emitDeclarationOnly --declaration --outDir dist', { stdio: 'inherit' });

  // 2. Bundle JS với esbuild
  console.log('📦 Bundling JS with esbuild...');
  try {
    await esbuild.build({
      entryPoints: ['src/index.ts'],
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
        'react-native-svg'
      ],
      loader: {
        '.js': 'jsx',
        '.ts': 'ts',
        '.tsx': 'tsx',
      },
      minify: false,
      sourcemap: true,
      platform: 'node',
      target: 'esnext',
    });
    console.log('✅ JS Bundle success!');

    console.log('📦 Copying package.json...');
    await fsPromises.copyFile('package.json', join(distPath, 'package.json'));
    console.log('✅ package.json copied!');

    if (fs.existsSync('LICENSE')) { // Use the synchronous existsSync
      console.log('📦 Copying LICENSE...');
      await fsPromises.copyFile('LICENSE', join(distPath, 'LICENSE'));
      console.log('✅ LICENSE copied!');
    } else {
      console.warn('⚠️ LICENSE file not found in the root.');
    }

    if (fs.existsSync('README.md')) { // Use the synchronous existsSync
      console.log('📦 Copying README.md...');
      await fsPromises.copyFile('README.md', join(distPath, 'README.md'));
      console.log('✅ README.md copied!');
    } else {
      console.warn('⚠️ README.md file not found in the root.');
    }

    console.log('✅ Build complete!');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

build();