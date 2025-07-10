import React, { ReactNode } from 'react';

interface AuthFormContainerProps {
  children: ReactNode;
  imageUrl: string;
}

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({ children, imageUrl }) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full mx-auto my-13">
      {/* Gambar kiri */}
      <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <img
          src={imageUrl}
          alt="Ilustrasi Selamat Datang"
          className="max-w-full h-auto object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://placehold.co/400x400/e0e0e0/333333?text=Ilustrasi';
          }}
        />
      </div>

      {/* Form kanan */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
