
import React, { useState, memo } from 'react';
import { Icons } from './icons';

interface InfoBoxProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    variant?: 'info' | 'warning';
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children, defaultOpen = false, variant = 'info' }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const baseClasses = "border rounded-lg mb-4";
    const variants = {
        info: {
            border: "border-blue-200 dark:border-blue-800",
            headerBg: "bg-blue-50 dark:bg-blue-900/30",
            headerText: "text-blue-800 dark:text-blue-300",
            bodyText: "text-blue-700 dark:text-blue-400",
            bodyBg: "bg-white dark:bg-gray-800"
        },
        warning: {
            border: "border-yellow-300 dark:border-yellow-400/30",
            headerBg: "bg-yellow-50 dark:bg-yellow-400/10",
            headerText: "text-yellow-800 dark:text-yellow-300",
            bodyText: "text-yellow-700 dark:text-yellow-400",
            bodyBg: "bg-white dark:bg-gray-800"
        }
    };

    const v = variants[variant];

    return (
        <div className={`${baseClasses} ${v.border}`}>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className={`w-full flex justify-between items-center p-3 text-left ${v.headerBg} rounded-t-lg`}>
                <h3 className={`font-semibold ${v.headerText}`}>{title}</h3>
                <span className={`${v.headerText} ${isOpen ? 'rotate-180' : ''}`}><Icons.ChevronDown /></span>
            </button>
            {isOpen && <div className={`p-4 text-sm whitespace-pre-line border-t ${v.border} ${v.bodyText} ${v.bodyBg} rounded-b-lg`}>{children}</div>}
        </div>
    );
};

export default memo(InfoBox);
