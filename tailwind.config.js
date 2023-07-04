/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		colors: {
			white: '#ffffff',
			gray: '#f4f4f4',
			red: '#ff0000',
			'black-opacity': 'rgba(0,0,0,0.8)',
			orange: '#e84e0e',
		},
		backgroundColor: {
			white: '#ffffff',
			black: '#141414',
			'black-opacity': 'rgba(0,0,0,0.8)',
			orange: '#e84e0e',
			gray: '#f4f4f4',
		},
	},
	plugins: [],
};
