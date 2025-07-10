import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
                {title && <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">{title}</h2>}
                {description && <p className="mb-6 text-center text-sm text-gray-500">{description}</p>}
                {children}
            </div>
        </div>
    );
}
