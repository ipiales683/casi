import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon,
  CheckCircleIcon,
  NewspaperIcon,
  CalendarIcon,
  UserGroupIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const NewsletterPage = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = [
    { id: 'civil', name: 'Derecho Civil', description: 'Contratos, propiedad, responsabilidad civil' },
    { id: 'penal', name: 'Derecho Penal', description: 'Delitos, procedimiento penal, defensa' },
    { id: 'laboral', name: 'Derecho Laboral', description: 'Contratos laborales, prestaciones, despidos' },
    { id: 'comercial', name: 'Derecho Comercial', description: 'Empresas, sociedades, mercantil' },
    { id: 'tributario', name: 'Derecho Tributario', description: 'Impuestos, DIAN, obligaciones fiscales' },
    { id: 'noticias', name: 'Noticias Legales', description: 'Últimas actualizaciones y reformas' }
  ];

  const recentNewsletters = [
    {
      id: 1,
      title: 'Reforma Laboral 2024: Cambios Importantes',
      date: '2024-01-15',
      summary: 'Análisis completo de las modificaciones en la legislación laboral colombiana.',
      readers: 2847
    },
    {
      id: 2,
      title: 'Nuevas Regulaciones para SAS',
      date: '2024-01-08',
      summary: 'Todo lo que necesitas saber sobre los cambios para sociedades por acciones.',
      readers: 1923
    },
    {
      id: 3,
      title: 'Derechos del Consumidor Digital',
      date: '2024-01-01',
      summary: 'Protección legal en compras online y comercio electrónico.',
      readers: 1456
    }
  ];

  const handleTopicToggle = (topicId) => {
    setSelectedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor ingresa tu email');
      return;
    }
    if (selectedTopics.length === 0) {
      toast.error('Selecciona al menos un tema de interés');
      return;
    }
    
    setIsSubscribed(true);
    toast.success('¡Suscripción exitosa! Recibirás nuestro newsletter.');
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
              <EnvelopeIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Newsletter Legal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantente informado con las últimas actualizaciones legales, análisis de casos 
              y consejos jurídicos directamente en tu bandeja de entrada
            </p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!isSubscribed ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscription Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Suscríbete Ahora</h2>
                
                <form onSubmit={handleSubscribe} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Temas de Interés
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topics.map((topic) => (
                        <motion.div
                          key={topic.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTopics.includes(topic.id)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300 text-gray-700'
                          }`}
                          onClick={() => handleTopicToggle(topic.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{topic.name}</h3>
                              <p className="text-sm opacity-75">{topic.description}</p>
                            </div>
                            {selectedTopics.includes(topic.id) && (
                              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center justify-center"
                  >
                    <BellIcon className="h-5 w-5 mr-2" />
                    Suscribirse al Newsletter
                  </motion.button>
                </form>
              </motion.div>
            </div>

            {/* Benefits */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-lg shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">¿Por qué suscribirse?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Contenido Exclusivo</h4>
                      <p className="text-sm text-gray-600">Análisis profundos y casos de estudio</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Actualizaciones Legales</h4>
                      <p className="text-sm text-gray-600">Últimas reformas y cambios normativos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Consejos Prácticos</h4>
                      <p className="text-sm text-gray-600">Tips útiles para casos cotidianos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Sin Spam</h4>
                      <p className="text-sm text-gray-600">Solo contenido relevante y de calidad</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">5,000+</div>
                      <div className="text-sm text-gray-600">Suscriptores</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">98%</div>
                      <div className="text-sm text-gray-600">Satisfacción</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-xl p-8 text-center"
          >
            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Suscripción Exitosa!</h2>
            <p className="text-gray-600 mb-8">
              Gracias por suscribirte a nuestro newsletter. Recibirás contenido legal de calidad 
              directamente en tu correo electrónico.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                <strong>Email:</strong> {email}
              </p>
              <p className="text-blue-800 mt-2">
                <strong>Temas seleccionados:</strong> {selectedTopics.length} temas
              </p>
            </div>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Modificar suscripción
            </button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <NewspaperIcon className="h-6 w-6 mr-2 text-blue-600" />
            Newsletters Recientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNewsletters.map((newsletter, index) => (
              <motion.div
                key={newsletter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{newsletter.date}</span>
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  <span>{newsletter.readers} lectores</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {newsletter.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {newsletter.summary}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsletterPage;
