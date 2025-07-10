import React from 'react';

const AuthFormContainer = ({ children, imageUrl }) => {
  return (
    // Memastikan penggunaan mx-auto untuk pemusatan horizontal yang tepat
    // Menggunakan max-w-6xl seperti yang Anda sebutkan di kueri terbaru
    // Mengubah my-8 menjadi my-12 untuk menggeser ke bawah sedikit
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl w-full mx-auto my-13">
      {/* Bagian Kiri: Gambar Ilustrasi */}
      <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-50">
        <img
          src={imageUrl}
          alt="Ilustrasi Selamat Datang"
          className="max-w-full h-auto object-contain"
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/e0e0e0/333333?text=Ilustrasi'; }} // Fallback
        />
      </div>

      {/* Bagian Kanan: Form Konten */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthFormContainer;
