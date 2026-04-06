import { DropZone } from '@/components/shared/dropZone/DropZone'
import type { DropZoneFile } from '@/components/shared/dropZone/types'
import { memo, type Dispatch, type SetStateAction } from 'react'
import { participantFormStore, setParticipantFormField, useParticipantFormFields } from '../participantForm.store'

export const ConsentDocumentsSection = memo(function ConsentDocumentsSection() {
	const state = useParticipantFormFields(['personalDataConsentFiles', 'photoVideoConsentFiles'] as const)

	const setPersonalDataConsentFiles: Dispatch<SetStateAction<DropZoneFile[]>> = nextValue => {
		const currentFiles = participantFormStore.get().personalDataConsentFiles
		const nextResolvedValue = typeof nextValue === 'function' ? nextValue(currentFiles) : nextValue

		setParticipantFormField('personalDataConsentFiles', nextResolvedValue)
	}

	const setPhotoVideoConsentFiles: Dispatch<SetStateAction<DropZoneFile[]>> = nextValue => {
		const currentFiles = participantFormStore.get().photoVideoConsentFiles
		const nextResolvedValue = typeof nextValue === 'function' ? nextValue(currentFiles) : nextValue

		setParticipantFormField('photoVideoConsentFiles', nextResolvedValue)
	}

	return (
		<section className='pt-[90px] max-[700px]:pt-[72px]'>
			<h2 className='m-0  text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				Документы и согласия
			</h2>

			<div className='mt-[22px] max-w-[1020px] text-[22px] leading-[1.35] font-regular text-[#152551] max-[1000px]:text-[18px] max-[700px]:text-[16px]'>
				Скачивайте, подписывайте и загружайте документы, если заявка подаётся от имени несовершеннолетнего, её должен
				подписать законный представитель — родитель или официальный опекун.
			</div>

			<div className='mt-[48px] max-[700px]:mt-[24px] text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:text-[10px]'>
				Шаг 1. Скачайте документы
			</div>

			<div className='mt-[24px] flex flex-row flex-nowrap gap-[28px]'>
				<a
					href='#'
					className='bg-accent p-[10px] text-white-text text-center leading-[14px]  flex justify-center items-center rounded-[12px] hover:opacity-80 text-[14px]! normal-case! max-[700px]:text-[12px]! max-[700px]:leading-[12px]!'
				>
					Скачать согласие ПД
				</a>

				<a
					href='#'
					className='bg-accent p-[10px] text-white-text text-center leading-[14px]  flex justify-center items-center rounded-[12px] hover:opacity-80 text-[14px]! normal-case! max-[700px]:text-[12px]! max-[700px]:leading-[12px]!'
				>
					Скачать согласие на фото и видео
				</a>
			</div>

			<div className='mt-[48px] max-[700px]:mt-[24px]  text-[14px] leading-tight font-regular text-[#152551] max-[1000px]:text-[12px] max-[700px]:text-[10px]'>
				Шаг 2. Загрузите подписанные сканы
			</div>

			<div className='mt-[28px]'>
				<DropZone
					files={state.personalDataConsentFiles}
					setFiles={setPersonalDataConsentFiles}
					maxFiles={5}
					maxFileMb={5}
					addonText={'Скан согласия ПД'}
				/>
			</div>

			<div className='mt-[14px]'>
				<DropZone
					files={state.photoVideoConsentFiles}
					setFiles={setPhotoVideoConsentFiles}
					maxFiles={5}
					maxFileMb={5}
					addonText={'Скан согласия на фото и видео'}
				/>
			</div>
		</section>
	)
})
