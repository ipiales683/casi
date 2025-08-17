import React from 'react';
import { 
  ScaleIcon, 
  AcademicCapIcon, 
  TrophyIcon, 
  UserGroupIcon,
  ClockIcon,
  ShieldCheckIcon,
  HeartIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  const stats = [
    { name: 'Años de Experiencia', value: '15+', icon: ClockIcon },
    { name: 'Casos Exitosos', value: '1,200+', icon: TrophyIcon },
    { name: 'Clientes Satisfechos', value: '850+', icon: UserGroupIcon },
    { name: 'Áreas de Práctica', value: '8', icon: ScaleIcon },
  ];

  const values = [
    {
      name: 'Profesionalismo',
      description: 'Brindamos servicios legales de la más alta calidad con ética profesional y dedicación.',
      icon: ShieldCheckIcon,
    },
    {
      name: 'Compromiso',
      description: 'Nos comprometemos completamente con cada caso, trabajando incansablemente por nuestros clientes.',
      icon: HeartIcon,
    },
    {
      name: 'Experiencia',
      description: 'Contamos con más de 15 años de experiencia en todas las áreas del derecho ecuatoriano.',
      icon: AcademicCapIcon,
    },
    {
      name: 'Resultados',
      description: 'Nos enfocamos en obtener los mejores resultados para nuestros clientes de manera eficiente.',
      icon: TrophyIcon,
    },
  ];

  const team = [
    {
      name: 'Dr. Wilson Abogado',
      role: 'Socio Fundador y Director',
      education: 'Doctor en Jurisprudencia - Universidad Central del Ecuador',
      specialties: ['Derecho Civil', 'Derecho Penal', 'Derecho Comercial'],
      experience: '15 años de experiencia',
      description: 'Especialista en derecho civil y penal con amplia trayectoria en litigios complejos.',
    },
    {
      name: 'Dra. María González',
      role: 'Socia - Derecho Laboral',
      education: 'Máster en Derecho Laboral - Universidad San Francisco de Quito',
      specialties: ['Derecho Laboral', 'Seguridad Social'],
      experience: '12 años de experiencia',
      description: 'Experta en resolución de conflictos laborales y asesoría en recursos humanos.',
    },
    {
      name: 'Dr. Carlos Mendoza',
      role: 'Asociado Senior - Derecho Corporativo',
      education: 'LLM en Derecho Corporativo - Pontificia Universidad Javeriana',
      specialties: ['Derecho Societario', 'Fusiones y Adquisiciones'],
      experience: '8 años de experiencia',
      description: 'Especializado en asesoría corporativa y transacciones comerciales complejas.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Sobre Wilson Legal Pro
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            Somos un bufete de abogados especializado en brindar soluciones legales integrales 
            con más de 15 años de experiencia al servicio de nuestros clientes en Ecuador.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.name} className="bg-gray-50 dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <item.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {item.name}
                        </dt>
                        <dd className="text-lg font-medium text-gray-900 dark:text-white">
                          {item.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Nuestra Misión
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500 dark:text-gray-400">
                Brindar servicios legales de excelencia, defendiendo los derechos de nuestros clientes 
                con profesionalismo, ética y compromiso. Nos especializamos en ofrecer soluciones 
                jurídicas efectivas que protejan los intereses de personas naturales y empresas.
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nuestra Visión</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Ser reconocidos como el bufete de abogados líder en Ecuador, destacando por la 
                  calidad de nuestros servicios, la innovación en nuestras prácticas y el 
                  compromiso inquebrantable con la justicia.
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="aspect-w-5 aspect-h-3 lg:aspect-w-6 lg:aspect-h-4">
                <div className="bg-blue-600 rounded-lg flex items-center justify-center">
                  <BuildingOfficeIcon className="h-32 w-32 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Nuestros Valores
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              Los principios que guían nuestro trabajo diario
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name} className="pt-6">
                <div className="flow-root bg-gray-50 dark:bg-gray-800 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
                      {value.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Nuestro Equipo
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4">
              Profesionales altamente capacitados y comprometidos con la excelencia
            </p>
          </div>
          <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {team.map((person) => (
              <div key={person.name} className="flex flex-col bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                <div className="flex-1 px-6 py-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{person.name}</p>
                      <p className="text-base text-blue-600 dark:text-blue-400">{person.role}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{person.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <strong>Educación:</strong> {person.education}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        <strong>Experiencia:</strong> {person.experience}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {person.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Necesitas asesoría legal?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-100">
            Contáctanos hoy mismo para una consulta gratuita y descubre cómo podemos ayudarte.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition-colors"
            >
              Contactar Ahora
            </a>
            <a
              href="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-500 transition-colors"
            >
              Ver Servicios
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
