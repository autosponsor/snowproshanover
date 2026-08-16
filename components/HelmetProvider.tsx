import React from 'react';

export const HelmetProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  // Minimal local shim for react-helmet-async's HelmetProvider to avoid adding the external
  // dependency (which conflicts with React 19). Replace with a real implementation if needed.
  return <>{children}</>;
};
