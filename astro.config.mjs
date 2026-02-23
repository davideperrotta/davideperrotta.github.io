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
		? 'https://davideperrotta.github.io/resume-astro/'
		: undefined,
	base: isProd ? '/resume-astro/' : '/',
	integrations: isProd ? [react()] : [react(), keystatic()],
});
