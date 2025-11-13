import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'cyber-cyan': '#00ffff',
        'neon-purple': '#a855f7',
        'hot-pink': '#ec4899',
      },
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-rotate': 'gradient-rotate 8s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slowest': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan-vertical': 'scan-vertical 3s linear infinite',
        'scan-vertical-slow': 'scan-vertical 5s linear infinite',
        'scan-horizontal': 'scan-horizontal 4s linear infinite',
        'float': 'float 15s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'glitch-1': 'glitch-1 0.3s cubic-bezier(.25, .46, .45, .94) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'grid-flow': 'grid-flow 15s linear infinite',
        'pulse-border': 'pulse-border 2s ease-in-out infinite',
        'corner-glow': 'corner-glow 3s ease-in-out infinite',
        'pulse-line': 'pulse-line 2s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
        'pulse-glow-button': 'pulse-glow-button 2s ease-in-out infinite',
        'border-pulse': 'border-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'gradient-x': {
          '0%, 100%': { 
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': { 
            'background-size': '200% 200%',
            'background-position': 'right center' 
          },
        },
        'gradient-rotate': {
          '0%': { 
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
          '50%': { 
            'background-position': '100% 50%',
            'background-size': '200% 200%'
          },
          '100%': { 
            'background-position': '0% 50%',
            'background-size': '200% 200%'
          },
        },
        'scan-vertical': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'scan-horizontal': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'float': {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '50%': { 
            transform: 'translateY(-150px) translateX(100px) scale(1.5)',
          },
        },
        'blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        'glitch-1': {
          '0%': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-3px, 3px)',
          },
          '40%': {
            transform: 'translate(-3px, -3px)',
          },
          '60%': {
            transform: 'translate(3px, 3px)',
          },
          '80%': {
            transform: 'translate(3px, -3px)',
          },
          '100%': {
            transform: 'translate(0)',
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'grid-flow': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
        'pulse-border': {
          '0%, 100%': { 
            'box-shadow': '0 0 20px rgba(6, 182, 212, 0.3)'
          },
          '50%': { 
            'box-shadow': '0 0 40px rgba(6, 182, 212, 0.6)'
          },
        },
        'corner-glow': {
          '0%, 100%': { 
            opacity: '0.3',
            filter: 'drop-shadow(0 0 5px currentColor)'
          },
          '50%': { 
            opacity: '0.8',
            filter: 'drop-shadow(0 0 15px currentColor)'
          },
        },
        'pulse-line': {
          '0%, 100%': { 
            opacity: '0',
            transform: 'scaleX(0)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scaleX(1)'
          },
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
          },
          '50%': {
            transform: 'translateY(-5px) scale(1.05)',
          },
        },
        'pulse-glow-button': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 30px rgba(6, 182, 212, 0.8), 0 0 60px rgba(168, 85, 247, 0.5)',
          },
        },
        'border-pulse': {
          '0%, 100%': {
            'border-color': 'rgba(6, 182, 212, 0.4)',
            'box-shadow': '0 0 10px rgba(6, 182, 212, 0.3)',
          },
          '50%': {
            'border-color': 'rgba(6, 182, 212, 1)',
            'box-shadow': '0 0 20px rgba(6, 182, 212, 0.6)',
          },
        },
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
    },
  },
  plugins: [],
};

export default config;
