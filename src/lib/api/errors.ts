import { ZodError } from 'zod'

export type ApiClientErrorCode =
	| 'INPUT_VALIDATION_ERROR'
	| 'OUTPUT_VALIDATION_ERROR'
	| 'HTTP_ERROR'
	| 'API_ERROR'
	| 'UNAUTHORIZED'
	| 'NETWORK_ERROR'
	| 'MULTIPART_BUILD_ERROR'

export class ApiClientError extends Error {
	code: ApiClientErrorCode
	status?: number
	details?: unknown

	constructor(params: {
		message: string
		code: ApiClientErrorCode
		status?: number
		details?: unknown
	}) {
		super(params.message)
		this.name = 'ApiClientError'
		this.code = params.code
		this.status = params.status
		this.details = params.details
	}
}

export function normalizeApiError(
	error: unknown,
	fallbackCode: Extract<ApiClientErrorCode, 'INPUT_VALIDATION_ERROR' | 'OUTPUT_VALIDATION_ERROR'> = 'INPUT_VALIDATION_ERROR',
): ApiClientError {
	if (error instanceof ApiClientError) return error

	if (error instanceof ZodError) {
		return new ApiClientError({
			message: 'Validation failed',
			code: fallbackCode,
			details: error.flatten(),
		})
	}

	if (error instanceof Error) {
		return new ApiClientError({
			message: error.message,
			code: 'NETWORK_ERROR',
			details: error,
		})
	}

	return new ApiClientError({
		message: 'Unknown API error',
		code: 'NETWORK_ERROR',
		details: error,
	})
}

export type ApiSuccessResult<T> = {
	status: 'ok'
	payload: T
}

export type ApiErrorResult = {
	status: 'error'
	payload: ApiClientError
}

export type ApiResult<T> = ApiSuccessResult<T> | ApiErrorResult

export function createApiSuccessResult<T>(payload: T): ApiSuccessResult<T> {
	return {
		status: 'ok',
		payload,
	}
}

export function createApiErrorResult(error: unknown): ApiErrorResult {
	return {
		status: 'error',
		payload: normalizeApiError(error),
	}
}

export function getApiErrorMessage(error: unknown, fallback = 'Не удалось выполнить запрос'): string {
	if (error instanceof ApiClientError) {
		const details = error.details

		if (
			details &&
			typeof details === 'object' &&
			'errors' in details &&
			Array.isArray((details as { errors?: unknown[] }).errors)
		) {
			const firstError = (details as { errors: unknown[] }).errors[0]

			if (
				firstError &&
				typeof firstError === 'object' &&
				'message' in firstError &&
				typeof (firstError as { message?: unknown }).message === 'string'
			) {
				return (firstError as { message: string }).message
			}
		}

		if (
			details &&
			typeof details === 'object' &&
			'formErrors' in details &&
			Array.isArray((details as { formErrors?: unknown[] }).formErrors) &&
			typeof (details as { formErrors: unknown[] }).formErrors[0] === 'string'
		) {
			return (details as { formErrors: string[] }).formErrors[0]
		}

		return error.message || fallback
	}

	if (error instanceof Error) {
		return error.message || fallback
	}

	return fallback
}
