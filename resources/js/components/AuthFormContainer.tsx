import React from 'react';

export default function AuthFormContainer({ children, imageUrl }: any) {
    return (
        // Memastikan penggunaan mx-auto untuk pemusatan horizontal yang tepat
        // Menggunakan max-w-6xl seperti yang Anda sebutkan di kueri terbaru
        // Mengubah my-8 menjadi my-12 untuk menggeser ke bawah sedikit
        <div className="mx-auto my-13 flex w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-xl md:flex-row">
            {/* Bagian Kiri: Gambar Ilustrasi */}
            <div className="flex items-center justify-center bg-gray-50 p-8 md:w-1/2">
                <img
                    src={imageUrl}
                    alt="Ilustrasi Selamat Datang"
                    className="h-auto max-w-full object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null; // Prevent infinite loop if fallback image also fails
                        e.currentTarget.src = 'https://placehold.co/400x400/e0e0e0/333333?text=Ilustrasi'; // Fallback
                    }}
                />
            </div>

            {/* Bagian Kanan: Form Konten */}
            <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">{children}</div>
        </div>
    );
}
