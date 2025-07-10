// resources/js/Pages/Aset/Create.tsx

import { PageProps } from '@/types';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

// Komponen Input Label Sederhana
const InputLabel = ({
    value,
    className = '',
    children,
    ...props
}: {
    value: string;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}) => (
    <label {...props} className={`block text-sm font-medium text-gray-700 ` + className}>
        {value ? value : children}
    </label>
);

// Komponen Text Input Sederhana
const TextInput = ({ className = '', ...props }: { className?: string; [key: string]: any }) => (
    <input {...props} className={'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' + className} />
);

// Tipe untuk data formulir
interface FormData {
    id: string;
    nama_aset: string;
    tanggal_beli: string;
    keterangan: string;
    [key: string]: any;
}

export default function Create({ auth }: PageProps) {
    // Inisialisasi form dengan useForm dari Inertia
    const { data, setData, post, processing, errors } = useForm<FormData>({
        id: '',
        nama_aset: '',
        tanggal_beli: '',
        keterangan: '',
    });

    // Fungsi untuk menangani submit form
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('assets.store')); // Kirim data ke route 'assets.store'
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Tambah Aset" />

            <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md md:p-8">
                {/* Header Form */}
                <div className="mb-6 flex items-center">
                    <Link href={route('dashboard')} className="mr-4 rounded-full p-2 hover:bg-gray-100">
                        <ArrowLeftIcon className="h-5 w-5 text-gray-800" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Tambahkan Aset Baru</h1>
                </div>

                {/* Form */}
                <form onSubmit={submit} className="space-y-6">
                    {/* ID Aset */}
                    <div>
                        <InputLabel htmlFor="id" value="ID" />
                        <TextInput
                            id="id"
                            name="id"
                            value={data.id}
                            className="mt-1 block w-full"
                            placeholder="Nomor ID ..."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('id', e.target.value)}
                        />
                        {errors.id && <p className="mt-2 text-sm text-red-600">{errors.id}</p>}
                    </div>

                    {/* Nama Aset */}
                    <div>
                        <InputLabel htmlFor="nama_aset" value="Nama Asset" />
                        <TextInput
                            id="nama_aset"
                            name="nama_aset"
                            value={data.nama_aset}
                            className="mt-1 block w-full"
                            placeholder="Nama Asset"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('nama_aset', e.target.value)}
                        />
                        {errors.nama_aset && <p className="mt-2 text-sm text-red-600">{errors.nama_aset}</p>}
                    </div>

                    {/* Tanggal Beli */}
                    <div>
                        <InputLabel htmlFor="tanggal_beli" value="Tanggal Beli" />
                        <TextInput
                            id="tanggal_beli"
                            type="date"
                            name="tanggal_beli"
                            value={data.tanggal_beli}
                            className="mt-1 block w-full"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('tanggal_beli', e.target.value)}
                        />
                        {errors.tanggal_beli && <p className="mt-2 text-sm text-red-600">{errors.tanggal_beli}</p>}
                    </div>

                    {/* Keterangan */}
                    <div>
                        <InputLabel htmlFor="keterangan" value="Keterangan" />
                        <TextInput
                            id="keterangan"
                            name="keterangan"
                            value={data.keterangan}
                            className="mt-1 block w-full"
                            placeholder="Masukan Keterangan"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('keterangan', e.target.value)}
                        />
                        {errors.keterangan && <p className="mt-2 text-sm text-red-600">{errors.keterangan}</p>}
                    </div>

                    {/* Tombol Kirim */}
                    <div className="flex items-center pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-700 px-4 py-3 font-bold text-white hover:bg-blue-800 disabled:opacity-50"
                            disabled={processing}
                        >
                            Kirim
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
