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
    const savedTheme = localStorage.getItem('h1founders-theme') as ThemeMode;
    if (savedTheme && ['light', 'dark', 'matrix'].includes(savedTheme)) {
      setThemeState(savedTheme);
      // Immediately apply dark class if needed (don't wait for next useEffect)
      if (savedTheme === 'dark' || savedTheme === 'matrix') {
        document.documentElement.classList.add('dark');
      }
    }
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

    localStorage.setItem('h1founders-theme', theme);
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