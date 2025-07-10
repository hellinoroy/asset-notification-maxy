import React, { useState } from 'react';
import { Eye, EyeOff, LucideIcon } from 'lucide-react';

// Tipe props untuk komponen InputField
interface InputFieldProps {
  id: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon; // Icon dari Lucide (opsional)
  showPasswordToggle?: boolean;
   className?: string; // ✅ tambahkan baris ini
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  placeholder = '',
  value,
  onChange,
  icon: Icon,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const inputType = showPasswordToggle && showPassword ? 'text' : type;
  const inputPaddingLeft = Icon ? 'pl-10' : 'pl-4';
  const inputPaddingRight = showPasswordToggle ? 'pr-10' : 'pr-4';

  return (
    <div className="relative w-full">
      <input
        id={id}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-base
          ${inputPaddingLeft} ${inputPaddingRight}
          ${showPasswordToggle ? 'hide-native-password-toggle' : ''}
        `}
      />

      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
      )}

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
