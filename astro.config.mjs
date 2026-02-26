// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

const isProd = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
	// In production we deploy to GitHub Pages under /resume-astro/.
	// In dev we use the default base so /keystatic works correctly.
	site: isProd
		? 'https://davideperrotta.github.io/'
		: undefined,
	base: '/',
	integrations: isProd ? [react(), keystatic()] : [react(), keystatic()], // enable keystatic in production as preview to be presented
});
