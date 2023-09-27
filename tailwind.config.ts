/** @type {import('tailwindcss').Config} */
module.exports = { 
	content: [ "./app/**/*.{js,ts,jsx,tsx}"], 
	theme: { 
		extend: {
		}, 
	},
	daisyui: {
		themes: [
			{
			  bumblebee: {
				...require("daisyui/src/theming/themes")["[data-theme=bumblebee]"],
				"primary-content": "#1c1917",
			  },
			},
		  ],
		  darkTheme: "dark", // name of one of the included themes for dark mode
		  base: true, // applies background color and foreground color for root element by default
		  styled: true, // include daisyUI colors and design decisions for all components
		  utils: true, // adds responsive and modifier utility classes
		  rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
		  prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		  logs: true, // Sh
	  },
	plugins: [require("daisyui")], 

}