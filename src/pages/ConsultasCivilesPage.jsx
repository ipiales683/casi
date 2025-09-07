import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ScaleIcon, 
  DocumentTextIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowRightIcon,
  StarIcon,
  BanknotesIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';

const ConsultasCivilesPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'divorcio-mutuo',
      title: 'Divorcio por Mutuo Consentimiento',
      description: 'Proceso de divorcio rápido y amigable cuando ambas partes están de acuerdo',
      price: 350,
      features: [
        'Asesoría legal completa',
        'Documentación necesaria',
        'Trámite ante notario',
        'Seguimiento del proceso',
        'Entrega de sentencia'
      ],
      icon: <HeartIcon className="h-8 w-8" />,
      color: 'from-pink-500 to-pink-600',
      duration: '15-30 días',
      popular: true
    },
    {
      id: 'divorcio-contencioso',
      title: 'Divorcio Contencioso',
      description: 'Representación legal en divorcios con controversias y desacuerdos',
      price: 800,
      features: [
        'Representación en juicio',
        'Estrategia legal personalizada',
        'Negociación de acuerdos',
        'Custodia de menores',
        'División de bienes'
      ],
      icon: <ScaleIcon className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
      duration: '6-12 meses'
    },
    {
      id: 'pension-alimenticia',
      title: 'Pensión Alimenticia',
      description: 'Tramitación y seguimiento de pensiones alimenticias',
      price: 280,
      features: [
        'Cálculo de pensión',
        'Demanda judicial',
        'Seguimiento de pagos',
        'Medidas coercitivas',
        'Modificación de montos'
      ],
      icon: <UserGroupIcon className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      duration: '2-4 meses'
    },
    {
      id: 'sucesion',
      title: 'Trámites Sucesorios',
      description: 'Gestión completa de herencias y trámites sucesorios',
      price: 450,
      features: [
        'Inventario de bienes',
        'Declaratoria de herederos',
        'Partición de herencia',
        'Trámites notariales',
        'Liquidación de impuestos'
      ],
      icon: <DocumentTextIcon className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      duration: '3-6 meses'
    },
    {
      id: 'inquilinato',
      title: 'Juicios de Inquilinato',
      description: 'Resolución de conflictos entre arrendadores y arrendatarios',
      price: 320,
      features: [
        'Desalojo por falta de pago',
        'Desalojo por vencimiento',
        'Cobro de arriendos',
        'Daños a la propiedad',
        'Negociación extrajudicial'
      ],
      icon: <HomeIcon className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      duration: '3-6 meses'
    },
    {
      id: 'consulta-civil-express',
      title: 'Consulta Civil Express',
      description: 'Asesoría rápida para dudas civiles urgentes',
      price: 60,
      features: [
        'Respuesta en 24 horas',
        'Consulta personalizada',
        'Orientación legal',
        'Documentos básicos',
        'Seguimiento inicial'
      ],
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      duration: '1-2 días',
      promo: true
    }
  ];

  const successStats = [
    { type: 'Divorcios', success: '95%', cases: 180 },
    { type: 'Pensiones', success: '92%', cases: 145 },
    { type: 'Sucesiones', success: '88%', cases: 78 },
    { type: 'Inquilinato', success: '90%', cases: 112 }
  ];

  const handleConsultation = () => {
    toast.success('Redirigiendo a consulta...');
    navigate('/agendar-cita');
  };

  const handleAddToCart = (service) => {
    addToCart({
      id: service.id,
      name: service.title,
      price: service.price,
      type: 'consultation',
      category: 'civil',
      duration: service.duration
    });
    toast.success('Servicio agregado al carrito');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Consultas de Derecho Civil
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Soluciones legales para asuntos familiares, contractuales y patrimoniales
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleConsultation}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Consulta Gratuita
              </button>
              <a
                href="https://wa.me/593988835269"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-600 transition-all"
              >
                WhatsApp Directo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-sm">
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
                <div className="text-3xl font-bold text-blue-600">{stat.success}</div>
                <div className="text-sm text-gray-600">{stat.type}</div>
                <div className="text-xs text-gray-400">{stat.cases} casos</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Servicios de Derecho Civil
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos asesoría especializada en todas las áreas del derecho civil
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
                
                {service.promo && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      Promo
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
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-2xl font-bold text-blue-600">
                      ${service.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(service)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <BanknotesIcon className="h-4 w-4" />
                      Contratar
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <ScaleIcon className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">
              ¿Necesita Asesoría en Derecho Civil?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Contáctenos ahora para una consulta personalizada y profesional
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleConsultation}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                Agendar Consulta
              </button>
              <a
                href="tel:+593988835269"
                className="px-8 py-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-all flex items-center justify-center gap-2"
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

export default ConsultasCivilesPage;
