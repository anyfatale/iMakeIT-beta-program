import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  primaryColor: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#6366f1');

  useEffect(() => {
    // Load saved theme settings
    const savedTheme = localStorage.getItem('iMakeIt_theme') as 'light' | 'dark' || 'dark';
    const savedColor = localStorage.getItem('iMakeIt_primaryColor') || '#6366f1';
    
    setTheme(savedTheme);
    setPrimaryColor(savedColor);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.style.setProperty('--primary-color', savedColor);
  }, []);

  const handleSetTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('iMakeIt_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSetPrimaryColor = (color: string) => {
    setPrimaryColor(color);
    localStorage.setItem('iMakeIt_primaryColor', color);
    document.documentElement.style.setProperty('--primary-color', color);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      primaryColor,
      setTheme: handleSetTheme,
      setPrimaryColor: handleSetPrimaryColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};