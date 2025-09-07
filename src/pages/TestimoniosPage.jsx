import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  StarIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  CheckBadgeIcon,
  HeartIcon,
  ScaleIcon
} from '@heroicons/react/24/solid';

const TestimoniosPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const testimonials = [
    {
      id: 1,
      name: 'María Fernández',
      role: 'Empresaria',
      category: 'civil',
      rating: 5,
      text: 'Excelente servicio en mi proceso de divorcio. El Dr. Ipiales fue muy profesional y me acompañó en cada paso. Recomiendo totalmente sus servicios.',
      service: 'Divorcio Civil',
      image: '/images/testimonials/maria.jpg',
      verified: true,
      date: '2024-11-15'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      role: 'Comerciante',
      category: 'penal',
      rating: 5,
      text: 'Me defendió en un caso penal complejo y logró mi absolución. Su estrategia legal fue impecable y siempre me mantuvo informado.',
      service: 'Defensa Penal',
      image: '/images/testimonials/carlos.jpg',
      verified: true,
      date: '2024-10-22'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      role: 'Profesora',
      category: 'transito',
      rating: 5,
      text: 'Gracias al Dr. Ipiales pude recuperar mi licencia de conducir y evitar una multa injusta. Muy recomendado para temas de tránsito.',
      service: 'Derecho de Tránsito',
      image: '/images/testimonials/ana.jpg',
      verified: true,
      date: '2024-12-03'
    },
    {
      id: 4,
      name: 'Roberto Jiménez',
      role: 'Arquitecto',
      category: 'comercial',
      rating: 5,
      text: 'Me ayudó a constituir mi empresa y resolver varios contratos comerciales. Su conocimiento del derecho empresarial es excepcional.',
      service: 'Derecho Comercial',
      image: '/images/testimonials/roberto.jpg',
      verified: true,
      date: '2024-09-18'
    },
    {
      id: 5,
      name: 'Luis Torres',
      role: 'Importador',
      category: 'aduanero',
      rating: 5,
      text: 'Resolvió mis problemas aduaneros de manera eficiente. Su experiencia en derecho aduanero me ahorró tiempo y dinero.',
      service: 'Derecho Aduanero',
      image: '/images/testimonials/luis.jpg',
      verified: true,
      date: '2024-08-10'
    },
    {
      id: 6,
      name: 'Patricia Vega',
      role: 'Enfermera',
      category: 'civil',
      rating: 5,
      text: 'Excelente atención en mi caso de pensión alimenticia. Muy profesional, empático y logró los mejores resultados para mi familia.',
      service: 'Pensión Alimenticia',
      image: '/images/testimonials/patricia.jpg',
      verified: true,
      date: '2024-11-28'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos los Casos', icon: <ScaleIcon className="h-5 w-5" /> },
    { id: 'civil', name: 'Derecho Civil', icon: <HeartIcon className="h-5 w-5" /> },
    { id: 'penal', name: 'Derecho Penal', icon: <ScaleIcon className="h-5 w-5" /> },
    { id: 'transito', name: 'Tránsito', icon: <UserCircleIcon className="h-5 w-5" /> },
    { id: 'comercial', name: 'Comercial', icon: <CheckBadgeIcon className="h-5 w-5" /> },
    { id: 'aduanero', name: 'Aduanero', icon: <ChatBubbleLeftIcon className="h-5 w-5" /> }
  ];

  const filteredTestimonials = selectedCategory === 'todos' 
    ? testimonials 
    : testimonials.filter(t => t.category === selectedCategory);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Testimonios de Clientes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestro mejor respaldo
            </p>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-blue-200">Casos Exitosos</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-blue-200">Satisfacción</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">4.9</div>
                <div className="text-blue-200 flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  Rating Promedio
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative"
              >
                {testimonial.verified && (
                  <div className="absolute top-4 right-4">
                    <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                    onError={(e) => {
                      e.target.src = '/images/avatar-default.jpg';
                    }}
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>

                <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(testimonial.date).toLocaleDateString('es-ES')}</span>
                  {testimonial.verified && (
                    <span className="flex items-center text-blue-600">
                      <CheckBadgeIcon className="h-4 w-4 mr-1" />
                      Verificado
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <HeartIcon className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              ¿Quiere ser el siguiente testimonio exitoso?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Únase a los cientos de clientes satisfechos que han confiado en nuestros servicios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultas"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Consulta Gratuita
              </a>
              <a
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all"
              >
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TestimoniosPage;
