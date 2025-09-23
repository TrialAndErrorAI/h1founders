# Theming Architecture

## How It Works (IMPORTANT FOR AI AGENTS)

This app uses a **hybrid theming approach**:

1. **Tailwind Dark Mode**: Standard `dark:` classes work
2. **CSS Variables**: For theme-specific colors
3. **Three Themes**: light, dark, matrix

## Technical Implementation

### Theme Switching Flow
1. User clicks theme toggle
2. `ThemeContext` updates theme state
3. Two things happen simultaneously:
   - Sets `data-theme` attribute (for CSS variables)
   - Adds/removes `dark` class (for Tailwind dark: utilities)

### HTML Element Classes/Attributes
```html
<!-- Light mode -->
<html data-theme="light">

<!-- Dark mode -->
<html data-theme="dark" class="dark">

<!-- Matrix mode -->
<html data-theme="matrix" class="dark">
```

## For AI Assistants & Developers

### ✅ DO THIS:
```tsx
// Use Tailwind dark: classes for dark mode
<div className="bg-white dark:bg-gray-900">

// Use both light and dark variants
<text className="text-gray-900 dark:text-white">
```

### ❌ DON'T DO THIS:
```tsx
// Don't use only CSS variables (unclear which theme)
<div className="bg-background">  // AVOID

// Don't forget dark: variants
<div className="bg-white">  // INCOMPLETE
```

## Matrix Theme Special Handling

Matrix theme gets BOTH:
- `dark` class (so dark: styles apply)
- `data-theme="matrix"` (for green terminal colors via CSS vars)

This means:
- Basic dark: styles work for matrix
- Override with CSS vars for specific matrix styling

## Theme Modes

| Theme | Background | Text | Special |
|-------|------------|------|---------|
| Light | White | Dark gray | Default |
| Dark | Gray-900 | White | Standard dark mode |
| Matrix | Black (#0d0208) | Green (#00ff41) | Terminal style |

## Key Files
- `/client/tailwind.config.js` - `darkMode: 'class'` enabled
- `/client/src/contexts/ThemeContext.tsx` - Manages both class and attribute
- `/client/src/index.css` - CSS variable definitions

## Testing Checklist
- [ ] Light mode: White backgrounds, dark text
- [ ] Dark mode: Dark backgrounds, light text
- [ ] Matrix mode: Black background, green text
- [ ] Auth modal visible in all modes
- [ ] Inputs readable in all modes