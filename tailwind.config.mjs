/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {gridTemplateColumns: {
			
			// Simple 16 column grid
			'16': 'repeat(16, minmax(0, 1fr))',
	
			// Complex site-specific column configuration
			'footer': '200px minmax(900px, 1fr) 100px',
		  }},
	},
	plugins: [],
}
