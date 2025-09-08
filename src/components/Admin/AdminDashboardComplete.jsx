import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaChartLine, FaFileAlt, FaCalendarAlt, FaShoppingCart, 
  FaBook, FaNewspaper, FaCog, FaSignOutAlt, FaPlus, FaEdit, FaTrash,
  FaEye, FaDownload, FaUpload, FaBell, FaEnvelope, FaWhatsapp,
  FaCreditCard, FaPaypal, FaBitcoin, FaDollarSign, FaGamepad,
  FaGift, FaPercent, FaRocket, FaPalette, FaLayerGroup, FaMagic,
  FaChartPie, FaDatabase, FaShieldAlt, FaUserGraduate, FaTrophy,
  FaComments, FaBullhorn, FaTags, FaClock, FaCheckCircle, FaInfoCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/apiService';

const AdminDashboardComplete = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showChat, setShowChat] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalRevenue: 45600,
    totalConsultations: 890,
    totalAppointments: 234,
    totalProducts: 45,
    totalCourses: 12,
    totalEbooks: 28,
    totalAffiliates: 67,
    activePromotions: 8,
    completedGames: 342,
    pagesCreated: 23,
    totalMessages: 1567
  });

  const [recentActivities] = useState([
    { id: 1, type: 'user_registration', user: 'María González', time: '2 min ago', action: 'Nuevo usuario registrado' },
    { id: 2, type: 'consultation', user: 'Carlos Ruiz', time: '5 min ago', action: 'Consulta completada' },
    { id: 3, type: 'payment', user: 'Ana López', time: '10 min ago', action: 'Pago recibido - $150' },
    { id: 4, type: 'appointment', user: 'Roberto Silva', time: '15 min ago', action: 'Cita programada' },
    { id: 5, type: 'course_purchase', user: 'Laura Torres', time: '20 min ago', action: 'Curso comprado' }
  ]);

  const [quickActions] = useState([
    { title: 'Usuarios', icon: FaUsers, action: () => setActiveTab('users'), color: 'from-blue-500 to-blue-600' },
    { title: 'Productos', icon: FaShoppingCart, action: () => setActiveTab('products'), color: 'from-green-500 to-green-600' },
    { title: 'Cursos', icon: FaBook, action: () => setActiveTab('courses'), color: 'from-purple-500 to-purple-600' },
    { title: 'Editor', icon: FaPalette, action: () => setActiveTab('editor'), color: 'from-pink-500 to-pink-600' },
    { title: 'Promociones', icon: FaGift, action: () => setActiveTab('promotions'), color: 'from-yellow-500 to-yellow-600' },
    { title: 'Gamificación', icon: FaGamepad, action: () => setActiveTab('gamification'), color: 'from-indigo-500 to-indigo-600' },
    { title: 'Chat', icon: FaComments, action: () => setShowChat(true), color: 'from-teal-500 to-teal-600' },
    { title: 'Config', icon: FaCog, action: () => setActiveTab('settings'), color: 'from-gray-500 to-gray-600' }
  ]);

  const [dashboardCards] = useState([
    { title: 'Ventas del Mes', value: '$45,600', change: '+12%', icon: FaDollarSign, color: 'from-green-400 to-green-600' },
    { title: 'Usuarios Activos', value: '1,250', change: '+8%', icon: FaUsers, color: 'from-blue-400 to-blue-600' },
    { title: 'Cursos Completados', value: '342', change: '+15%', icon: FaUserGraduate, color: 'from-purple-400 to-purple-600' },
    { title: 'Tasa de Conversión', value: '24.8%', change: '+3%', icon: FaChartPie, color: 'from-orange-400 to-orange-600' }
  ]);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'users', label: 'Usuarios', icon: FaUsers },
    { id: 'products', label: 'Productos', icon: FaShoppingCart },
    { id: 'courses', label: 'Cursos', icon: FaBook },
    { id: 'editor', label: 'Editor Páginas', icon: FaPalette },
    { id: 'promotions', label: 'Promociones', icon: FaGift },
    { id: 'gamification', label: 'Gamificación', icon: FaGamepad },
    { id: 'blog', label: 'Blog', icon: FaNewspaper },
    { id: 'appointments', label: 'Citas', icon: FaCalendarAlt },
    { id: 'analytics', label: 'Analíticas', icon: FaChartPie },
    { id: 'entitlements', label: 'Planes/Beneficios', icon: FaShieldAlt },
    { id: 'orders', label: 'Órdenes', icon: FaCreditCard },
    { id: 'certificates', label: 'Certificados', icon: FaFileAlt },
    { id: 'settings', label: 'Configuración', icon: FaCog }
  ];

  // Admin data states
  const [adminEntitlements, setAdminEntitlements] = useState(null);
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminCerts, setAdminCerts] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [ent, ord, cer] = await Promise.all([
          api.get('/entitlements'),
          api.get('/orders'),
          api.get('/certificates')
        ]);
        setAdminEntitlements(ent?.data || null);
        setAdminOrders(ord?.data?.orders || []);
        setAdminCerts(cer?.data?.certificates || []);
      } catch (e) {
        // Silencioso para no romper UI admin
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar con efectos cristal */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl z-40"
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Admin Panel Pro
          </h1>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left p-3 rounded-lg transition-all flex items-center ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transform scale-105' 
                    : 'hover:bg-gray-700/50 hover:backdrop-blur-sm'
                }`}
              >
                <item.icon className="mr-3 text-lg" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute right-0 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-600 rounded-l"
                  />
                )}
              </motion.button>
            ))}
          </nav>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-6 left-6 right-6 p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg flex items-center justify-center transition-all shadow-lg"
        >
          <FaSignOutAlt className="mr-2" />
          <span className="font-medium">Cerrar Sesión</span>
        </motion.button>
      </motion.div>

      {/* Contenido Principal */}
      <div className="ml-72 p-8">
        {/* Header con efectos cristal */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200/50"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {menuItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h2>
              <p className="text-gray-500 mt-1">Bienvenido de nuevo, Administrador</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="relative p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <FaBell className="text-gray-600" />
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => setShowChat(!showChat)}
                className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
              >
                <FaComments />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Contenido según tab activa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Cards de estadísticas con gradientes y efectos 3D */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {dashboardCards.map((card, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="relative overflow-hidden rounded-2xl shadow-xl transform-gpu"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-90`} />
                      <div className="relative bg-white/10 backdrop-blur-md p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white/80 text-sm font-medium">{card.title}</p>
                            <p className="text-3xl font-bold text-white mt-2">{card.value}</p>
                            <p className="text-white/60 text-sm mt-2 flex items-center">
                              <span className={`${card.change.startsWith('+') ? 'text-green-300' : 'text-red-300'}`}>
                                {card.change}
                              </span>
                              <span className="ml-2">vs mes anterior</span>
                            </p>
                          </div>
                          <card.icon className="text-white/30 text-5xl" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Grid de acciones rápidas */}
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200/50">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaRocket className="mr-2 text-blue-500" />
                    Acciones Rápidas
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={action.action}
                        className="relative group"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} rounded-xl opacity-90 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative p-4 flex flex-col items-center justify-center">
                          <action.icon className="text-white text-2xl mb-2" />
                          <span className="text-white text-xs font-medium">{action.title}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Gráficos y actividad reciente */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Gráfico de rendimiento */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200/50"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <FaChartLine className="mr-2 text-blue-500" />
                      Análisis de Rendimiento
                    </h3>
                    <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <FaChartPie className="text-6xl text-gray-400 mb-4 mx-auto" />
                        <p className="text-gray-500">Gráfico de rendimiento</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Actividad reciente */}
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-200/50"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <FaClock className="mr-2 text-purple-500" />
                      Actividad Reciente
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {recentActivities.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-purple-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                            <div>
                              <p className="font-medium text-gray-800">{activity.user}</p>
                              <p className="text-sm text-gray-600">{activity.action}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Estadísticas adicionales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <FaGamepad className="text-4xl text-white/50" />
                      <span className="text-2xl font-bold">{stats.completedGames}</span>
                    </div>
                    <p className="text-white/80">Juegos Completados</p>
                    <p className="text-sm text-white/60 mt-2">+23% esta semana</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl shadow-xl p-6 text-white"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <FaGift className="text-4xl text-white/50" />
                      <span className="text-2xl font-bold">{stats.activePromotions}</span>
                    </div>
                    <p className="text-white/80">Promociones Activas</p>
                    <p className="text-sm text-white/60 mt-2">3 expiran pronto</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-xl p-6 text-white"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <FaComments className="text-4xl text-white/50" />
                      <span className="text-2xl font-bold">{stats.totalMessages}</span>
                    </div>
                    <p className="text-white/80">Mensajes de Chat</p>
                    <p className="text-sm text-white/60 mt-2">89 sin responder</p>
                  </motion.div>
                </div>
              </div>
            )}

            {activeTab === 'editor' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaPalette className="mr-3 text-pink-500" />
                  Editor de Páginas Drag & Drop
                </h3>
                <p className="text-gray-600 mb-6">
                  Crea y edita páginas arrastrando y soltando componentes. Sistema completo de diseño visual.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Abrir Editor
                </button>
              </div>
            )}

            {activeTab === 'promotions' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaGift className="mr-3 text-yellow-500" />
                  Sistema de Promociones y Ofertas
                </h3>
                <p className="text-gray-600 mb-6">
                  Gestiona promociones por tiempo limitado, códigos de descuento y ofertas especiales.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Gestionar Promociones
                </button>
              </div>
            )}

            {activeTab === 'gamification' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaGamepad className="mr-3 text-indigo-500" />
                  Sistema de Gamificación y Trivia
                </h3>
                <p className="text-gray-600 mb-6">
                  Sistema completo de gamificación con trivias, puntos, logros y tablas de clasificación.
                </p>
                <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  Configurar Gamificación
                </button>
              </div>
            )}

            {/* Más tabs pueden agregarse aquí */}
            {activeTab === 'entitlements' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaShieldAlt className="mr-3 text-blue-500" /> Planes y Beneficios (Cliente actual)
                </h3>
                {!adminEntitlements ? (
                  <div className="text-gray-500">Cargando...</div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl border">
                      <div className="text-sm text-gray-500">Plan</div>
                      <div className="text-xl font-semibold">{(adminEntitlements.plan||'free').toUpperCase()}</div>
                    </div>
                    <div className="p-4 rounded-xl border">
                      <div className="text-sm text-gray-500">IA gratis por día</div>
                      <div className="text-xl font-semibold">{adminEntitlements?.benefits?.aiDailyFree ?? 1}</div>
                    </div>
                    <div className="p-4 rounded-xl border">
                      <div className="text-sm text-gray-500">Blog Premium</div>
                      <div className="text-xl font-semibold">{adminEntitlements?.benefits?.blogPremium ? 'Sí' : 'No'}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaCreditCard className="mr-3 text-green-600" /> Órdenes del Cliente
                </h3>
                {adminOrders.length === 0 ? (
                  <div className="text-gray-500">Sin órdenes registradas.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="py-2 pr-4">ID</th>
                          <th className="py-2 pr-4">Fecha</th>
                          <th className="py-2 pr-4">Items</th>
                          <th className="py-2 pr-4">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminOrders.map(o => (
                          <tr key={o.id} className="border-t border-gray-100">
                            <td className="py-2 pr-4 font-medium">{o.id}</td>
                            <td className="py-2 pr-4">{new Date(o.createdAt).toLocaleString()}</td>
                            <td className="py-2 pr-4">{o.items?.map(i=>i.name).join(', ')}</td>
                            <td className="py-2 pr-4 font-semibold">${(o.total||0).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'certificates' && (
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200/50">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaFileAlt className="mr-3 text-purple-600" /> Certificados del Cliente
                </h3>
                {adminCerts.length === 0 ? (
                  <div className="text-gray-500">Sin certificados creados.</div>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {adminCerts.map(c => (
                      <li key={c.id} className="py-3 flex items-center justify-between">
                        <div>
                          <div className="font-medium">{c.subject}</div>
                          <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()} · {c.id}</div>
                        </div>
                        <Link to="#" className="px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">Ver</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Chat flotante */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex justify-between items-center">
              <h3 className="font-bold flex items-center">
                <FaComments className="mr-2" />
                Chat en Vivo
              </h3>
              <button 
                onClick={() => setShowChat(false)}
                className="text-white/80 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-60px)] flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FaComments className="text-6xl mb-4 mx-auto text-gray-300" />
              <p>Sistema de chat integrado</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboardComplete;
