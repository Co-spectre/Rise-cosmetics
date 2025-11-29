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
      <div className={`${colorClasses[variant]} text-center flex flex-col items-center leading-tight`}>
        <span className="font-playfair font-light tracking-wide text-base sm:text-lg lg:text-2xl">
          RISE
        </span>
        <span className="font-light tracking-[0.25em] uppercase text-[8px] sm:text-[9px] lg:text-[10px] opacity-80 -mt-0.5">
          Cosmetics
        </span>
      </div>
    </div>
  );
};

export default Logo;
