import type { ImageMetadata } from 'astro'

export type TPerson = {
	showMainPage?: boolean
	img: ImageMetadata
	name: string
	text: string
	quote?: string
}
