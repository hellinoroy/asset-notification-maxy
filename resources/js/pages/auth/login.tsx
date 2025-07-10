import InputError from '@/components/input-error';
import { type SharedData } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import AuthFormContainer from '../../components/AuthFormContainer';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

import ilustrasiLogin from '../../../../public/login-illustration.jpg';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

// export default function Login({ status, canResetPassword }: LoginProps) {
//     return (
//         <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
//             <Head title="Log in" />

//             <form className="flex flex-col gap-6" onSubmit={submit}>
//                 <div className="grid gap-6">
//                     <div className="grid gap-2">
//                         <Label htmlFor="email">Email address</Label>

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

export default function Login({ status, canResetPassword }: LoginProps) {
    const { auth } = usePage<SharedData>().props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e: any) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };



    return (
        <>
            <AuthFormContainer imageUrl={ilustrasiLogin}>
                {/* Menggunakan ukuran teks text-xl yang terakhir kita sepakati */}
                <h2 className="mb-2 text-xl font-bold text-gray-800">Halo, Selamat Datang kembali ! 👋</h2>
                <p className="mb-8 text-gray-600">Silakan masuk ke akun Anda</p>

                <form onSubmit={submit} className="space-y-6">
                    <InputField
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e: any) => setData('email', e.target.value)}
                        placeholder="Masukkan email kamu kesini"
                    />
                    <InputError message={errors.email} />

                    <InputField
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e: any) => setData('password', e.target.value)}
                        placeholder="Kata sandi kamu"
                        showPasswordToggle
                    />
                    <InputError message={errors.password} />

                    <div className="flex items-center space-x-3"></div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <Checkbox
                                id="remember "
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                tabIndex={3}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 text-gray-700">
                                Remember Me
                            </label>
                        </div>
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
