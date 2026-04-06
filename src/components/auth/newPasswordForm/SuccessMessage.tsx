import { PATHS } from '@/configs/paths'

export function SuccessMessage() {
	return (
		<div className='min-h-[420px] m-auto flex items-start justify-center text-center'>
			<div>
				<h2 className='max-[800px]:max-w-[300px]'>Пароль успешно изменён</h2>
				<div className='mt-[10px] max-w-[430px]'>Вы можете войти в личный кабинет, используя новый пароль.</div>
				<a
					type='submit'
					className={`action-btn m-auto`}
					href={PATHS.auth.dashboard.root}
				>
					Войти в кабинет
				</a>
			</div>
		</div>
	)
}
