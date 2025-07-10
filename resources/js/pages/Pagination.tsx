// resources/js/Components/Pagination.tsx
import { Link } from '@inertiajs/react';

interface LinkData {
    url: string | null;
    label: string;
    active: boolean;
}

export default function Pagination({ links }: { links: LinkData[] }) {
    if (links.length <= 3) return null; // Jangan tampilkan jika tidak ada halaman lain

    return (
        <nav className="flex items-center justify-center pt-4">
            {links.map((link, index) => (
                <Link
                    key={index}
                    preserveScroll // Jaga posisi scroll saat pindah halaman
                    href={link.url || '#'}
                    className={`mx-1 rounded-md px-3 py-1.5 text-sm ${
                        link.active ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-200'
                    } ${!link.url && 'cursor-not-allowed text-gray-400'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
