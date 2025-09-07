import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlusIcon,
  CurrencyDollarIcon,
  ShareIcon,
  GiftIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const ReferidosPage = () => {
  const [referralCode] = useState('WILSON2024REF');
  const [shareData, setShareData] = useState({
    name: '',
    email: '',
    referredName: '',
    referredEmail: ''
  });

  const benefits = [
    {
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      title: '$50 USD por Referido',
      description: 'Obtén $50 en créditos por cada amigo que contrate nuestros servicios',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <GiftIcon className="h-8 w-8" />,
      title: '10% Descuento para tu Referido',
      description: 'Tu amigo recibe un 10% de descuento en su primera consulta',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: 'Sin Límites',
      description: 'Refiere a tantas personas como desees, sin restricciones',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <ShareIcon className="h-8 w-8" />,
      title: 'Fácil de Compartir',
      description: 'Herramientas simples para compartir tu código único',
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Obtén tu Código',
      description: 'Regístrate y obtén tu código único de referidos'
    },
    {
      number: '2',
      title: 'Comparte',
      description: 'Envía tu código a amigos y familiares'
    },
    {
      number: '3',
      title: 'Tu Referido Contrata',
      description: 'Tu amigo utiliza tu código al contratar servicios'
    },
    {
      number: '4',
      title: 'Ambos Ganan',
      description: 'Recibes créditos y tu amigo obtiene descuento'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Código copiado al portapapeles');
  };

  const shareViaWhatsApp = () => {
    const message = `¡Hola! Te recomiendo los servicios legales del Abg. Wilson Ipiales. Son excelentes y profesionales. Usa mi código ${referralCode} y obtén un 10% de descuento en tu primera consulta. Más info: https://abogadowilson.com`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Referido enviado exitosamente. Te notificaremos cuando se complete.');
    setShareData({ name: '', email: '', referredName: '', referredEmail: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <UserPlusIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Programa de Referidos
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Refiere amigos, familiares o colegas y gana créditos para futuros servicios legales
            </p>
            <button
              onClick={() => document.getElementById('codigo').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-green-600 font-bold rounded-full hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Comenzar Ahora
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
              Descubre por qué nuestro programa de referidos es beneficioso para ti y tus conocidos
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

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Cómo Funciona
            </h2>
            <p className="text-xl text-gray-600">
              Es muy fácil participar y comenzar a ganar recompensas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Code Section */}
      <section id="codigo" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Tu Código de Referidos
            </h2>
            <p className="text-xl text-gray-600">
              Comparte este código con tus amigos y conocidos
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold mb-2">{referralCode}</div>
              <p className="text-green-100">Tu código único de referidos</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => copyToClipboard(referralCode)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ClipboardDocumentIcon className="h-5 w-5" />
                Copiar Código
              </button>
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <ShareIcon className="h-5 w-5" />
                Compartir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Refiere a un Amigo
            </h2>
            <p className="text-xl text-gray-600">
              Comparte los datos de tu referido y te contactaremos
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={shareData.name}
                    onChange={(e) => setShareData({...shareData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tu Email
                  </label>
                  <input
                    type="email"
                    value={shareData.email}
                    onChange={(e) => setShareData({...shareData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Referido
                  </label>
                  <input
                    type="text"
                    value={shareData.referredName}
                    onChange={(e) => setShareData({...shareData, referredName: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email del Referido
                  </label>
                  <input
                    type="email"
                    value={shareData.referredEmail}
                    onChange={(e) => setShareData({...shareData, referredEmail: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Enviar Referido
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ReferidosPage;
