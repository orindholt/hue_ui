/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				roboto: "'Roboto', sans-serif",
			},
			colors: {
				darkGray: "#CECECE",
				orange: "#fca903",
				purple: "#7c2ee8",
			},
		},
	},
	plugins: [],
};
