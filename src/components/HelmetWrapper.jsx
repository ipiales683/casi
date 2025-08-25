import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

export const HelmetWrapper = ({ children }) => {
  return (
    <HelmetProvider context={helmetContext}>
      {children}
    </HelmetProvider>
  );
};

export default HelmetWrapper;
