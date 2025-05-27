import { type ChangeEvent, forwardRef } from "react";

interface AuthInputProps {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ type, id, name, label, placeholder, value, required = false, error, onChange, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
          {label} {required && <span className="text-primary">*</span>}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 bg-gray-900 border ${
            error ? 'border-red-500' : 'border-gray-700'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-white`}
          required={required}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
