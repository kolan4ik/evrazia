import { authApi } from './modules/auth'
import { dictionariesApi } from './modules/dictionaries'
import { requestsApi } from './modules/requests'
import { usersApi } from './modules/users'

export const api = {
	auth: authApi,
	users: usersApi,
	dictionaries: dictionariesApi,
	requests: requestsApi,
}

export * from './errors'
export * from './schemas'
export * from './storage'
