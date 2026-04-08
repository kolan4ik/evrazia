import { normalizeBoolean } from '../helpers'
import { createApiErrorResult, createApiSuccessResult } from '../errors'
import {
	type LoginInput,
	type LoginResponseData,
	type LogoutResponseData,
	type RegisterInput,
	type RegisterResponseData,
	loginInputSchema,
	loginResponseSchema,
	logoutResponseSchema,
	registerInputSchema,
	registerResponseSchema,
} from '../schemas'
import { removeAuthToken } from '../storage'
import { requestJson } from '../transport'

function buildRegisterQuery(input: RegisterInput): Record<string, unknown> {
	return {
		first_name: input.first_name,
		last_name: input.last_name,
		second_name_empty: normalizeBoolean(input.second_name_empty),
		second_name: input.second_name,
		email: input.email,
		password: input.password,
		password_confirm: input.password_confirm,
		agree_processing_personal_data: 'true',
		want_receive_information: normalizeBoolean(input.want_receive_information),
	}
}

function buildLoginQuery(input: LoginInput): Record<string, unknown> {
	return {
		email: input.email,
		password: input.password,
	}
}

export const authApi = {
	async register(input: RegisterInput) {
		try {
			const response = await requestJson({
				path: '/users/authentification/registration',
				method: 'POST',
				input,
				inputSchema: registerInputSchema,
				responseSchema: registerResponseSchema,
				queryBuilder: buildRegisterQuery,
			})

			return createApiSuccessResult<RegisterResponseData>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async login(input: LoginInput) {
		try {
			const response = await requestJson({
				path: '/users/authentification/login',
				method: 'POST',
				input,
				inputSchema: loginInputSchema,
				responseSchema: loginResponseSchema,
				queryBuilder: buildLoginQuery,
			})

			return createApiSuccessResult<LoginResponseData>(response.data)
		} catch (error) {
			return createApiErrorResult(error)
		}
	},

	async logout() {
		try {
			try {
				await requestJson({
					path: '/users/authentification/logout',
					method: 'POST',
					responseSchema: logoutResponseSchema,
					auth: true,
				})
			} catch {
				// local logout still succeeds even if server logout fails
			}

			removeAuthToken()

			return createApiSuccessResult<LogoutResponseData>({
				success: true,
			})
		} catch (error) {
			removeAuthToken()
			return createApiErrorResult(error)
		}
	},
}
