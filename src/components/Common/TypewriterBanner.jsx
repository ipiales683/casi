import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const TypewriterBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white text-2xl md:text-3xl font-bold mb-4"
          >
            Asesoría Legal Profesional en Ecuador
          </motion.h2>

          <p className="text-blue-100 text-base md:text-lg mb-4">
            <TypeAnimation
              sequence={[
                'Defensa Penal estratégica y efectiva', 1800,
                'Consultas y Patrocinio en Derecho Civil', 1800,
                'Impugnación de Multas y Tránsito', 1800,
                'Acciones Constitucionales y Garantías', 1800,
                'Contratos Comerciales y Asesoría Empresarial', 1800,
              ]}
              wrapper="span"
              speed={55}
              deletionSpeed={70}
              repeat={Infinity}
              cursor={true}
              className="font-semibold"
            />
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a href="/consulta-general" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-blue-700 font-semibold shadow hover:shadow-lg transition">
              Solicitar Consulta
            </a>
            <a href="/servicios" className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/10 text-white font-semibold border border-white/30 hover:bg-white/20 transition">
              Ver Servicios
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TypewriterBanner;
