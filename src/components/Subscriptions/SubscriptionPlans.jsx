import React from 'react';
import { FaCheck, FaCrown, FaStar, FaRocket } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'plan-normal',
    name: 'Normal',
    price: 29.99,
    period: 'mes',
    features: [
      'Consultas Básicas del Consejo de la Judicatura',
      'Consultas de servicios del SRI',
      'Sesiones básicas de asesoría legal (2 por mes)',
      'Acceso al Blog Legal con artículos actualizados',
      'Notificaciones de actualizaciones legales'
    ],
    badge: null,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'plan-intermedio',
    name: 'Intermedio',
    price: 49.99,
    period: 'mes',
    features: [
      'Consultas de causas penales y civiles',
      'Consultas de multas de tránsito',
      'Sesiones avanzadas de asesoría legal (4 por mes)',
      'Acceso a cursos y eBooks legales premium',
      'Descuentos en servicios adicionales',
      'Acceso al Blog Legal con contenido exclusivo'
    ],
    badge: 'Más Popular',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    price: 99.99,
    period: 'mes',
    features: [
      'Acceso ilimitado a todas las consultas disponibles',
      'Sesiones premium de asesoría legal (8 por mes)',
      'Acceso completo a biblioteca de cursos y eBooks',
      'NFTs y servicios Blockchain exclusivos',
      'Redacción ilimitada de certificados y documentos',
      'Prioridad en atención al cliente 24/7',
      'Acceso VIP al Blog Legal'
    ],
    badge: 'Premium',
    color: 'from-amber-500 to-rose-600'
  }
];

const SubscriptionPlans = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    addToCart({
      id: plan.id,
      name: `Suscripción ${plan.name}`,
      price: plan.price,
      type: 'subscription',
      category: 'suscripcion',
      description: `${plan.name} ${plan.price}/${plan.period}`,
      recurring: { interval: 'month', amount: plan.price }
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Planes de Suscripción
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Elija el plan que mejor se adapte a sus necesidades legales y obtenga acceso a nuestros servicios de consultoría y asesoría continua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              {plan.badge && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              <div className={`h-2 bg-gradient-to-r ${plan.color}`} />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  {plan.name === 'Premium' ? (
                    <FaCrown className="text-amber-400" />
                  ) : plan.name === 'Intermedio' ? (
                    <FaStar className="text-purple-500" />
                  ) : (
                    <FaRocket className="text-blue-500" />
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <FaCheck className="mt-1 text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan)}
                  className="mt-6 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transition-all"
                >
                  Comenzar Ahora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
