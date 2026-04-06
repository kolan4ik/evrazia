import { PATHS } from '@/configs/paths'

type Props = {
	confirmedEmail: string
}

export function EmailConfirmed(props: Props) {
	const { confirmedEmail } = props

	return (
		<div className='min-h-[420px] m-auto flex items-start justify-center text-center'>
			<div>
				<h2 className='max-[800px]:max-w-[300px]'>Регистрация подтверждена</h2>
				<div className='mt-[10px]'>
					Электронная почта подтверждена
					<br />
					<span className='font-medium'>{confirmedEmail}</span>
				</div>
				<a
					type='submit'
					className={`action-btn`}
					href={PATHS.auth.dashboard.root}
				>
					Перейти в кабинет
				</a>
			</div>
		</div>
	)
}
