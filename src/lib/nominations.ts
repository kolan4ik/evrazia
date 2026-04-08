import { PATHS } from '@/configs/paths'
import type { DictionaryItem, NominationItem } from '@/lib/api'

export function getNominationRouteValue(nomination: NominationItem): string {
	if (nomination.id === undefined || nomination.id === null) {
		return ''
	}

	return String(nomination.id).trim()
}

export function getDictionaryRouteValue(item: DictionaryItem): string {
	if (item.id !== undefined && item.id !== null) {
		return String(item.id).trim()
	}

	if (item.code) {
		return item.code.trim()
	}

	return ''
}

export function getNominationHref(nomination: NominationItem): string {
	const id = getNominationRouteValue(nomination)

	if (!id) {
		return PATHS.root
	}

	return `${PATHS.participantForm}?id=${encodeURIComponent(id)}`
}

export function getParticipantFormNominationId(searchParams: URLSearchParams): string | null {
	const value = searchParams.get('id')

	if (typeof value !== 'string') {
		return null
	}

	const normalizedValue = value.trim()

	return normalizedValue ? normalizedValue : null
}

export function findNominationByRouteValue(
	nominations: NominationItem[],
	routeValue: string,
): NominationItem | null {
	return nominations.find(nomination => getNominationRouteValue(nomination) === routeValue) ?? null
}
