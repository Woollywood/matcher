/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			container: {
				padding: '2rem',
				center: true,
			},
			colors: {
				primary: {
					DEFAULT: 'rgb(var(--background))',
				},
				foreground: {
					DEFAULT: 'rgb(var(--foreground))',
				},
				button: {
					primary: 'rgb(var(--button-primary-background))',
					secondary: 'rgb(var(--button-secondary-background))',
				},
				item: {
					gray: 'rgb(var(--table-item-gray))',
					teal: 'rgb(var(--table-item-teal))',
				},
				label: {
					bg: 'rgb(var(--label-bg-color))',
					progressEmpty: 'rgb(var(--label-progress-bg-empty))',
					progressFill: 'rgb(var(--label-progress-bg-fill))',
				},
			},
		},
	},
	plugins: [],
};
