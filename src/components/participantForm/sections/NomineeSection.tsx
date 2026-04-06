import { ChevronIcon } from '@/components/shared/customSelect/ChevronIcon'
import { DatePicker } from '@/components/shared/datePicker/DatePicker'
import { UploadAvatar } from '@/components/shared/uploadAvatar/UploadAvatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { countries } from '@/data/countries'
import { cn } from '@/lib/utils'
import { memo, type Dispatch, type SetStateAction } from 'react'
import { GENDER_VARIANTS, setParticipantFormField, useParticipantFormFields } from '../participantForm.store'

const SELECT_TRIGGER_CLASSNAME = cn(
	'group mt-[14px] mb-[22px] flex h-auto! w-full! justify-between gap-4 rounded-none border-0 border-b border-[#dcdcdc] bg-transparent px-[20px] pb-[8px] pt-[14px] text-left shadow-none ring-0',
	'focus-visible:border-[#152551] focus-visible:ring-0',
	'data-[state=open]:border-[#152551]',
	'max-[768px]:px-[14px]',
	'[&>span[data-slot=select-value]]:block [&>span[data-slot=select-value]]:min-w-0 [&>span[data-slot=select-value]]:flex-1 [&>span[data-slot=select-value]]:truncate',
	'[&>span[data-slot=select-value]]:text-[22px] [&>span[data-slot=select-value]]:font-light [&>span[data-slot=select-value]]:leading-[1.2]',
	'[&>span[data-slot=select-value]]:text-[#152551] data-[placeholder]:[&>span[data-slot=select-value]]:text-[#a0a0a0]',
	'max-[1200px]:[&>span[data-slot=select-value]]:text-[18px] max-[768px]:[&>span[data-slot=select-value]]:text-[16px]',
)
const SELECT_CONTENT_CLASSNAME = cn(
	'select-accent-scrollbar z-50 h-[400px] w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] overflow-hidden rounded-[16px] border-0 bg-white p-0 shadow-[0_26px_70px_rgba(21,37,81,0.14)] ring-0',
	'max-[1200px]:h-[360px] max-[768px]:h-[320px] max-[768px]:rounded-[12px]',
	'[&_[data-slot=select-viewport]]:h-full [&_[data-slot=select-viewport]]:w-full [&_[data-slot=select-viewport]]:min-w-0! [&_[data-slot=select-viewport]]:p-[8px]',
	'max-[768px]:[&_[data-slot=select-viewport]]:p-[6px]',
	'[&_[data-slot=select-scroll-down-button]]:bg-white [&_[data-slot=select-scroll-up-button]]:bg-white',
	'[&_[data-slot=select-scroll-down-button]]:text-accent [&_[data-slot=select-scroll-up-button]]:text-accent',
)
const SELECT_ITEM_CLASSNAME = cn(
	'min-h-0 rounded-[10px] px-[24px] py-[10px] text-left text-[22px] font-normal leading-[1.25] text-[#949494] outline-none',
	'focus:bg-[#F5F5F5] focus:text-accent data-[state=checked]:text-accent',
	'max-[1200px]:text-[18px] max-[768px]:px-[16px] max-[768px]:py-[8px] max-[768px]:text-[16px]',
	'[&_[data-slot=select-item-indicator]]:hidden',
)

