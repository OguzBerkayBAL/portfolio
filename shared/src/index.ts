// Re-export all types and interfaces
export * from './types';

// Theme constants for Dark Tech Portfolio
export const DARK_THEME_COLORS = {
    primary: '#0a0a0a',      // Deep black
    secondary: '#1a1a1a',    // Dark charcoal
    surface: '#2a2a2a',      // Medium gray
    accent: '#00ffff',       // Neon cyan
    accentPurple: '#8b5cf6', // Tech purple
    success: '#00ff41',      // Terminal green
    warning: '#fbbf24',      // Amber
    error: '#ef4444',        // Red
    text: '#ffffff',         // White
    textSecondary: '#a1a1aa', // Light gray
    textMuted: '#71717a',    // Muted gray
    border: '#374151',       // Gray border
    borderFocus: '#00ffff',  // Cyan focus
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
    fast: 150,
    normal: 300,
    slow: 500,
    glitch: 200,
    typing: 50,
} as const;

// Breakpoints for responsive design
export const BREAKPOINTS = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;

// Terminal commands for theme
export const SAMPLE_TERMINAL_COMMANDS = [
    { command: 'whoami', output: 'berkay@portfolio:~$ Senior Full Stack Developer', timestamp: new Date() },
    { command: 'ls -la skills/', output: 'React TypeScript NestJS PostgreSQL Docker', timestamp: new Date() },
    { command: 'cat experience.md', output: '3+ years building scalable web applications', timestamp: new Date() },
    { command: 'grep -r "passion" *.txt', output: 'Passionate about creating elegant solutions', timestamp: new Date() },
] as const; 