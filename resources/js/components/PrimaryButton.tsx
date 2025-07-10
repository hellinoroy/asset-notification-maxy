
import React from 'react';

export default function PrimaryButton({ children, onClick, type = 'button', className = '' }: any) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`focus:ring-opacity-50 w-full rounded-lg bg-[#0600d4] py-3 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-[#0500a0] focus:ring-2 focus:ring-[#0600d4] focus:outline-none ${className}`}
        >
            {children}
        </button>
    );
}

