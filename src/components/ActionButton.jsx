import React from 'react';

const ActionButton = ({ children, onClick, type = 'button', icon: Icon, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      // Menyesuaikan kelas Tailwind CSS agar sesuai dengan desain gambar
      className={`flex items-center justify-center px-4 py-2  text-gray-800 border border-gray-300 rounded-lg shadow-sm
                  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200
                  ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />} {/* Render ikon jika ada */}
      {children} {/* Teks tombol */}
    </button>
  );
};

export default ActionButton;
