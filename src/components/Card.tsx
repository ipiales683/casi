import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-6 h-full transition-all duration-300 ${onClick ? 'hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;