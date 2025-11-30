
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ThemeCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  color: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ title, description, icon: Icon, link, color }) => {
  return (
    <Link
      to={link}
      className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative p-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br ${color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-4">
          {description}
        </p>
        
        <div className="flex items-center text-rose-600 font-medium group-hover:text-rose-700">
          <span>Explorar</span>
          <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default ThemeCard;
