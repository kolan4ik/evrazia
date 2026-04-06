import { formatSizeMb } from './helpers'
import { UploadProgressBar } from './UploadProgressBar'
import type { DropZoneFile } from './types'
import styles from './DropZone.module.css'

type DropZoneFileItemProps = {
	file: DropZoneFile
	onRemove: (fileId: string) => void
	onRetry: (fileId: string) => void
}

function FileIcon({ hasError }: { hasError: boolean }) {
	return (
		<svg
			className={styles.fileIcon}
			width='20'
			height='20'
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d='M5.16663 1.66669H11.8333L15.8333 5.66669V16.6667C15.8333 17.5872 15.0871 18.3334 14.1666 18.3334H5.83329C4.91282 18.3334 4.16663 17.5872 4.16663 16.6667V3.33335C4.16663 2.41288 4.91282 1.66669 5.83329 1.66669H5.16663Z'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M11.6666 1.66669V5.83335H15.8333'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path
				d='M7.5 10H12.5'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
			<path
				d='M7.5 13.3333H11.6667'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

function RemoveIcon() {
	return (
		<svg
			width='12'
			height='12'
			viewBox='0 0 12 12'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			aria-hidden='true'
		>
			<path
				d='M2 2L10 10'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
			<path
				d='M10 2L2 10'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
			/>
		</svg>
	)
}

export function DropZoneFileItem({ file, onRemove, onRetry }: DropZoneFileItemProps) {
	const isUploading = file.status === 'uploading'
	const isError = file.status === 'error'

	return (
		<div className={styles.fileItem}>
			<div className={styles.fileRow}>
				<div className={`${styles.fileMeta} ${isError ? styles.fileMetaError : ''}`}>
					<div className={styles.fileIconWrap}>
						<FileIcon hasError={isError} />
					</div>
					<span
						className={styles.fileTitle}
						title={file.title}
					>
						{file.title}
					</span>
				</div>

				<div className={styles.fileActions}>
					{isUploading ? (
						<div className={styles.uploadState}>
							<span className={styles.progressValue}>{file.progress}%</span>
							<UploadProgressBar progress={file.progress} />
						</div>
					) : (
						<span className={`${styles.fileSize} ${isError ? styles.fileSizeError : ''}`}>
							{formatSizeMb(file.sizeMb)}
						</span>
					)}

					<button
						type='button'
						className={styles.iconButton}
						onClick={event => {
							event.stopPropagation()
							onRemove(file.id)
						}}
						aria-label={`Удалить файл ${file.title}`}
					>
						<RemoveIcon />
					</button>
				</div>
			</div>

			{isError && (
				<div className={styles.fileErrorRow}>
					<span>{file.errorMessage ?? 'не удалось загрузить файл'}</span>
					<button
						type='button'
						className={styles.retryButton}
						onClick={event => {
							event.stopPropagation()
							onRetry(file.id)
						}}
					>
						повторить
					</button>
				</div>
			)}
		</div>
	)
}
