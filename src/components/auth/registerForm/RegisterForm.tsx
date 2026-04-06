import { PATHS } from '@/configs/paths'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RegisterConfirmation } from './RegisterConfirmation'

type RegisterFormValues = {
	lastName: string
	firstName: string
	patronymic: string
	noPatronymic: boolean
	email: string
	password: string
	passwordRepeat: string
	policyAccepted: boolean
	eventsAccepted: boolean
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_RULES_TEXT =
	'Минимум 6 символов, минимум одна заглавная буква, одна строчная, одна цифра и один спецсимвол.'

export function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		clearErrors,
		trigger,
	} = useForm<RegisterFormValues>({
		mode: 'onChange',
		defaultValues: {
			lastName: '',
			firstName: '',
			patronymic: '',
			noPatronymic: false,
			email: '',
			password: '',
			passwordRepeat: '',
			policyAccepted: false,
			eventsAccepted: false,
		},
	})

	const noPatronymic = watch('noPatronymic')
	const lastName = watch('lastName')
	const firstName = watch('firstName')
	const patronymic = watch('patronymic')
	const email = watch('email')
	const password = watch('password')
	const passwordRepeat = watch('passwordRepeat')
	const policyAccepted = watch('policyAccepted')

	useEffect(() => {
		if (noPatronymic) {
			clearErrors('patronymic')
		}
	}, [noPatronymic, clearErrors])

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
		formData.set('lastName', values.lastName)
		formData.set('firstName', values.firstName)
		formData.set('patronymic', values.patronymic)
		formData.set('noPatronymic', String(values.noPatronymic))
		formData.set('email', values.email)
		formData.set('password', values.password)
		formData.set('passwordRepeat', values.passwordRepeat)
		formData.set('policyAccepted', String(values.policyAccepted))
		formData.set('eventsAccepted', String(values.eventsAccepted))

		console.log('Register FormData', formData)
		console.log('Register FormData entries', Object.fromEntries(formData.entries()))

		setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 4000))
		setIsLoading(false)
		setIsSuccess(true)
	})

	const submitDisabled =
		isLoading ||
		!lastName.trim() ||
		!firstName.trim() ||
		(!noPatronymic && !patronymic.trim()) ||
		!email.trim() ||
		!password.trim() ||
		!passwordRepeat.trim() ||
		!policyAccepted

	if (isSuccess) {
		return <RegisterConfirmation />
	}

	return (
		<form
			className={`form flex flex-col ${isLoading ? 'loading' : ''}`}
			onSubmit={onSubmit}
		>
			{/* Фамилия */}
			<div className='relative flex flex-col'>
				<input
					type='text'
					placeholder='Фамилия'
					disabled={isLoading}
					{...register('lastName', {
						required: 'Укажите фамилию',
					})}
				/>
				<p className={`error ${errors.lastName ? '' : 'hidden'}`}>{errors.lastName?.message ?? ''}</p>
			</div>

			{/* Имя */}
			<div className='relative flex flex-col'>
				<input
					type='text'
					placeholder='Имя'
					disabled={isLoading}
					{...register('firstName', {
						required: 'Укажите имя',
					})}
				/>
				<p className={`error ${errors.firstName ? '' : 'hidden'}`}>{errors.firstName?.message ?? ''}</p>
			</div>

			{/* Отчество */}
			<div className='relative flex flex-col'>
				<input
					type='text'
					placeholder={noPatronymic ? 'Отчество отсутствует' : 'Отчество'}
					disabled={noPatronymic || isLoading}
					{...register('patronymic', {
						validate: value => noPatronymic || value.trim().length > 0 || 'Укажите отчество',
					})}
				/>

				<div className='absolute right-0 bottom-[14px]'>
					<label className='mt-[-24px] mb-[24px] text-[10px] leading-[10px] text-[#949494] flex flex-row gap-[10px] items-center'>
						<input
							type='checkbox'
							disabled={isLoading}
							{...register('noPatronymic')}
						/>
						<div className='relative top-[2px]'>Нет отчества</div>
					</label>
				</div>
				<div className={`error ${errors.patronymic ? '' : 'hidden'}`}>{errors.patronymic?.message ?? ''}</div>
			</div>

			{/* Email */}
			<div className='relative flex flex-col'>
				<input
					type='email'
					placeholder='Электронная почта'
					disabled={isLoading}
					{...register('email', {
						required: 'Укажите электронную почту',
						pattern: {
							value: EMAIL_PATTERN,
							message: 'Введите корректный email',
						},
					})}
				/>
				<p className={`error ${errors.email ? '' : 'hidden'}`}>{errors.email?.message ?? ''}</p>
			</div>

			{/* Пароль 1 */}
			<div className='relative flex flex-col'>
				<input
					type={showPassword ? 'text' : 'password'}
					placeholder='Пароль'
					disabled={isLoading}
					{...register('password', {
						required: 'Укажите пароль',
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
				className={`text-[14px] mb-[20px] -mt-[10px] leading-[16px] max-w-[400px] font-normal relative ${errors.password ? 'mt-[10px]' : ''}`}
			>
				{PASSWORD_RULES_TEXT}
			</div>

			{/* Пароль 2 */}
			<div className='relative flex flex-col'>
				<input
					type={showPasswordRepeat ? 'text' : 'password'}
					placeholder='Повторите пароль'
					disabled={isLoading}
					{...register('passwordRepeat', {
						required: 'Повторите пароль',
						validate: value => value === password || 'Пароли не совпадают',
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

			{/* Кнопка отправки */}
			<button
				type='submit'
				className={`action-btn ${isLoading ? 'loading' : ''} ${submitDisabled && !isLoading ? 'disabled' : ''}`}
				disabled={submitDisabled}
			>
				{isLoading ? 'Отправка...' : 'Отправить'}
			</button>

			{/* Чекбоксы */}
			<div className='mt-[22px] pb-[16px] max-w-[360px]'>
				<label className='text-[10px] leading-[16px] text-[#949494] flex flex-row gap-[10px] items-start'>
					<input
						type='checkbox'
						disabled={isLoading}
						{...register('policyAccepted', {
							required: 'Необходимо принять политику конфиденциальности',
						})}
					/>
					<div className='relative -top-[2px]'>
						Я принимаю{' '}
						<a
							href={PATHS.privacy}
							className='text-link-reverse'
							target='_blank'
							rel='noreferrer'
						>
							Политику конфиденциальности
						</a>{' '}
						и соглашаюсь на обработку персональных данных
					</div>
				</label>
				<p
					className={`error ${errors.policyAccepted ? '' : 'hidden'}`}
					style={{ position: 'static', marginTop: 6, paddingLeft: 22 }}
				>
					{errors.policyAccepted?.message ?? ''}
				</p>
			</div>

			<label className='mb-[8px] text-[10px] leading-[16px] text-[#949494] flex flex-row gap-[10px] items-start'>
				<input
					type='checkbox'
					disabled={isLoading}
					{...register('eventsAccepted')}
				/>
				<div className='relative -top-px'>Хочу получать информацию о событиях и новостях</div>
			</label>
		</form>
	)
}
