import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  FaCalendarAlt, FaComment, FaBook, FaCoins, FaUsers, FaInfoCircle, 
  FaFileAlt, FaShoppingCart, FaCreditCard, FaDownload, FaEye,
  FaEdit, FaCog, FaSignOutAlt, FaBell, FaEnvelope, FaWhatsapp,
  FaChartLine, FaStar, FaClock, FaCheckCircle, FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, getUserRole, getDisplayName } = useAuth();
  const { cart, getTotalItems, getTotal } = useCart();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    consultations: [],
    appointments: [],
    tokens: 0,
    ebooks: [],
    referrals: [],
    notifications: [],
    recentActivity: [],
    upcomingDeadlines: []
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos de ejemplo para desarrollo
      setStats({
        consultations: [
          { id: 1, title: 'Consulta sobre herencia', status: 'pending', date: '2025-01-15', priority: 'high' },
          { id: 2, title: 'Caso de litigio civil', status: 'in_progress', date: '2025-01-10', priority: 'medium' },
          { id: 3, title: 'Asesoría laboral', status: 'completed', date: '2025-01-05', priority: 'low' }
        ],
        appointments: [
          { id: 1, date: '2025-01-20T10:00:00', title: 'Asesoría legal', status: 'confirmed', type: 'virtual' },
          { id: 2, date: '2025-01-25T14:30:00', title: 'Revisión de documentos', status: 'pending', type: 'presencial' }
        ],
        tokens: 150,
        ebooks: [
          { id: 1, title: 'Guía Legal para Emprendedores', progress: 75, thumbnail: '/images/ebook-thumbnail-1.jpg', lastRead: '2025-01-15' },
          { id: 2, title: 'Derechos Fundamentales', progress: 30, thumbnail: '/images/ebook-thumbnail-2.jpg', lastRead: '2025-01-10' },
          { id: 3, title: 'Manual de Derecho Civil', progress: 90, thumbnail: '/images/ebook-thumbnail-3.jpg', lastRead: '2025-01-18' }
        ],
        referrals: [
          { id: 1, name: 'Carlos Méndez', status: 'registered', date: '2025-01-01', commission: 5 },
          { id: 2, name: 'Ana Gutiérrez', status: 'purchased', date: '2025-01-05', commission: 15 },
          { id: 3, name: 'Roberto Silva', status: 'pending', date: '2025-01-08', commission: 0 }
        ],
        notifications: [
          { id: 1, message: 'Su cita del 20 de enero ha sido confirmada', type: 'appointment', date: '2025-01-18', read: false },
          { id: 2, message: 'Consulta respondida: Caso de herencia', type: 'consultation', date: '2025-01-17', read: true },
          { id: 3, message: 'Su compra de 50 tokens ha sido procesada', type: 'purchase', date: '2025-01-15', read: true },
          { id: 4, message: 'Nuevo ebook disponible: Derecho Comercial', type: 'content', date: '2025-01-16', read: false }
        ],
        recentActivity: [
          { id: 1, action: 'Consulta creada', item: 'Caso de herencia', time: '2 horas', icon: FaComment },
          { id: 2, action: 'Cita programada', item: 'Asesoría legal', time: '1 día', icon: FaCalendarAlt },
          { id: 3, action: 'Ebook descargado', item: 'Guía Legal', time: '2 días', icon: FaDownload },
          { id: 4, action: 'Tokens comprados', item: '50 tokens', time: '3 días', icon: FaCoins }
        ],
        upcomingDeadlines: [
          { id: 1, title: 'Presentación de documentos', date: '2025-01-22', type: 'deadline', priority: 'high' },
          { id: 2, title: 'Revisión de contrato', date: '2025-01-28', type: 'review', priority: 'medium' },
          { id: 3, title: 'Audiencia judicial', date: '2025-02-05', type: 'court', priority: 'critical' }
        ]
      });
    } catch (error) {
      console.error('Error al cargar dashboard:', error);
      toast.error('Error al cargar datos del dashboard');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {hour: '2-digit', minute:'2-digit'});
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      registered: 'bg-purple-100 text-purple-800',
      purchased: 'bg-indigo-100 text-indigo-800'
    };

    const statusText = {
      pending: 'Pendiente',
      in_progress: 'En proceso',
      completed: 'Completado',
      confirmed: 'Confirmado',
      cancelled: 'Cancelado',
      registered: 'Registrado',
      purchased: 'Compra realizada'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };

    const priorityText = {
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      critical: 'Crítica'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[priority] || 'bg-gray-100 text-gray-800'}`}>
        {priorityText[priority] || priority}
      </span>
    );
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tu dashboard...</p>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              {/* Perfil del usuario */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </span>
          </div>
                <h3 className="font-bold text-lg text-gray-800">{getDisplayName()}</h3>
                <p className="text-sm text-gray-600 capitalize">{getUserRole()}</p>
            <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="mr-1" />
                    Activo
                  </span>
            </div>
            </div>

              {/* Menú de navegación */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'overview' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaChartLine className="mr-3" />
                  Resumen
                </button>
                
                <button
                  onClick={() => setActiveTab('consultations')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'consultations' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaComment className="mr-3" />
                  Mis Consultas
                </button>
                
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'appointments' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaCalendarAlt className="mr-3" />
                  Mis Citas
                </button>
                
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'courses' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaBook className="mr-3" />
                  Mis Cursos
                </button>
                
                <button
                  onClick={() => setActiveTab('ebooks')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'ebooks' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaFileAlt className="mr-3" />
                  Mis E-Books
                </button>
                
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'tokens' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaCoins className="mr-3" />
                  Mis Tokens
                </button>
                
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'referrals' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaUsers className="mr-3" />
                  Mis Referidos
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'notifications' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaBell className="mr-3" />
                  Notificaciones
                </button>
                
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center ${
                    activeTab === 'settings' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <FaCog className="mr-3" />
                  Configuración
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 rounded-lg transition-colors flex items-center text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="mr-3" />
                  Cerrar Sesión
                </button>
              </nav>
        </div>
        
            {/* Carrito de compras */}
        <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center">
                <FaShoppingCart className="mr-2 text-primary-600" />
                Carrito
              </h3>
              
              {cart.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {getTotalItems()} {getTotalItems() === 1 ? 'producto' : 'productos'}
                  </p>
                  <p className="text-lg font-bold text-primary-600">
                    ${getTotal().toFixed(2)}
                  </p>
                  <Link
                    to="/checkout"
                    className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-center block"
                  >
                    Ir al Checkout
              </Link>
            </div>
          ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm mb-3">Tu carrito está vacío</p>
                  <Link
                    to="/servicios"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Explorar servicios
              </Link>
            </div>
          )}
        </div>
      </div>
      
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Tab de Resumen */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">Bienvenido, {getDisplayName()}</h1>
                
                {/* Tarjetas de estadísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Tokens */}
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-white p-3 rounded-full">
                          <FaCoins className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="ml-5">
                          <p className="text-white text-sm uppercase font-medium">Mis Tokens</p>
                          <h3 className="text-white text-3xl font-bold">{stats.tokens}</h3>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Link to="/dashboard/tokens" className="text-white text-sm hover:underline">
                          Comprar más tokens →
              </Link>
            </div>
        </div>
      </div>

                  {/* Consultas */}
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-white p-3 rounded-full">
                          <FaComment className="h-6 w-6 text-blue-500" />
    </div>
                        <div className="ml-5">
                          <p className="text-white text-sm uppercase font-medium">Consultas</p>
                          <h3 className="text-white text-3xl font-bold">{stats.consultations.length}</h3>
      </div>
        </div>
                      <div className="mt-4">
                        <Link to="/dashboard/consultations" className="text-white text-sm hover:underline">
                          Ver todas →
          </Link>
        </div>
    </div>
      </div>
      
                  {/* Citas */}
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-white p-3 rounded-full">
                          <FaCalendarAlt className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="ml-5">
                          <p className="text-white text-sm uppercase font-medium">Próximas Citas</p>
                          <h3 className="text-white text-3xl font-bold">{stats.appointments.filter(a => a.status === 'confirmed').length}</h3>
                        </div>
        </div>
                      <div className="mt-4">
                        <Link to="/dashboard/appointments" className="text-white text-sm hover:underline">
                          Agendar cita →
          </Link>
        </div>
          </div>
          </div>
          
                  {/* E-Books */}
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-white p-3 rounded-full">
                          <FaBook className="h-6 w-6 text-purple-500" />
          </div>
                        <div className="ml-5">
                          <p className="text-white text-sm uppercase font-medium">E-Books</p>
                          <h3 className="text-white text-3xl font-bold">{stats.ebooks.length}</h3>
      </div>
          </div>
                      <div className="mt-4">
                        <Link to="/dashboard/ebooks" className="text-white text-sm hover:underline">
                          Ver biblioteca →
                        </Link>
          </div>
          </div>
          </div>
      </div>
      
                {/* Actividad reciente y próximos eventos */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Actividad reciente */}
      <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <FaClock className="mr-2 text-primary-600" />
                      Actividad Reciente
                    </h3>
                    <div className="space-y-3">
                      {stats.recentActivity.map(activity => (
                        <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <activity.icon className="text-primary-600 text-sm" />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                            <p className="text-xs text-gray-600">{activity.item}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
            </div>
          </div>
          
                  {/* Próximos eventos */}
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-lg font-bold mb-4 flex items-center">
                      <FaExclamationTriangle className="mr-2 text-orange-600" />
                      Próximos Eventos
                    </h3>
                    <div className="space-y-3">
                      {stats.upcomingDeadlines.map(deadline => (
                        <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
                            <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                            <p className="text-xs text-gray-600">{formatDate(deadline.date)}</p>
            </div>
                          <div className="flex items-center space-x-2">
                            {getPriorityBadge(deadline.priority)}
                            <span className="text-xs text-gray-500 capitalize">{deadline.type}</span>
          </div>
            </div>
                      ))}
          </div>
        </div>
      </div>
    </div>
            )}

            {/* Otros tabs se implementarán aquí */}
            {activeTab !== 'overview' && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCog className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'consultations' && 'Mis Consultas'}
                  {activeTab === 'appointments' && 'Mis Citas'}
                  {activeTab === 'courses' && 'Mis Cursos'}
                  {activeTab === 'ebooks' && 'Mis E-Books'}
                  {activeTab === 'tokens' && 'Mis Tokens'}
                  {activeTab === 'referrals' && 'Mis Referidos'}
                  {activeTab === 'notifications' && 'Notificaciones'}
                  {activeTab === 'settings' && 'Configuración'}
                </h3>
                <p className="text-gray-500">
                  Esta funcionalidad estará disponible próximamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
