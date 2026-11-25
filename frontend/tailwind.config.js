/** @type {import('tailwindcss').Config} */
// Renkler CSS değişkenlerinden geliyor (src/index.css): kırmızı hap = Matrix,
// mavi hap = sade açık tema. Eski neon-* adları korunuyor ki tüm sayfalar
// iki temaya da kendiliğinden uysun.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                matrix: {
                    50: v('m-50'),
                    100: v('m-100'),
                    300: v('m-300'),
                    400: v('m-400'),
                    600: v('m-600'),
                    700: v('m-700'),
                    800: v('m-800'),
                    900: v('m-900'),
                },
                'pill-red': v('pill'),
                'neon-blue': v('m-400'),
                'neon-green': v('m-400'),
                'neon-pink': v('m-100'),
                'neon-purple': v('m-600'),
                'neon-orange': v('m-300'),
                'dark-bg': v('bg'),
                'dark-card': v('card'),
                'dark-border': v('border'),
                'dark-muted': v('muted'),
                ink: v('ink'),
                'ink-soft': v('ink-soft'),
                body: v('body'),
                white: v('white'),
                black: v('black'),
                gray: {
                    300: v('g-300'),
                    400: v('g-400'),
                    500: v('g-500'),
                    600: v('g-600'),
                    700: v('g-700'),
                    800: v('g-800'),
                },
            }
        },
        fontFamily: {
            'cyber': ['var(--font-display)'],
            'mono': ['var(--font-mono)']
        }
    },
    plugins: [],
}
