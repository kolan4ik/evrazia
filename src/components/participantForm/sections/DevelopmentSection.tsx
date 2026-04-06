import { memo } from 'react'
import { setParticipantFormField, useParticipantFormFields } from '../participantForm.store'

const LONG_LIMIT = 2000
const SHORT_LIMIT = 1000

type DevelopmentFieldProps = {
	value: string
	onChange: (value: string) => void
	placeholder: string
	maxLength: number
}

function DevelopmentField({ value, onChange, placeholder, maxLength }: DevelopmentFieldProps) {
	return (
		<div className='mt-[34px] flex flex-col first:mt-0'>
			<textarea
				className='compact'
				placeholder={placeholder}
				rows={8}
				maxLength={maxLength}
				value={value}
				onChange={event => onChange(event.target.value)}
			/>
		</div>
	)
}

export const DevelopmentSection = memo(function DevelopmentSection() {
	const state = useParticipantFormFields([
		'projectUniqueness',
		'projectSocialImpact',
		'projectGoals',
		'projectSupport',
		'projectResources',
	] as const)

	return (
		<section className='pt-[90px] max-[700px]:pt-[72px]'>
			<h2 className='m-0 text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				Развитие проекта
			</h2>

			<div className='mt-[34px] flex flex-col'>
				<DevelopmentField
					value={state.projectUniqueness}
					onChange={value => setParticipantFormField('projectUniqueness', value)}
					placeholder='В чем уникальность проекта? Что вы делаете иначе, чем другие?'
					maxLength={LONG_LIMIT}
				/>

				<DevelopmentField
					value={state.projectSocialImpact}
					onChange={value => setParticipantFormField('projectSocialImpact', value)}
					placeholder='В чем социальная значимость проекта? Как меняется общество с вашей помощью?'
					maxLength={LONG_LIMIT}
				/>

				<DevelopmentField
					value={state.projectGoals}
					onChange={value => setParticipantFormField('projectGoals', value)}
					placeholder='Какие у проекта новые цели, вызовы, ожидаемые достижения?'
					maxLength={SHORT_LIMIT}
				/>

				<DevelopmentField
					value={state.projectSupport}
					onChange={value => setParticipantFormField('projectSupport', value)}
					placeholder='С чьей помощью или поддержкой реализуется проект? Лидеры мнений, меценаты, органы власти, общественные организации? Кто именно'
					maxLength={SHORT_LIMIT}
				/>

				<DevelopmentField
					value={state.projectResources}
					onChange={value => setParticipantFormField('projectResources', value)}
					placeholder='Какие дополнительные ресурсы помогут вам в реализации проекта? Гранты, реклама, административный ресурс и т.д. На сколько проект может стать более масштабным?'
					maxLength={SHORT_LIMIT}
				/>
			</div>
		</section>
	)
})
