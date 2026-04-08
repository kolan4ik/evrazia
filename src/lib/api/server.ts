import { API_PROXY_PREFIX } from './config'
import { createApiErrorResult, createApiSuccessResult, type ApiResult } from './errors'
import {
	dictionaryListResponseSchema,
	loginResponseSchema,
	logoutResponseSchema,
	nominationsListResponseSchema,
	profileResponseSchema,
	requestDetailsResponseSchema,
	requestListResponseSchema,
	type DictionaryItem,
	type LoginResponseData,
	type LogoutResponseData,
	type NominationItem,
	type ProfileResponseData,
	type RequestDetails,
	type RequestListItem,
	type RequestId,
} from './schemas'
import { requestJson } from './transport'

type ServerApiOptions = {
	origin: string
	cookieHeader?: string
}

export function createServerApi({ origin, cookieHeader = '' }: ServerApiOptions) {
	const baseUrl = `${origin}${API_PROXY_PREFIX}`
	const headers = cookieHeader ? { cookie: cookieHeader } : undefined

	return {
		auth: {
			async login(input: { email: string; password: string }): Promise<ApiResult<LoginResponseData>> {
				try {
					const response = await requestJson({
						path: '/users/authentification/login',
						method: 'POST',
						input,
						responseSchema: loginResponseSchema,
						queryBuilder: payload => payload,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<LoginResponseData>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},

			async logout(): Promise<ApiResult<LogoutResponseData>> {
				try {
					const response = await requestJson({
						path: '/users/authentification/logout',
						method: 'POST',
						responseSchema: logoutResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<LogoutResponseData>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},
		},
		users: {
			async getProfile(): Promise<ApiResult<ProfileResponseData>> {
				try {
					const response = await requestJson({
						path: '/users/profile',
						method: 'GET',
						responseSchema: profileResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<ProfileResponseData>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},
		},
		dictionaries: {
			async getNominationsList(): Promise<ApiResult<NominationItem[]>> {
				try {
					const response = await requestJson({
						path: '/dictionaries/nominations/list',
						method: 'GET',
						responseSchema: nominationsListResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<NominationItem[]>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},

			async getRequestStatusesList(): Promise<ApiResult<DictionaryItem[]>> {
				try {
					const response = await requestJson({
						path: '/dictionaries/requests/statuses/list',
						method: 'GET',
						responseSchema: dictionaryListResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<DictionaryItem[]>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},
		},
		requests: {
			async getById(id: RequestId): Promise<ApiResult<RequestDetails>> {
				try {
					const response = await requestJson({
						path: `/requests/${id}`,
						method: 'GET',
						responseSchema: requestDetailsResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<RequestDetails>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},

			async list(): Promise<ApiResult<RequestListItem[]>> {
				try {
					const response = await requestJson({
						path: '/requests/list',
						method: 'GET',
						responseSchema: requestListResponseSchema,
						baseUrl,
						headers,
					})

					return createApiSuccessResult<RequestListItem[]>(response.data)
				} catch (error) {
					return createApiErrorResult(error)
				}
			},
		},
	}
}
