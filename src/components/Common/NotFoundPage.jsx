import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaArrowLeft, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icono de error */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-6xl text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-green-600">4</span>
            </div>
          </div>
        </div>

        {/* Título y descripción */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 mb-4">
          Página no encontrada
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Puede que el enlace esté roto o la página haya sido eliminada.
        </p>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={goBack}
            className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            <FaArrowLeft className="mr-2" />
            Volver atrás
          </button>
          
          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium"
          >
            <FaHome className="mr-2" />
            Ir al inicio
          </Link>
        </div>

        {/* Búsqueda */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            ¿Qué estás buscando?
          </h3>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar en el sitio..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Enlaces útiles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Enlaces útiles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/servicios"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-blue-700 font-medium"
            >
              Nuestros Servicios
            </Link>
            
            <Link
              to="/contacto"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200 text-green-700 font-medium"
            >
              Contacto
            </Link>
            
            <Link
              to="/blog"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200 text-purple-700 font-medium"
            >
              Blog Legal
            </Link>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="mt-8 text-center text-gray-500">
          <p className="mb-2">
            ¿Necesitas ayuda? Contáctanos:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a
              href="mailto:contacto@abogadowilson.com"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              contacto@abogadowilson.com
            </a>
            <a
              href="tel:+593988352269"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              +593 98 883 5269
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
