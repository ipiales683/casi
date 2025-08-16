import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

// 🌟 CONFIGURACIÓN OPTIMIZADA DE VITE PARA ABOGADO WILSON 🌟

export default defineConfig({
  plugins: [
    // Plugin principal de React
    react({
      // Configuración optimizada de React
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: [
          '@emotion/babel-plugin',
          'babel-plugin-macros'
        ]
      }
    }),
    
    // Plugin PWA para funcionalidad offline
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/axueygnrasjvrobaszka\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 horas
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Abogado Wilson - Sistema Legal Profesional',
        short_name: 'Abogado Wilson',
        description: 'Sistema legal completo para consultas, casos y gestión profesional',
        theme_color: '#1e40af',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    
    // Analizador de bundle para optimización
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    host: '0.0.0.0', // Permite acceso desde cualquier IP
    open: true, // Abre automáticamente el navegador
    cors: true,
    hmr: {
      overlay: true,
      port: 24678
    },
    
    // Configuración para evitar problemas de CORS
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      
      '/supabase': {
        target: 'https://axueygnrasjvrobaszka.supabase.co',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/supabase/, '')
      },
      
      '/n8n': {
        target: 'https://n8nom.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/n8n/, '')
      }
    },
    
    // Configuración de middleware personalizado
    middlewareMode: true
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
      '@styles': resolve(__dirname, 'src/styles'),
      '@config': resolve(__dirname, 'src/config'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@types': resolve(__dirname, 'src/types'),
      '@middleware': resolve(__dirname, 'src/middleware'),
      '@layouts': resolve(__dirname, 'src/layouts'),
      '@constants': resolve(__dirname, 'src/constants')
    },
    
    // Extensiones de archivo a resolver automáticamente
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  
  // Configuración de build optimizada
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    
    // Configuración de Terser para minificación
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      },
      mangle: {
        safari10: true
      }
    },
    
    // Configuración de Rollup para optimización
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        app: resolve(__dirname, 'src/main.jsx')
      },
      
      output: {
        // Chunks optimizados
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'react-hot-toast'],
          supabase: ['@supabase/supabase-js'],
          utils: ['axios', 'date-fns', 'lodash-es']
        },
        
        // Configuración de assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/\.(css|scss|sass)$/.test(assetInfo.name)) {
            return `css/[name].[hash].${ext}`;
          }
          
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/.test(assetInfo.name)) {
            return `images/[name].[hash].${ext}`;
          }
          
          if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
            return `fonts/[name].[hash].${ext}`;
          }
          
          return `assets/[name].[hash].${ext}`;
        },
        
        // Configuración de chunks
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      },
      
      // Plugins adicionales de Rollup
      plugins: []
    },
    
    // Configuración de assets
    assetsInlineLimit: 4096, // 4KB
    
    // Configuración de CSS
    cssCodeSplit: true,
    
    // Configuración de reporte
    reportCompressedSize: true,
    
    // Configuración de target
    target: ['es2015', 'chrome58', 'firefox57', 'safari11', 'edge16']
  },
  
  // Configuración de optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-hot-toast',
      'framer-motion',
      'axios',
      '@supabase/supabase-js',
      'react-helmet-async',
      'react-icons',
      'date-fns',
      'lodash-es'
    ],
    
    exclude: [
      'vite',
      '@vitejs/plugin-react'
    ],
    
    // Configuración de esbuild
    esbuildOptions: {
      target: 'es2015'
    }
  },
  
  // Configuración de pre-bundling
  preprocessorOptions: {
    scss: {
      additionalData: `@import "@/styles/variables.scss";`
    }
  },
  
  // Configuración de entorno
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
    __VERSION__: JSON.stringify('1.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    
    // Variables de entorno
    'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
    'process.env.VITE_GOOGLE_CLIENT_ID': JSON.stringify(process.env.VITE_GOOGLE_CLIENT_ID),
    'process.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
  },
  
  // Configuración de CSS
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    
    // PostCSS
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('tailwindcss'),
        require('postcss-preset-env')({
          stage: 3,
          features: {
            'nesting-rules': true,
            'custom-properties': true,
            'custom-media-queries': true
          }
        })
      ]
    }
  },
  
  // Configuración de worker
  worker: {
    format: 'es',
    plugins: []
  },
  
  // Configuración de test
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true
  },
  
  // Configuración de preview
  preview: {
    port: 4173,
    host: '0.0.0.0',
    open: true
  },
  
  // Configuración de log
  logLevel: 'info',
  
  // Configuración de clearScreen
  clearScreen: false,
  
  // Configuración de fs
  fs: {
    strict: false,
    allow: ['..']
  }
});
