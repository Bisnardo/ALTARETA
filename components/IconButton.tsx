
import React, { memo } from 'react';

interface IconButtonProps {
    onClick: () => void;
    title: string;
    icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, title, icon }) => (
    <button 
        type="button"
        onClick={onClick} 
        title={title} 
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-all"
    >
        {icon}
    </button>
);

export default memo(IconButton);
