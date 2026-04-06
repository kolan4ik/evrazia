import type { UploadFileParams, UploadResult } from './types'

export async function uploadFileMock({ file, onProgress }: UploadFileParams): Promise<UploadResult> {
	const totalDurationMs = 3000
	const tickMs = 150
	const maxTicks = Math.ceil(totalDurationMs / tickMs)

	return new Promise(resolve => {
		let tick = 0

		onProgress?.(0)

		const timer = window.setInterval(() => {
			tick += 1

			const progress = Math.min(100, Math.round((tick / maxTicks) * 100))
			onProgress?.(progress)

			if (tick < maxTicks) {
				return
			}

			window.clearInterval(timer)

			const safeFileName = encodeURIComponent(file.name.replace(/\s+/g, '-').toLowerCase())
			resolve(['success', `https://mock-s3.local/${Date.now()}-${safeFileName}`])
		}, tickMs)
	})
}
