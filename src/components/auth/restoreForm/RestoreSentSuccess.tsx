export function RestoreSentSuccess() {
	return (
		<div className='min-h-[420px]  m-auto flex items-start justify-center text-center'>
			<div>
				<h2 className='max-[800px]:max-w-[300px]'>Проверьте почту</h2>
				<div className='mt-[10px] max-w-[430px] text-center'>
					Мы отправили ссылку для восстановления пароля на указанный email. Перейдите по ссылке в письме, чтобы задать
					новый пароль.
				</div>
				<div className='mt-[30px] max-w-[430px] text-center'>
					Если письмо не пришло, проверьте папку «Спам» или попробуйте отправить ещё раз.
				</div>
				<button
					type='submit'
					className={`action-btn m-auto`}
				>
					Отправить повторно
				</button>
			</div>
		</div>
	)
}
