const DEFAULT_FORMATS = ['jpg', 'jpeg', 'png', 'webp', 'doc', 'docx', 'pdf', 'txt', 'rtf'] as const

const MIME_BY_EXTENSION: Record<string, string> = {
	jpg: 'image/jpeg',
	jpeg: 'image/jpeg',
	png: 'image/png',
	webp: 'image/webp',
	doc: '.doc',
	docx: '.docx',
	pdf: 'application/pdf',
	txt: 'text/plain',
	rtf: 'application/rtf',
}

export function getDefaultFormats() {
	return [...DEFAULT_FORMATS]
}

export function normalizeFormats(formats?: string[]) {
	if (!formats?.length) {
		return getDefaultFormats()
	}

	return formats.map(format => format.trim().toLowerCase())
}

export function getFileExtension(fileName: string) {
	const parts = fileName.split('.')

	if (parts.length < 2) {
		return ''
	}

	return parts.at(-1)?.toLowerCase() ?? ''
}

export function toSizeMb(bytes: number) {
	return Number((bytes / (1024 * 1024)).toFixed(3))
}

export function formatSizeMb(sizeMb: number) {
	return `${sizeMb.toFixed(2)} MB`
}

export function isAllowedExtension(extension: string, formats: string[]) {
	if (!extension) {
		return false
	}

	return formats.includes(extension.toLowerCase())
}

export function buildAcceptValue(formats: string[]) {
	return formats
		.map(format => MIME_BY_EXTENSION[format] ?? `.${format}`)
		.join(',')
}

export function createDropZoneFileId() {
	if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
		return crypto.randomUUID()
	}

	return `drop-zone-file-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
