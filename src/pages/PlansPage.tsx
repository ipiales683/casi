import React from 'react';
import Card from '../components/Card';
import { CheckIcon } from '../components/icons/InterfaceIcons';
import { Page, PublicRoute, Plan } from '../types';

const plansData: Plan[] = [
    {
        id: 'plan_basic',
        name: 'Básico',
        price: 49,
        priceDetails: '/mes',
        description: 'Ideal para consultas puntuales y acceso a recursos esenciales.',
        features: ['2 consultas virtuales al mes', 'Acceso a artículos del blog', 'Soporte por email'],
        cta: 'Suscribirse',
    },
    {
        id: 'plan_profesional',
        name: 'Profesional',
        price: 99,
        priceDetails: '/mes',
        description: 'Asesoría continua para profesionales y pequeñas empresas.',
        features: ['Consultas virtuales ilimitadas', 'Descuentos en procesos judiciales', 'Revisión de 2 documentos/mes', 'Soporte prioritario'],
        isFeatured: true,
        cta: 'Elegir Profesional',
    },
    {
        id: 'plan_empresarial',
        name: 'Empresarial',
        price: 199,
        priceDetails: '/mes',
        description: 'Solución integral para empresas que requieren asesoría legal permanente.',
        features: ['Todo en Profesional', 'Asesoría jurídica permanente', 'Representación en procesos menores', 'Acceso a todos los cursos'],
        cta: 'Elegir Empresarial',
    },
    {
        id: 'plan_vip',
        name: 'VIP',
        price: 299,
        priceDetails: '/mes',
        description: 'Servicio exclusivo con un gestor legal personal para todas sus necesidades.',
        features: ['Todo en Empresarial', 'Gestor legal personal asignado', 'Soporte 24/7 vía WhatsApp', 'Consultas presenciales incluidas'],
        cta: 'Contactar para VIP',
    },
];


const PlanCard: React.FC<{
  plan: Plan;
  onNavigate: (page: Page | PublicRoute | string, payload?: any) => void;
}> = ({ plan, onNavigate }) => (
  <div className={`flex flex-col rounded-2xl shadow-lg transition-all duration-300 ${plan.isFeatured ? 'border-2 border-[var(--accent-color)] scale-105 bg-[var(--card)] shadow-[var(--accent-color)]/20 shadow-2xl' : 'bg-[var(--card)] border border-[var(--border)]'}`}>
    <div className="p-6">
      <h3 className={`text-2xl font-semibold ${plan.isFeatured ? "text-[var(--accent-color)]" : ""}`}>{plan.name}</h3>
      <p className="mt-2 text-[var(--muted-foreground)] h-10">{plan.description}</p>
      <p className="mt-6">
        <span className="text-4xl font-extrabold">${plan.price}</span>
        <span className="text-base font-medium text-[var(--muted-foreground)]">{plan.priceDetails}</span>
      </p>
      <button
        onClick={() => onNavigate('checkout', { item: { ...plan, name: `Suscripción ${plan.name}` }, itemType: 'plan' })}
        className={`mt-6 block text-center w-full px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium transition-transform hover:scale-[1.03] ${
          plan.isFeatured
            ? 'text-[var(--primary-foreground)] bg-[var(--primary)] hover:opacity-90'
            : `text-[var(--accent-color)] bg-[var(--accent-color)]/10 hover:bg-[var(--accent-color)]/20`
        }`}
      >
        {plan.cta}
      </button>
    </div>
    <div className="p-6 border-t border-[var(--border)] flex-grow">
      <h4 className="text-sm font-medium text-[var(--muted-foreground)] uppercase tracking-wider">Incluye:</h4>
      <ul className="mt-4 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex space-x-3">
            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
            <span className="text-sm text-[var(--muted-foreground)]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

interface PlansPageProps {
  onNavigate: (page: Page | PublicRoute | string, payload?: any) => void;
}

const PlansPage: React.FC<PlansPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 lg:py-20">
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl font-serif">
          Planes de Asesoría Legal a tu Medida
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-[var(--muted-foreground)]">
          Accede a asesoría legal experta de forma continua con nuestros planes de suscripción.
        </p>
      </div>
      <div className="grid max-w-screen-xl mx-auto gap-8 lg:grid-cols-4 items-start mt-16 px-4">
        {plansData.map(plan => (
            <PlanCard key={plan.id} plan={plan} onNavigate={onNavigate} />
        ))}
      </div>
    </div>
  );
};

export default PlansPage;
