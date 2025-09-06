import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ModuleProvider } from './context/ModuleContext';
import { Toaster } from 'react-hot-toast';
import HelmetWrapper from './components/HelmetWrapper';

// Middleware de autenticación
import { 
  ProtectedRoute, 
  AdminRoute, 
  ClientRoute, 
  VisitorOnlyRoute 
} from './middleware/roleMiddleware.jsx';

// Componentes de navegación
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Páginas públicas (visitantes)
import HomePage from './components/Home/HomePage';
import Contact from './components/Contact/Contact';
import Blog from './components/Blog/Blog';
import BlogArticle from './components/Blog/BlogArticle';
import Services from './components/Services/ServicesPage';
import AboutPage from './components/About/AboutPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TerminosCondiciones from './components/TerminosCondiciones';
import Seguridad from './components/Seguridad';
import Ebooks from './components/Ebooks/EbookStore';
import CourseCatalog from './components/Courses/CourseSystem';
import CourseDetail from './pages/CourseDetailPage';

// Páginas de autenticación
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import AuthCallback from './components/Auth/AuthCallback';

// Páginas de cliente
import ClientDashboard from './components/Dashboard/ClientDashboard';
import UserProfile from './components/Dashboard/UserProfile';
import DashboardHome from './components/Dashboard/DashboardHome';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import UserCourses from './components/Dashboard/UserCourses';
import PurchaseHistory from './components/Dashboard/PurchaseHistory';
import DashboardPage from './components/Dashboard/DashboardPage';

// Páginas de administrador
import AdminDashboard from './components/Admin/AdminDashboardComplete';
import DataExporter from './components/Admin/DataExporter';
import WhatsAppManager from './components/Admin/WhatsAppManager';

// Nuevos componentes integrados
import UnifiedStore from './components/Store/UnifiedStore';
import CheckoutSystem from './components/Checkout/CheckoutSystem';
import AppointmentCalendar from './components/Calendar/AppointmentCalendar';
import AIChatSystem from './components/Chat/AIChatSystem';
import TriviaSystem from './components/Gamification/TriviaSystem';
import DragDropEditor from './components/Editor/DragDropEditor';
import PromotionsManager from './components/Promotions/PromotionsManager';

// Páginas de funcionalidad
import PaymentSystem from './components/Payment/PaymentSystem';
import CheckoutPage from './pages/CheckoutPage';
import ThankYouPage from './components/Payment/ThankYouPage';
import AIConsultationSystem from './components/Consultation/AIConsultationSystem';
import AppointmentScheduler from './components/Appointment/AppointmentScheduler';
import AffiliateRegister from './components/Affiliates/AffiliateRegister';
import AffiliateOverview from './components/Affiliates/AffiliateOverview';

// Páginas de error
import NotFoundPage from './components/Common/NotFoundPage';
import UnauthorizedPage from './components/Common/UnauthorizedPage';
import ServerErrorPage from './components/Common/ServerErrorPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga inicial
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <ModuleProvider>
    <ThemeProvider>
            <div className="App min-h-screen bg-background-primary text-text-primary">
        <Navbar />
        <main className="flex-1">
          <Routes>
                  {/* Rutas públicas (visitantes) */}
            <Route path="/" element={<HomePage />} />
                  <Route path="/servicios" element={<Services />} />
                  <Route path="/servicios/penal" element={<Services category="penal" />} />
                  <Route path="/servicios/civil" element={<Services category="civil" />} />
                  <Route path="/servicios/comercial" element={<Services category="comercial" />} />
                  <Route path="/servicios/transito" element={<Services category="transito" />} />
                  <Route path="/servicios/aduanero" element={<Services category="aduanero" />} />
                  <Route path="/sobre-nosotros" element={<AboutPage />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogArticle />} />
                  <Route path="/ebooks" element={<Ebooks />} />
                  <Route path="/cursos" element={<CourseCatalog />} />
                  <Route path="/cursos/:slug" element={<CourseDetail />} />
                  <Route path="/tienda" element={<UnifiedStore />} />
                  <Route path="/calendario" element={<AppointmentCalendar />} />
                  <Route path="/promociones" element={<PromotionsManager />} />
                  <Route path="/politicas-privacidad" element={<PrivacyPolicy />} />
                  <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
                  <Route path="/seguridad" element={<Seguridad />} />
                  
                  {/* Rutas de autenticación (solo visitantes) */}
                  <Route path="/login" element={
                    <VisitorOnlyRoute>
                      <Login />
                    </VisitorOnlyRoute>
                  } />
                  <Route path="/register" element={
                    <VisitorOnlyRoute>
                      <Register />
                    </VisitorOnlyRoute>
                  } />
                  <Route path="/forgot-password" element={
                    <VisitorOnlyRoute>
                      <ForgotPassword />
                    </VisitorOnlyRoute>
                  } />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  
                  {/* Rutas de cliente (requieren autenticación) */}
                  <Route path="/dashboard" element={
                    <ClientRoute>
                      <ClientDashboard />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/perfil" element={
                    <ClientRoute>
                      <UserProfile />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/citas" element={
                    <ClientRoute>
                      <DashboardHome />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/consultas" element={
                    <ClientRoute>
                      <DashboardLayout />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/mis-cursos" element={
                    <ClientRoute>
                      <UserCourses />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/mis-ebooks" element={
                    <ClientRoute>
                      <PurchaseHistory />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/tokens" element={
                    <ClientRoute>
                      <DashboardPage />
                    </ClientRoute>
                  } />
                  <Route path="/dashboard/referidos" element={
                    <ClientRoute>
                      <DashboardHome />
                    </ClientRoute>
                  } />
                  
                  {/* Rutas de administrador */}
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/usuarios" element={
                    <AdminRoute>
                      <DataExporter />
                    </AdminRoute>
                  } />
                  <Route path="/admin/productos" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/cursos" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/blog" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/citas" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/afiliados" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/configuracion" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/analiticas" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  
                  {/* Rutas de funcionalidad */}
                  <Route path="/consulta-ia" element={<AIConsultationSystem />} />
                  <Route path="/agendar-cita" element={<AppointmentScheduler />} />
                  <Route path="/afiliados/registro" element={<AffiliateRegister />} />
                  <Route path="/afiliados/dashboard" element={
                    <ProtectedRoute requiredRole="affiliate">
                      <AffiliateOverview />
                    </ProtectedRoute>
                  } />
                  
                  {/* Rutas de pagos */}
            <Route path="/payment" element={<PaymentSystem />} />
                  <Route path="/checkout" element={<CheckoutSystem />} />
                  <Route path="/payment/success" element={<ThankYouPage />} />
                  <Route path="/payment/failed" element={<ThankYouPage />} />
                  
                  {/* Rutas de error */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="/server-error" element={<ServerErrorPage />} />
                  <Route path="/404" element={<NotFoundPage />} />
                  
                  {/* Redirecciones y rutas legacy */}
                  <Route path="/cliente" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
                  <Route path="/user" element={<Navigate to="/dashboard" replace />} />
                  
                  {/* Página 404 para rutas no encontradas */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
              
              {/* Toast notifications */}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: '#fff',
                    },
                  },
                  error: {
                    duration: 5000,
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#fff',
                    },
                  },
                }}
              />
      </div>
      
      {/* Chat AI Global */}
      <AIChatSystem />
    </ThemeProvider>
        </ModuleProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
