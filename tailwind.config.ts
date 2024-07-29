import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				primary: 'var(--primary)',
			},
			borderRadius: {
				'4xl': '1.75rem',
				'5xl': '2rem',
			},
			maxWidth: {
				viewport: 'var(--max-width)',
			},
			keyframes: {
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(15px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-up-light': {
					from: { opacity: '0', transform: 'translateY(5px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-down': {
					from: { opacity: '0', transform: 'translateY(-15px)' },
					to: { opacity: '1', transform: 'translateY(0px)' },
				},
				'fade-down-light': {
					from: { opacity: '1', transform: 'translateY(0px)' },
					to: { opacity: '0', transform: 'translateY(5px)' },
				},
				'fade-right': {
					from: { opacity: '0', transform: 'translateX(-15px)' },
					to: { opacity: '1', transform: 'translateX(0px)', display: 'block' },
				},
				'fade-left': {
					from: { opacity: '1', transform: 'translateX(0px)' },
					to: { opacity: '0', transform: 'translateX(-15px)', display: 'none' },
				},
			},
			animation: {
				'fade-up': 'fade-up 0.3s ease-in-out forwards',
				'fade-up-light': 'fade-up-light 0.3s ease-in-out forwards',
				'fade-down': 'fade-down 0.3s ease-in-out',
				'fade-down-light': 'fade-down-light 0.3s ease-in-out forwards',
				'fade-right': 'fade-right 0.3s ease-in-out',
				'fade-left': 'fade-left 0.3s ease-in-out forwards',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
