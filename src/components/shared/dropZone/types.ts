import type { Dispatch, SetStateAction } from 'react'

export type DropZoneFileStatus = 'uploading' | 'success' | 'error'

export type DropZoneFile = {
	id: string
	file?: File
	title: string
	extension: string
	sizeMb: number
	uri: string | null
	status: DropZoneFileStatus
	progress: number
	errorMessage?: string | null
}

export type DropZoneProps = {
	files: DropZoneFile[]
	setFiles: Dispatch<SetStateAction<DropZoneFile[]>>
	maxFiles: number
	maxFileMb: number
	formats?: string[]
	addonText?: string
}

export type UploadResult = ['success', string] | ['fault']

export type UploadFileParams = {
	file: File
	onProgress?: (progress: number) => void
}
