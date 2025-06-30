import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    cyberMode: boolean;
    toggleDarkMode: () => void;
    toggleCyberMode: () => void;
    accentColor: string;
    setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
    const [cyberMode, setCyberMode] = useState(true); // Default to cyber mode
    const [accentColor, setAccentColorState] = useState('#00ffff'); // Default cyan

    useEffect(() => {
        // Load theme preferences from localStorage
        const savedDarkMode = localStorage.getItem('darkMode');
        const savedCyberMode = localStorage.getItem('cyberMode');
        const savedAccentColor = localStorage.getItem('accentColor');

        if (savedDarkMode !== null) {
            setIsDarkMode(savedDarkMode === 'true');
        }
        if (savedCyberMode !== null) {
            setCyberMode(savedCyberMode === 'true');
        }
        if (savedAccentColor) {
            setAccentColorState(savedAccentColor);
        }
    }, []);

    useEffect(() => {
        // Apply theme classes to html element
        const html = document.documentElement;

        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        if (cyberMode) {
            html.classList.add('cyber-mode');
        } else {
            html.classList.remove('cyber-mode');
        }

        // Set CSS custom properties for accent color
        html.style.setProperty('--accent-color', accentColor);

        // Update meta theme color
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDarkMode ? '#0a0a0a' : '#ffffff');
        }
    }, [isDarkMode, cyberMode, accentColor]);

    const toggleDarkMode = () => {
        const newValue = !isDarkMode;
        setIsDarkMode(newValue);
        localStorage.setItem('darkMode', newValue.toString());
    };

    const toggleCyberMode = () => {
        const newValue = !cyberMode;
        setCyberMode(newValue);
        localStorage.setItem('cyberMode', newValue.toString());
    };

    const setAccentColor = (color: string) => {
        setAccentColorState(color);
        localStorage.setItem('accentColor', color);
    };

    const value: ThemeContextType = {
        isDarkMode,
        cyberMode,
        toggleDarkMode,
        toggleCyberMode,
        accentColor,
        setAccentColor,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}; 