
import React, { useState, memo, useRef, useEffect } from 'react';
import { Translations } from '../types';

interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    label: string;
    type?: 'text' | 'date' | 'textarea';
    t: Translations;
}

const formatDateToInput = (dateStr: string) => {
    if (!dateStr || !/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
};

const formatDateToDisplay = (dateStr: string) => {
    if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
};


const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, label, type = 'text', t }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing) {
            if (type === 'textarea' && textareaRef.current) {
                textareaRef.current.focus();
            } else if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    }, [isEditing, type]);

    const handleSave = () => {
        setIsEditing(false);
        if (currentValue !== value) {
            onSave(currentValue);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && type !== 'textarea') {
            handleSave();
        } else if (e.key === 'Escape') {
            setCurrentValue(value);
            setIsEditing(false);
        }
    };

    const displayValue = type === 'date' ? formatDateToDisplay(value) : value;

    if (isEditing) {
        if (type === 'textarea') {
            return (
                 <textarea
                    ref={textareaRef}
                    value={currentValue}
                    onChange={(e) => setCurrentValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className="w-full px-2 py-1 border border-blue-500 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    rows={4}
                />
            )
        }
        return (
            <input
                ref={inputRef}
                type={type}
                value={type === 'date' ? formatDateToInput(currentValue) : currentValue}
                onChange={(e) => setCurrentValue(type === 'date' ? formatDateToDisplay(e.target.value) : e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="w-full px-2 py-1 border border-blue-500 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className="cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700 p-1 rounded-md w-full inline-block min-h-[24px] whitespace-pre-wrap"
            aria-label={`${t.ariaLabelEditable.part1} ${label} ${t.ariaLabelEditable.part2} ${displayValue || t.noEspecificado}. ${t.ariaLabelEditable.part3}`}
        >
            {displayValue || <span className="text-gray-400 italic">{t.noEspecificado}</span>}
        </span>
    );
};

export default memo(EditableField);
