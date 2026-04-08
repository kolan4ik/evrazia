import type { APIRoute } from 'astro'
import {
	API_BASE_URL,
	API_PREFIX,
	AUTH_TOKEN_KEY,
	UPSTREAM_SESSION_KEY,
} from '@/lib/api/config'

export const prerender = false

function buildUpstreamUrl(requestUrl: URL, path: string | undefined): string {
	const upstreamUrl = new URL(`${API_BASE_URL}${API_PREFIX}/${path ?? ''}`)

	for (const [key, value] of requestUrl.searchParams.entries()) {
		upstreamUrl.searchParams.append(key, value)
	}

	return upstreamUrl.toString()
}

function copyResponseHeaders(headers: Headers): Headers {
	const responseHeaders = new Headers()

	for (const [key, value] of headers.entries()) {
		if (key.toLowerCase() === 'content-encoding') continue
		if (key.toLowerCase() === 'content-length') continue
		if (key.toLowerCase() === 'set-cookie') continue

		responseHeaders.set(key, value)
	}

	return responseHeaders
}

function extractPhpSessionId(headers: Headers): string | null {
	const setCookieEntries =
		typeof headers.getSetCookie === 'function'
			? headers.getSetCookie()
			: headers.get('set-cookie')
				? [headers.get('set-cookie') as string]
				: []

	for (const entry of setCookieEntries) {
		const match = entry.match(/(?:^|;\s*)PHPSESSID=([^;]+)/i)

		if (match?.[1]) {
			return match[1]
		}
	}

	return null
}

async function proxyRequest(context: Parameters<APIRoute>[0]): Promise<Response> {
	const requestUrl = new URL(context.request.url)
	const upstreamUrl = buildUpstreamUrl(requestUrl, context.params.path)
	const headers = new Headers()
	const authToken = context.cookies.get(AUTH_TOKEN_KEY)?.value
	const upstreamSessionId = context.cookies.get(UPSTREAM_SESSION_KEY)?.value

	for (const [key, value] of context.request.headers.entries()) {
		const lowerKey = key.toLowerCase()

		if (lowerKey === 'host') continue
		if (lowerKey === 'content-length') continue
		if (lowerKey === 'cookie') continue
		if (lowerKey === 'authorization') continue

		headers.set(key, value)
	}

	if (authToken) {
		headers.set('Authorization', `Bearer ${authToken}`)
	}

	if (upstreamSessionId) {
		headers.set('Cookie', `PHPSESSID=${upstreamSessionId}`)
	}

	const init: RequestInit = {
		method: context.request.method,
		headers,
	}

	if (context.request.method !== 'GET' && context.request.method !== 'HEAD') {
		init.body = await context.request.arrayBuffer()
	}

	// Temporary workaround for broken staging TLS certificate.
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

	const upstreamResponse = await fetch(upstreamUrl, init)
	const bodyText = await upstreamResponse.text()
	const responseHeaders = copyResponseHeaders(upstreamResponse.headers)
	const phpSessionId = extractPhpSessionId(upstreamResponse.headers)

	if (phpSessionId) {
		context.cookies.set(UPSTREAM_SESSION_KEY, phpSessionId, {
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			secure: requestUrl.protocol === 'https:',
			maxAge: 60 * 60 * 24 * 30,
		})
	}

	if (
		context.params.path === 'users/authentification/login' &&
		upstreamResponse.ok &&
		bodyText
	) {
		try {
			const payload = JSON.parse(bodyText) as {
				data?: {
					authToken?: string
				}
			}

			const token = payload.data?.authToken

			if (token) {
				context.cookies.set(AUTH_TOKEN_KEY, token, {
					httpOnly: true,
					path: '/',
					sameSite: 'lax',
					secure: requestUrl.protocol === 'https:',
					maxAge: 60 * 60 * 24 * 30,
				})
			}
		} catch {
			// ignore malformed login payload
		}
	}

	if (
		context.params.path === 'users/authentification/logout' ||
		upstreamResponse.status === 401 ||
		upstreamResponse.status === 403
	) {
		context.cookies.delete(AUTH_TOKEN_KEY, {
			path: '/',
		})
		context.cookies.delete(UPSTREAM_SESSION_KEY, {
			path: '/',
		})
	}

	return new Response(bodyText, {
		status: upstreamResponse.status,
		statusText: upstreamResponse.statusText,
		headers: responseHeaders,
	})
}

const handleProxy: APIRoute = async (context) => {
	try {
		return await proxyRequest(context)
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Proxy request failed'

		return Response.json(
			{
				success: false,
				data: null,
				errors: [
					{
						message,
						code: 'PROXY_ERROR',
					},
				],
			},
			{ status: 502 },
		)
	}
}

export const GET = handleProxy
export const POST = handleProxy
export const PATCH = handleProxy
export const PUT = handleProxy
export const DELETE = handleProxy
export const OPTIONS = handleProxy
export const HEAD = handleProxy
