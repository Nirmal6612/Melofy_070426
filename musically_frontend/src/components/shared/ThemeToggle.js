import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import ThemeContext from '../../contexts/ThemeContext';

const ThemeToggle = ({ className }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-200 border ${theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700'
                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                } ${className}`}
            aria-label="Toggle Theme"
        >
            <Icon
                icon={theme === 'dark' ? 'ph:sun-bold' : 'ph:moon-bold'}
                className="text-xl"
            />
        </button>
    );
};

export default ThemeToggle;
