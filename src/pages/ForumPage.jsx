import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FireIcon,
  ClockIcon,
  HandThumbUpIcon,
  EyeIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', color: 'bg-gray-500', count: 156 },
    { id: 'civil', name: 'Derecho Civil', color: 'bg-blue-500', count: 45 },
    { id: 'penal', name: 'Derecho Penal', color: 'bg-red-500', count: 32 },
    { id: 'laboral', name: 'Derecho Laboral', color: 'bg-green-500', count: 28 },
    { id: 'comercial', name: 'Derecho Comercial', color: 'bg-purple-500', count: 22 },
    { id: 'familiar', name: 'Derecho Familiar', color: 'bg-pink-500', count: 19 },
    { id: 'tributario', name: 'Derecho Tributario', color: 'bg-yellow-500', count: 10 }
  ];

  const topics = [
    {
      id: 1,
      title: '¿Cómo proceder en caso de incumplimiento de contrato?',
      author: 'María González',
      category: 'civil',
      replies: 23,
      views: 1204,
      lastActivity: '2 horas',
      isHot: true,
      avatar: '/images/avatar1.jpg',
      description: 'Necesito asesoría sobre qué pasos seguir cuando la otra parte no cumple con las condiciones pactadas en un contrato comercial...'
    },
    {
      id: 2,
      title: 'Derechos laborales durante período de prueba',
      author: 'Carlos Ramírez',
      category: 'laboral',
      replies: 18,
      views: 856,
      lastActivity: '4 horas',
      isHot: true,
      avatar: '/images/avatar2.jpg',
      description: '¿Cuáles son los derechos que tengo como empleado durante los primeros 3 meses de trabajo en período de prueba?'
    },
    {
      id: 3,
      title: 'Proceso de divorcio por mutuo acuerdo',
      author: 'Ana Martínez',
      category: 'familiar',
      replies: 31,
      views: 2103,
      lastActivity: '6 horas',
      isHot: false,
      avatar: '/images/avatar3.jpg',
      description: 'Mi esposo y yo queremos divorciarnos de común acuerdo. ¿Cuál es el proceso más rápido y económico?'
    },
    {
      id: 4,
      title: 'Defensa en proceso penal por estafa',
      author: 'Roberto Silva',
      category: 'penal',
      replies: 12,
      views: 634,
      lastActivity: '1 día',
      isHot: false,
      avatar: '/images/avatar4.jpg',
      description: 'Me están acusando de estafa pero soy inocente. ¿Cómo puedo demostrar mi inocencia y qué estrategia legal debo seguir?'
    },
    {
      id: 5,
      title: 'Constitución de empresa SAS paso a paso',
      author: 'Laura Fernández',
      category: 'comercial',
      replies: 27,
      views: 1567,
      lastActivity: '1 día',
      isHot: false,
      avatar: '/images/avatar5.jpg',
      description: 'Quiero crear una SAS pero no sé por dónde empezar. ¿Alguien puede explicarme el proceso completo?'
    }
  ];

  const handleNewTopic = () => {
    toast.success('Función de nuevo tema próximamente disponible');
  };

  const filteredTopics = topics.filter(topic => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6"
            >
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Foro Legal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comparte dudas, experiencias y conocimientos con nuestra comunidad legal
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewTopic}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center mx-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Nuevo Tema
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar temas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TagIcon className="h-5 w-5 mr-2 text-blue-600" />
                Categorías
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <UserGroupIcon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-gray-600">Miembros Activos</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">3,891</div>
                <div className="text-gray-600">Discusiones</div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <HandThumbUpIcon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900">12,456</div>
                <div className="text-gray-600">Respuestas Útiles</div>
              </div>
            </motion.div>

            {/* Topics List */}
            <div className="space-y-4">
              {filteredTopics.map((topic, index) => (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {topic.isHot && (
                            <div className="flex items-center bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium mr-3">
                              <FireIcon className="h-3 w-3 mr-1" />
                              Popular
                            </div>
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            categories.find(c => c.id === topic.category)?.color
                          } text-white`}>
                            {categories.find(c => c.id === topic.category)?.name}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {topic.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <img
                              src={topic.avatar}
                              alt={topic.author}
                              className="h-6 w-6 rounded-full mr-2"
                              onError={(e) => {
                                e.target.src = '/images/avatar-default.jpg';
                              }}
                            />
                            <span>por {topic.author}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            {topic.lastActivity}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center ml-6">
                        <div className="text-lg font-semibold text-blue-600">{topic.replies}</div>
                        <div className="text-xs text-gray-500">respuestas</div>
                        <div className="flex items-center mt-2 text-gray-500">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          <span className="text-xs">{topic.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredTopics.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron temas</h3>
                <p className="text-gray-500">
                  Intenta cambiar los filtros o crear un nuevo tema de discusión.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
