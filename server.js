import { createServer } from 'vite';
import react from '@vitejs/plugin-react';

async function start() {
  const server = await createServer({
    configFile: false,
    root: process.cwd(),
    cacheDir: './.vite_cache',
    plugins: [react()],
    server: {
      port: 3000,
      host: '127.0.0.1',
      strictPort: true
    }
  });

  await server.listen();
  server.printUrls();
  console.log('\n  🚀 Smart Airport Assistant App is running at: http://localhost:3000/\n');
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
