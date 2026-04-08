import fs from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve(process.cwd(), 'dist')
const rootAssetPattern = /(?:\/\.\/|\/|\.\/)(?:_astro|images|fonts)\/[^"'()\s,>]+/g
const rootHrefPattern = /href=(["'])(\/[^"'#?]*(?:\/)?)\1/g

async function walk(dir) {
	const entries = await fs.readdir(dir, { withFileTypes: true })
	const files = await Promise.all(
		entries.map(async entry => {
			const fullPath = path.join(dir, entry.name)

			if (entry.isDirectory()) {
				return walk(fullPath)
			}

			return [fullPath]
		})
	)

	return files.flat()
}

async function exists(targetPath) {
	try {
		await fs.access(targetPath)
		return true
	} catch {
		return false
	}
}

function toPosix(value) {
	return value.split(path.sep).join(path.posix.sep)
}

function ensureDotPrefix(value) {
	if (!value || value === '') return './'
	if (value.startsWith('.')) return value
	return `./${value}`
}

function resolveRoutePath(rawPath) {
	if (rawPath === '/') return 'index.html'

	const cleanPath = rawPath.replace(/^\/+/, '').replace(/\/+$/, '')
	if (!cleanPath) return 'index.html'

	if (path.posix.extname(cleanPath)) {
		return cleanPath
	}

	return `${cleanPath}.html`
}

async function rewriteFile(filePath) {
	const ext = path.extname(filePath)
	if (!['.html', '.css'].includes(ext)) return

	const original = await fs.readFile(filePath, 'utf8')
	const currentDir = path.dirname(filePath)
	let next = original

	next = next.replace(rootAssetPattern, match => {
		const normalized = match.replace(/^\/\.?\//, '').replace(/^\.\//, '')
		const target = path.join(distDir, normalized)
		const relative = toPosix(path.relative(currentDir, target))
		return ensureDotPrefix(relative)
	})

	if (ext === '.html') {
		const routeMatches = [...next.matchAll(rootHrefPattern)]
		for (const routeMatch of routeMatches) {
			const [fullMatch, quote, routePath] = routeMatch
			const targetRelative = resolveRoutePath(routePath)
			const target = path.join(distDir, targetRelative)
			// eslint-disable-next-line no-await-in-loop
			if (!(await exists(target))) continue

			const relative = ensureDotPrefix(toPosix(path.relative(currentDir, target)))
			next = next.replace(fullMatch, `href=${quote}${relative}${quote}`)
		}
	}

	if (next !== original) {
		await fs.writeFile(filePath, next)
	}
}

const files = await walk(distDir)
for (const filePath of files) {
	// eslint-disable-next-line no-await-in-loop
	await rewriteFile(filePath)
}
