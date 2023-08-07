import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',
})

/*
gh-pages dependency not needed with vite.
Simply commit your dist folder (npm run build) with the following:

git add dist -f
git commit -m "Adding dist"
git subtree push --prefix dist origin gh-pages
*/