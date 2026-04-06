import { useCallback, useEffect, useRef } from 'react'

type UseAutosizeTextareaOptions = {
	maxRows: number
	lineHeight: number
}

export function useAutosizeTextarea({ maxRows, lineHeight }: UseAutosizeTextareaOptions) {
	const textareaRef = useRef<HTMLTextAreaElement | null>(null)

	const resizeTextarea = useCallback(() => {
		const textarea = textareaRef.current

		if (!textarea) {
			return
		}

		textarea.style.height = 'auto'

		const newHeight = textarea.scrollHeight
		const maxHeight = lineHeight * maxRows

		if (newHeight <= maxHeight) {
			textarea.style.height = `${newHeight}px`
			textarea.style.overflowY = 'hidden'
			return
		}

		textarea.style.height = `${maxHeight}px`
		textarea.style.overflowY = 'auto'
	}, [lineHeight, maxRows])

	useEffect(() => {
		resizeTextarea()
	}, [resizeTextarea])

	const registerTextareaRef = useCallback(
		(element: HTMLTextAreaElement | null, forwardedRef?: (instance: HTMLTextAreaElement | null) => void) => {
			textareaRef.current = element
			if (forwardedRef) {
				forwardedRef(element)
			}
			resizeTextarea()
		},
		[resizeTextarea],
	)

	return {
		textareaRef,
		resizeTextarea,
		registerTextareaRef,
	}
}
