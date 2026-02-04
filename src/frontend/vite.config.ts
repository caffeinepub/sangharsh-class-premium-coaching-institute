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
      console.log('Generating static website export...');
      
      const distDir = path.resolve(__dirname, 'dist');
      const exportDir = path.resolve(distDir, 'static-export');
      const zipPath = path.resolve(distDir, 'website-code.zip');

      // Create export directory structure
      if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir, { recursive: true });
      }
      fs.mkdirSync(path.join(exportDir, 'css'), { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'js'), { recursive: true });
      fs.mkdirSync(path.join(exportDir, 'assets', 'images'), { recursive: true });

      // Generate static files
      fs.writeFileSync(path.join(exportDir, 'index.html'), generateStaticHTML());
      fs.writeFileSync(path.join(exportDir, 'css', 'style.css'), generateStaticCSS());
      fs.writeFileSync(path.join(exportDir, 'js', 'script.js'), generateStaticJS());

      // Copy assets
      const publicDir = path.resolve(__dirname, 'public');
      for (const asset of staticExportAssets.images) {
        const sourcePath = path.join(publicDir, asset.source);
        const destPath = path.join(exportDir, asset.destination);
        
        if (fs.existsSync(sourcePath)) {
          fs.copyFileSync(sourcePath, destPath);
        } else {
          console.warn(`Asset not found: ${sourcePath}`);
        }
      }

      // Create ZIP file
      const output = fs.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      archive.pipe(output);
      archive.directory(exportDir, false);
      await archive.finalize();

      console.log(`Static website export created: ${zipPath}`);
      
      // Clean up temporary export directory
      fs.rmSync(exportDir, { recursive: true, force: true });
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
