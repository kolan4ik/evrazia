import { ApiClientError, createApiErrorResult, createApiSuccessResult } from '../errors'
import { buildRequestFormData, buildRequestQuery } from '../helpers'
import {
	type RequestDetails,
	type RequestId,
	type RequestListItem,
	type RequestUpdateInput,
	type RequestUpsertInput,
	requestDetailsResponseSchema,
	requestIdSchema,
	requestListResponseSchema,
	requestMutationResponseSchema,
	requestUpdateInputSchema,
	requestUpsertInputSchema,
} from '../schemas'
import { requestJson, requestMultipart } from '../transport'

function validateRequestId(id: RequestId): RequestId {
	const parsedId = requestIdSchema.safeParse(id)

	if (!parsedId.success) {
		throw new ApiClientError({
			message: 'Invalid request id',
			code: 'INPUT_VALIDATION_ERROR',
			details: parsedId.error.flatten(),
		})
	}

	return parsedId.data
}

export const requestsApi = {
	async create(input: RequestUpsertInput) {
		try {
			const response = await requestMultipart({
				path: '/requests/add',
				method: 'POST',
				input,
				inputSchema: requestUpsertInputSchema,
				responseSchema: requestMutationResponseSchema,
				buildQuery: buildRequestQuery,
				buildFormData: buildRequestFormData,
				auth: true,
			})

			return createApiSuccessResult(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async getById(id: RequestId) {
		try {
			const validId = validateRequestId(id)
			const response = await requestJson({
				path: `/requests/${validId}`,
				method: 'GET',
				responseSchema: requestDetailsResponseSchema,
				auth: true,
			})

			return createApiSuccessResult<RequestDetails>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async update(id: RequestId, input: RequestUpdateInput) {
		try {
			const validId = validateRequestId(id)
			const response = await requestMultipart({
				path: `/requests/${validId}`,
				method: 'POST',
				input,
				inputSchema: requestUpdateInputSchema,
				responseSchema: requestMutationResponseSchema,
				buildQuery: buildRequestQuery,
				buildFormData: buildRequestFormData,
				auth: true,
			})

			return createApiSuccessResult(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async list() {
		try {
			const response = await requestJson({
				path: '/requests/list',
				method: 'GET',
				responseSchema: requestListResponseSchema,
				auth: true,
			})

			return createApiSuccessResult<RequestListItem[]>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},
}
