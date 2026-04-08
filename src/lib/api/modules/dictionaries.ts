import { createApiErrorResult, createApiSuccessResult } from '../errors'
import {
	dictionaryListResponseSchema,
	nominationsListResponseSchema,
	type DictionaryItem,
	type NominationItem,
} from '../schemas'
import { requestJson } from '../transport'

export const dictionariesApi = {
	async getNominationsList() {
		try {
			const response = await requestJson({
				path: '/dictionaries/nominations/list',
				method: 'GET',
				responseSchema: nominationsListResponseSchema,
			})

			return createApiSuccessResult<NominationItem[]>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async getRequestStatusesList() {
		try {
			const response = await requestJson({
				path: '/dictionaries/requests/statuses/list',
				method: 'GET',
				responseSchema: dictionaryListResponseSchema,
			})

			return createApiSuccessResult<DictionaryItem[]>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},
}
