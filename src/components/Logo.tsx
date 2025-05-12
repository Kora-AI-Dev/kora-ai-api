import React from 'react';
import { Brain } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`${className} flex items-center justify-center bg-indigo-600 rounded-md text-white`}>
      <Brain className="h-4/6 w-4/6" />
    </div>
  );
};

export default Logo;