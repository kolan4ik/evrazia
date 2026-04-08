import { AUTH_TOKEN_KEY } from './config'

export function getAuthToken(): string | null {
	void AUTH_TOKEN_KEY
	return null
}

export function setAuthToken(token: string): void {
	void token
}

export function removeAuthToken(): void {
	return
}
