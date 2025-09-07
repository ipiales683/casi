import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  DocumentTextIcon,
  UserIcon,
  LockClosedIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: 'Información que Recopilamos',
      icon: <UserIcon className="h-6 w-6" />,
      content: [
        'Información personal: nombre, dirección de correo electrónico, número de teléfono',
        'Información profesional: empresa, cargo, área de especialización legal',
        'Datos de navegación: dirección IP, tipo de navegador, páginas visitadas',
        'Cookies y tecnologías similares para mejorar la experiencia del usuario'
      ]
    },
    {
      title: 'Cómo Utilizamos su Información',
      icon: <InformationCircleIcon className="h-6 w-6" />,
      content: [
        'Proporcionar servicios legales personalizados y de calidad',
        'Comunicarnos sobre consultas, citas y servicios contratados',
        'Enviar actualizaciones legales y contenido educativo relevante',
        'Mejorar nuestros servicios basándonos en su feedback',
        'Cumplir con obligaciones legales y regulatorias'
      ]
    },
    {
      title: 'Protección de Datos',
      icon: <LockClosedIcon className="h-6 w-6" />,
      content: [
        'Utilizamos encriptación SSL para proteger la transmisión de datos',
        'Almacenamiento seguro en servidores con medidas de seguridad avanzadas',
        'Acceso restringido a información personal solo a personal autorizado',
        'Auditorías regulares de seguridad y actualización de protocolos',
        'Cumplimiento con estándares internacionales de protección de datos'
      ]
    },
    {
      title: 'Compartir Información',
      icon: <DocumentTextIcon className="h-6 w-6" />,
      content: [
        'No vendemos, alquilamos o compartimos información personal con terceros',
        'Podemos compartir datos con proveedores de servicios bajo estricta confidencialidad',
        'Divulgación solo cuando sea requerido por ley o autoridad competente',
        'En caso de fusión o adquisición, notificaremos sobre cambios en la política'
      ]
    },
    {
      title: 'Sus Derechos',
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      content: [
        'Derecho a acceder y conocer qué información personal tenemos',
        'Derecho a rectificar o actualizar datos incorrectos o incompletos',
        'Derecho a solicitar la eliminación de su información personal',
        'Derecho a limitar el procesamiento de sus datos',
        'Derecho a la portabilidad de datos en formato estructurado'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <ShieldCheckIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Su privacidad es fundamental para nosotros. Conozca cómo protegemos y utilizamos su información.
            </p>
            <div className="text-sm text-blue-200">
              Última actualización: Enero 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-lg text-gray-700 leading-relaxed">
              En <strong>Abg. Wilson Alexander Ipiales Guerron</strong>, nos comprometemos a proteger la privacidad 
              y confidencialidad de nuestros clientes. Esta Política de Privacidad describe cómo recopilamos, 
              utilizamos, protegemos y compartimos su información personal cuando utiliza nuestros servicios 
              legales y visita nuestro sitio web.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-4">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Contacto para Asuntos de Privacidad
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Información de Contacto</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Email:</strong> privacidad@abogadowilson.com</p>
                  <p><strong>Teléfono:</strong> +593 988 835 269</p>
                  <p><strong>Dirección:</strong> Juan José Flores 4-73 y Vicente Rocafuerte, Ibarra, Ecuador</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Horario de Atención</h3>
                <div className="space-y-2 text-gray-600">
                  <p><strong>Lunes a Viernes:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Sábados:</strong> 9:00 AM - 2:00 PM</p>
                  <p><strong>Emergencias:</strong> 24/7 para casos urgentes</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Aviso Legal</h3>
            <p className="text-blue-100">
              Esta Política de Privacidad puede actualizarse periódicamente. Las modificaciones 
              entrarán en vigor inmediatamente después de su publicación en nuestro sitio web. 
              Le recomendamos revisar esta política regularmente para mantenerse informado sobre 
              cómo protegemos su información.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
