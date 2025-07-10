import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthFormContainer from '../components/AuthFormContainer';
import PrimaryButton from '../components/PrimaryButton';
import InputField from '../components/InputField';
import { User, Mail, Lock } from 'lucide-react';
import ilustrasiLogin from '../assets/images/login-illustration.jpg';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);

  const validatePassword = (pwd: string): string => {
    if (pwd.length < 8) {
      return 'Kata sandi setidaknya 8 karakter.';
    }
    if (!/[a-zA-Z]/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu huruf.';
    }
    if (!/\d/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu angka.';
    }
    if (!/[^a-zA-Z0-9]/.test(pwd)) {
      return 'Kata sandi harus mengandung setidaknya satu simbol.';
    }
    return '';
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length > 0) {
      const validationMessage = validatePassword(newPassword);
      setPasswordError(validationMessage);
      setIsPasswordStrong(!validationMessage);
    } else {
      setPasswordError('');
      setIsPasswordStrong(false);
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password !== newConfirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const pwdValidation = validatePassword(password);
    if (pwdValidation) {
      setPasswordError(pwdValidation);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Konfirmasi kata sandi tidak cocok.');
      return;
    }

    console.log('Nama:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Registrasi berhasil! (Logika sebenarnya akan diproses)');
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <InputField
          id="email"
          type="email"
          placeholder="Email"
          icon={Mail}
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
          {password.length > 0 && passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
          {password.length === 0 && (
            <p className="text-gray-500 text-xs mt-1">
              Gunakan kata sandi setidaknya 8 karakter yang terdiri dari huruf, angka, dan simbol*
            </p>
          )}
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
