import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/smooth-transitions.css';

// Simple, dependency-free page transition using CSS animations
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="min-h-screen animate-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;
