export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [],
	theme: {
		extend: {}
	},
	purge: ['./index.html', './src/**/*.{svelte,js,ts}'], //for unused css
	variants: {
		extend: {}
	}
};
