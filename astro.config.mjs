// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// GitHub Pages project site: https://davideperrotta.github.io/davideperrotta-astro/
	// This ensures CSS and assets load correctly under that sub-path.
	site: 'https://davideperrotta.github.io/davideperrotta-astro/',
	base: '/davideperrotta-astro/',
});
