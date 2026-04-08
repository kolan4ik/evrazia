import { AUTH_TOKEN_KEY } from '@/lib/api/config'
import { ApiClientError, createApiErrorResult, type ApiResult } from '@/lib/api/errors'
import { createServerApi } from '@/lib/api/server'
import type { ProfileResponseData } from '@/lib/api/schemas'

type GetAuthorizedProfileParams = {
	origin: string
	cookieHeader: string
	token?: string
}

export async function getAuthorizedProfile({
	origin,
	cookieHeader,
	token,
}: GetAuthorizedProfileParams): Promise<ApiResult<ProfileResponseData>> {
	if (!token) {
		return createApiErrorResult(new ApiClientError({
			message: `Missing ${AUTH_TOKEN_KEY}`,
			code: 'UNAUTHORIZED',
		}))
	}

	const serverApi = createServerApi({
		origin,
		cookieHeader,
	})

	return serverApi.users.getProfile()
}
