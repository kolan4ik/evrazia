import { useEffect } from 'react'
import {
	buildParticipantFormPayload,
	isParticipantFormValid,
	participantFormStore,
	resetParticipantForm,
	setParticipantFormField,
	useParticipantFormFields,
	useParticipantFormSelector,
} from './participantForm.store'
import { ParticipantSuccessMessage } from './ParticipantSuccessMessage'
import { AdditionalInfoSection } from './sections/AdditionalInfoSection'
import { ApplicantSection } from './sections/ApplicantSection'
import { ConsentDocumentsSection } from './sections/ConsentDocumentsSection'
import { DevelopmentSection } from './sections/DevelopmentSection'
import { NomineeSection } from './sections/NomineeSection'
import { ParticipationSection } from './sections/ParticipationSection'
import { ProjectSection } from './sections/ProjectSection'

async function submitParticipantForm() {
	await new Promise(resolve => setTimeout(resolve, 2500))
	return { status: 'success' as const }
}

export function ParticipantForm() {
	const { isSubmitting, isSuccess } = useParticipantFormFields(['isSubmitting', 'isSuccess'] as const)
	const isFormValid = useParticipantFormSelector(isParticipantFormValid)
	const submitDisabled = isSubmitting || !isFormValid

	useEffect(() => {
		if (!isSuccess) {
			return
		}

		window.scrollTo({ top: 0, behavior: 'smooth' })
	}, [isSuccess])

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setParticipantFormField('isSubmitAttempted', true)

		const currentState = participantFormStore.get()
		const isCurrentFormValid = isParticipantFormValid(currentState)

		if (!isCurrentFormValid || currentState.isSubmitting) {
			return
		}

		if (submitDisabled) {
			return
		}

		const payload = buildParticipantFormPayload(currentState)
		console.log('Participant Form payload', payload)

		setParticipantFormField('isSubmitting', true)

		const result = await submitParticipantForm()

		setParticipantFormField('isSubmitting', false)

		if (result.status === 'success') {
			setParticipantFormField('isSuccess', true)
		}
	}

	const handleReset = () => {
		resetParticipantForm()
	}

	if (isSuccess) {
		return (
			<div>
				<ParticipantSuccessMessage />
				<button
					type='button'
					className='action-btn mx-auto'
					onClick={handleReset}
				>
					Новая заявка
				</button>
			</div>
		)
	}

	return (
		<form
			className={`form flex flex-col ${isSubmitting ? 'loading' : ''}`}
			onSubmit={handleSubmit}
		>
			<ApplicantSection />
			<NomineeSection />
			<ParticipationSection />
			<ProjectSection />
			<DevelopmentSection />
			<AdditionalInfoSection />
			<ConsentDocumentsSection />

			<div className='mt-[56px] flex flex-row items-center gap-x-[60px] gap-y-[24px] pb-[24px]'>
				<button
					type='submit'
					className={`action-btn w-[220px]! mt-0 ${isSubmitting ? 'loading' : ''} ${submitDisabled && !isSubmitting ? 'disabled' : ''}`}
					disabled={submitDisabled}
				>
					{isSubmitting ? 'Отправка...' : 'Подать заявку'}
				</button>

				<div className='self-center h-full text-[20px] bg-transparent border-0 p-0  leading-none font-regular uppercase text-[#b8b8b8] underline hover:no-underline  cursor-pointer max-[1000px]:text-[18px] max-[700px]:text-[16px]'>
					Сохранить черновик
				</div>
			</div>
		</form>
	)
}
