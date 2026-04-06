import { DropZone } from '@/components/shared/dropZone/DropZone'
import type { DropZoneFile } from '@/components/shared/dropZone/types'
import { memo, type Dispatch, type SetStateAction } from 'react'
import {
	addParticipantFormLink,
	participantFormStore,
	setParticipantFormField,
	updateParticipantFormLink,
	useParticipantFormFields,
	type LinkFieldName,
} from '../participantForm.store'

type LinkGroupConfig = {
	field: LinkFieldName
	title: string
}

const LINK_GROUPS: LinkGroupConfig[] = [
	{
		field: 'socialLinks',
		title: 'Ссылка на социальные сети',
	},
	{
		field: 'videoLinks',
		title: 'Ссылка на видео',
	},
	{
		field: 'mediaLinks',
		title: 'Ссылка на упоминание в СМИ',
	},
]

export const AdditionalInfoSection = memo(function AdditionalInfoSection() {
	const state = useParticipantFormFields(['socialLinks', 'videoLinks', 'mediaLinks', 'additionalFiles'] as const)

	const setAdditionalFiles: Dispatch<SetStateAction<DropZoneFile[]>> = nextValue => {
		const currentFiles = participantFormStore.get().additionalFiles
		const nextResolvedValue = typeof nextValue === 'function' ? nextValue(currentFiles) : nextValue

		setParticipantFormField('additionalFiles', nextResolvedValue)
	}

	return (
		<section className='pt-[90px] max-[700px]:pt-[72px]'>
			<h2 className='m-0  text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				Дополнительная информация
			</h2>

			<div className='mt-[34px] flex flex-col gap-[40px]'>
				{LINK_GROUPS.map(group => (
					<div key={group.field}>
						{state[group.field].map((link, index) => (
							<div
								key={`${group.field}-${index}`}
								className='relative flex flex-col'
							>
								<input
									type='url'
									placeholder={group.title}
									value={link}
									onChange={event => updateParticipantFormLink(group.field, index, event.target.value)}
								/>
							</div>
						))}

						{state[group.field].length < 3 ? (
							<div
								className='relative -mt-[12px] text-[14px]! max-[700px]:text-[10px] leading-[14px] max-[700px]:leading-[10px] font-normal text-[#152551] hover:underline cursor-pointer'
								onClick={() => addParticipantFormLink(group.field)}
							>
								+ Добавить ссылку
							</div>
						) : null}
					</div>
				))}
			</div>

			<div className='mt-[72px]'>
				<div className='max-w-[760px] text-[22px] leading-[1.2] font-normal text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]'>
					Подтверждающие документы
					<br />
					Награды, благодарности, опыт
				</div>

				<div className='mt-[16px]'>
					<DropZone
						files={state.additionalFiles}
						setFiles={setAdditionalFiles}
						maxFiles={5}
						maxFileMb={5}
					/>
				</div>
			</div>
		</section>
	)
})
