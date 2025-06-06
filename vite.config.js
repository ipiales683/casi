import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: './',
  root: 'src',
  publicDir: 'public',
  server: {
    port: 5173,
    strictPort: true,
    host: 'localhost',
    open: true,
    cors: true,
    fs: {
      strict: false,
      allow: ['..']
    },
    hmr: {
      overlay: true,
      clientPort: 5173
    },
    proxy: {
      // Proxy para API en desarrollo local
      '/api': {
        target: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:8787' 
          : 'https://api.abogadowilson.com',
        changeOrigin: true,
        secure: false, // No validar certificados en desarrollo
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('[Proxy Error]', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('[Proxy Request]', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('[Proxy Response]', proxyRes.statusCode, req.url);
          });
        },
      },
      // Proxy específico para WebSocket
      '/ws': {
        target: 'ws://localhost:8787',
        ws: true,
        changeOrigin: true,
        secure: false
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      'components': resolve(__dirname, 'src/components'),
      'pages': resolve(__dirname, 'src/pages'),
      'context': resolve(__dirname, 'src/context'),
      'utils': resolve(__dirname, 'src/utils'),
      'services': resolve(__dirname, 'src/services'),
      'assets': resolve(__dirname, 'src/assets'),
      'hooks': resolve(__dirname, 'src/hooks')
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'axios',
      'react-icons',
      'react-hot-toast'
    ]
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: mode === 'production',
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          vendor: ['axios', 'react-icons', 'react-hot-toast']
        },
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
}));