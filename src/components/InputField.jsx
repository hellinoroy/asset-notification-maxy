import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Impor ikon mata dari Lucide React

const InputField = ({
  id,
  type,
  placeholder,
  value,
  onChange,
  icon: Icon, // Ikon untuk ditampilkan di kiri (misalnya Mail, Lock)
  showPasswordToggle = false, // Apakah akan menampilkan ikon mata untuk visibilitas kata sandi
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Tentukan tipe input yang sebenarnya berdasarkan status showPasswordToggle
  const inputType = showPasswordToggle && showPassword ? 'text' : type;

  // Tentukan padding kiri input: 10 jika ada ikon di kiri, jika tidak 4
  const inputPaddingLeft = Icon ? 'pl-10' : 'pl-4';
  // Tentukan padding kanan input: 10 jika ada toggle password (ikon mata), jika tidak 4
  const inputPaddingRight = showPasswordToggle ? 'pr-10' : 'pr-4';

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        // Terapkan kelas padding dinamis
        // Tambahkan kelas 'hide-native-password-toggle' jika showPasswordToggle aktif
        className={`w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-base
          ${inputPaddingLeft} ${inputPaddingRight}
          ${showPasswordToggle ? 'hide-native-password-toggle' : ''}
        `}
      />

      {/* Render ikon kiri (misalnya Mail, Lock) jika disediakan.
          Kondisi !showPasswordToggle DIHAPUS agar ikon Lock selalu muncul. */}
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}

      {/* Render ikon toggle password kustom (Eye/EyeOff) di kanan jika diaktifkan */}
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
};

export default InputField;
