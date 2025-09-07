import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  TrophyIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  GiftIcon,
  HandRaisedIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const AfiliadosPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    experiencia: '',
    especialidad: ''
  });

  const benefits = [
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: 'Comisiones Atractivas',
      description: 'Gana hasta 30% de comisión por cada cliente referido',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <ChartBarIcon className="h-8 w-8" />,
      title: 'Crecimiento Profesional',
      description: 'Desarrolla tu red profesional y habilidades comerciales',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <TrophyIcon className="h-8 w-8" />,
      title: 'Reconocimientos',
      description: 'Premios y reconocimientos por desempeño destacado',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <GiftIcon className="h-8 w-8" />,
      title: 'Bonos Especiales',
      description: 'Bonificaciones adicionales por volumen de ventas',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const requirements = [
    'Experiencia en ventas o atención al cliente',
    'Conocimientos básicos de servicios legales',
    'Habilidades de comunicación excelentes',
    'Disponibilidad de tiempo parcial o completo',
    'Compromiso con la calidad del servicio'
  ];

  const commissionStructure = [
    { level: 'Bronce', sales: '1-10 clientes', commission: '15%', color: 'bg-orange-500' },
    { level: 'Plata', sales: '11-25 clientes', commission: '20%', color: 'bg-gray-400' },
    { level: 'Oro', sales: '26-50 clientes', commission: '25%', color: 'bg-yellow-500' },
    { level: 'Platino', sales: '50+ clientes', commission: '30%', color: 'bg-purple-500' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Solicitud enviada correctamente. Nos contactaremos pronto.');
    navigate('/');
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
            <UserGroupIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Programa de Afiliados
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Únete a nuestro equipo y genera ingresos promoviendo servicios legales de calidad
            </p>
            <button
              onClick={() => document.getElementById('registro').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Únete Ahora
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Beneficios del Programa
            </h2>
            <p className="text-xl text-gray-600">
              Descubre todas las ventajas de ser nuestro afiliado
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center"
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${benefit.color} text-white flex items-center justify-center mx-auto mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Estructura de Comisiones
            </h2>
            <p className="text-xl text-gray-600">
              Mientras más vendes, más ganas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionStructure.map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className={`${level.color} text-white p-4 text-center`}>
                  <h3 className="text-2xl font-bold">{level.level}</h3>
                </div>
                <div className="p-6 text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {level.commission}
                  </div>
                  <p className="text-gray-600 mb-4">de comisión</p>
                  <p className="text-sm text-gray-500">
                    {level.sales}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Requisitos para Afiliados
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              {requirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registro" className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Regístrate Como Afiliado
            </h2>
            <p className="text-xl text-gray-600">
              Completa el formulario y comienza a generar ingresos
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experiencia Previa
                </label>
                <textarea
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe tu experiencia en ventas o servicios"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área de Especialidad
                </label>
                <select
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecciona una especialidad</option>
                  <option value="civil">Derecho Civil</option>
                  <option value="penal">Derecho Penal</option>
                  <option value="comercial">Derecho Comercial</option>
                  <option value="transito">Derecho de Tránsito</option>
                  <option value="aduanero">Derecho Aduanero</option>
                  <option value="general">Servicios Generales</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <HandRaisedIcon className="h-5 w-5" />
                Enviar Solicitud
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AfiliadosPage;
