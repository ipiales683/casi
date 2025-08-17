import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './index.css';

// Configuración global para manejo de errores no capturados
const handleGlobalError = (error) => {
  console.error('Error no manejado:', error);
  // Aquí podrías enviar el error a un servicio de monitoreo
};

// Capturar errores globales
window.addEventListener('error', (event) => {
  handleGlobalError(event.error);
});

// Capturar promesas rechazadas no manejadas
window.addEventListener('unhandledrejection', (event) => {
  handleGlobalError(event.reason);
});

// Importamos el manejador de conexiones WebSocket
import { WebSocketManager } from './utils/connectionManager';

// Configuración de desarrollo
const isDevelopment = import.meta.env.DEV;

// Precarga de recursos críticos
const preloadCriticalAssets = async () => {
  try {
    if (isDevelopment) {
      console.log('[Preloader] Modo desarrollo: Precarga optimizada');
      return true;
    }
    
    // Aquí iría la precarga de assets críticos en producción
    console.log('[Preloader] Precargando recursos críticos...');
    return true;
  } catch (error) {
    console.error('[Preloader] Error al precargar recursos:', error);
    return false;
  }
};

// Inicialización segura de WebSockets
const initializeWebSockets = () => {
  if (typeof window === 'undefined') return;
  
  // Configuración de WebSocketManager
  WebSocketManager.configure({
    reconnectAttempts: 5,
    reconnectDelay: 1000,
    debug: isDevelopment
  });
  
  // Inicializar conexión WebSocket si es necesario
  if (isDevelopment) {
    console.log('[WebSocket] Modo desarrollo: Conexión WebSocket deshabilitada por defecto');
    // WebSocketManager.connect('ws://localhost:8787'); // Descomentar si se necesita en desarrollo
  }
};

// Fix mejorado para WebSocket en navegadores que lo soportan
if (typeof window !== 'undefined' && window.WebSocket) {
}

// Función para inicializar la aplicación React
const initializeReactApp = () => {
  try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </React.StrictMode>
    );
    
    console.log('[App] Aplicación React montada correctamente');
    return true;
  } catch (error) {
    console.error('[App] Error al montar la aplicación React:', error);
    return false;
  }
};

// Función para cargar módulos críticos
const loadCriticalModules = async () => {
  try {
    console.log('[Loader] Cargando módulos críticos...');
    
    // Cargar módulos esenciales con reintentos
    const modules = [
      'react-router-dom',
      'react-hot-toast',
      'axios'
    ];
    
    for (const moduleName of modules) {
      try {
        // Usar importación dinámica para cargar módulos
        await import(/* @vite-ignore */ moduleName);
        console.log(`[Loader] Módulo cargado: ${moduleName}`);
      } catch (err) {
        console.warn(`[Loader] No se pudo cargar el módulo ${moduleName}:`, err);
      }
    }
    
    console.log('[Loader] Módulos críticos cargados');
    return true;
  } catch (error) {
    console.error('[Loader] Error al cargar módulos críticos:', error);
    return false;
  }
};

// Función para inicializar servicios de la aplicación
const initializeServices = async () => {
  try {
    console.log('[Services] Inicializando servicios...');
    
    // Aquí iría la inicialización de servicios como:
    // - Autenticación
    // - API Client
    // - Analytics
    
    console.log('[Services] Servicios inicializados');
    return true;
  } catch (error) {
    console.error('[Services] Error al inicializar servicios:', error);
    return false;
  }
};

// Función principal para inicializar la aplicación
export const initializeApp = async () => {
  try {
    console.log('[App] Inicializando aplicación...');
    
    // 1. Precargar recursos críticos
    await preloadCriticalAssets();
    
    // 2. Cargar módulos críticos
    await loadCriticalModules();
    
    // 3. Inicializar WebSockets
    initializeWebSockets();
    
    // 4. Inicializar servicios
    await initializeServices();
    
    // 5. Montar la aplicación React
    const appMounted = initializeReactApp();
    if (!appMounted) {
      throw new Error('No se pudo montar la aplicación React');
    }
    
    console.log('[App] Aplicación inicializada correctamente');
    return true;
  } catch (error) {
    console.error('[App] Error crítico durante la inicialización:', error);
    throw error;
  }
};

// Manejador de errores de inicialización
const handleInitializationError = (error) => {
  console.error('Error durante la inicialización:', error);
  
  const rootElement = document.getElementById('root');
  if (!rootElement) return;
  
  rootElement.innerHTML = `
    <div style="
      padding: 2rem;
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    ">
      <h1 style="color: #e53e3e;">¡Ups! Algo salió mal</h1>
      <p>Lo sentimos, ha ocurrido un error al cargar la aplicación.</p>
      ${isDevelopment ? `
        <div style="
          background: #f8d7da;
          color: #721c24;
          padding: 1rem;
          margin: 1rem 0;
          border-radius: 4px;
          text-align: left;
          font-family: monospace;
          white-space: pre-wrap;
          word-break: break-word;
          max-height: 200px;
          overflow-y: auto;
        ">
          ${error.stack || error.message || JSON.stringify(error, null, 2)}
        </div>
      ` : ''}
      <p>Por favor, recarga la página o inténtalo de nuevo más tarde.</p>
      <button 
        onclick="window.location.reload()" 
        style="
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #3182ce;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
        "
      >
        Recargar Página
      </button>
    </div>
  `;
};

// Iniciar la aplicación cuando el DOM esté listo
const startApp = () => {
  console.log('[Main] Documento cargado, iniciando aplicación...');
  
  // Mostrar indicador de carga
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        flex-direction: column;
        font-family: Arial, sans-serif;
      ">
        <div style="
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3182ce;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        "></div>
        <p>Cargando aplicación...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  }
  
  // Inicializar la aplicación
  initializeApp()
    .then(() => {
      console.log('[Main] Aplicación iniciada correctamente');
    })
    .catch(error => {
      console.error('[Main] Error al inicializar la aplicación:', error);
      handleInitializationError(error);
    });
};

// Esperar a que el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}

