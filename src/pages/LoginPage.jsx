import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react'; // Impor ikon dari Lucide React
import { Link, useNavigate } from 'react-router-dom'; // Impor Link dan useNavigate
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import AuthFormContainer from '../components/AuthFormContainer';

// Impor gambar ilustrasi secara langsung
import ilustrasiLogin from '../assets/images/login-illustration.jpg'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const handleLogin = (e) => {
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
      navigate('/admin/schedule'); // Arahkan ke rute jadwal admin
    } else {
      alert('Login gagal. Periksa kembali email dan kata sandi Anda.');
      // Anda bisa menampilkan pesan error yang lebih spesifik di UI
    }
  };

  return (
    // Meneruskan variabel gambar yang sudah diimpor
    <AuthFormContainer imageUrl={ilustrasiLogin}>
      {/* Menggunakan ukuran teks text-xl yang terakhir kita sepakati */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">Halo, Selamat Datang kembali ! 👋</h2>
      <p className="text-gray-600 mb-8">Silakan masuk ke akun Anda</p>

      <form onSubmit={handleLogin} className="space-y-6">
        <InputField
          id="email"
          type="email"
          placeholder="Masukkan email kamu kesini"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={Mail}
        />
        <InputField
          id="password"
          type="password"
          placeholder="Kata sandi kamu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={Lock}
          showPasswordToggle // Aktifkan toggle lihat/sembunyikan password
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
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
