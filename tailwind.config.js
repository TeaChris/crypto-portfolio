/** @type {import('tailwindcss').Config} */
export default {
      content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
      theme: {
            extend: {
                  colors: {
                        // Retro-futuristic color palette
                        'crypto-dark': '#0a0e27',
                        'crypto-darker': '#050812',
                        'crypto-card': '#12172d',
                        'crypto-border': '#1e2543',
                        'crypto-accent': '#00d4ff', // Cyan accent (retro-futuristic)
                        'crypto-accent-hover': '#00b8e6',
                        'crypto-secondary': '#ff006e', // Magenta accent
                        'profit-green': '#00ff88',
                        'loss-red': '#ff3864',
                        'neon-purple': '#b026ff',
                        'terminal-green': '#00ff00',
                  },
                  fontFamily: {
                        // Distinctive fonts (Design Skill: Avoid Inter, Roboto, etc.)
                        display: ['Space Grotesk', 'system-ui', 'sans-serif'], // Display/headers
                        sans: ['DM Sans', 'system-ui', 'sans-serif'], // Body text
                        mono: ['JetBrains Mono', 'monospace'], // Numbers/data
                  },
                  animation: {
                        'pulse-slow':
                              'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                        float: 'float 6s ease-in-out infinite',
                        glow: 'glow 2s ease-in-out infinite alternate',
                        shimmer: 'shimmer 2s linear infinite',
                        'slide-up': 'slideUp 0.5s ease-out',
                        'fade-in': 'fadeIn 0.3s ease-out',
                        'scale-in': 'scaleIn 0.3s ease-out',
                  },
                  keyframes: {
                        float: {
                              '0%, 100%': { transform: 'translateY(0px)' },
                              '50%': { transform: 'translateY(-20px)' },
                        },
                        glow: {
                              '0%': {
                                    boxShadow:
                                          '0 0 5px rgba(0, 212, 255, 0.2), 0 0 10px rgba(0, 212, 255, 0.1)',
                              },
                              '100%': {
                                    boxShadow:
                                          '0 0 20px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)',
                              },
                        },
                        shimmer: {
                              '0%': { backgroundPosition: '-1000px 0' },
                              '100%': { backgroundPosition: '1000px 0' },
                        },
                        slideUp: {
                              '0%': {
                                    opacity: '0',
                                    transform: 'translateY(20px)',
                              },
                              '100%': {
                                    opacity: '1',
                                    transform: 'translateY(0)',
                              },
                        },
                        fadeIn: {
                              '0%': { opacity: '0' },
                              '100%': { opacity: '1' },
                        },
                        scaleIn: {
                              '0%': { opacity: '0', transform: 'scale(0.95)' },
                              '100%': { opacity: '1', transform: 'scale(1)' },
                        },
                  },
                  backgroundImage: {
                        'gradient-radial':
                              'radial-gradient(var(--tw-gradient-stops))',
                        'gradient-mesh':
                              'radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.3) 0px, transparent 50%), radial-gradient(at 97% 21%, hsla(329, 100%, 51%, 0.3) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(180, 100%, 50%, 0.3) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.3) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 100%, 71%, 0.3) 0px, transparent 50%)',
                  },
            },
      },
      plugins: [],
}
