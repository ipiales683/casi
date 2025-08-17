import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/apiService';

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
        } else if (data && data.user) {
          console.log('Usuario autenticado:', data.user);
          setUser(data.user);
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
    try {
      const { data, error } = await authService.login(email, password);
      
      if (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
      }
      
      // Persistir token y usuario mínimos
      try {
        if (data?.token) localStorage.setItem('authToken', data.token);
        if (data?.user) localStorage.setItem('user', JSON.stringify(data.user));
      } catch (_) {}
      setUser(data.user);
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
    try {
      const { data, error } = await authService.register(userData);
      
      if (error) {
        throw new Error(error.message || 'Error al registrar usuario');
      }
      
      if (data.user) {
        try {
          if (data?.token) localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } catch (_) {}
        setUser(data.user);
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
      
      try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      } catch (_) {}
      setUser(null);
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

  // Valores a proporcionar en el contexto
  const value = {
    user,
    setUser,
    loading,
    error,
    authReady,
    // Derivados útiles para UI y permisos
    isAuthenticated: Boolean(user),
    isAdmin: Array.isArray(user?.roles) ? user.roles.includes('admin') : false,
    hasUserPurchasedCourse: (courseId) => {
      if (!user) return false;
      const purchases = user.purchases || [];
      return Array.isArray(purchases) ? purchases.includes(courseId) : false;
    },
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
