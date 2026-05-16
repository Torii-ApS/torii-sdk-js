// Public auth/error types. Data types (User, Session, request/response
// payloads) live in `./generated/` — produced from `spec/server-v1.json`
// by `openapi-generator-cli` and re-exported alongside this module's
// public surface from `./index.ts`.

export type ToriiClientOptions = {
	/** Backend secret key, e.g. `sk_live_...` or `sk_test_...`. Required. */
	secretKey: string;
	/**
	 * Backend API base URL. Defaults to `https://api.torii.so`.
	 * Override for self-hosted or staging.
	 */
	apiUrl?: string;
	/** Optional fetch implementation (Node 18+ has global fetch). Override for testing. */
	fetch?: typeof globalThis.fetch;
};

// Subset of fields the backend SDK exposes from a verified torii access token.
// Wide enough for the 80% case; users wanting raw claims can read
// `JWTPayload` directly from jose.
export type ToriiAuth = {
	/** End-user ID (JWT `sub`). */
	userId: string;
	/** Environment ID this token was issued in (JWT `pid`). */
	environmentId: string;
	/** Issuer (JWT `iss`) — the canonical FAPI URL for this environment. */
	issuer: string;
	/** True if the end-user has verified at least one of their email addresses. */
	emailVerified: boolean;
	/** True if profile fields the environment marks `required` are all filled. */
	profileComplete: boolean;
	/** True if the token is being used for admin impersonation. */
	impersonating: boolean;
	/** End-user's preferred locale, when set on the profile. */
	locale: string | null;
	/** Raw JWT payload — escape hatch for custom claims, audience checks, etc. */
	raw: Record<string, unknown>;
};

export class ToriiApiError extends Error {
	readonly status: number;
	readonly code?: string;
	readonly supportId?: string;
	readonly body?: unknown;
	constructor(message: string, status: number, body?: unknown) {
		super(message);
		this.name = 'ToriiApiError';
		this.status = status;
		this.body = body;
		if (body && typeof body === 'object') {
			const b = body as Record<string, unknown>;
			if (typeof b.code === 'string') this.code = b.code;
			if (typeof b.supportId === 'string') this.supportId = b.supportId;
		}
	}
}

export class ToriiAuthError extends Error {
	readonly cause?: unknown;
	constructor(message: string, cause?: unknown) {
		super(message);
		this.name = 'ToriiAuthError';
		this.cause = cause;
	}
}
