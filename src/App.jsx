import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navigation/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/HomePage';
import AdminDashboard from './components/Admin/AdminDashboard';
import PaymentSystem from './components/Payment/PaymentSystem';
import CourseSystem from './components/Courses/CourseSystem';
import AIConsultationSystem from './components/Consultation/AIConsultationSystem';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import LoadingSpinner from './components/Common/LoadingSpinner';

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
    <ThemeProvider>
      <div className="App min-h-screen bg-background text-text">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment" element={<PaymentSystem />} />
            <Route path="/consulta-ia" element={<AIConsultationSystem />} />
            <Route path="/cursos" element={<CourseSystem />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cliente" element={<Dashboard />} />
            
            {/* Rutas adicionales */}
            <Route path="/servicios" element={<HomePage />} />
            <Route path="/consultas" element={<HomePage />} />
            <Route path="/foro" element={<HomePage />} />
            <Route path="/comunidad" element={<HomePage />} />
            <Route path="/politicas" element={<HomePage />} />
            <Route path="/terminos" element={<HomePage />} />
            <Route path="/privacidad" element={<HomePage />} />
            <Route path="/seguridad" element={<HomePage />} />
            
            {/* Página 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

// Componente de página no encontrada
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}

export default App;
