import styles from './DropZone.module.css'

type UploadProgressBarProps = {
	progress: number
}

export function UploadProgressBar({ progress }: UploadProgressBarProps) {
	return (
		<div
			className={styles.progressTrack}
			aria-hidden='true'
		>
			<div
				className={styles.progressFill}
				style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
			/>
		</div>
	)
}
