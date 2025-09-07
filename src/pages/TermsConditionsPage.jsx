import React from 'react';
import { motion } from 'framer-motion';
import { 
  DocumentTextIcon, 
  ScaleIcon, 
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const TermsConditionsPage = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'Aceptación de Términos',
      icon: CheckCircleIcon,
      content: [
        'Al acceder y utilizar nuestros servicios legales, usted acepta estar sujeto a estos términos y condiciones.',
        'Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestros servicios.',
        'Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso.'
      ]
    },
    {
      id: 'services',
      title: 'Descripción de Servicios',
      icon: ScaleIcon,
      content: [
        'Ofrecemos servicios de consultoría legal en áreas civiles, penales, laborales y comerciales.',
        'Los servicios incluyen asesoramiento, representación legal, y elaboración de documentos jurídicos.',
        'No garantizamos resultados específicos en procesos legales.',
        'Todos los servicios están sujetos a las leyes aplicables de Colombia.'
      ]
    },
    {
      id: 'obligations',
      title: 'Obligaciones del Usuario',
      icon: DocumentTextIcon,
      content: [
        'Proporcionar información veraz y completa sobre su caso.',
        'Cumplir con los pagos acordados en los plazos establecidos.',
        'Colaborar activamente en el desarrollo de su proceso legal.',
        'Mantener la confidencialidad de la información estratégica compartida.'
      ]
    },
    {
      id: 'payments',
      title: 'Pagos y Facturación',
      icon: InformationCircleIcon,
      content: [
        'Los honorarios se establecen según la complejidad del caso y el tiempo estimado.',
        'Se requiere un anticipo del 50% antes de iniciar cualquier servicio.',
        'Los pagos pueden realizarse mediante transferencia bancaria, tarjeta de crédito o efectivo.',
        'Los gastos adicionales (notariales, judiciales, etc.) corren por cuenta del cliente.'
      ]
    },
    {
      id: 'confidentiality',
      title: 'Confidencialidad',
      icon: ShieldCheckIcon,
      content: [
        'Toda información compartida está protegida por el secreto profesional.',
        'No divulgaremos información confidencial sin autorización expresa del cliente.',
        'Los documentos y comunicaciones están protegidos por privilegio abogado-cliente.',
        'Mantenemos altos estándares de seguridad en el manejo de información.'
      ]
    },
    {
      id: 'limitations',
      title: 'Limitaciones de Responsabilidad',
      icon: ExclamationTriangleIcon,
      content: [
        'Nuestra responsabilidad se limita al monto de los honorarios pagados por el cliente.',
        'No somos responsables por decisiones judiciales adversas o cambios en la legislación.',
        'El cliente asume todos los riesgos inherentes a los procesos legales.',
        'No garantizamos tiempos específicos para resoluciones judiciales.'
      ]
    }
  ];

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
              <DocumentTextIcon className="h-8 w-8 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conoce los términos que rigen nuestros servicios legales y las condiciones 
              de uso de nuestra plataforma
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
        >
          <div className="flex items-start">
            <InformationCircleIcon className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Información Importante
              </h3>
              <p className="text-blue-800">
                Estos términos y condiciones fueron actualizados por última vez el 1 de enero de 2024.
                Al utilizar nuestros servicios, confirma que ha leído, entendido y acepta estos términos.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <h2 className="ml-3 text-xl font-semibold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                </div>
                <div className="px-6 py-6">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">¿Tienes Preguntas?</h2>
          <p className="text-blue-100 mb-6">
            Si tienes alguna duda sobre estos términos y condiciones, no dudes en contactarnos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contactar Abogado
            </a>
            <a
              href="mailto:legal@bufeteabogados.com"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Enviar Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
