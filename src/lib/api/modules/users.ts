import { createApiErrorResult, createApiSuccessResult } from '../errors'
import { profileResponseSchema, type ProfileResponseData } from '../schemas'
import { requestJson } from '../transport'

export const usersApi = {
	async getProfile() {
		try {
			const response = await requestJson({
				path: '/users/profile',
				method: 'GET',
				responseSchema: profileResponseSchema,
				auth: true,
			})

			return createApiSuccessResult<ProfileResponseData>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},
}
