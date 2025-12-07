/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,css}",
    ],
    theme: {
        extend: {
            colors: {
                custom: {
                    bg: '#121212',       // Matte Black
                    surface: '#181818',  // Slightly lighter
                    accent: '#2a2a2a',   // Borders
                    primary: '#ffffff',  // Primary Text
                    secondary: '#a0a0a0',// Secondary Text
                    active: '#38bdf8',   // Sky Blue for Active state
                }
            },
            boxShadow: {
                // Dark Neumorphism: Soft, subtle depth
                'neumorph-dark': '5px 5px 10px #0a0a0a, -5px -5px 10px #202020',
                'neumorph-pressed': 'inset 3px 3px 6px #0a0a0a, inset -3px -3px 6px #202020',

                // Social Button Specifics
                'neumorph-convex': '4px 4px 8px #0d0d0d, -4px -4px 8px #171717',
                'neumorph-concave': 'inset 2px 2px 5px #0d0d0d, inset -2px -2px 5px #171717',

                // Glass Glow for Active Card
                'glass-glow': '0 0 20px rgba(56, 189, 248, 0.15)',
            },
            backdropBlur: {
                'xs': '2px',
            },
            fontFamily: {
                sans: ['"Montserrat"', '"Inter"', 'sans-serif'],
            },
            animation: {
                'breathe': 'breathe 4s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
