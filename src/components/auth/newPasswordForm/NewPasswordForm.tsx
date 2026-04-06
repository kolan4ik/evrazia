import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SuccessMessage } from './SuccessMessage'

type NewPasswordFormValues = {
	password: string
	passwordRepeat: string
}

const PASSWORD_RULES_TEXT = 'Пароль: не менее 6 символов, буквы в разных регистрах, цифра и спецсимвол.'

export function NewPasswordForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		trigger,
	} = useForm<NewPasswordFormValues>({
		mode: 'onChange',
		defaultValues: {
			password: '',
			passwordRepeat: '',
		},
	})

	const password = watch('password')
	const passwordRepeat = watch('passwordRepeat')

	useEffect(() => {
		if (passwordRepeat) {
			void trigger('passwordRepeat')
		}
	}, [password, passwordRepeat, trigger])

	useEffect(() => {
		if (!isSuccess) {
			return
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [isSuccess])

	const onSubmit = handleSubmit(async (values) => {
		if (isLoading) return

		const formData = new FormData()
		formData.set('password', values.password)
		formData.set('passwordRepeat', values.passwordRepeat)

		console.log('New Password FormData', formData)
		console.log('New Password FormData entries', Object.fromEntries(formData.entries()))

		setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 2500))
		setIsLoading(false)
		setIsSuccess(true)
	})

	const submitDisabled = isLoading || !password.trim() || !passwordRepeat.trim()

	if (isSuccess) {
		return <SuccessMessage />
	}

	return (
		<form
			className={`form flex flex-col ${isLoading ? 'loading' : ''}`}
			onSubmit={onSubmit}
		>
			<div className='relative flex flex-col'>
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder='Новый пароль'
					disabled={isLoading}
					{...register('password', {
						required: 'Укажите новый пароль',
						validate: value => {
							if (value.length < 6) return 'Пароль должен содержать минимум 6 символов'
							if (!/[a-z]/.test(value)) return 'Пароль должен содержать хотя бы одну строчную букву'
							if (!/[A-Z]/.test(value)) return 'Пароль должен содержать хотя бы одну заглавную букву'
							if (!/\d/.test(value)) return 'Пароль должен содержать хотя бы одну цифру'
							if (!/[^A-Za-z0-9]/.test(value)) return 'Пароль должен содержать хотя бы один спецсимвол'
							return true
						},
					})}
				/>
				<button
					type='button'
					className='absolute right-[20px] top-[20px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity'
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

			<div
				className={`text-[14px] mb-[20px] -mt-[10px] leading-[16px] max-w-[350px] font-normal relative ${errors.password ? 'mt-[10px]' : ''}`}
			>
				{PASSWORD_RULES_TEXT}
			</div>

			<div className='relative flex flex-col'>
				<input
					type={showPasswordRepeat ? 'text' : 'password'}
					placeholder='Повторите пароль'
					disabled={isLoading}
					{...register('passwordRepeat', {
						required: 'Повторите пароль',
						validate: value => value === password || 'Пароли должны совпадать',
					})}
				/>
				<button
					type='button'
					className='absolute right-[20px] top-[20px] cursor-pointer opacity-80 hover:opacity-100 transition-opacity'
					onClick={() => setShowPasswordRepeat(prev => !prev)}
					aria-label={showPasswordRepeat ? 'Скрыть пароль' : 'Показать пароль'}
					disabled={isLoading}
				>
					<img
						src={showPasswordRepeat ? '/images/eye-show.svg' : '/images/eye-hide.svg'}
						alt=''
						width={18}
						height={18}
					/>
				</button>
				<div className={`error ${errors.passwordRepeat ? '' : 'hidden'}`}>{errors.passwordRepeat?.message ?? ''}</div>
			</div>

			<button
				type='submit'
				className={`action-btn ${isLoading ? 'loading' : ''} ${submitDisabled && !isLoading ? 'disabled' : ''}`}
				disabled={submitDisabled}
			>
				Сохранить пароль
			</button>
		</form>
	)
}
