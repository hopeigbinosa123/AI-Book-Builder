// src/components/InputField.tsx
import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, placeholder, id }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;