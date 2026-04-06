import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RestoreSentSuccess } from './RestoreSentSuccess'

type RestoreFormValues = {
	email: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function RestoreForm() {
	const [isLoading, setIsLoading] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<RestoreFormValues>({
		mode: 'onChange',
		defaultValues: {
			email: '',
		},
	})

	const email = watch('email')

	useEffect(() => {
		if (!isSuccess) {
			return
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [isSuccess])

	const onSubmit = handleSubmit(async (values) => {
		if (isLoading) return

		const formData = new FormData()
		formData.set('email', values.email)

		console.log('Restore FormData', formData)
		console.log('Restore FormData entries', Object.fromEntries(formData.entries()))

		setIsLoading(true)
		await new Promise(resolve => setTimeout(resolve, 2500))
		setIsLoading(false)
		setIsSuccess(true)
	})

	const submitDisabled = isLoading || !email.trim()

	if (isSuccess) {
		return <RestoreSentSuccess />
	}

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
						required: 'Укажите электронную почту',
						pattern: {
							value: EMAIL_PATTERN,
							message: 'Введите корректный email',
						},
					})}
				/>
				<p className={`error ${errors.email ? '' : 'hidden'}`}>{errors.email?.message ?? ''}</p>
			</div>

			<button
				type='submit'
				className={`action-btn ${isLoading ? 'loading' : ''} ${submitDisabled && !isLoading ? 'disabled' : ''}`}
				disabled={submitDisabled}
			>
				Отправить ссылку
			</button>
		</form>
	)
}
