import { PhoneWithConfirmation } from '@/components/shared/phoneWithConfirmation/PhoneWithConfirmation'
import { memo } from 'react'
import { setParticipantFormField, useParticipantFormFields } from '../participantForm.store'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const ApplicantSection = memo(function ApplicantSection() {
	const state = useParticipantFormFields([
		'applicantLastName',
		'applicantFirstName',
		'applicantPatronymic',
		'applicantNoPatronymic',
		'applicantEmail',
		'applicantPhone',
		'applicantPhoneConfirmed',
		'applicantActsForAnotherPerson',
	] as const)
	const hasEmailValue = state.applicantEmail.trim().length > 0
	const hasValidEmail = EMAIL_PATTERN.test(state.applicantEmail.trim())
	const emailError = hasEmailValue && !hasValidEmail ? 'Введите корректный email' : ''

	return (
		<section className='pt-0'>
			<h2 className='m-0  text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				Данные заявителя
			</h2>

			<div className='mt-[34px] flex flex-col'>
				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Фамилия'
						value={state.applicantLastName}
						onChange={event => setParticipantFormField('applicantLastName', event.target.value)}
					/>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Имя'
						value={state.applicantFirstName}
						onChange={event => setParticipantFormField('applicantFirstName', event.target.value)}
					/>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder={state.applicantNoPatronymic ? 'Отчество отсутствует' : 'Отчество'}
						value={state.applicantNoPatronymic ? '' : state.applicantPatronymic}
						onChange={event => setParticipantFormField('applicantPatronymic', event.target.value)}
						disabled={state.applicantNoPatronymic}
					/>

					<div className='absolute right-0 bottom-[14px]'>
						<label className='mt-[-24px] mb-[24px] text-[10px] leading-[10px] text-[#949494] flex flex-row gap-[10px] items-center'>
							<input
								type='checkbox'
								checked={state.applicantNoPatronymic}
								onChange={event => setParticipantFormField('applicantNoPatronymic', event.target.checked)}
							/>
							<div className='relative top-[2px]'>Нет отчества</div>
						</label>
					</div>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='email'
						placeholder='Электронная почта'
						value={state.applicantEmail}
						onChange={event => setParticipantFormField('applicantEmail', event.target.value)}
					/>
					<div className={`error ${emailError ? '' : 'hidden'}`}>{emailError}</div>
				</div>

				<div className='mt-[2px]'>
					<PhoneWithConfirmation
						phone={state.applicantPhone}
						setPhone={value => setParticipantFormField('applicantPhone', value)}
						isConfirmed={state.applicantPhoneConfirmed}
						setConfirmed={value => setParticipantFormField('applicantPhoneConfirmed', value)}
					/>
				</div>

				<label className='mt-0  flex flex-row gap-[10px] items-center max-[700px]:items-start'>
					<input
						type='checkbox'
						checked={state.applicantActsForAnotherPerson}
						onChange={event => setParticipantFormField('applicantActsForAnotherPerson', event.target.checked)}
					/>
					<div className='relative comment top-px'>Подаю заявку от лица другого человека</div>
				</label>
			</div>
		</section>
	)
})
