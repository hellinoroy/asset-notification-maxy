import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthFormContainer from '../components/AuthFormContainer';
import PrimaryButton from '../components/PrimaryButton';
import InputField from '../components/InputField';
import { User, Mail, Lock } from 'lucide-react';
import ilustrasiLogin from '../assets/images/login-illustration.jpg'; // Menggunakan gambar yang sama untuk register

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isPasswordStrong, setIsPasswordStrong] = useState(false); // State baru untuk kekuatan kata sandi

  // Fungsi untuk memvalidasi kekuatan kata sandi
  const validatePassword = (pwd) => {
    // Kata sandi setidaknya 8 karakter
    if (pwd.length < 8) {
      return 'Kata sandi setidaknya 8 karakter.';
    }
    // Mengandung setidaknya satu huruf (besar atau kecil)
    if (!/[a-zA-Z]/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu huruf.';
    }
    // Mengandung setidaknya satu angka
    if (!/\d/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu angka.';
    }
    // Mengandung setidaknya satu simbol (karakter non-alfanumerik)
    if (!/[^a-zA-Z0-9]/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu simbol.';
    }
    return ''; // Kata sandi valid
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    // Hanya validasi dan set error jika password tidak kosong
    if (newPassword.length > 0) {
      const validationMessage = validatePassword(newPassword);
      setPasswordError(validationMessage);
      setIsPasswordStrong(!validationMessage); // Set isPasswordStrong jika tidak ada pesan validasi
    } else {
      setPasswordError(''); // Hapus error jika password kosong
      setIsPasswordStrong(false); // Password tidak kuat jika kosong
    }

    // Juga validasi konfirmasi kata sandi jika sudah diisi
    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password !== newConfirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Lakukan validasi akhir sebelum submit
    const pwdValidation = validatePassword(password);
    if (pwdValidation) {
      setPasswordError(pwdValidation);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    // Jika semua validasi berhasil, lanjutkan proses registrasi
    console.log('Nama:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Registrasi berhasil! (Logika sebenarnya akan diproses)');
    // Di sini Anda akan mengirim data ke backend
  };

  return (
    <AuthFormContainer imageUrl={ilustrasiLogin}>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Buat Akun Baru</h2>
      <p className="text-gray-600 mb-8">Daftar untuk memulai</p>

      <form onSubmit={handleRegister} className="space-y-6">
        <InputField
          id="name"
          type="text"
          placeholder="Nama Lengkap"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          id="email"
          type="email"
          placeholder="Email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <InputField
            id="password"
            type="password"
            placeholder="Kata Sandi"
            icon={Lock}
            showPasswordToggle
            value={password}
            onChange={handlePasswordChange}
          />
          {/* Tampilkan pesan error jika ada dan password tidak kosong */}
          {password.length > 0 && passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}

          {/* Instruksi kata sandi: Hanya tampil jika password kosong */}
          {password.length === 0 && (
            <p className="text-gray-500 text-xs mt-1">
              Gunakan kata sandi setidaknya 8 karakter yang terdiri dari huruf, angka, dan simbol*
            </p>
          )}

          {/* Pesan kata sandi kuat: Hanya tampil jika kuat DAN tidak ada error DAN password tidak kosong */}
          {isPasswordStrong && !passwordError && password.length > 0 && (
            <p className="text-green-600 text-xs mt-1">Kata sandi Anda kuat.</p>
          )}
        </div>
        <div className="relative">
          <InputField
            id="confirm-password"
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            icon={Lock}
            showPasswordToggle
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {confirmPasswordError && (
            <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>
          )}
        </div>

        <PrimaryButton type="submit">Daftar</PrimaryButton>
      </form>

      <p className="text-center text-gray-600 mt-8">
        Sudah memiliki akun?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </AuthFormContainer>
  );
};

export default RegisterPage;
