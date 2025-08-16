import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/apiService';

// Definir roles del sistema
export const ROLES = {
  VISITOR: 'visitor',
  CLIENT: 'client',
  ADMIN: 'admin',
  AFFILIATE: 'affiliate'
};

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [error, setError] = useState(null);
  const [permissions, setPermissions] = useState([]);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si hay un token en localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setLoading(false);
          setAuthReady(true);
          return;
        }
        
        // Verificar si el token es válido obteniendo datos del usuario
        const { data, error } = await authService.getUser();
        
        if (error) {
          console.error('Error al verificar autenticación:', error);
          // Si hay error, probablemente el token no es válido
          localStorage.removeItem('authToken');
          setUser(null);
          setPermissions([]);
        } else if (data && data.user) {
          console.log('Usuario autenticado:', data.user);
          setUser(data.user);
          setPermissions(data.user.permissions || []);
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        setAuthReady(true);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await authService.login(email, password);
      
      if (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
      }
      
      setUser(data.user);
      setPermissions(data.user.permissions || []);
      localStorage.setItem('authToken', data.token);
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await authService.register(userData);
      
      if (error) {
        throw new Error(error.message || 'Error al registrar usuario');
      }
      
      if (data.user) {
        setUser(data.user);
        setPermissions(data.user.permissions || []);
        localStorage.setItem('authToken', data.token);
      }
      
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await authService.signOut();
      
      if (error) {
        throw new Error(error.message || 'Error al cerrar sesión');
      }
      
      setUser(null);
      setPermissions([]);
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar el usuario actual
  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role || user.roles?.includes(role);
  };

  // Función para verificar si el usuario tiene un permiso específico
  const hasPermission = (permission) => {
    if (!user) return false;
    return permissions.includes(permission) || user.permissions?.includes(permission);
  };

  // Función para verificar si el usuario es administrador
  const isAdmin = () => hasRole(ROLES.ADMIN);

  // Función para verificar si el usuario es cliente
  const isClient = () => hasRole(ROLES.CLIENT);

  // Función para verificar si el usuario es afiliado
  const isAffiliate = () => hasRole(ROLES.AFFILIATE);

  // Función para verificar si el usuario está autenticado
  const isAuthenticated = () => !!user;

  // Función para obtener el rol principal del usuario
  const getUserRole = () => {
    if (!user) return ROLES.VISITOR;
    return user.role || user.roles?.[0] || ROLES.CLIENT;
  };

  // Función para obtener el nombre para mostrar
  const getDisplayName = () => {
    if (!user) return 'Visitante';
    return user.displayName || user.name || user.email || 'Usuario';
  };

  // Función para obtener la imagen del usuario
  const getUserAvatar = () => {
    if (!user?.avatar) return null;
    return user.avatar;
  };

  // Función para refrescar los datos del usuario
  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await authService.getUser();
      if (!error && data?.user) {
        setUser(data.user);
        setPermissions(data.user.permissions || []);
      }
    } catch (err) {
      console.error('Error al refrescar usuario:', err);
    }
  };

  // Valores a proporcionar en el contexto
  const value = {
    user,
    setUser,
    loading,
    error,
    authReady,
    permissions,
    login,
    register,
    logout,
    updateUser,
    hasRole,
    hasPermission,
    isAdmin,
    isClient,
    isAffiliate,
    isAuthenticated,
    getUserRole,
    getDisplayName,
    getUserAvatar,
    refreshUser,
    ROLES
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
