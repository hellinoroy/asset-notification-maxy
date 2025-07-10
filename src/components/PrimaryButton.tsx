import React, { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-[#0600d4] text-white py-3 rounded-lg font-semibold text-lg
        hover:bg-[#0500a0] focus:outline-none focus:ring-2 focus:ring-[#0600d4] focus:ring-opacity-50
        transition-colors duration-200 shadow-md ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
