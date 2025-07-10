// import { Head, useForm } from '@inertiajs/react';
// import { LoaderCircle } from 'lucide-react';
// import { FormEventHandler } from 'react';

// import InputError from '@/components/input-error';
// import TextLink from '@/components/text-link';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import AuthLayout from '@/layouts/auth-layout';

// type LoginForm = {
//     email: string;
//     password: string;
//     remember: boolean;
// };

// interface LoginProps {
//     status?: string;
//     canResetPassword: boolean;
// }

// export default function Login({ status, canResetPassword }: LoginProps) {
//     const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit: FormEventHandler = (e) => {
//         e.preventDefault();
//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
//             <Head title="Log in" />

//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>
//                         <Input
//                             id="email"
//                             type="email"
//                             required
//                             autoFocus
//                             tabIndex={1}
//                             autoComplete="email"
//                             value={data.email}
//                             onChange={(e) => setData('email', e.target.value)}
//                             placeholder="email@example.com"
//                         />
//                         <InputError message={errors.email} />
//                     </div>

//                     <div className="grid gap-2">
//                         <div className="flex items-center">
//                             <Label htmlFor="password">Password</Label>
//                             {canResetPassword && (
//                                 <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
//                                     Forgot password?
//                                 </TextLink>
//                             )}
//                         </div>
//                         <Input
//                             id="password"
//                             type="password"
//                             required
//                             tabIndex={2}
//                             autoComplete="current-password"
//                             value={data.password}
//                             onChange={(e) => setData('password', e.target.value)}
//                             placeholder="Password"
//                         />
//                         <InputError message={errors.password} />
//                     </div>

//                     <div className="flex items-center space-x-3">
//                         <Checkbox
//                             id="remember"
//                             name="remember"
//                             checked={data.remember}
//                             onClick={() => setData('remember', !data.remember)}
//                             tabIndex={3}
//                         />
//                         <Label htmlFor="remember">Remember me</Label>
//                     </div>

//                     <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
//                         {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
//                         Log in
//                     </Button>
//                 </div>

//                 <div className="text-center text-sm text-muted-foreground">
//                     Don't have an account?{' '}
//                     <TextLink href={route('register')} tabIndex={5}>
//                         Sign up
//                     </TextLink>
//                 </div>
//             </form>

//             {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
//         </AuthLayout>
//     );
// }

import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import AuthFormContainer from '../../components/AuthFormContainer';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

import ilustrasiLogin from '../../../../public/login-illustration.jpg';

export default function Login() {
    const { auth } = usePage<SharedData>().props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        // Logika login di sini

        // Validasi: Pastikan email dan password tidak kosong
        if (!email || !password) {
            alert('Mohon masukkan email dan kata sandi Anda.');
            return; // Hentikan proses jika ada input yang kosong
        }

        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Remember Me:', rememberMe);

        // Simulasi login berhasil
        // Dalam aplikasi nyata, Anda akan mengirim data ke server
        // dan menunggu respons sukses sebelum melakukan navigasi.
        const isLoginSuccessful = true; // Ganti dengan logika autentikasi sebenarnya

        if (isLoginSuccessful) {
            alert('Login berhasil! Mengarahkan ke halaman jadwal...');
            //   navigate('/admin/schedule'); // Arahkan ke rute jadwal admin
        } else {
            alert('Login gagal. Periksa kembali email dan kata sandi Anda.');
            // Anda bisa menampilkan pesan error yang lebih spesifik di UI
        }
    };

    return (
        <>
            {/* <Link
                href={route('dashboard')}
                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
            >
                Dashboard
            </Link> */}
            {/* <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </header> */}

            <AuthFormContainer imageUrl={ilustrasiLogin}>
                {/* Menggunakan ukuran teks text-xl yang terakhir kita sepakati */}
                <h2 className="mb-2 text-xl font-bold text-gray-800">Halo, Selamat Datang kembali ! 👋</h2>
                <p className="mb-8 text-gray-600">Silakan masuk ke akun Anda</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <InputField
                        id="email"
                        type="email"
                        placeholder="Masukkan email kamu kesini"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                    />
                    <InputField
                        id="password"
                        type="password"
                        placeholder="Kata sandi kamu"
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                        showPasswordToggle // Aktifkan toggle lihat/sembunyikan password
                    />

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-gray-700">
                                Remember Me
                            </label>
                        </div>
                        {/* <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Lupa kata sandi?
          </Link> */}
                    </div>

                    <PrimaryButton type="submit">Masuk</PrimaryButton>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Belum memiliki akun?{' '}
                    <Link href={route('register')} className="font-semibold text-blue-600 hover:underline">
                        Daftar
                    </Link>
                </p>
            </AuthFormContainer>
        </>
    );
}
