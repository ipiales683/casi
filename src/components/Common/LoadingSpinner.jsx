import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 z-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-24 h-24 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">AW</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          Abogado Wilson
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Cargando aplicación...
        </p>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500 mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
