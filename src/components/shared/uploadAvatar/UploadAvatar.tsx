import { cn } from '@/lib/utils'
import {
	useEffect,
	useId,
	useRef,
	useState,
	type ChangeEvent,
	type Dispatch,
	type DragEvent,
	type KeyboardEvent,
	type SetStateAction,
} from 'react'
import { buildAcceptValue, getFileExtension, isAllowedExtension, normalizeFormats, toSizeMb } from '../dropZone/helpers'
import { uploadFileMock } from '../dropZone/mockUpload'
import styles from './UploadAvatar.module.css'

type UploadAvatarProps = {
	imgUri?: string
	setImgUri: Dispatch<SetStateAction<string | undefined>>
}

const FORMATS = ['jpg', 'jpeg', 'png']
const MAX_FILE_MB = 5

export function UploadAvatar({ imgUri, setImgUri }: UploadAvatarProps) {
	const inputId = useId()
	const inputRef = useRef<HTMLInputElement | null>(null)
	const uploadTokenRef = useRef<symbol | null>(null)
	const localObjectUrlRef = useRef<string | null>(null)
	const [isDragActive, setIsDragActive] = useState(false)
	const [isPressed, setIsPressed] = useState(false)
	const [status, setStatus] = useState<'idle' | 'uploading' | 'error'>('idle')
	const allowedFormats = normalizeFormats(FORMATS)
	const acceptValue = buildAcceptValue(allowedFormats)

	useEffect(() => {
		return () => {
			if (localObjectUrlRef.current) {
				URL.revokeObjectURL(localObjectUrlRef.current)
			}
		}
	}, [])

	useEffect(() => {
		if (localObjectUrlRef.current && imgUri !== localObjectUrlRef.current) {
			URL.revokeObjectURL(localObjectUrlRef.current)
			localObjectUrlRef.current = null
		}
	}, [imgUri])

	const openFilePicker = () => {
		if (status === 'uploading') {
			return
		}

		inputRef.current?.click()
	}

	const clearInput = () => {
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	const setLocalPreview = (nextUri: string) => {
		if (localObjectUrlRef.current) {
			URL.revokeObjectURL(localObjectUrlRef.current)
		}

		localObjectUrlRef.current = nextUri
		setImgUri(nextUri)
	}

	const handleError = () => {
		setStatus('error')
		clearInput()
	}

	const validateFile = (file: File | null) => {
		if (!file) {
			return false
		}

		const extension = getFileExtension(file.name)
		const isValidFormat = isAllowedExtension(extension, allowedFormats)
		const isValidSize = toSizeMb(file.size) <= MAX_FILE_MB

		return isValidFormat && isValidSize
	}

	const uploadFile = async (file: File) => {
		setStatus('uploading')
		const uploadToken = Symbol(file.name)
		uploadTokenRef.current = uploadToken

		const result = await uploadFileMock({ file })

		if (uploadTokenRef.current !== uploadToken) {
			return
		}

		if (result[0] === 'fault') {
			handleError()
			return
		}

		setLocalPreview(URL.createObjectURL(file))
		setStatus('idle')
		clearInput()
	}

	const processFiles = (files: File[]) => {
		if (files.length !== 1) {
			handleError()
			return
		}

		const [file] = files

		if (!validateFile(file)) {
			handleError()
			return
		}

		void uploadFile(file)
	}

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		processFiles(Array.from(event.target.files ?? []))
	}

	const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		if (status === 'uploading') {
			return
		}

		setIsDragActive(true)
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()

		if (status === 'uploading') {
			return
		}

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

		if (status === 'uploading') {
			return
		}

		setIsDragActive(false)
		processFiles(Array.from(event.dataTransfer.files))
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (status === 'uploading') {
			return
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			openFilePicker()
		}
	}

	const hasImage = Boolean(imgUri)
	const hasError = status === 'error'
	const isUploading = status === 'uploading'

	return (
		<div className={cn(styles.root, isUploading && styles.rootDisabled)}>
			<div
				className={cn(
					styles.zone,
					(isDragActive || isPressed) && styles.zoneActive,
					isUploading && styles.zoneUploading,
					hasError && styles.zoneError,
				)}
				onClick={openFilePicker}
				onDragEnter={handleDragEnter}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onKeyDown={handleKeyDown}
				onMouseDown={() => setIsPressed(true)}
				onMouseUp={() => setIsPressed(false)}
				onMouseLeave={() => setIsPressed(false)}
				role='button'
				tabIndex={isUploading ? -1 : 0}
				aria-label='Загрузка фотографии'
				aria-disabled={isUploading}
			>
				<input
					ref={inputRef}
					id={inputId}
					className={styles.hiddenInput}
					type='file'
					accept={acceptValue}
					onChange={handleInputChange}
				/>

				{hasImage && !hasError && !isUploading ? (
					<img
						src={imgUri}
						alt='Загруженное фото'
						className={styles.image}
					/>
				) : null}

				{!hasImage && !hasError && !isUploading ? (
					<span
						className={styles.plusIcon}
						aria-hidden='true'
					>
						<span className={styles.plusLineHorizontal} />
						<span className={styles.plusLineVertical} />
					</span>
				) : null}

				{isUploading ? <span className={styles.statusText}>Загрузка...</span> : null}

				{hasError ? (
					<span className={styles.statusText}>
						Ошибка
						<br />
						загрузки
					</span>
				) : null}
			</div>

			<div className={styles.content}>
				{hasError ? (
					<p className={styles.errorMessage}>Не удалось загрузить фото. Проверьте формат и размер файла.</p>
				) : null}

				<button
					type='button'
					className={styles.action}
					onClick={openFilePicker}
					disabled={isUploading}
				>
					{hasImage ? 'Изменить фото' : 'Загрузить фото'}
				</button>

				<p className={styles.description}>
					Фото анфас, без головных уборов и тёмных очков. Формат: JPG или PNG, до 5 МБ
				</p>
			</div>
		</div>
	)
}
