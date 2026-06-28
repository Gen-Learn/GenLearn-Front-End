import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({ children, className = '', variant = 'default', hover = true, onClick }: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-100 shadow-soft',
    glass: 'bg-white/80 backdrop-blur-xl border border-white/30 shadow-glass',
    gradient: 'bg-gradient-to-br from-white to-gray-50/80 border border-gray-100 shadow-soft',
  };

  const hoverStyles = hover ? 'hover:shadow-soft-lg hover:-translate-y-1' : '';
  const clickableStyles = onClick ? 'cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl p-6 transition-all duration-300 ${variants[variant]} ${hoverStyles} ${clickableStyles} ${className}`}
    >
      {children}
    </div>
  );
}
