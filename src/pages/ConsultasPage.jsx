import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import {
  ChatBubbleLeftRightIcon,
  ScaleIcon,
  ShieldCheckIcon,
  TruckIcon,
  BookOpenIcon,
  BoltIcon,
  CheckCircleIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';

const consultas = [
  {
    id: 'consulta-general',
    title: 'Consulta General',
    description: 'Asesoría legal general para resolver dudas y orientar su caso.',
    price: 25,
    features: [
      'Duración 30 minutos',
      'Evaluación preliminar',
      'Recomendaciones inmediatas'
    ],
    color: 'from-blue-500 to-blue-600',
    icon: <ChatBubbleLeftRightIcon className="h-7 w-7" />,
    link: '/consulta-general'
  },
  {
    id: 'consulta-civil',
    title: 'Consulta Civil',
    description: 'Contratos, familia, herencias, arrendamientos y más.',
    price: 30,
    features: [
      'Análisis de documentos',
      'Revisión de opciones',
      'Plan de acción'
    ],
    color: 'from-green-500 to-green-600',
    icon: <ScaleIcon className="h-7 w-7" />,
    link: '/servicios/civil'
  },
  {
    id: 'consulta-penal',
    title: 'Consulta Penal',
    description: 'Defensa penal, diligencias urgentes y estrategias iniciales.',
    price: 35,
    features: [
      'Análisis de hechos',
      'Riesgos y escenarios',
      'Estrategia de defensa'
    ],
    color: 'from-red-500 to-red-600',
    icon: <ShieldCheckIcon className="h-7 w-7" />,
    link: '/servicios/penal'
  },
  {
    id: 'consulta-transito',
    title: 'Consulta de Tránsito',
    description: 'Multas, contravenciones, accidentes y licencias.',
    price: 25,
    features: [
      'Impugnación de multas',
      'Orientación tras accidente',
      'Recuperación de licencias'
    ],
    color: 'from-orange-500 to-orange-600',
    icon: <TruckIcon className="h-7 w-7" />,
    link: '/servicios/transito'
  },
  {
    id: 'consulta-constitucional',
    title: 'Consulta Constitucional',
    description: 'Acción de protección, hábeas corpus, hábeas data.',
    price: 40,
    features: [
      'Viabilidad de la garantía',
      'Medidas cautelares',
      'Ruta procesal'
    ],
    color: 'from-indigo-500 to-indigo-600',
    icon: <BookOpenIcon className="h-7 w-7" />,
    link: '/servicios/constitucional'
  },
  {
    id: 'consulta-express',
    title: 'Consulta Express 24h',
    description: 'Atención prioritaria y respuesta en menos de 24 horas.',
    price: 35,
    features: [
      'Prioridad 24h',
      'Revisión rápida',
      'Siguientes pasos claros'
    ],
    color: 'from-purple-500 to-purple-600',
    icon: <BoltIcon className="h-7 w-7" />,
    link: '/consulta-general'
  }
];

const ConsultasPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (c) => {
    addToCart({
      id: c.id,
      name: c.title,
      price: c.price,
      type: 'consulta',
      category: 'consultas',
      description: c.description
    });
    toast.success(`${c.title} agregada al carrito`);
  };

  const handleBuyNow = (c) => {
    handleAddToCart(c);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
      <section className="relative bg-gradient-to-r from-sky-700 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Consultas Legales</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Elija el tipo de consulta y proceda a contratar en línea. Reciba orientación profesional y clara.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultas.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${c.color}`} />
              <div className="p-6">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${c.color} text-white mb-4`}>
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{c.title}</h3>
                <p className="text-gray-600 mb-3">{c.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">${c.price}</span>
                  <span className="text-sm text-gray-500 ml-1">/ sesión</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {c.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(c)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" /> Agregar
                  </button>
                  <button
                    onClick={() => handleBuyNow(c)}
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Comprar Ahora
                  </button>
                </div>
                <div className="mt-4">
                  <Link to={c.link} className="text-xs text-blue-600 hover:text-blue-800">Más información</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsultasPage;
