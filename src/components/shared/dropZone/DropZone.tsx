import { cn } from '@/lib/utils'
import { useId, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from 'react'
import styles from './DropZone.module.css'
import { DropZoneFileItem } from './DropZoneFileItem'
import {
	buildAcceptValue,
	createDropZoneFileId,
	getFileExtension,
	isAllowedExtension,
	normalizeFormats,
	toSizeMb,
} from './helpers'
import { uploadFileMock } from './mockUpload'
import type { DropZoneFile, DropZoneProps } from './types'

export function DropZone({ files, setFiles, maxFiles, maxFileMb, formats, addonText }: DropZoneProps) {
	const inputId = useId()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const uploadTokensRef = useRef(new Map<string, symbol>())
	const [isDragActive, setIsDragActive] = useState(false)
	const [generalError, setGeneralError] = useState<string | null>(null)
	const allowedFormats = normalizeFormats(formats)
	const acceptValue = buildAcceptValue(allowedFormats)

	const openFilePicker = () => {
		inputRef.current?.click()
	}

	const clearFileInput = () => {
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	const removeFile = (fileId: string) => {
		uploadTokensRef.current.delete(fileId)
		setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId))
		console.log('deleted')
	}

	const updateFile = (fileId: string, updater: (file: DropZoneFile) => DropZoneFile) => {
		setFiles(prevFiles =>
			prevFiles.map(file => {
				if (file.id !== fileId) {
					return file
				}

				return updater(file)
			}),
		)
	}

	const startUpload = async (fileId: string, sourceFile: File) => {
		const uploadToken = Symbol(fileId)
		uploadTokensRef.current.set(fileId, uploadToken)

		const result = await uploadFileMock({
			file: sourceFile,
			onProgress: progress => {
				if (uploadTokensRef.current.get(fileId) !== uploadToken) {
					return
				}

				updateFile(fileId, file => ({
					...file,
					progress,
				}))
			},
		})

		if (uploadTokensRef.current.get(fileId) !== uploadToken) {
			return
		}

		if (result[0] === 'success') {
			updateFile(fileId, file => ({
				...file,
				status: 'success',
				progress: 100,
				uri: result[1],
				errorMessage: null,
			}))
			return
		}

		updateFile(fileId, file => ({
			...file,
			status: 'error',
			progress: 0,
			uri: null,
			errorMessage: 'не удалось загрузить файл',
		}))
	}

	const retryUpload = (fileId: string) => {
		const fileToRetry = files.find(file => file.id === fileId)

		if (!fileToRetry?.file) {
			return
		}

		updateFile(fileId, file => ({
			...file,
			status: 'uploading',
			progress: 0,
			uri: null,
			errorMessage: null,
		}))

		void startUpload(fileId, fileToRetry.file)
	}

	const addFiles = (nextFiles: File[]) => {
		if (!nextFiles.length) {
			return
		}

		if (files.length + nextFiles.length > maxFiles) {
			setGeneralError(`Можно загрузить до ${maxFiles} файлов`)
			clearFileInput()
			return
		}

		setGeneralError(null)

		const preparedFiles = nextFiles.map<DropZoneFile>(file => {
			const extension = getFileExtension(file.name)
			const sizeMb = toSizeMb(file.size)
			const isFormatAllowed = isAllowedExtension(extension, allowedFormats)
			const isSizeAllowed = sizeMb <= maxFileMb

			if (!isFormatAllowed) {
				return {
					id: createDropZoneFileId(),
					file,
					title: file.name,
					extension,
					sizeMb,
					uri: null,
					status: 'error',
					progress: 0,
					errorMessage: 'недопустимый формат файла',
				}
			}

			if (!isSizeAllowed) {
				return {
					id: createDropZoneFileId(),
					file,
					title: file.name,
					extension,
					sizeMb,
					uri: null,
					status: 'error',
					progress: 0,
					errorMessage: 'Превышен максимальный размер файла',
				}
			}

			return {
				id: createDropZoneFileId(),
				file,
				title: file.name,
				extension,
				sizeMb,
				uri: null,
				status: 'uploading',
				progress: 0,
				errorMessage: null,
			}
		})

		setFiles(prevFiles => [...prevFiles, ...preparedFiles])

		preparedFiles.forEach(file => {
			if (file.status !== 'uploading' || !file.file) {
				return
			}

			void startUpload(file.id, file.file)
		})

		clearFileInput()
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		addFiles(Array.from(event.target.files ?? []))
	}

	const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragActive(true)
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragActive(true)
	}

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setIsDragActive(false)
		}
	}

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		setIsDragActive(false)
		addFiles(Array.from(event.dataTransfer.files))
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			openFilePicker()
		}
	}

	return (
		<div className={styles.root}>
			<div
				className={cn(styles.zone, isDragActive && styles.zoneActive, files.length === 0 && styles.zoneEmpty)}
				onClick={openFilePicker}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onKeyDown={handleKeyDown}
				role='button'
				tabIndex={0}
				aria-label='Зона загрузки файлов'
			>
				<input
					ref={inputRef}
					id={inputId}
					className={styles.hiddenInput}
					type='file'
					multiple
					accept={acceptValue}
					onChange={handleInputChange}
				/>

				{files.length === 0 ? (
					<button
						id={`${inputId}-empty-text`}
						type='button'
						className={styles.emptyStateButton}
						onClick={event => {
							event.stopPropagation()
							openFilePicker()
						}}
					>
						<span>Перетащите файлы</span>
						<span>или нажмите для загрузки</span>
						{addonText ? <div className='mt-1'>{addonText}</div> : null}
					</button>
				) : (
					<div className={styles.content}>
						<div className={styles.fileList}>
							{files.map(file => (
								<DropZoneFileItem
									key={file.id}
									file={file}
									onRemove={removeFile}
									onRetry={retryUpload}
								/>
							))}
						</div>

						<button
							type='button'
							className={styles.addFileButton}
							onClick={event => {
								event.stopPropagation()
								openFilePicker()
							}}
						>
							добавить файл
						</button>
					</div>
				)}
			</div>

			{generalError && <p className={styles.generalError}>{generalError}</p>}
		</div>
	)
}
