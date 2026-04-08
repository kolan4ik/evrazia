import { API_BASE_URL, API_PREFIX, API_PROXY_PREFIX } from './config'
import { ApiClientError } from './errors'
import type { RequestUpdateInput, RequestUpsertInput } from './schemas'

export function buildUrl(
	path: string,
	query?: Record<string, unknown>,
	baseUrlOverride?: string,
): string {
	const isBrowserProxy = typeof window !== 'undefined'
	const useProxyBase = typeof baseUrlOverride === 'string' ? baseUrlOverride.includes(API_PROXY_PREFIX) : isBrowserProxy
	const normalizedPath = useProxyBase && !path.endsWith('/') ? `${path}/` : path
	const baseUrl = baseUrlOverride ?? (
		isBrowserProxy
		? `${window.location.origin}${API_PROXY_PREFIX}`
		: `${API_BASE_URL}${API_PREFIX}`
	)

	const url = new URL(`${baseUrl}${normalizedPath}`)

	if (!query) return url.toString()

	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null || value === '') continue

		if (Array.isArray(value)) {
			for (const item of value) {
				if (item === undefined || item === null || item === '') continue
				url.searchParams.append(key, String(item))
			}

			continue
		}

		url.searchParams.set(key, String(value))
	}

	return url.toString()
}

export function normalizeBoolean(value: boolean): string {
	return value ? 'true' : 'false'
}

export function appendFormDataValue(formData: FormData, key: string, value: unknown): void {
	if (value === undefined || value === null) return

	if (typeof File !== 'undefined' && value instanceof File) {
		formData.append(key, value)
		return
	}

	formData.append(key, String(value))
}

export function buildRequestQuery(
	payload: RequestUpsertInput | RequestUpdateInput,
): Record<string, unknown> {
	return {
		nomination: payload.nomination,
		status: payload.status,

		applicant_name: payload.applicant_name,
		applicant_last_name: payload.applicant_last_name,
		applicant_second_name: payload.applicant_second_name,
		applicant_email: payload.applicant_email,
		applicant_phone: payload.applicant_phone,
		applicant_phone_confirmation_session: payload.applicant_phone_confirmation_session,

		submitted_on_behalf_of_another_person:
			typeof payload.submitted_on_behalf_of_another_person === 'boolean'
				? normalizeBoolean(payload.submitted_on_behalf_of_another_person)
				: undefined,

		nominant_name: payload.nominant_name,
		nominant_last_name: payload.nominant_last_name,
		nominant_second_name: payload.nominant_second_name,
		nominant_country: payload.nominant_country,
		nominant_settlement: payload.nominant_settlement,
		nominant_citizenship: payload.nominant_citizenship,
		nominant_birthdate: payload.nominant_birthdate,
		nominant_sex: payload.nominant_sex,

		form_participation: payload.form_participation,
		legal_name: payload.legal_name,

		project_name: payload.project_name,
		project_description: payload.project_description,
		project_audience: payload.project_audience,
		project_growth_uniqueness: payload.project_growth_uniqueness,
		project_growth_significance: payload.project_growth_significance,
		project_growth_goals: payload.project_growth_goals,
		project_growth_support: payload.project_growth_support,
		project_growth_resources: payload.project_growth_resources,

		'additional_links_social[]': payload.additional_links_social,
		'additional_links_video[]': payload.additional_links_video,
		'additional_links_media[]': payload.additional_links_media,

		documents_agreement:
			typeof payload.documents_agreement === 'boolean'
				? normalizeBoolean(payload.documents_agreement)
				: undefined,
	}
}

export function buildRequestFormData(
	payload: RequestUpsertInput | RequestUpdateInput,
): FormData {
	try {
		const formData = new FormData()

		if (payload.nominant_photo) {
			appendFormDataValue(formData, 'nominant_photo', payload.nominant_photo)
		}

		if (payload.documents_scan_pd) {
			appendFormDataValue(formData, 'documents_scan_pd', payload.documents_scan_pd)
		}

		if (payload.documents_scan_photo_video) {
			appendFormDataValue(
				formData,
				'documents_scan_photo_video',
				payload.documents_scan_photo_video,
			)
		}

		if (payload.additional_documents?.length) {
			for (const file of payload.additional_documents) {
				if (file) appendFormDataValue(formData, 'additional_documents[]', file)
			}
		}

		return formData
	} catch (error) {
		throw new ApiClientError({
			message: 'Failed to build multipart form data',
			code: 'MULTIPART_BUILD_ERROR',
			details: error,
		})
	}
}
