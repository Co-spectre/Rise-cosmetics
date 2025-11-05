import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'dark'
}) => {
  const sizeClasses = {
    sm: 'w-16 h-8 sm:w-20 sm:h-10',
    md: 'w-20 h-10 sm:w-28 sm:h-12',
    lg: 'w-24 h-12 sm:w-36 sm:h-16'
  };

  const colorClasses = {
    light: 'text-white',
    dark: 'text-stone-800'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center`}>
      <div className={`${colorClasses[variant]} text-center`}>
        <span className="font-playfair font-light tracking-wide text-base sm:text-lg lg:text-2xl">
          RISE
        </span>
      </div>
    </div>
  );
};

export default Logo;
