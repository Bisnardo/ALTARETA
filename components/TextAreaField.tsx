
import React, { memo } from 'react';

interface TextAreaFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    children?: React.ReactNode;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ id, label, value, onChange, placeholder, required = false, rows = 3, children }) => (
    <div className="mb-4">
        <label htmlFor={id} className="flex justify-between items-center text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
            <span>{label}</span>
            {children}
        </label>
        <textarea 
            id={id} 
            name={id} 
            value={value} 
            onChange={onChange} 
            placeholder={placeholder} 
            required={required} 
            rows={rows} 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        ></textarea>
    </div>
);

export default memo(TextAreaField);
