import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { generateStaticHTML, generateAboutPageHTML, generateStaticCSS, generateStaticJS } from './src/static-export/renderStaticSite';
import { staticExportAssets } from './src/static-export/staticExportAssets';

// Static export plugin
function staticExportPlugin() {
  return {
    name: 'static-export',
    closeBundle: async () => {
      console.log('\n📦 Generating static export package...');
      
      const exportDir = path.resolve(__dirname, 'dist/static-export');
      const zipPath = path.resolve(__dirname, 'dist/website-code.zip');

      // Clean and create export directory
      if (fs.existsSync(exportDir)) {
        fs.rmSync(exportDir, { recursive: true, force: true });
      }
      fs.mkdirSync(exportDir, { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'css'), { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'js'), { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'assets/images'), { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'about'), { recursive: true });

      // Generate static files
      fs.writeFileSync(path.join(exportDir, 'index.html'), generateStaticHTML());
      fs.writeFileSync(path.join(exportDir, 'about/index.html'), generateAboutPageHTML());
      fs.writeFileSync(path.join(exportDir, 'css/style.css'), generateStaticCSS());
      fs.writeFileSync(path.join(exportDir, 'js/script.js'), generateStaticJS());

      // Copy assets
      for (const asset of staticExportAssets) {
        const sourcePath = path.resolve(__dirname, asset.source);
        const destPath = path.join(exportDir, asset.destination);
        
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
        } else {
          console.warn(`⚠️  Asset not found: ${asset.source}`);
        }
      }

      // Create ZIP archive with Promise-based error handling
      console.log('📦 Creating ZIP archive...');
      
      await new Promise<void>((resolve, reject) => {
        const output = fs.createWriteStream(zipPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        let hasError = false;

        output.on('close', () => {
          if (!hasError) {
            const sizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
            console.log(`✅ Static export ZIP created: ${sizeMB} MB`);
            resolve();
          }
        });

        output.on('error', (err) => {
          hasError = true;
          console.error('❌ Output stream error:', err);
          reject(err);
        });

        archive.on('error', (err) => {
          hasError = true;
          console.error('❌ Archive error:', err);
          reject(err);
        });

        archive.on('warning', (err) => {
          if (err.code !== 'ENOENT') {
            console.warn('⚠️  Archive warning:', err);
          }
        });

        archive.pipe(output);
        archive.directory(exportDir, false);
        archive.finalize();
      });

      // Post-build verification
      console.log('\n🔍 Running post-build verification...');
      
      const distIndexPath = path.resolve(__dirname, 'dist/index.html');
      if (!fs.existsSync(distIndexPath)) {
        throw new Error('❌ dist/index.html not found after build');
      }

      const indexContent = fs.readFileSync(distIndexPath, 'utf-8');
      
      // Check for asset references
      const assetPattern = /\/(assets\/[^"'\s]+)/g;
      const matches = indexContent.match(assetPattern);
      if (matches) {
        for (const match of matches) {
          const assetPath = path.resolve(__dirname, 'dist', match.slice(1));
          if (!fs.existsSync(assetPath)) {
            console.warn(`⚠️  Referenced asset not found: ${match}`);
          }
        }
      }

      // Verify static files
      const requiredFiles = [
        'dist/website-code.zip',
        'dist/static-export/index.html',
        'dist/static-export/about/index.html',
        'dist/static-export/css/style.css',
        'dist/static-export/js/script.js',
      ];

      for (const file of requiredFiles) {
        const filePath = path.resolve(__dirname, file);
        if (!fs.existsSync(filePath)) {
          throw new Error(`❌ Required file not found: ${file}`);
        }
      }

      console.log('✅ Post-build verification passed');
      console.log('✅ Static export generation complete\n');
    },
  };
}

export default defineConfig({
  plugins: [react(), staticExportPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4943',
        changeOrigin: true,
      },
    },
  },
});
