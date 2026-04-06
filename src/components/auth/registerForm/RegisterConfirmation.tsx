export function RegisterConfirmation() {
	return (
		<div className='min-h-[420px] m-auto flex items-start justify-center text-center'>
			<div>
				<h2 className='max-[800px]:max-w-[300px]'>Подтверждение регистрации</h2>
				<div className='mt-[10px]'>
					Не пришло письмо? Проверьте папку «Спам»
					<br />
					или напишите в службу поддержки:
					<br />
					<a
						href='mailto:tech@premiyaevrazia.su'
						className='text-link'
					>
						tech@premiyaevrazia.su
					</a>
				</div>
			</div>
		</div>
	)
}
