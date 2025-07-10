import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AuthenticatedLayout from '../../layouts/AuthenticatedLayout';

// Tipe untuk data user yang datang dari 'auth' prop
interface User {
    name: string;
    email: string;
    avatar: string;
}

// Tipe untuk 'auth' prop
interface AuthProps {
    user: User;
}

// Tipe untuk data di dalam form
interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    avatar: File | null;

    [key: string]: any;
}

export default function Edit({ auth }: { auth: AuthProps }) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        first_name: 'Killian',
        last_name: 'James',
        email: auth.user.email,
        avatar: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Logika untuk mengirim form (misalnya post(route('profile.update')))
        console.log(data);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="mx-auto max-w-4xl">
                {/* Profile Header */}
                <div
                    className="relative h-48 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: "url('https://placehold.co/1200x400/8e54e9/ffffff?text=.')" }}
                >
                    <div className="absolute bottom-0 left-6 translate-y-1/2 transform">
                        <img className="h-24 w-24 rounded-full border-4 border-white" src={auth.user.avatar} alt="User" />
                    </div>
                    <div className="absolute top-4 right-4 space-x-2">
                        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">Cancel</button>
                        <button onClick={submit} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Save
                        </button>
                    </div>
                </div>

                <div className="mt-16 rounded-lg bg-white p-6 shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <a href="#" className="border-b-2 border-blue-500 px-1 py-4 text-sm font-medium whitespace-nowrap text-blue-600">
                                My details
                            </a>
                            <a
                                href="#"
                                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                Profile
                            </a>
                            <a
                                href="#"
                                className="border-b-2 border-transparent px-1 py-4 text-sm font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
                            >
                                Password
                            </a>
                        </nav>
                    </div>

                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                                    First name
                                </label>
                                <input
                                    id="first_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                                    Last name
                                </label>
                                <input
                                    id="last_name"
                                    type="text"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                                value={data.email}
                                readOnly
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Avatar</label>
                            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:outline-none hover:text-blue-500"
                                        >
                                            <span>Click to upload</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={(e) => setData('avatar', e.target.files ? e.target.files[0] : null)}
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
