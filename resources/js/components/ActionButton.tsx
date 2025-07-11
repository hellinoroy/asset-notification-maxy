import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  icon?: LucideIcon;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  onClick,
  type = 'button',
  icon: Icon,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center px-4 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200
                  ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
};

export default ActionButton;