import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'matrix':
        return '💊';
      default:
        return '☀️';
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'matrix':
        return 'Matrix Mode';
      default:
        return 'Light Mode';
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-current opacity-70 hover:opacity-100 transition-all duration-200"
      style={{
        borderColor: 'var(--text-tertiary)',
        color: 'var(--text-primary)'
      }}
      aria-label={`Current theme: ${getThemeLabel()}. Click to switch theme.`}
      title={`Current: ${getThemeLabel()}`}
    >
      <span className="text-lg" role="img" aria-hidden="true">
        {getThemeIcon()}
      </span>
      <span className="hidden sm:inline text-xs font-mono">
        {getThemeLabel()}
      </span>
    </button>
  );
}