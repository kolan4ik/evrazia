import type { z, ZodTypeAny } from 'zod'
import { ApiClientError, normalizeApiError } from './errors'
import { buildUrl } from './helpers'
import { removeAuthToken } from './storage'

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE'
type MultipartMethod = 'POST' | 'PATCH'

type ParsedSchema<TSchema extends ZodTypeAny> = z.infer<TSchema>

type RequestJsonParams<TInput, TOutputSchema extends ZodTypeAny> = {
	path: string
	method: HttpMethod
	input?: TInput
	inputSchema?: ZodTypeAny
	responseSchema: TOutputSchema
	queryBuilder?: (input: TInput) => Record<string, unknown>
	auth?: boolean
	baseUrl?: string
	headers?: HeadersInit
}

type RequestMultipartParams<TInput, TOutputSchema extends ZodTypeAny> = {
	path: string
	method: MultipartMethod
	input: TInput
	inputSchema: ZodTypeAny
	responseSchema: TOutputSchema
	buildQuery: (input: TInput) => Record<string, unknown>
	buildFormData: (input: TInput) => FormData
	auth?: boolean
	baseUrl?: string
	headers?: HeadersInit
}

async function parseResponseJson(response: Response): Promise<unknown> {
	try {
		return await response.json()
	} catch (error) {
		throw new ApiClientError({
			message: 'Failed to parse JSON response',
			code: 'HTTP_ERROR',
			status: response.status,
			details: error,
		})
	}
}

function buildHeaders(params: { auth?: boolean; isMultipart?: boolean; headers?: HeadersInit }): HeadersInit {
	const headers: Record<string, string> = {
		Accept: 'application/json',
	}

	void params.auth

	if (!params.isMultipart) {
		headers['Content-Type'] = 'application/json'
	}

	if (params.headers) {
		for (const [key, value] of Object.entries(params.headers)) {
			if (value !== undefined) {
				headers[key] = String(value)
			}
		}
	}

	return headers
}

function ensureApiSuccess(json: unknown, response: Response): void {
	if (
		typeof json === 'object' &&
		json !== null &&
		'success' in json &&
		(json as { success?: boolean }).success === false
	) {
		throw new ApiClientError({
			message: 'API returned success=false',
			code: 'API_ERROR',
			status: response.status,
			details: json,
		})
	}
}

function validateOutput<TOutputSchema extends ZodTypeAny>(
	responseSchema: TOutputSchema,
	json: unknown,
	response: Response,
): ParsedSchema<TOutputSchema> {
	const parsedOutput = responseSchema.safeParse(json)

	if (!parsedOutput.success) {
		throw new ApiClientError({
			message: 'Output validation failed',
			code: 'OUTPUT_VALIDATION_ERROR',
			status: response.status,
			details: parsedOutput.error.flatten(),
		})
	}

	return parsedOutput.data
}

export async function requestJson<TInput, TOutputSchema extends ZodTypeAny>({
	path,
	method,
	input,
	inputSchema,
	responseSchema,
	queryBuilder,
	auth = false,
	baseUrl,
	headers,
}: RequestJsonParams<TInput, TOutputSchema>): Promise<ParsedSchema<TOutputSchema>> {
	try {
		let validatedInput = input

		if (inputSchema) {
			const parsedInput = inputSchema.safeParse(input)

			if (!parsedInput.success) {
				throw new ApiClientError({
					message: 'Input validation failed',
					code: 'INPUT_VALIDATION_ERROR',
					details: parsedInput.error.flatten(),
				})
			}

			validatedInput = parsedInput.data as TInput
		}

		const query = validatedInput && queryBuilder ? queryBuilder(validatedInput) : undefined
		const response = await fetch(buildUrl(path, query, baseUrl), {
			method,
			headers: buildHeaders({ auth, headers }),
		})

		if (response.status === 401 || response.status === 403) {
			removeAuthToken()
			throw new ApiClientError({
				message: 'Unauthorized',
				code: 'UNAUTHORIZED',
				status: response.status,
			})
		}

		const json = await parseResponseJson(response)

		if (!response.ok) {
			throw new ApiClientError({
				message: `HTTP error: ${response.status}`,
				code: 'HTTP_ERROR',
				status: response.status,
				details: json,
			})
		}

		ensureApiSuccess(json, response)

		return validateOutput(responseSchema, json, response)
	} catch (error) {
		throw normalizeApiError(error)
	}
}

export async function requestMultipart<TInput, TOutputSchema extends ZodTypeAny>({
	path,
	method,
	input,
	inputSchema,
	responseSchema,
	buildQuery,
	buildFormData,
	auth = false,
	baseUrl,
	headers,
}: RequestMultipartParams<TInput, TOutputSchema>): Promise<ParsedSchema<TOutputSchema>> {
	try {
		const parsedInput = inputSchema.safeParse(input)

		if (!parsedInput.success) {
			throw new ApiClientError({
				message: 'Input validation failed',
				code: 'INPUT_VALIDATION_ERROR',
				details: parsedInput.error.flatten(),
			})
		}

		const validatedInput = parsedInput.data as TInput
		const response = await fetch(buildUrl(path, buildQuery(validatedInput), baseUrl), {
			method,
			headers: buildHeaders({ auth, isMultipart: true, headers }),
			body: buildFormData(validatedInput),
		})

		if (response.status === 401 || response.status === 403) {
			removeAuthToken()
			throw new ApiClientError({
				message: 'Unauthorized',
				code: 'UNAUTHORIZED',
				status: response.status,
			})
		}

		const json = await parseResponseJson(response)

		if (!response.ok) {
			throw new ApiClientError({
				message: `HTTP error: ${response.status}`,
				code: 'HTTP_ERROR',
				status: response.status,
				details: json,
			})
		}

		ensureApiSuccess(json, response)

		return validateOutput(responseSchema, json, response)
	} catch (error) {
		throw normalizeApiError(error)
	}
}
