import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon, BeakerIcon } from '@heroicons/react/24/outline';

export function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return SunIcon;
      case 'dark':
        return MoonIcon;
      case 'matrix':
        return BeakerIcon;
      default:
        return SunIcon;
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
      {(() => {
        const Icon = getThemeIcon();
        return <Icon className="w-5 h-5" aria-hidden="true" />;
      })()}
      <span className="hidden sm:inline text-xs font-mono">
        {getThemeLabel()}
      </span>
    </button>
  );
}