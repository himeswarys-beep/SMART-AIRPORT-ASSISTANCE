import { build } from 'vite';
import react from '@vitejs/plugin-react';

console.log('📦 Building Smart Airport Assistant app to dist_app...');

async function runBuild() {
  try {
    await build({
      configFile: false,
      cacheDir: './.vite_cache',
      plugins: [react()],
      build: {
        outDir: 'dist_app',
        emptyOutDir: true
      }
    });
    console.log('✅ Build completed successfully!');
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
}

runBuild();
