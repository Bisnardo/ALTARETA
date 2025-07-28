
import React, { memo } from 'react';

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ id, label, value, onChange, children, required = true }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">{label}</label>
        <select 
            id={id} 
            name={id} 
            value={value} 
            onChange={onChange} 
            required={required} 
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
            {children}
        </select>
    </div>
);

export default memo(SelectField);
