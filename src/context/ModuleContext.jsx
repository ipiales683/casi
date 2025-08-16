import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const ModuleContext = createContext();

// Hook personalizado para usar el contexto
export const useModule = () => useContext(ModuleContext);

// Proveedor del contexto
export const ModuleProvider = ({ children }) => {
  const [modules, setModules] = useState({});
  const [activeModules, setActiveModules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Módulos disponibles del sistema
  const availableModules = {
    // Módulos básicos
    auth: {
      id: 'auth',
      name: 'Autenticación',
      description: 'Sistema de login, registro y gestión de usuarios',
      version: '1.0.0',
      required: true,
      enabled: true
    },
    dashboard: {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Panel de control para usuarios y administradores',
      version: '1.0.0',
      required: true,
      enabled: true
    },
    blog: {
      id: 'blog',
      name: 'Blog',
      description: 'Sistema de gestión de contenido y artículos',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    courses: {
      id: 'courses',
      name: 'Cursos',
      description: 'Sistema de gestión de cursos online',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    ebooks: {
      id: 'ebooks',
      name: 'E-Books',
      description: 'Gestión y venta de libros digitales',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    payments: {
      id: 'payments',
      name: 'Pagos',
      description: 'Sistema de pagos y facturación',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    appointments: {
      id: 'appointments',
      name: 'Citas',
      description: 'Sistema de agendamiento de citas',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    affiliates: {
      id: 'affiliates',
      name: 'Afiliados',
      description: 'Programa de referidos y comisiones',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    ai: {
      id: 'ai',
      name: 'Inteligencia Artificial',
      description: 'Consultas legales asistidas por IA',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    analytics: {
      id: 'analytics',
      name: 'Analíticas',
      description: 'Estadísticas y reportes del sistema',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    notifications: {
      id: 'notifications',
      name: 'Notificaciones',
      description: 'Sistema de notificaciones push y email',
      version: '1.0.0',
      required: false,
      enabled: true
    },
    seo: {
      id: 'seo',
      name: 'SEO',
      description: 'Optimización para motores de búsqueda',
      version: '1.0.0',
      required: false,
      enabled: true
    }
  };

  // Inicializar módulos
  useEffect(() => {
    initializeModules();
  }, []);

  // Inicializar módulos del sistema
  const initializeModules = () => {
    setLoading(true);
    
    try {
      // Cargar configuración de módulos desde localStorage
      const savedModules = localStorage.getItem('systemModules');
      let moduleConfig = {};
      
      if (savedModules) {
        moduleConfig = JSON.parse(savedModules);
      } else {
        // Configuración por defecto
        moduleConfig = Object.keys(availableModules).reduce((acc, key) => {
          acc[key] = availableModules[key];
          return acc;
        }, {});
        
        // Guardar configuración por defecto
        localStorage.setItem('systemModules', JSON.stringify(moduleConfig));
      }
      
      setModules(moduleConfig);
      
      // Establecer módulos activos
      const active = Object.values(moduleConfig).filter(module => module.enabled);
      setActiveModules(active);
      
    } catch (error) {
      console.error('Error al inicializar módulos:', error);
      // Usar configuración por defecto en caso de error
      setModules(availableModules);
      setActiveModules(Object.values(availableModules).filter(module => module.enabled));
    } finally {
      setLoading(false);
    }
  };

  // Habilitar módulo
  const enableModule = (moduleId) => {
    setModules(prevModules => {
      const updatedModules = {
        ...prevModules,
        [moduleId]: {
          ...prevModules[moduleId],
          enabled: true
        }
      };
      
      // Guardar en localStorage
      localStorage.setItem('systemModules', JSON.stringify(updatedModules));
      
      // Actualizar módulos activos
      const active = Object.values(updatedModules).filter(module => module.enabled);
      setActiveModules(active);
      
      return updatedModules;
    });
  };

  // Deshabilitar módulo
  const disableModule = (moduleId) => {
    const module = modules[moduleId];
    
    if (module?.required) {
      throw new Error(`No se puede deshabilitar el módulo ${module.name} ya que es requerido`);
    }
    
    setModules(prevModules => {
      const updatedModules = {
        ...prevModules,
        [moduleId]: {
          ...prevModules[moduleId],
          enabled: false
        }
      };
      
      // Guardar en localStorage
      localStorage.setItem('systemModules', JSON.stringify(updatedModules));
      
      // Actualizar módulos activos
      const active = Object.values(updatedModules).filter(module => module.enabled);
      setActiveModules(active);
      
      return updatedModules;
    });
  };

  // Verificar si un módulo está habilitado
  const isModuleEnabled = (moduleId) => {
    return modules[moduleId]?.enabled || false;
  };

  // Verificar si un módulo está disponible
  const isModuleAvailable = (moduleId) => {
    return !!modules[moduleId];
  };

  // Obtener información de un módulo
  const getModuleInfo = (moduleId) => {
    return modules[moduleId] || null;
  };

  // Obtener todos los módulos
  const getAllModules = () => {
    return Object.values(modules);
  };

  // Obtener módulos activos
  const getActiveModules = () => {
    return activeModules;
  };

  // Obtener módulos por categoría
  const getModulesByCategory = (category) => {
    return Object.values(modules).filter(module => module.category === category);
  };

  // Verificar dependencias de módulos
  const checkModuleDependencies = (moduleId) => {
    const module = modules[moduleId];
    if (!module) return { valid: false, missing: [] };
    
    const dependencies = module.dependencies || [];
    const missing = dependencies.filter(dep => !isModuleEnabled(dep));
    
    return {
      valid: missing.length === 0,
      missing
    };
  };

  // Actualizar configuración de módulo
  const updateModuleConfig = (moduleId, config) => {
    setModules(prevModules => {
      const updatedModules = {
        ...prevModules,
        [moduleId]: {
          ...prevModules[moduleId],
          ...config
        }
      };
      
      // Guardar en localStorage
      localStorage.setItem('systemModules', JSON.stringify(updatedModules));
      
      // Actualizar módulos activos si es necesario
      if (config.hasOwnProperty('enabled')) {
        const active = Object.values(updatedModules).filter(module => module.enabled);
        setActiveModules(active);
      }
      
      return updatedModules;
    });
  };

  // Reinicializar módulos
  const resetModules = () => {
    localStorage.removeItem('systemModules');
    initializeModules();
  };

  // Obtener estadísticas de módulos
  const getModuleStats = () => {
    const total = Object.keys(modules).length;
    const enabled = activeModules.length;
    const disabled = total - enabled;
    const required = Object.values(modules).filter(module => module.required).length;
    
    return {
      total,
      enabled,
      disabled,
      required,
      optional: total - required
    };
  };

  // Valores a proporcionar en el contexto
  const value = {
    modules,
    activeModules,
    loading,
    availableModules,
    enableModule,
    disableModule,
    isModuleEnabled,
    isModuleAvailable,
    getModuleInfo,
    getAllModules,
    getActiveModules,
    getModulesByCategory,
    checkModuleDependencies,
    updateModuleConfig,
    resetModules,
    getModuleStats
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
};
