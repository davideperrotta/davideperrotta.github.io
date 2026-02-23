// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages project site: https://davideperrotta.github.io/resume-astro/
	// This ensures CSS and assets load correctly under that sub-path
	site: 'https://davideperrotta.github.io/resume-astro/',
	base: '/resume-astro/',
	integrations: [react()],
});
