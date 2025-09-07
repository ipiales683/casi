import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheckIcon, 
  DocumentTextIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowRightIcon,
  StarIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  ScaleIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ConsultasPenalesPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'defensa-delitos-graves',
      title: 'Defensa en Delitos Graves',
      description: 'Representación legal especializada en homicidios, violación y delitos contra la vida',
      price: 2500,
      features: [
        'Defensa especializada 24/7',
        'Investigación privada',
        'Estrategia de defensa personalizada',
        'Representación en todas las instancias',
        'Gestión de medidas cautelares',
        'Seguimiento hasta sentencia firme'
      ],
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      color: 'from-red-600 to-red-700',
      duration: '12-18 meses',
      popular: true,
      urgent: true
    },
    {
      id: 'delitos-propiedad',
      title: 'Delitos Contra la Propiedad',
      description: 'Defensa en robos, hurtos, estafas y apropiación indebida',
      price: 1200,
      features: [
        'Análisis de pruebas',
        'Negociación con fiscalía',
        'Procedimiento abreviado',
        'Reparación integral',
        'Medidas alternativas',
        'Seguimiento del caso'
      ],
      icon: <DocumentTextIcon className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      duration: '6-12 meses'
    },
    {
      id: 'delitos-transito',
      title: 'Delitos de Tránsito',
      description: 'Defensa en accidentes de tránsito con lesiones o muerte',
      price: 800,
      features: [
        'Reconstrucción de accidentes',
        'Peritaje técnico',
        'Negociación de acuerdos',
        'Defensa en audiencias',
        'Gestión de seguros',
        'Reparación de daños'
      ],
      icon: <ExclamationTriangleIcon className="h-8 w-8" />,
      color: 'from-yellow-500 to-yellow-600',
      duration: '4-8 meses'
    },
    {
      id: 'violencia-intrafamiliar',
      title: 'Violencia Intrafamiliar',
      description: 'Defensa especializada en casos de violencia doméstica',
      price: 600,
      features: [
        'Asesoría psicológica incluida',
        'Medidas de protección',
        'Defensa integral',
        'Seguimiento personalizado',
        'Apoyo familiar',
        'Reinserción social'
      ],
      icon: <UserIcon className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      duration: '3-6 meses'
    },
    {
      id: 'delitos-economicos',
      title: 'Delitos Económicos',
      description: 'Defensa en lavado de activos, peculado y delitos financieros',
      price: 3000,
      features: [
        'Análisis financiero forense',
        'Defensa corporativa',
        'Compliance penal',
        'Negociación de acuerdos',
        'Protección de activos',
        'Estrategia empresarial'
      ],
      icon: <BanknotesIcon className="h-8 w-8" />,
      color: 'from-green-600 to-green-700',
      duration: '12-24 meses'
    },
    {
      id: 'consulta-penal-urgente',
      title: 'Consulta Penal Urgente',
      description: 'Asesoría inmediata para situaciones penales críticas',
      price: 80,
      features: [
        'Respuesta inmediata 24/7',
        'Asesoría por WhatsApp',
        'Orientación sobre derechos',
        'Documentos de urgencia',
        'Coordinación de fianza',
        'Seguimiento inicial'
      ],
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      color: 'from-red-500 to-pink-500',
      duration: 'Inmediato',
      urgent: true
    }
  ];

  const successStats = [
    { type: 'Casos Ganados', success: '87%', cases: 145 },
    { type: 'Absoluciones', success: '65%', cases: 98 },
    { type: 'Penas Reducidas', success: '92%', cases: 178 },
    { type: 'Libertad Provisional', success: '89%', cases: 134 }
  ];

  const handleConsultation = () => {
    toast.success('Redirigiendo a consulta urgente...');
    navigate('/agendar-cita');
  };

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.price,
      type: 'consultation',
      category: 'penal',
      duration: service.duration,
      urgent: service.urgent || false
    });
    toast.success('Servicio agregado al carrito');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 py-20">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Defensa Penal Especializada
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Protegemos sus derechos con experiencia y dedicación en casos penales
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleConsultation}
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Consulta Urgente 24/7
              </button>
              <a
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-red-600 transition-all"
              >
                WhatsApp Emergencia
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white text-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {successStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-red-600">{stat.success}</div>
                <div className="text-sm text-gray-600">{stat.type}</div>
                <div className="text-xs text-gray-400">{stat.cases} casos</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Servicios de Defensa Penal
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Representación legal especializada en todas las áreas del derecho penal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      Popular
                    </span>
                  </div>
                )}
                
                {service.urgent && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full animate-pulse">
                      Urgente
                    </span>
                  </div>
                )}
                
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                
                <div className="p-6">
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {service.duration}
                    </span>
                    {service.urgent && (
                      <span className="text-red-500 font-bold">
                        Atención 24/7
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-red-600">
                      ${service.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(service)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                    >
                      <ScaleIcon className="h-4 w-4" />
                      Contratar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ShieldCheckIcon className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              ¿Situación Penal Urgente?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Atención inmediata 24/7 para emergencias penales y detenciones
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleConsultation}
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Consulta Inmediata
              </button>
              <a
                href="tel:+593988835269"
                className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
              >
                <PhoneIcon className="h-5 w-5" />
                Llamar Ahora
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ConsultasPenalesPage;
