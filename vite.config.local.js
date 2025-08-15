import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: true, // Permite acceso desde otros dispositivos en la red
    open: true, // Abre automáticamente el navegador
    cors: true,
    hmr: {
      overlay: true // Muestra errores en overlay
    }
  },
  
  // Configuración de preview
  preview: {
    port: 4173,
    host: true
  },
  
  // Resolución de alias para importaciones más limpias
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@pages': resolve(__dirname, 'src/pages'),
      '@services': resolve(__dirname, 'src/services'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@context': resolve(__dirname, 'src/context'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@styles': resolve(__dirname, 'src/styles')
    }
  },
  
  // Optimizaciones de build
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', '@heroicons/react'],
          utils: ['axios', 'date-fns']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  
  // Configuración de CSS - Removido PostCSS para evitar el error
  css: {
    // PostCSS se maneja a través de postcss.config.js
  },
  
  // Configuración de optimización
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hot-toast',
      'axios',
      '@headlessui/react',
      '@heroicons/react',
      'framer-motion'
    ]
  },
  
  // Configuración de entorno
  define: {
    __DEV__: JSON.stringify(true),
    __VERSION__: JSON.stringify('1.0.0')
  },
  
  // Configuración de assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.ico'],
  
  // Configuración de logs
  logLevel: 'info',
  
  // Configuración de clearScreen
  clearScreen: false
});
