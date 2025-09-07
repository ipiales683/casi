import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  UserIcon,
  ShoppingBagIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CalendarIcon,
  CreditCardIcon,
  ChartBarIcon,
  BellIcon,
  CogIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const UserDashboard = () => {
  const { user, updateUser } = useAuth();
  const { items } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for user stats and purchases
  const userStats = {
    totalPurchases: 12,
    totalSpent: 2450000,
    activeServices: 3,
    completedConsultations: 8,
    ebooks: 5,
    courses: 3,
    appointments: 2
  };

  const recentPurchases = [
    {
      id: 1,
      type: 'ebook',
      title: 'Manual de Derecho Civil Moderno',
      price: 89000,
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      type: 'service',
      title: 'Consulta Legal Civil',
      price: 350000,
      date: '2024-01-12',
      status: 'in_progress'
    },
    {
      id: 3,
      type: 'course',
      title: 'Curso de Derecho Laboral',
      price: 450000,
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: 'Consulta sobre Divorcio',
      date: '2024-01-20',
      time: '10:00 AM',
      lawyer: 'Dra. María González'
    },
    {
      id: 2,
      title: 'Revisión de Contrato',
      date: '2024-01-25',
      time: '2:00 PM',
      lawyer: 'Dr. Carlos Mendoza'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: ChartBarIcon },
    { id: 'purchases', name: 'Compras', icon: ShoppingBagIcon },
    { id: 'services', name: 'Servicios', icon: DocumentTextIcon },
    { id: 'learning', name: 'Aprendizaje', icon: AcademicCapIcon },
    { id: 'appointments', name: 'Citas', icon: CalendarIcon },
    { id: 'profile', name: 'Perfil', icon: CogIcon }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'ebook': return BookOpenIcon;
      case 'course': return AcademicCapIcon;
      case 'service': return DocumentTextIcon;
      default: return ShoppingBagIcon;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <UserIcon className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900">
                  Bienvenido, {user?.name || 'Usuario'}
                </h1>
                <p className="text-gray-600">
                  Gestiona tus servicios legales y consultas
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <span className="text-blue-600 font-semibold">
                  {items.length} en carrito
                </span>
              </div>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <BellIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <IconComponent className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{userStats.totalPurchases}</div>
                        <div className="text-gray-600">Compras Totales</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <CreditCardIcon className="h-8 w-8 text-green-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(userStats.totalSpent)}
                        </div>
                        <div className="text-gray-600">Total Invertido</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-8 w-8 text-purple-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">{userStats.activeServices}</div>
                        <div className="text-gray-600">Servicios Activos</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-8 w-8 text-indigo-600" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold text-gray-900">
                          {userStats.ebooks + userStats.courses}
                        </div>
                        <div className="text-gray-600">Contenidos</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Compras Recientes</h3>
                    <div className="space-y-3">
                      {recentPurchases.slice(0, 3).map((purchase) => {
                        const IconComponent = getTypeIcon(purchase.type);
                        return (
                          <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              <IconComponent className="h-5 w-5 text-blue-600 mr-3" />
                              <div>
                                <div className="font-medium text-gray-900">{purchase.title}</div>
                                <div className="text-sm text-gray-600">{purchase.date}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                {formatCurrency(purchase.price)}
                              </div>
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(purchase.status)}`}>
                                {purchase.status === 'completed' ? 'Completado' : 
                                 purchase.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximas Citas</h3>
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-3 bg-blue-50 rounded-lg">
                          <div className="font-medium text-gray-900">{appointment.title}</div>
                          <div className="text-sm text-gray-600 mt-1">
                            Con {appointment.lawyer}
                          </div>
                          <div className="flex items-center text-sm text-blue-600 mt-2">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {appointment.date} - {appointment.time}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => toast.success('Redirección a calendario próximamente')}
                        className="w-full mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Ver Todas las Citas
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'purchases' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Historial de Compras</h2>
                <div className="space-y-4">
                  {recentPurchases.map((purchase) => {
                    const IconComponent = getTypeIcon(purchase.type);
                    return (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <IconComponent className="h-6 w-6 text-blue-600 mr-4" />
                            <div>
                              <h3 className="font-semibold text-gray-900">{purchase.title}</h3>
                              <p className="text-gray-600 capitalize">{purchase.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900">
                              {formatCurrency(purchase.price)}
                            </div>
                            <div className="text-sm text-gray-600">{purchase.date}</div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(purchase.status)}`}>
                            {purchase.status === 'completed' ? 'Completado' : 
                             purchase.status === 'in_progress' ? 'En Progreso' : 'Pendiente'}
                          </span>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Ver Detalles
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Perfil de Usuario</h2>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <UserIcon className="h-10 w-10 text-white" />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900">{user?.name || 'Usuario'}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <p className="text-sm text-gray-500">Cliente desde 2024</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        defaultValue={user?.name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => toast.success('Perfil actualizado correctamente')}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Actualizar Perfil
                  </button>
                </div>
              </motion.div>
            )}

            {/* Other tabs content placeholder */}
            {!['overview', 'purchases', 'profile'].includes(activeTab) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {tabs.find(tab => tab.id === activeTab)?.name}
                </h2>
                <p className="text-gray-600">Esta sección estará disponible próximamente.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
