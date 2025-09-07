import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar si hay datos de usuario en localStorage
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        
        if (userData && token) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
        setAuthReady(true);
      }
    };

    checkAuth();
  }, []);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Simular autenticación exitosa
      const mockUser = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        role: 'client',
        avatar: '/images/avatar-default.jpg'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockToken);
      
      setUser(mockUser);
      toast.success('¡Bienvenido! Sesión iniciada correctamente');
      
      return { success: true, user: mockUser };
    } catch (error) {
      console.error('Error en login:', error);
      toast.error('Error al iniciar sesión');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para registrarse
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'client',
        avatar: '/images/avatar-default.jpg'
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', mockToken);
      
      setUser(newUser);
      toast.success('¡Cuenta creada exitosamente!');
      
      return { success: true, user: newUser };
    } catch (error) {
      console.error('Error en registro:', error);
      toast.error('Error al crear cuenta');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setUser(null);
    toast.success('Sesión cerrada correctamente');
  };

  // Función para actualizar usuario
  const updateUser = (updatedUser) => {
    const newUserData = { ...user, ...updatedUser };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
    toast.success('Perfil actualizado correctamente');
  };

  const value = {
    user,
    loading,
    authReady,
    login,
    register,
    logout,
    updateUser,
    // API esperado por roleMiddleware
    isAuthenticated: () => !!user,
    hasRole: (role) => {
      if (!user || !role) return false;
      if (user.role === role) return true;
      if (Array.isArray(user.roles)) return user.roles.includes(role);
      return false;
    },
    hasPermission: (permission) => {
      if (!user || !permission) return false;
      if (Array.isArray(user.permissions)) return user.permissions.includes(permission);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
