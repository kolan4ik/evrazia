import { PATHS } from '@/configs/paths'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getApiErrorMessage } from '@/lib/api'

type LoginFormValues = {
	email: string
	password: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LoginForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [submitError, setSubmitError] = useState('')

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
		setSubmitError('')
		setIsLoading(true)

		try {
			const result = await api.auth.login({
				email: values.email.trim(),
				password: values.password,
			})

			if (result.status === 'error') {
				setSubmitError(getApiErrorMessage(result.payload, 'Неверный email или пароль'))
				setIsLoading(false)
				return
			}

			window.location.assign(PATHS.root)
		} catch (error) {
			setSubmitError(getApiErrorMessage(error, 'Неверный email или пароль'))
			setIsLoading(false)
		}
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
					type='password'
					placeholder='Пароль'
					disabled={isLoading}
					{...register('password', {
						required: 'Неверный пароль',
						minLength: {
							value: 6,
							message: 'Неверный пароль',
						},
					})}
				/>
				<div className={`error ${errors.password ? '' : 'hidden'}`}>{errors.password?.message ?? ''}</div>
			</div>

			<div className='relative w-fit'>
				<div className={`absolute left-0 top-[8px] w-full text-center text-accent ${submitError ? '' : 'invisible'}`}>
					{submitError || 'Неверный email или пароль'}
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
				className='text-link mt-[16px] self-start'
			>
				Забыли пароль?
			</a>
		</form>
	)
}
