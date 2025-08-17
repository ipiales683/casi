import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PublicLayout: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <nav className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-primary-600">
              LegalPro
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/services" className="text-gray-700 hover:text-primary-600">
                Servicios
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600">
                Contacto
              </Link>
              {user ? (
                <Link to="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-primary-600">
                    Iniciar sesión
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 Sistema Legal Profesional. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
