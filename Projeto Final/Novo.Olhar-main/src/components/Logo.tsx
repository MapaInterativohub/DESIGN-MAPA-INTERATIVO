
import React from 'react';
import { Heart, Shield } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", showText = true }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative h-10 w-10 bg-gradient-to-r from-rose-200 to-pink-200 rounded-full flex items-center justify-center shadow-sm">
        <Shield className="h-5 w-5 text-rose-500 absolute" />
        <Heart className="h-3 w-3 text-rose-600 relative z-10" />
      </div>
      {showText && (
        <span className="ml-3 text-xl font-semibold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
          Novo Olhar
        </span>
      )}
    </div>
  );
};

export default Logo;
