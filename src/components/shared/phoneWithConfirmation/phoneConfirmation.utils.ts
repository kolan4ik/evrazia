export type VerificationStatus = 'idle' | 'error' | 'success'

export const PHONE_DIGITS_COUNT = 11
export const CODE_DIGITS_COUNT = 4
export const RESEND_TIMEOUT_SECONDS = 60

export function normalizePhoneDigits(value: string) {
	const digits = value.replace(/\D/g, '')

	if (!digits) {
		return ''
	}

	if (digits[0] === '7' || digits[0] === '8') {
		return `7${digits.slice(1, PHONE_DIGITS_COUNT)}`
	}

	return `7${digits.slice(0, PHONE_DIGITS_COUNT - 1)}`
}

export function formatPhoneValue(value: string) {
	const normalized = normalizePhoneDigits(value)

	if (!normalized) {
		return ''
	}

	const localDigits = normalized.slice(1)
	const parts = [
		localDigits.slice(0, 3),
		localDigits.slice(3, 6),
		localDigits.slice(6, 8),
		localDigits.slice(8, 10),
	].filter(Boolean)

	return `+7 ${parts.join(' ')}`
}

export function isPhoneValid(value: string) {
	return normalizePhoneDigits(value).length === PHONE_DIGITS_COUNT
}

export function formatTimer(seconds: number) {
	const safeSeconds = Math.max(seconds, 0)
	const minutes = Math.floor(safeSeconds / 60)
	const restSeconds = safeSeconds % 60

	return `${String(minutes).padStart(2, '0')}:${String(restSeconds).padStart(2, '0')}`
}

export async function requestPhoneConfirmation() {
	await new Promise(resolve => setTimeout(resolve, 900))

	return Math.random() >= 0.5
		? { status: 'success' as const }
		: { status: 'fault' as const }
}

export async function verifyPhoneConfirmationCode() {
	await new Promise(resolve => setTimeout(resolve, 900))

	return Math.random() >= 0.5
		? { status: 'success' as const }
		: { status: 'fault' as const }
}
