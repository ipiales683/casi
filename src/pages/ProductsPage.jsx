import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { 
  FaBook, FaGavel, FaBalanceScale, FaCar, FaBuilding, FaShip,
  FaMoneyBillWave, FaUserTie, FaGraduationCap, FaStar, FaVideo,
  FaFileAlt, FaShoppingCart, FaFilter, FaSearch, FaTag,
  FaClock, FaUsers, FaCheckCircle, FaPlay, FaDownload
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      category: product.category,
      description: product.description
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  const categories = [
    { id: 'all', name: 'Todos', icon: FaTag },
    { id: 'legal', name: 'Servicios Legales', icon: FaGavel },
    { id: 'education', name: 'Educación', icon: FaGraduationCap },
    { id: 'resources', name: 'Recursos', icon: FaFileAlt }
  ];

  const productTypes = [
    { id: 'all', name: 'Todos los Tipos' },
    { id: 'service', name: 'Servicios' },
    { id: 'ebook', name: 'Ebooks' },
    { id: 'course', name: 'Cursos' },
    { id: 'masterclass', name: 'Masterclass' },
    { id: 'consultation', name: 'Consultas' }
  ];

  const products = [
    // Servicios Legales
    {
      id: 'servicio-penal',
      name: 'Derecho Penal',
      description: 'Defensa legal completa en procesos penales con estrategias personalizadas y efectivas.',
      price: 150,
      category: 'legal',
      type: 'service',
      icon: <FaGavel className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
      rating: 4.9,
      reviews: 245,
      duration: '60 min',
      features: ['Defensa integral', 'Estrategia personalizada', 'Seguimiento 24/7'],
      link: '/servicios/penal'
    },
    {
      id: 'servicio-civil',
      name: 'Derecho Civil',
      description: 'Asesoría en contratos, propiedades, sucesiones y obligaciones con enfoque práctico.',
      price: 120,
      category: 'legal',
      type: 'service',
      icon: <FaBalanceScale className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      rating: 4.8,
      reviews: 189,
      duration: '45 min',
      features: ['Contratos', 'Sucesiones', 'Propiedades'],
      link: '/servicios/civil'
    },
    {
      id: 'servicio-transito',
      name: 'Derecho de Tránsito',
      description: 'Especialistas en accidentes de tránsito, multas y gestión con aseguradoras.',
      price: 100,
      category: 'legal',
      type: 'service',
      icon: <FaCar className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      rating: 4.7,
      reviews: 156,
      duration: '30 min',
      features: ['Accidentes', 'Multas', 'Aseguradoras'],
      link: '/servicios/transito'
    },
    {
      id: 'servicio-comercial',
      name: 'Derecho Comercial',
      description: 'Asesoría empresarial, constitución de empresas y contratos comerciales.',
      price: 180,
      category: 'legal',
      type: 'service',
      icon: <FaBuilding className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      rating: 4.9,
      reviews: 132,
      duration: '90 min',
      features: ['Constitución empresas', 'Contratos comerciales', 'Asesoría fiscal'],
      link: '/servicios/comercial'
    },
    {
      id: 'servicio-aduanero',
      name: 'Derecho Aduanero',
      description: 'Especialistas en comercio exterior, importaciones y exportaciones.',
      price: 200,
      category: 'legal',
      type: 'service',
      icon: <FaShip className="h-8 w-8" />,
      color: 'from-teal-500 to-teal-600',
      rating: 4.8,
      reviews: 98,
      duration: '120 min',
      features: ['Importaciones', 'Exportaciones', 'Trámites aduaneros'],
      link: '/servicios/aduanas'
    },

    // Ebooks
    {
      id: 'ebook-penal',
      name: 'Guía Completa de Derecho Penal',
      description: 'Manual completo con casos prácticos y jurisprudencia actualizada.',
      price: 29.99,
      category: 'resources',
      type: 'ebook',
      icon: <FaBook className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      rating: 4.9,
      reviews: 342,
      pages: 280,
      format: 'PDF',
      features: ['280 páginas', 'Casos prácticos', 'Jurisprudencia actualizada'],
      downloadUrl: '/downloads/ebook-penal.pdf'
    },
    {
      id: 'ebook-civil',
      name: 'Contratos y Obligaciones',
      description: 'Todo lo que necesitas saber sobre contratos civiles y obligaciones.',
      price: 24.99,
      category: 'resources',
      type: 'ebook',
      icon: <FaBook className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      rating: 4.7,
      reviews: 287,
      pages: 220,
      format: 'PDF',
      features: ['220 páginas', 'Modelos de contratos', 'Casos reales'],
      downloadUrl: '/downloads/ebook-civil.pdf'
    },
    {
      id: 'ebook-empresarial',
      name: 'Derecho Empresarial Práctico',
      description: 'Guía práctica para empresarios sobre aspectos legales empresariales.',
      price: 34.99,
      category: 'resources',
      type: 'ebook',
      icon: <FaBook className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      rating: 4.8,
      reviews: 198,
      pages: 350,
      format: 'PDF',
      features: ['350 páginas', 'Casos empresariales', 'Formularios incluidos'],
      downloadUrl: '/downloads/ebook-empresarial.pdf'
    },

    // Cursos
    {
      id: 'curso-penal-basico',
      name: 'Curso Básico de Derecho Penal',
      description: 'Fundamentos del derecho penal ecuatoriano con casos prácticos.',
      price: 99.99,
      category: 'education',
      type: 'course',
      icon: <FaGraduationCap className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
      rating: 4.9,
      reviews: 156,
      duration: '8 semanas',
      lessons: 24,
      certificate: true,
      features: ['24 lecciones', '8 semanas', 'Certificado incluido'],
      modules: ['Fundamentos', 'Delitos', 'Procedimiento', 'Casos prácticos']
    },
    {
      id: 'curso-civil-avanzado',
      name: 'Derecho Civil Avanzado',
      description: 'Curso avanzado sobre contratos, obligaciones y derechos reales.',
      price: 149.99,
      category: 'education',
      type: 'course',
      icon: <FaGraduationCap className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      rating: 4.8,
      reviews: 123,
      duration: '12 semanas',
      lessons: 36,
      certificate: true,
      features: ['36 lecciones', '12 semanas', 'Certificado avanzado'],
      modules: ['Contratos', 'Obligaciones', 'Derechos reales', 'Sucesiones']
    },
    {
      id: 'curso-empresarial',
      name: 'Derecho Empresarial Integral',
      description: 'Curso completo sobre aspectos legales para empresarios y emprendedores.',
      price: 199.99,
      category: 'education',
      type: 'course',
      icon: <FaGraduationCap className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      rating: 4.9,
      reviews: 89,
      duration: '16 semanas',
      lessons: 48,
      certificate: true,
      features: ['48 lecciones', '16 semanas', 'Certificado profesional'],
      modules: ['Constitución', 'Contratos', 'Laboral', 'Tributario']
    },

    // Masterclass
    {
      id: 'masterclass-litigacion',
      name: 'Masterclass de Litigación Oral',
      description: 'Técnicas avanzadas de litigación oral con expertos internacionales.',
      price: 299.99,
      category: 'education',
      type: 'masterclass',
      icon: <FaStar className="h-8 w-8" />,
      color: 'from-yellow-500 to-yellow-600',
      rating: 5.0,
      reviews: 67,
      duration: '6 horas',
      instructor: 'Dr. Wilson Ipiales',
      live: true,
      features: ['Sesión en vivo', '6 horas intensivas', 'Certificado premium'],
      topics: ['Técnicas de argumentación', 'Manejo de audiencias', 'Casos complejos']
    },
    {
      id: 'masterclass-negociacion',
      name: 'Negociación Jurídica Avanzada',
      description: 'Estrategias de negociación para abogados con casos reales.',
      price: 249.99,
      category: 'education',
      type: 'masterclass',
      icon: <FaStar className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      rating: 4.9,
      reviews: 45,
      duration: '4 horas',
      instructor: 'Dra. María González',
      live: true,
      features: ['Sesión exclusiva', '4 horas', 'Material premium'],
      topics: ['Psicología de negociación', 'Técnicas avanzadas', 'Casos internacionales']
    },

    // Consultas
    {
      id: 'consulta-rapida',
      name: 'Consulta Rápida',
      description: 'Consulta legal inmediata para resolver dudas urgentes.',
      price: 50,
      category: 'legal',
      type: 'consultation',
      icon: <FaClock className="h-8 w-8" />,
      color: 'from-cyan-500 to-cyan-600',
      rating: 4.8,
      reviews: 456,
      duration: '30 min',
      response: '24 horas',
      features: ['Respuesta rápida', '30 minutos', 'Disponible 24/7'],
      modalities: ['Chat', 'Videollamada', 'Teléfono']
    },
    {
      id: 'consulta-especializada',
      name: 'Consulta Especializada',
      description: 'Consulta detallada con análisis profundo y recomendaciones.',
      price: 120,
      category: 'legal',
      type: 'consultation',
      icon: <FaUserTie className="h-8 w-8" />,
      color: 'from-slate-500 to-slate-600',
      rating: 4.9,
      reviews: 234,
      duration: '90 min',
      response: '48 horas',
      features: ['Análisis profundo', '90 minutos', 'Informe escrito'],
      modalities: ['Presencial', 'Videollamada', 'Documentos']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesType = selectedType === 'all' || product.type === selectedType;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesType && matchesSearch;
  });

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden group relative"
    >
      {/* Badge */}
      {product.type === 'masterclass' && (
        <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          PREMIUM
        </div>
      )}
      {product.type === 'course' && (
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          CURSO
        </div>
      )}
      
      {/* Header */}
      <div className={`h-3 bg-gradient-to-r ${product.color}`} />
      
      <div className="p-6">
        {/* Icon and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${product.color} text-white group-hover:scale-110 transition-transform`}>
            {product.icon}
          </div>
          <div className="flex items-center gap-1">
            <FaStar className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        </div>
        
        {/* Title and Description */}
        <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
        
        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                <FaCheckCircle className="h-3 w-3 mr-1 text-green-500" />
                {feature}
              </span>
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-4">
            {product.duration && (
              <div className="flex items-center gap-1">
                <FaClock className="h-4 w-4" />
                <span>{product.duration}</span>
              </div>
            )}
            {product.lessons && (
              <div className="flex items-center gap-1">
                <FaPlay className="h-4 w-4" />
                <span>{product.lessons} lecciones</span>
              </div>
            )}
            {product.pages && (
              <div className="flex items-center gap-1">
                <FaFileAlt className="h-4 w-4" />
                <span>{product.pages} páginas</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Price */}
        <div className="mb-6">
          <span className="text-3xl font-bold text-gray-900">${product.price}</span>
          {product.type === 'service' && <span className="text-gray-500 text-sm">/sesión</span>}
          {product.type === 'consultation' && <span className="text-gray-500 text-sm">/consulta</span>}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart(product)}
            className="flex-1 py-3 rounded-lg font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <FaShoppingCart className="h-4 w-4" />
            Agregar
          </motion.button>
          
          {product.link ? (
            <Link
              to={product.link}
              className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-lg transition-all text-center"
            >
              Ver más
            </Link>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${product.color} hover:shadow-lg transition-all`}
            >
              {product.type === 'ebook' ? 'Descargar' : 
               product.type === 'course' ? 'Inscribirse' :
               product.type === 'masterclass' ? 'Reservar' : 'Solicitar'}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Nuestros Productos y Servicios
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Descubre nuestra amplia gama de servicios legales, cursos, ebooks y masterclass
            diseñados para satisfacer todas sus necesidades jurídicas y educativas.
          </motion.p>
        </div>
      </motion.section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar productos y servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.name}
                </motion.button>
              ))}
            </div>
            
            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {productTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-lg text-gray-600">
              Mostrando <span className="font-semibold">{filteredProducts.length}</span> productos
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>
          
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FaSearch className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar los filtros o el término de búsqueda
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedType('all');
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Limpiar filtros
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white"
          >
            <h2 className="text-3xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Contáctanos para obtener una consulta personalizada y encontrar la solución perfecta para tu caso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/consulta-general"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Consulta General
              </Link>
              <Link
                to="/contacto"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contactar Ahora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