export const NomineeSection = memo(function NomineeSection() {
	const state = useParticipantFormFields([
		'nomineeLastName',
		'nomineeFirstName',
		'nomineePatronymic',
		'nomineeNoPatronymic',
		'nomineeCountry',
		'nomineeLocality',
		'nomineeCitizenship',
		'nomineeBirthDate',
		'nomineeGender',
		'nomineePhotoUri',
	] as const)

	const setNomineePhotoUri: Dispatch<SetStateAction<string | undefined>> = nextValue => {
		const nextResolvedValue = typeof nextValue === 'function' ? nextValue(state.nomineePhotoUri) : nextValue

		setParticipantFormField('nomineePhotoUri', nextResolvedValue)
	}

	return (
		<section className='pt-[90px] max-[700px]:pt-[72px]'>
			<h2 className='m-0  text-accent normal-case text-[28px] leading-[36px] font-medium max-[1000px]:text-[26px] max-[1000px]:leading-[34px] max-[700px]:text-[22px] max-[700px]:leading-[28px]'>
				Данные номинанта
			</h2>

			<div className='mt-[34px] flex flex-col'>
				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Фамилия'
						value={state.nomineeLastName}
						onChange={event => setParticipantFormField('nomineeLastName', event.target.value)}
					/>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Имя'
						value={state.nomineeFirstName}
						onChange={event => setParticipantFormField('nomineeFirstName', event.target.value)}
					/>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder={state.nomineeNoPatronymic ? 'Отчество отсутствует' : 'Отчество'}
						value={state.nomineeNoPatronymic ? '' : state.nomineePatronymic}
						onChange={event => setParticipantFormField('nomineePatronymic', event.target.value)}
						disabled={state.nomineeNoPatronymic}
					/>

					<div className='absolute right-0 bottom-[14px]'>
						<label className='mt-[-24px] mb-[24px] text-[10px] leading-[10px] text-[#949494] flex flex-row gap-[10px] items-center'>
							<input
								type='checkbox'
								checked={state.nomineeNoPatronymic}
								onChange={event => setParticipantFormField('nomineeNoPatronymic', event.target.checked)}
							/>
							<div className='relative top-[2px]'>Нет отчества</div>
						</label>
					</div>
				</div>

				<div className='relative flex flex-col'>
					<Select
						value={state.nomineeCountry || undefined}
						onValueChange={value => setParticipantFormField('nomineeCountry', value)}
					>
						<SelectTrigger
							className={SELECT_TRIGGER_CLASSNAME}
							icon={
								<span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
									<ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
								</span>
							}
						>
							<SelectValue placeholder='Страна' />
						</SelectTrigger>
						<SelectContent
							position='popper'
							side='bottom'
							align='start'
							sideOffset={-8}
							className={SELECT_CONTENT_CLASSNAME}
						>
							{countries.map(variant => (
								<SelectItem
									key={variant}
									value={variant}
									className={SELECT_ITEM_CLASSNAME}
								>
									{variant}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='relative flex flex-col'>
					<input
						type='text'
						placeholder='Населенный пункт'
						value={state.nomineeLocality}
						onChange={event => setParticipantFormField('nomineeLocality', event.target.value)}
					/>
				</div>

				<div className='relative flex flex-col'>
					<Select
						value={state.nomineeCitizenship || undefined}
						onValueChange={value => setParticipantFormField('nomineeCitizenship', value)}
					>
						<SelectTrigger
							className={SELECT_TRIGGER_CLASSNAME}
							icon={
								<span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
									<ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
								</span>
							}
						>
							<SelectValue placeholder='Гражданство' />
						</SelectTrigger>
						<SelectContent
							position='popper'
							side='bottom'
							align='start'
							sideOffset={-8}
							className={SELECT_CONTENT_CLASSNAME}
						>
							{countries.map(variant => (
								<SelectItem
									key={variant}
									value={variant}
									className={SELECT_ITEM_CLASSNAME}
								>
									{variant}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<div className='relative flex flex-col'>
					<DatePicker
						date={state.nomineeBirthDate}
						setDate={value => setParticipantFormField('nomineeBirthDate', value)}
						placeholder='Дата рождения'
					/>
				</div>

				<div className='relative flex flex-col'>
					<Select
						value={state.nomineeGender || undefined}
						onValueChange={value => setParticipantFormField('nomineeGender', value)}
					>
						<SelectTrigger
							className={SELECT_TRIGGER_CLASSNAME}
							icon={
								<span className='flex shrink-0 items-center justify-center text-accent transition-colors duration-200 group-hover:text-[#A87242]'>
									<ChevronIcon className='transition-transform duration-200 group-data-[state=open]:rotate-180' />
								</span>
							}
						>
							<SelectValue placeholder='Пол' />
						</SelectTrigger>
						<SelectContent
							position='popper'
							side='bottom'
							align='start'
							sideOffset={-8}
							className={SELECT_CONTENT_CLASSNAME}
						>
							{GENDER_VARIANTS.map(variant => (
								<SelectItem
									key={variant}
									value={variant}
									className={SELECT_ITEM_CLASSNAME}
								>
									{variant}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className='mt-[54px]'>
				<div className='text-[28px] leading-[1.2] font-regular text-[#152551] max-[1000px]:text-[24px] max-[700px]:text-[20px]'>
					Фото номинанта
				</div>

				<div className='mt-[24px]'>
					<UploadAvatar
						imgUri={state.nomineePhotoUri}
						setImgUri={setNomineePhotoUri}
					/>
				</div>
			</div>
		</section>
	)
})
