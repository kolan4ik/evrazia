import { memo } from 'react'
import { setParticipantFormField, useParticipantFormFields } from '../participantForm.store'

const PROJECT_DESCRIPTION_LIMIT = 2000
const AUDIENCE_LIMIT = 1000

export const ProjectSection = memo(function ProjectSection() {
	const state = useParticipantFormFields(['projectName', 'projectDescription', 'projectAudience'] as const)

	return (
		<section className='pt-[90px] max-[700px]:pt-[72px]'>
			<h2 className='m-0  text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				О проекте
			</h2>

			<div className='mt-[34px] flex flex-col'>
				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Название проекта'
						value={state.projectName}
						onChange={event => setParticipantFormField('projectName', event.target.value)}
					/>
				</div>

				<div className='mt-[24px] flex flex-col'>
					<textarea
						className='compact'
						placeholder='Описание проекта&#10;Что это за проект, зачем он создан и где сейчас находится'
						rows={8}
						maxLength={PROJECT_DESCRIPTION_LIMIT}
						value={state.projectDescription}
						onChange={event => setParticipantFormField('projectDescription', event.target.value)}
					/>
				</div>

				<div className='mt-[34px] flex flex-col'>
					<textarea
						className='compact'
						placeholder='Кто ваша аудитория, её размер и география'
						rows={8}
						maxLength={AUDIENCE_LIMIT}
						value={state.projectAudience}
						onChange={event => setParticipantFormField('projectAudience', event.target.value)}
					/>
				</div>
			</div>
		</section>
	)
})
