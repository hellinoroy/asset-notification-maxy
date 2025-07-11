import InputError from '@/components/input-error';
import { Link, useForm } from '@inertiajs/react';
import { Lock, Mail, User } from 'lucide-react';
import AuthFormContainer from '../../components/AuthFormContainer';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';

import ilustrasiLogin from '../../../../public/login-illustration.jpg';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function RegisterPage() {
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [confirmPasswordError, setConfirmPasswordError] = useState('');
    // const [isPasswordStrong, setIsPasswordStrong] = useState(false); // State baru untuk kekuatan kata sandi

    // Fungsi untuk memvalidasi kekuatan kata sandi
    // const validatePassword = (pwd: any) => {
    //     // Kata sandi setidaknya 8 karakter
    //     if (pwd.length < 8) {
    //         return 'Kata sandi setidaknya 8 karakter.';
    //     }
    //     // Mengandung setidaknya satu huruf (besar atau kecil)
    //     if (!/[a-zA-Z]/.test(pwd)) {
    //         return 'Kata sandi harus mengandung setidaknya satu huruf.';
    //     }
    //     // Mengandung setidaknya satu angka
    //     if (!/\d/.test(pwd)) {
    //         return 'Kata sandi harus mengandung setidaknya satu angka.';
    //     }
    //     // Mengandung setidaknya satu simbol (karakter non-alfanumerik)
    //     if (!/[^a-zA-Z0-9]/.test(pwd)) {
    //         return 'Kata sandi harus mengandung setidaknya satu simbol.';
    //     }
    //     return ''; // Kata sandi valid
    // };

    // const handlePasswordChange = (e: any) => {
    //     const newPassword = e.target.value;
    //     setPassword(newPassword);

    //     // Hanya validasi dan set error jika password tidak kosong
    //     if (newPassword.length > 0) {
    //         const validationMessage = validatePassword(newPassword);
    //         setPasswordError(validationMessage);
    //         setIsPasswordStrong(!validationMessage); // Set isPasswordStrong jika tidak ada pesan validasi
    //     } else {
    //         setPasswordError(''); // Hapus error jika password kosong
    //         setIsPasswordStrong(false); // Password tidak kuat jika kosong
    //     }

    //     // Juga validasi konfirmasi kata sandi jika sudah diisi
    //     if (confirmPassword && newPassword !== confirmPassword) {
    //         setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    //     } else if (confirmPassword) {
    //         setConfirmPasswordError('');
    //     }
    // };

    // const handleConfirmPasswordChange = (e: any) => {
    //     const newConfirmPassword = e.target.value;
    //     setConfirmPassword(newConfirmPassword);
    //     if (password !== newConfirmPassword) {
    //         setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    //     } else {
    //         setConfirmPasswordError('');
    //     }
    // };

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleRegister = (e: any) => {
        e.preventDefault();

        // Lakukan validasi akhir sebelum submit
        // const pwdValidation = validatePassword(password);
        // if (pwdValidation) {
        //     setPasswordError(pwdValidation);
        //     return;
        // }

        // if (password !== confirmPassword) {
        //     setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
        //     return;
        // }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });

        // Jika semua validasi berhasil, lanjutkan proses registrasi
        // console.log('Nama:', name);
        // console.log('Email:', email);
        // console.log('Password:', password);
        // alert('Registrasi berhasil! (Logika sebenarnya akan diproses)');
        // Di sini Anda akan mengirim data ke backend
    };

    return (
        <AuthFormContainer imageUrl={ilustrasiLogin}>
            <h2 className="mb-2 text-3xl font-bold text-gray-800">Buat Akun Baru</h2>
            <p className="mb-8 text-gray-600">Daftar untuk memulai</p>

            <form onSubmit={handleRegister} className="space-y-6">
                <InputField
                    id="name"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="name"
                    value={data.name}
                    onChange={(e: any) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Nama Lengkap"
                    icon={User}
                />
                <InputError message={errors.name} className="mt-2" />

                <InputField
                    id="email"
                    type="email"
                    required
                    tabIndex={2}
                    autoComplete="email"
                    value={data.email}
                    onChange={(e: any) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="Email"
                    icon={Mail}
                />
                <InputError message={errors.email} />

                <div className="relative">
                    <InputField
                        id="password"
                        type="password"
                        required
                        tabIndex={3}
                        autoComplete="new-password"
                        value={data.password}
                        onChange={(e: any) => setData('password', e.target.value)}
                        disabled={processing}
                        placeholder="Kata Sandi"
                        icon={Lock}
                        showPasswordToggle
                    />
                </div>
                <InputError message={errors.password} />
                <div className="relative">
                    <InputField
                        id="password_confirmation"
                        type="password"
                        required
                        tabIndex={4}
                        autoComplete="new-password"
                        value={data.password_confirmation}
                        onChange={(e: any) => setData('password_confirmation', e.target.value)}
                        disabled={processing}
                        placeholder="Konfirmasi Kata Sandi"
                        icon={Lock}
                        showPasswordToggle
                    />
                </div>
                <InputError message={errors.password_confirmation} />
                <PrimaryButton type="submit">Daftar</PrimaryButton>
            </form>

            <p className="mt-8 text-center text-gray-600">
                Sudah memiliki akun?{' '}
                <Link href={route('login')} className="font-semibold text-blue-600 hover:underline">
                    Masuk
                </Link>
            </p>
        </AuthFormContainer>
    );
}
