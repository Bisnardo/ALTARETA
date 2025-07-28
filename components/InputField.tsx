
import React, { memo } from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    hint?: string;
    maxLength?: number;
    disabled?: boolean;
    className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ id, label, type = "text", value, onChange, placeholder, required = true, hint, maxLength, disabled = false, className = '' }) => (
    <div className={`mb-4 ${className}`}>
        <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            {label} {hint && <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">({hint})</span>}
        </label>
        <input 
            type={type} 
            id={id} 
            name={id} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            required={required} 
            maxLength={maxLength} 
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 disabled:opacity-50 disabled:bg-gray-200 dark:disabled:bg-gray-600"
        />
    </div>
);

export default memo(InputField);
