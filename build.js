// build.js
const esbuild = require('esbuild');
const { join } = require('path');
const fs = require('fs');

// Xóa thư mục dist/ trước khi build
const distPath = join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true });
}

// Build
esbuild.build({
  entryPoints: ['index.js'], // Entry file chính
  bundle: true,
  format: 'cjs', // CommonJS cho compatibility
  outfile: 'dist/index.js',
  external: [ // Không bundle các dependencies chính
    'react',
    'react-native',
    'react-native-device-info',
    'react-native-iphone-x-helper',
    'd4dpocket',
  ],
  loader: {
    '.js': 'jsx', // Đảm bảo xử lý JSX trong các file .js
  },
  minify: false, // Tùy bạn, dev thì nên false cho dễ debug
  sourcemap: true,
  platform: 'node', // Cần để build chuẩn
}).then(() => {
  console.log('✅ Build success!');
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
