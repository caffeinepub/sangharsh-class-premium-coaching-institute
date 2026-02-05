import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import environment from 'vite-plugin-environment';
import fs from 'fs';
import archiver from 'archiver';
import { generateStaticHTML, generateStaticCSS, generateStaticJS } from './src/static-export/renderStaticSite';
import { staticExportAssets } from './src/static-export/staticExportAssets';

// Plugin to generate static website export ZIP after build
function staticExportPlugin() {
  return {
    name: 'static-export-plugin',
    closeBundle: async () => {
      console.log('[Static Export] Starting generation...');
      
      const distDir = path.resolve(__dirname, 'dist');
      const exportDir = path.resolve(distDir, 'static-export');
      const zipPath = path.resolve(distDir, 'website-code.zip');

      try {
        // Create export directory structure
        console.log('[Static Export] Creating directory structure...');
        if (!fs.existsSync(exportDir)) {
          fs.mkdirSync(exportDir, { recursive: true });
        }
        fs.mkdirSync(path.join(exportDir, 'css'), { recursive: true });
        fs.mkdirSync(path.join(exportDir, 'js'), { recursive: true });
        fs.mkdirSync(path.join(exportDir, 'assets', 'images'), { recursive: true });

        // Generate static files
        console.log('[Static Export] Generating static HTML, CSS, and JS...');
        fs.writeFileSync(path.join(exportDir, 'index.html'), generateStaticHTML());
        fs.writeFileSync(path.join(exportDir, 'css', 'style.css'), generateStaticCSS());
        fs.writeFileSync(path.join(exportDir, 'js', 'script.js'), generateStaticJS());

        // Copy assets
        console.log('[Static Export] Copying assets...');
        const publicDir = path.resolve(__dirname, 'public');
        for (const asset of staticExportAssets.images) {
          const sourcePath = path.join(publicDir, asset.source);
          const destPath = path.join(exportDir, asset.destination);
          
          if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
          } else {
            console.warn(`[Static Export] Asset not found: ${sourcePath}`);
          }
        }

        // Create ZIP file with proper stream handling
        console.log('[Static Export] Creating ZIP archive...');
        await new Promise<void>((resolve, reject) => {
          const output = fs.createWriteStream(zipPath);
          const archive = archiver('zip', { zlib: { level: 9 } });

          // Handle output stream events
          output.on('close', () => {
            console.log(`[Static Export] ZIP created successfully: ${archive.pointer()} bytes`);
            resolve();
          });

          output.on('error', (err) => {
            console.error('[Static Export] Output stream error:', err);
            reject(err);
          });

          // Handle archiver events
          archive.on('error', (err) => {
            console.error('[Static Export] Archiver error:', err);
            reject(err);
          });

          archive.on('warning', (err) => {
            if (err.code === 'ENOENT') {
              console.warn('[Static Export] Archiver warning:', err);
            } else {
              console.error('[Static Export] Archiver warning (critical):', err);
              reject(err);
            }
          });

          // Pipe archive to output stream
          archive.pipe(output);

          // Add directory contents to archive
          archive.directory(exportDir, false);

          // Finalize the archive (this triggers the 'close' event on output stream)
          archive.finalize();
        });

        // Verify ZIP file was created
        if (!fs.existsSync(zipPath)) {
          throw new Error('ZIP file was not created');
        }

        const zipStats = fs.statSync(zipPath);
        if (zipStats.size === 0) {
          throw new Error('ZIP file is empty');
        }

        console.log(`[Static Export] Verification passed: ${zipPath} (${zipStats.size} bytes)`);

        // Clean up temporary export directory
        console.log('[Static Export] Cleaning up temporary files...');
        fs.rmSync(exportDir, { recursive: true, force: true });

        console.log('[Static Export] ✓ Complete');

        // Post-build sanity check: verify dist/index.html is built (not source)
        const distIndexPath = path.join(distDir, 'index.html');
        if (fs.existsSync(distIndexPath)) {
          const indexContent = fs.readFileSync(distIndexPath, 'utf-8');
          if (indexContent.includes('/src/main.tsx')) {
            console.error('[Build Verification] ❌ ERROR: dist/index.html appears to be source file (references /src/main.tsx)');
            console.error('[Build Verification] This indicates wrong publish directory configuration.');
            console.error('[Build Verification] Ensure deployment publishes ONLY frontend/dist/ as web root.');
          } else if (indexContent.includes('./assets/') || indexContent.includes('assets/')) {
            console.log('[Build Verification] ✓ dist/index.html contains hashed asset references');
          } else {
            console.warn('[Build Verification] ⚠ Could not verify asset references in dist/index.html');
          }
        }

        // Verify required static files are present
        const requiredFiles = [
          '404.html',
          'sitemap.xml',
          'robots.txt',
          '_redirects',
          '_headers',
          'google53082ab74af04c28.html',
          'favicon.png',
          'favicon.ico',
          'website-code.zip'
        ];

        console.log('[Build Verification] Checking required static files in dist/...');
        const missingFiles: string[] = [];
        for (const file of requiredFiles) {
          const filePath = path.join(distDir, file);
          if (!fs.existsSync(filePath)) {
            missingFiles.push(file);
          }
        }

        if (missingFiles.length > 0) {
          console.error('[Build Verification] ❌ Missing required files in dist/:');
          missingFiles.forEach(file => console.error(`  - ${file}`));
          console.error('[Build Verification] These files should be copied from frontend/public/ during build.');
        } else {
          console.log('[Build Verification] ✓ All required static files present in dist/');
        }

      } catch (error) {
        console.error('[Static Export] ❌ Failed:', error);
        throw error;
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    environment('all', { prefix: 'CANISTER_' }),
    environment('all', { prefix: 'DFX_' }),
    staticExportPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4943',
        changeOrigin: true,
      },
    },
  },
});
