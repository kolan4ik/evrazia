import { useSyncExternalStore } from 'react'
import { map } from 'nanostores'
import type { DropZoneFile } from '@/components/shared/dropZone/types'
import { isPhoneValid } from '@/components/shared/phoneWithConfirmation/phoneConfirmation.utils'

export const PARTICIPATION_VARIANTS = [
	'Физическое лицо',
	'Юридическое лицо',
	'Творческий коллектив',
] as const

export const GENDER_VARIANTS = ['Женский', 'Мужской'] as const

export const LINK_GROUP_LIMIT = 3

export type LinkFieldName = 'socialLinks' | 'videoLinks' | 'mediaLinks'

export type ParticipantFormState = {
	applicantLastName: string
	applicantFirstName: string
	applicantPatronymic: string
	applicantNoPatronymic: boolean
	applicantEmail: string
	applicantPhone: string
	applicantPhoneConfirmed: boolean
	applicantActsForAnotherPerson: boolean
	nomineeLastName: string
	nomineeFirstName: string
	nomineePatronymic: string
	nomineeNoPatronymic: boolean
	nomineeCountry: string
	nomineeLocality: string
	nomineeCitizenship: string
	nomineeBirthDate: string
	nomineeGender: string
	nomineePhotoUri?: string
	participationType: string
	participationEntityName: string
	projectName: string
	projectDescription: string
	projectAudience: string
	projectUniqueness: string
	projectSocialImpact: string
	projectGoals: string
	projectSupport: string
	projectResources: string
	socialLinks: string[]
	videoLinks: string[]
	mediaLinks: string[]
	additionalFiles: DropZoneFile[]
	personalDataConsentFiles: DropZoneFile[]
	photoVideoConsentFiles: DropZoneFile[]
	isSubmitting: boolean
	isSuccess: boolean
	isSubmitAttempted: boolean
}

