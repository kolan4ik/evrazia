import { PATHS } from '@/configs/paths'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type LoginFormValues = {
	email: string
	password: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isFault, setIsFault] = useState(false)
	const [showPassword, setShowPassword] = useState(false)


	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginFormValues>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const email = watch('email')
	const password = watch('password')

	const onSubmit = handleSubmit(async (values) => {
		if (isLoading) return

		const formData = new FormData()
		formData.set('email', values.email)
		formData.set('password', values.password)

		console.log('Login FormData', formData)
		console.log('Login FormData entries', Object.fromEntries(formData.entries()))

		setIsFault(false)
		setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 4000))
		setIsLoading(false)
		setIsFault(true)
	})

	const submitDisabled = isLoading || !email.trim() || !password.trim()

	return (
		<form
			className={`form flex flex-col ${isLoading ? 'loading' : ''}`}
			onSubmit={onSubmit}
		>
			<div className='relative flex flex-col'>
				<input
					type='email'
					placeholder='Электронная почта'
					disabled={isLoading}
					{...register('email', {
						required: 'Введите корректный email',
						pattern: {
							value: EMAIL_PATTERN,
							message: 'Введите корректный email',
						},
					})}
				/>
				<p className={`error ${errors.email ? '' : 'hidden'}`}>{errors.email?.message ?? ''}</p>
			</div>

			<div className='relative flex flex-col'>
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder='Пароль'
					disabled={isLoading}
					className='pr-10'
					{...register('password', {
						required: 'Неверный пароль',
						minLength: {
							value: 6,
							message: 'Неверный пароль',
						},
					})}
				/>
				<button
					type='button'
					className='absolute right-5 top-5 cursor-pointer opacity-80 hover:opacity-100 transition-opacity'
					onClick={() => setShowPassword(prev => !prev)}
					aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
					disabled={isLoading}
				>
					<img
						src={showPassword ? '/images/eye-show.svg' : '/images/eye-hide.svg'}
						alt=''
						width={18}
						height={18}
					/>
				</button>
				<div className={`error ${errors.password ? '' : 'hidden'}`}>{errors.password?.message ?? ''}</div>
			</div>

			<div className='relative w-fit'>
				<div className={`absolute left-0 top-2 w-full text-center text-accent ${isFault ? '' : 'invisible'}`}>
					Неверный email или пароль
				</div>
				<button
					type='submit'
					className={` action-btn ${isLoading ? 'loading' : ''} ${submitDisabled && !isLoading ? 'disabled' : ''}`}
					disabled={submitDisabled}
				>
					Войти
				</button>
			</div>

			<a
				href={PATHS.auth.restore}
				className='text-link mt-4 self-start'
			>
				Забыли пароль?
			</a>
		</form>
	)
}
