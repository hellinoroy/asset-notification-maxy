import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import AuthFormContainer from '../components/AuthFormContainer';
import ilustrasiLogin from '../assets/images/login-illustration.jpg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Mohon masukkan email dan kata sandi Anda.');
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    const isLoginSuccessful = true;

    if (isLoginSuccessful) {
      alert('Login berhasil! Mengarahkan ke halaman jadwal...');
      navigate('/admin/schedule');
    } else {
      alert('Login gagal. Periksa kembali email dan kata sandi Anda.');
    }
  };

  return (
    <AuthFormContainer imageUrl={ilustrasiLogin}>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Halo, Selamat Datang kembali ! 👋</h2>
      <p className="text-gray-600 mb-8">Silakan masuk ke akun Anda</p>

      <form onSubmit={handleLogin} className="space-y-6">
        <InputField
          id="email"
          type="email"
          placeholder="Masukkan email kamu kesini"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          icon={Mail}
        />
        <InputField
          id="password"
          type="password"
          placeholder="Kata sandi kamu"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          icon={Lock}
          showPasswordToggle
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 text-gray-700">
              Remember Me
            </label>
          </div>
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Lupa kata sandi?
          </Link>
        </div>

        <PrimaryButton type="submit">Masuk</PrimaryButton>
      </form>

      <p className="text-center text-gray-600 mt-8">
        Belum memiliki akun?{' '}
        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
          Daftar
        </Link>
      </p>
    </AuthFormContainer>
  );
};

export default LoginPage;
