// @ts-check
import netlify from '@astrojs/netlify'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const sharedConfig = {
	integrations: [react()],
	vite: {
		plugins: [tailwindcss()],
		build: {
			assetsInlineLimit: 100000000,
		},
	},
}

const offlineConfig = defineConfig({
	...sharedConfig,
	// base: './',
	// output: 'static',
	// trailingSlash: 'never',
	// build: {
	// 	format: 'file',
	// },
	output: 'static',
	base: './',
	trailingSlash: 'never',
	build: {
		format: 'file',
		inlineStylesheets: 'always',
	},
})

const netlifyConfig = defineConfig({
	...sharedConfig,
	trailingSlash: 'always',
	adapter: netlify(),
})

// Для открытия dist/index.html напрямую из файловой системы.
export default offlineConfig

// Для деплоя на Netlify раскомментируй строку ниже
// и закомментируй export default offlineConfig выше.
// export default netlifyConfig
