import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark' | 'matrix';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light mode for accessibility
  const [theme, setThemeState] = useState<ThemeMode>('light');

  // Load saved theme on mount
  useEffect(() => {
    // TEMPORARY: Clear old theme preferences to ensure everyone starts fresh with light mode
    // This can be removed after a few days once all users have been reset
    const existingTheme = localStorage.getItem('h1founders-theme');
    if (existingTheme) {
      localStorage.removeItem('h1founders-theme');
      console.log('Reset theme to light mode for consistent experience');
    }

    // Always start with light mode for now - proper dark mode coming soon
    setThemeState('light');
    document.documentElement.classList.remove('dark');
  }, []);

  // Apply theme to document root
  useEffect(() => {
    // Set data-theme for CSS variables
    document.documentElement.setAttribute('data-theme', theme);

    // Also set/remove 'dark' class for Tailwind dark: utilities
    // Both 'dark' and 'matrix' themes should trigger dark mode styles
    if (theme === 'dark' || theme === 'matrix') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // TEMPORARY: Don't persist theme until dark mode is properly architected
    // localStorage.setItem('h1founders-theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const cycleTheme = () => {
    setThemeState(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'matrix';
      return 'light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}