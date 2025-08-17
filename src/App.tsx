import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';
import { useCredits } from './context/CreditContext';
import { useTokens } from './context/TokenContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import EditorLayout from './layouts/EditorLayout';

// Public Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import PlansPage from './pages/PlansPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Dashboard Pages
import DashboardPage from './pages/DashboardPage';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ClientDashboard from './components/Dashboard/ClientDashboard';
import ClientsPage from './pages/ClientsPage';
import CasesPage from './pages/CasesPage';
import DocumentsPage from './pages/DocumentsPage';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

// E-commerce Pages
import ProductsPage from './pages/ProductsPage';
import CatalogPage from './pages/CatalogPage';
import CheckoutPage from './pages/CheckoutPage';
import MyPurchasesPage from './pages/MyPurchasesPage';

// Course Pages
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import MyCoursesPage from './pages/MyCoursesPage';
import EbooksPage from './pages/EbooksPage';

// Other Pages
import AnalyticsPage from './pages/AnalyticsPage';
import SalesPage from './pages/SalesPage';
import ProjectsPage from './pages/ProjectsPage';
import UsersPage from './pages/UsersPage';
import ForumPage from './pages/ForumPage';
import ConsultationsPage from './pages/ConsultationsPage';
import ServiceDetailPage from './pages/ServiceDetailPage';

function App() {
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const { credits } = useCredits();
  const { tokens } = useTokens();

  useEffect(() => {
    // Aplicar tema
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Función para determinar el tipo de usuario
  const getUserType = () => {
    if (!user) return 'guest';
    // Aquí puedes implementar lógica para determinar si es admin o cliente
    return user.role === 'admin' ? 'admin' : 'client';
  };

  const userType = getUserType();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:id" element={<ServiceDetailPage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsOfServicePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
        </Route>

        {/* Rutas del dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={
            isAuthenticated ? (
              userType === 'admin' ? <AdminDashboard /> : <ClientDashboard />
            ) : <Navigate to="/login" replace />
          } />
          
          {/* Rutas para clientes */}
          <Route path="client" element={
            isAuthenticated && userType === 'client' ? <ClientDashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="my-courses" element={
            isAuthenticated ? <MyCoursesPage /> : <Navigate to="/login" replace />
          } />
          <Route path="my-purchases" element={
            isAuthenticated ? <MyPurchasesPage /> : <Navigate to="/login" replace />
          } />
          <Route path="profile" element={
            isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
          } />
          <Route path="calendar" element={
            isAuthenticated ? <CalendarPage /> : <Navigate to="/login" replace />
          } />
          <Route path="consultations" element={
            isAuthenticated ? <ConsultationsPage /> : <Navigate to="/login" replace />
          } />

          {/* Rutas para administradores */}
          <Route path="admin" element={
            isAuthenticated && userType === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
          } />
          <Route path="clients" element={
            isAuthenticated && userType === 'admin' ? <ClientsPage /> : <Navigate to="/login" replace />
          } />
          <Route path="cases" element={
            isAuthenticated && userType === 'admin' ? <CasesPage /> : <Navigate to="/login" replace />
          } />
          <Route path="analytics" element={
            isAuthenticated && userType === 'admin' ? <AnalyticsPage /> : <Navigate to="/login" replace />
          } />
          <Route path="sales" element={
            isAuthenticated && userType === 'admin' ? <SalesPage /> : <Navigate to="/login" replace />
          } />
          <Route path="users" element={
            isAuthenticated && userType === 'admin' ? <UsersPage /> : <Navigate to="/login" replace />
          } />
          <Route path="settings" element={
            isAuthenticated ? <SettingsPage /> : <Navigate to="/login" replace />
          } />
        </Route>

        {/* Rutas del checkout */}
        <Route path="/checkout" element={
          isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" replace />
        } />

        {/* Rutas del editor */}
        <Route path="/editor" element={<EditorLayout />}>
          <Route path="site" element={<div>Editor de Sitio</div>} />
          <Route path="content" element={<div>Editor de Contenido</div>} />
        </Route>

        {/* Ruta por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
