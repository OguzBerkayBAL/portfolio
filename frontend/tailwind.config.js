/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neon-blue': '#00ffff',
                'neon-green': '#00ff00',
                'neon-pink': '#ff00ff',
                'neon-purple': '#8a2be2',
                'neon-orange': '#ff4500',
                'dark-bg': '#0a0a0a',
                'dark-card': '#111111',
                'dark-border': '#222222',
                'dark-muted': '#888888',
            }
        },
        fontFamily: {
            'cyber': ['Orbitron', 'sans-serif'],
            'mono': ['Fira Code', 'monospace']
        }
    },
    plugins: [],
} 