const INITIAL_STATE: ParticipantFormState = {
	applicantLastName: '',
	applicantFirstName: '',
	applicantPatronymic: '',
	applicantNoPatronymic: false,
	applicantEmail: '',
	applicantPhone: '',
	applicantPhoneConfirmed: false,
	applicantActsForAnotherPerson: false,
	nomineeLastName: '',
	nomineeFirstName: '',
	nomineePatronymic: '',
	nomineeNoPatronymic: false,
	nomineeCountry: '',
	nomineeLocality: '',
	nomineeCitizenship: '',
	nomineeBirthDate: '',
	nomineeGender: '',
	nomineePhotoUri: undefined,
	participationType: '',
	participationEntityName: '',
	projectName: '',
	projectDescription: '',
	projectAudience: '',
	projectUniqueness: '',
	projectSocialImpact: '',
	projectGoals: '',
	projectSupport: '',
	projectResources: '',
	socialLinks: [''],
	videoLinks: [''],
	mediaLinks: [''],
	additionalFiles: [],
	personalDataConsentFiles: [],
	photoVideoConsentFiles: [],
	isSubmitting: false,
	isSuccess: false,
	isSubmitAttempted: false,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PARTICIPATION_TYPES_WITH_ENTITY = new Set(['Юридическое лицо', 'Творческий коллектив'])

export const participantFormStore = map<ParticipantFormState>(INITIAL_STATE)

export function useParticipantFormStore() {
	return useSyncExternalStore(
		onChange => participantFormStore.listen(() => onChange()),
		() => participantFormStore.get(),
		() => participantFormStore.get(),
	)
}

function shallowEqualObjects<T extends Record<string, unknown>>(left: T, right: T) {
	if (left === right) {
		return true
	}

	const leftKeys = Object.keys(left)
	const rightKeys = Object.keys(right)

	if (leftKeys.length !== rightKeys.length) {
		return false
	}

	return leftKeys.every(key => Object.is(left[key], right[key]))
}

export function useParticipantFormSelector<T>(
	selector: (state: ParticipantFormState) => T,
	isEqual: (left: T, right: T) => boolean = Object.is,
) {
	let cachedSnapshot: T | undefined
	let hasCachedSnapshot = false

	const getSnapshot = () => {
		const nextSnapshot = selector(participantFormStore.get())

		if (hasCachedSnapshot && isEqual(cachedSnapshot as T, nextSnapshot)) {
			return cachedSnapshot as T
		}

		cachedSnapshot = nextSnapshot
		hasCachedSnapshot = true
		return nextSnapshot
	}

	return useSyncExternalStore(
		onChange => participantFormStore.listen(() => onChange()),
		getSnapshot,
		getSnapshot,
	)
}

export function useParticipantFormFields<const K extends readonly (keyof ParticipantFormState)[]>(fields: K) {
	return useParticipantFormSelector(
		state => {
			const snapshot = {} as Pick<ParticipantFormState, K[number]>

			for (const field of fields) {
				snapshot[field] = state[field]
			}

			return snapshot
		},
		shallowEqualObjects,
	)
}

export function setParticipantFormField<K extends keyof ParticipantFormState>(
	field: K,
	value: ParticipantFormState[K],
) {
	participantFormStore.setKey(field, value)
}

export function updateParticipantForm(updater: (current: ParticipantFormState) => ParticipantFormState) {
	participantFormStore.set(updater(participantFormStore.get()))
}

export function addParticipantFormLink(field: LinkFieldName) {
	const currentLinks = participantFormStore.get()[field]

	if (currentLinks.length >= LINK_GROUP_LIMIT) {
		return
	}

	participantFormStore.setKey(field, [...currentLinks, ''])
}

export function updateParticipantFormLink(field: LinkFieldName, index: number, value: string) {
	const currentLinks = participantFormStore.get()[field]
	const nextLinks = currentLinks.map((item, itemIndex) => (itemIndex === index ? value : item))

	participantFormStore.setKey(field, nextLinks)
}

export function hasSuccessfulFiles(files: DropZoneFile[]) {
	return files.some(file => file.status === 'success' && file.uri)
}

export function buildParticipantFormPayload(state: ParticipantFormState) {
	return {
		applicant: {
			lastName: state.applicantLastName,
			firstName: state.applicantFirstName,
			patronymic: state.applicantPatronymic,
			noPatronymic: state.applicantNoPatronymic,
			email: state.applicantEmail,
			phone: state.applicantPhone,
			phoneConfirmed: state.applicantPhoneConfirmed,
			actsForAnotherPerson: state.applicantActsForAnotherPerson,
		},
		nominee: {
			lastName: state.nomineeLastName,
			firstName: state.nomineeFirstName,
			patronymic: state.nomineePatronymic,
			noPatronymic: state.nomineeNoPatronymic,
			country: state.nomineeCountry,
			locality: state.nomineeLocality,
			citizenship: state.nomineeCitizenship,
			birthDate: state.nomineeBirthDate,
			gender: state.nomineeGender,
			photoUri: state.nomineePhotoUri,
		},
		participation: {
			type: state.participationType,
			entityName: PARTICIPATION_TYPES_WITH_ENTITY.has(state.participationType) ? state.participationEntityName : '',
		},
		project: {
			name: state.projectName,
			description: state.projectDescription,
			audience: state.projectAudience,
			uniqueness: state.projectUniqueness,
			socialImpact: state.projectSocialImpact,
			goals: state.projectGoals,
			support: state.projectSupport,
			resources: state.projectResources,
		},
		additionalInfo: {
			socialLinks: state.socialLinks.filter(link => link.trim()),
			videoLinks: state.videoLinks.filter(link => link.trim()),
			mediaLinks: state.mediaLinks.filter(link => link.trim()),
			files: state.additionalFiles
				.filter(file => file.status === 'success' && file.uri)
				.map(file => ({
					title: file.title,
					extension: file.extension,
					sizeMb: file.sizeMb,
					uri: file.uri,
				})),
		},
		consents: {
			personalData: state.personalDataConsentFiles
				.filter(file => file.status === 'success' && file.uri)
				.map(file => ({
					title: file.title,
					extension: file.extension,
					sizeMb: file.sizeMb,
					uri: file.uri,
				})),
			photoVideo: state.photoVideoConsentFiles
				.filter(file => file.status === 'success' && file.uri)
				.map(file => ({
					title: file.title,
					extension: file.extension,
					sizeMb: file.sizeMb,
					uri: file.uri,
				})),
		},
	}
}

export function isParticipantFormValid(state: ParticipantFormState) {
	const hasRequiredApplicantData
		= Boolean(state.applicantLastName.trim())
		&& Boolean(state.applicantFirstName.trim())
		&& (state.applicantNoPatronymic || Boolean(state.applicantPatronymic.trim()))
		&& EMAIL_PATTERN.test(state.applicantEmail.trim())
		&& isPhoneValid(state.applicantPhone)
		&& state.applicantPhoneConfirmed

	const hasRequiredNomineeData
		= Boolean(state.nomineeLastName.trim())
		&& Boolean(state.nomineeFirstName.trim())
		&& (state.nomineeNoPatronymic || Boolean(state.nomineePatronymic.trim()))
		&& Boolean(state.nomineeCountry.trim())
		&& Boolean(state.nomineeLocality.trim())
		&& Boolean(state.nomineeCitizenship.trim())
		&& Boolean(state.nomineeBirthDate.trim())
		&& Boolean(state.nomineeGender.trim())
		&& Boolean(state.nomineePhotoUri)

	const hasRequiredParticipationData
		= Boolean(state.participationType.trim())
		&& (
			!PARTICIPATION_TYPES_WITH_ENTITY.has(state.participationType)
			|| Boolean(state.participationEntityName.trim())
		)

	const hasRequiredProjectData
		= Boolean(state.projectName.trim())
		&& Boolean(state.projectDescription.trim())
		&& Boolean(state.projectAudience.trim())
		&& Boolean(state.projectUniqueness.trim())
		&& Boolean(state.projectSocialImpact.trim())
		&& Boolean(state.projectGoals.trim())
		&& Boolean(state.projectSupport.trim())
		&& Boolean(state.projectResources.trim())

	return hasRequiredApplicantData
		&& hasRequiredNomineeData
		&& hasRequiredParticipationData
		&& hasRequiredProjectData
		&& hasSuccessfulFiles(state.additionalFiles)
		&& hasSuccessfulFiles(state.personalDataConsentFiles)
		&& hasSuccessfulFiles(state.photoVideoConsentFiles)
}

export function resetParticipantForm() {
	participantFormStore.set(INITIAL_STATE)
}
