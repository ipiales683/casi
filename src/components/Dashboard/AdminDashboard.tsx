import React, { useState } from 'react';
import { 
  UsersIcon, 
  CurrencyDollarIcon, 
  DocumentTextIcon, 
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
  ShoppingCartIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    { name: 'Clientes Activos', value: '1,234', icon: UsersIcon, color: 'bg-blue-500', change: '+12%' },
    { name: 'Ingresos del Mes', value: '$45,678', icon: CurrencyDollarIcon, color: 'bg-green-500', change: '+8.2%' },
    { name: 'Casos Activos', value: '89', icon: DocumentTextIcon, color: 'bg-purple-500', change: '+5%' },
    { name: 'Citas Programadas', value: '23', icon: CalendarIcon, color: 'bg-orange-500', change: '+15%' }
  ];

  const quickActions = [
    { name: 'Nuevo Cliente', icon: PlusIcon, href: '/clients/new', color: 'bg-blue-500' },
    { name: 'Nueva Cita', icon: CalendarIcon, href: '/calendar/new', color: 'bg-green-500' },
    { name: 'Nuevo Producto', icon: PlusIcon, href: '/products/new', color: 'bg-purple-500' },
    { name: 'Nuevo Curso', icon: BookOpenIcon, href: '/courses/new', color: 'bg-orange-500' },
    { name: 'Gestionar Blog', icon: DocumentTextIcon, href: '/blog/manage', color: 'bg-indigo-500' },
    { name: 'Configuración', icon: CogIcon, href: '/settings', color: 'bg-gray-500' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <p className="text-gray-600">Panel de control completo para gestión del sistema legal</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          <PlusIcon className="w-5 h-5 inline mr-2" />
          Acción Rápida
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-600 ml-1">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-center"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform mx-auto`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm">
                {action.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
