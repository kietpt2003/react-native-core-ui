const esbuild = require('esbuild');
const path = require('path');
const glob = require('fast-glob');
const fsPromises = require('fs').promises; // Rename the promises API import
const fs = require('fs'); // Import the standard synchronous fs module
const { execSync } = require('child_process');
const alias = require('esbuild-plugin-alias');

async function getAllTSFilesRecursively(dir) {
  return await glob(`${dir}/**/*.{ts,tsx}`, { absolute: false });
}

// Xóa thư mục dist
const distPath = path.join(__dirname, 'dist');
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
      outdir: 'dist',
      entryPoints: await getAllTSFilesRecursively('src'),
      bundle: true,
      format: 'cjs',
      external: [
        'react',
        'react-native',
        'react-native-device-info',
        'react-native-iphone-x-helper',
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
      plugins: [
        alias({
          "@constant": path.resolve(__dirname, 'src/constants/index.ts'),
          "@utils": path.resolve(__dirname, 'src/utils/index.ts'),
          "@hooks": path.resolve(__dirname, 'src/hooks/index.ts'),
          "@themes": path.resolve(__dirname, 'src/themes/index.ts')
        }),
      ],
    });
    console.log('✅ JS Bundle success!');

    console.log('📦 Copying package.json...');
    await fsPromises.copyFile('package.json', path.join(distPath, 'package.json'));
    console.log('✅ package.json copied!');

    if (fs.existsSync('LICENSE')) { // Use the synchronous existsSync
      console.log('📦 Copying LICENSE...');
      await fsPromises.copyFile('LICENSE', path.join(distPath, 'LICENSE'));
      console.log('✅ LICENSE copied!');
    } else {
      console.warn('⚠️ LICENSE file not found in the root.');
    }

    if (fs.existsSync('README.md')) { // Use the synchronous existsSync
      console.log('📦 Copying README.md...');
      await fsPromises.copyFile('README.md', path.join(distPath, 'README.md'));
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
