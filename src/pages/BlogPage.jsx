import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  NewspaperIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  UserIcon,
  EyeIcon,
  ClockIcon,
  TagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos los artículos', count: 42 },
    { id: 'civil', name: 'Derecho Civil', count: 12 },
    { id: 'penal', name: 'Derecho Penal', count: 8 },
    { id: 'laboral', name: 'Derecho Laboral', count: 10 },
    { id: 'comercial', name: 'Derecho Comercial', count: 7 },
    { id: 'noticias', name: 'Noticias Legales', count: 5 }
  ];

  const featuredPost = {
    id: 1,
    title: 'Nueva Reforma Laboral 2024: Todo lo que Necesitas Saber',
    excerpt: 'Análisis completo de los cambios más importantes en la legislación laboral colombiana y cómo afectan a empleadores y trabajadores.',
    author: 'Dr. Carlos Mendoza',
    date: '2024-01-15',
    readTime: '8 min',
    views: 2847,
    category: 'laboral',
    image: '/images/blog/reforma-laboral.jpg',
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: 'Cómo Constituir una SAS: Guía Paso a Paso',
      excerpt: 'Todo lo que necesitas saber para crear tu Sociedad por Acciones Simplificada de manera rápida y legal.',
      author: 'Dra. María González',
      date: '2024-01-12',
      readTime: '6 min',
      views: 1923,
      category: 'comercial',
      image: '/images/blog/constituir-sas.jpg'
    },
    {
      id: 3,
      title: 'Derechos del Consumidor en Compras Online',
      excerpt: 'Conoce tus derechos al comprar por internet y cómo reclamar en caso de problemas con tu pedido.',
      author: 'Dr. Roberto Silva',
      date: '2024-01-10',
      readTime: '5 min',
      views: 1456,
      category: 'civil',
      image: '/images/blog/derechos-consumidor.jpg'
    },
    {
      id: 4,
      title: 'Proceso de Divorcio por Mutuo Acuerdo',
      excerpt: 'Ventajas, requisitos y pasos para tramitar un divorcio de común acuerdo de manera rápida y económica.',
      author: 'Dra. Ana Martínez',
      date: '2024-01-08',
      readTime: '7 min',
      views: 2134,
      category: 'civil',
      image: '/images/blog/divorcio-mutuo.jpg'
    },
    {
      id: 5,
      title: 'Defensa Penal: Qué Hacer si te Acusan de un Delito',
      excerpt: 'Pasos inmediatos y estrategias legales para defenderte eficazmente en un proceso penal.',
      author: 'Dr. Luis Herrera',
      date: '2024-01-05',
      readTime: '9 min',
      views: 1789,
      category: 'penal',
      image: '/images/blog/defensa-penal.jpg'
    },
    {
      id: 6,
      title: 'Liquidación de Prestaciones Sociales 2024',
      excerpt: 'Cálculo actualizado de cesantías, primas y vacaciones según la nueva normativa laboral.',
      author: 'Dra. Patricia López',
      date: '2024-01-03',
      readTime: '6 min',
      views: 3021,
      category: 'laboral',
      image: '/images/blog/prestaciones-sociales.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6"
            >
              <NewspaperIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Blog Legal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente informado con los últimos artículos, análisis y noticias del mundo jurídico
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/blog/default-featured.jpg';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Destacado
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium mr-3">
                    {getCategoryName(featuredPost.category)}
                  </span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{featuredPost.author}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center"
                  >
                    Leer más
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-6 mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buscar Artículos</h3>
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar..."
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
              transition={{ delay: 0.5 }}
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
                    <span className="font-medium">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/blog/default-post.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {getCategoryName(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.date}</span>
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{post.readTime}</span>
                      <EyeIcon className="h-4 w-4 mr-1" />
                      <span>{post.views}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                      >
                        Leer más
                        <ArrowRightIcon className="h-3 w-3 ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <NewspaperIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron artículos</h3>
                <p className="text-gray-500">
                  Intenta cambiar los filtros de búsqueda o categoría.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
