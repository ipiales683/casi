import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');

  // Cargar tema desde localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedColor = localStorage.getItem('primaryColor') || 'blue';
    
    setTheme(savedTheme);
    setPrimaryColor(savedColor);
    
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Función para cambiar tema
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Función para cambiar color primario
  const changePrimaryColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('primaryColor', color);
  };

  // Colores disponibles
  const availableColors = {
    blue: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b'
    },
    green: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#f59e0b'
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#f59e0b'
    },
    red: {
      primary: '#ef4444',
      secondary: '#dc2626',
      accent: '#f59e0b'
    },
    orange: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#f59e0b'
    }
  };

  const value = {
    theme,
    primaryColor,
    toggleTheme,
    changePrimaryColor,
    availableColors,
    currentColors: availableColors[primaryColor]
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
