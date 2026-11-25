/** @type {import('tailwindcss').Config} */
// Tek renkli "fosfor" paleti: eski neon-* adları korunuyor ki sayfalar
// değişmeden yeni temaya geçsin; hepsi yeşilin tonlarına eşlendi.
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                matrix: {
                    50: '#e6ffec',
                    100: '#b8ffc8',
                    300: '#5cff85',
                    400: '#00ff41',
                    600: '#00b82f',
                    700: '#008f11',
                    800: '#0a3d17',
                    900: '#06200d',
                },
                'pill-red': '#ff2a3d',
                'neon-blue': '#00ff41',
                'neon-green': '#00ff41',
                'neon-pink': '#b8ffc8',
                'neon-purple': '#00b82f',
                'neon-orange': '#5cff85',
                'dark-bg': '#030703',
                'dark-card': '#07110a',
                'dark-border': '#123d1e',
                'dark-muted': '#6b9a76',
            }
        },
        fontFamily: {
            'cyber': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
            'mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace']
        }
    },
    plugins: [],
}
