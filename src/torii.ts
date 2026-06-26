// Public entry point for the REST surface. Wraps the openapi-generator
// output (`./generated/`) behind a thin, hand-written facade so callers
// see ergonomic methods instead of the generator's verbose
// `requestParameters`-wrapped signatures.
//
// Types and endpoints are generated from `spec/server-v1.json`; only the
// wrapper + auth helpers are hand-written. When the spec grows, regenerate
// and add a one-line wrapper method per new endpoint.

import {
	Configuration,
	ResponseError,
	ServerSessionsApi,
	ServerUsersApi,
} from './generated/index.js';
import { ToriiApiError, type ToriiClientOptions } from './types.js';

const DEFAULT_API_URL = 'https://api.torii.so';

// Public input types for the public methods.
//
// `CreateUserInput` mirrors the generated shape: optional values, no nulls.
//
// `UpdateUserInput` is hand-written to express PATCH tri-state semantics
// natively in TypeScript via `T | null | undefined`:
//   - key absent (or `undefined`) → server leaves field alone
//   - `null`                      → server clears the field
//   - a value                     → server updates the field
//
// `JSON.stringify` drops `undefined` keys but keeps `null`, which is
// exactly the wire contract the server expects for PATCH bodies — and
// the generated `UpdateUserRequestToJSON` preserves that distinction
// for string fields (it copies the value through unchanged).
export type CreateUserInput = {
	email?: string | null;
	password?: string | null;
	firstName?: string | null;
	lastName?: string | null;
	/** Metadata bags. Optional — default to `{}` on send (a new user has none to clobber). */
	publicMetadata?: Record<string, unknown>;
	privateMetadata?: Record<string, unknown>;
	unsafeMetadata?: Record<string, unknown>;
};

export type UpdateUserInput = {
	firstName?: string | null;
	lastName?: string | null;
	locale?: 'en' | 'da' | null;
	/** Tri-state: omit to leave untouched (never clobbered), set to replace, null to clear. */
	unsafeMetadata?: Record<string, unknown> | null;
};

export type ListUsersOptions = {
	limit?: number;
	cursor?: string;
	name?: string;
	email?: string;
	statuses?: string[];
	createdAfter?: string;
	createdBefore?: string;
};

export class UsersClient {
	constructor(private readonly api: ServerUsersApi) {}

	list(options: ListUsersOptions = {}) {
		const { limit, cursor, name, email, statuses, createdAfter, createdBefore } = options;
		// Bridge the public string-based options to the generator's typed
		// search shape: statuses → Set, ISO date strings → Date.
		const serverUserSearchRequest = {
			name,
			email,
			statuses: statuses == null ? undefined : new Set(statuses),
			createdAfter: createdAfter == null ? undefined : new Date(createdAfter),
			createdBefore: createdBefore == null ? undefined : new Date(createdBefore),
			// biome-ignore lint/suspicious/noExplicitAny: bridges plain strings to the generator's enum-typed Set
		} as any;
		return this.api.searchUsers({ limit, cursor, serverUserSearchRequest });
	}

	get(userId: string) {
		return this.api.getUser({ userId });
	}

	create(input: CreateUserInput) {
		// The generated CreateUserRequest requires the three metadata bags; default
		// them to {} so callers can omit them (a new user has nothing to clobber).
		const createUserRequest = {
			...input,
			publicMetadata: input.publicMetadata ?? {},
			privateMetadata: input.privateMetadata ?? {},
			unsafeMetadata: input.unsafeMetadata ?? {},
			// biome-ignore lint/suspicious/noExplicitAny: bridges CreateUserInput → generator's CreateUserRequest
		} as any;
		return this.api.createUser({ createUserRequest });
	}

	update(userId: string, input: UpdateUserInput) {
		// Bridge our hand-written tri-state shape (T | null | undefined) into the
		// generator's looser `UpdateUserRequest`. `null`/`undefined` pass through
		// untouched — JSON.stringify drops `undefined` keys and emits `null`, which
		// is exactly the PATCH wire contract (omit = unchanged, null = clear).
		const updateUserRequest = {
			firstName: input.firstName,
			lastName: input.lastName,
			locale: input.locale,
			unsafeMetadata: input.unsafeMetadata,
			// biome-ignore lint/suspicious/noExplicitAny: bridges UpdateUserInput → generator's UpdateUserRequest
		} as any;
		return this.api.updateUser({ userId, updateUserRequest });
	}

	async delete(userId: string): Promise<void> {
		await this.api.deleteUser({ userId });
	}

	ban(userId: string) {
		return this.api.banUser({ userId });
	}

	unban(userId: string) {
		return this.api.unbanUser({ userId });
	}
}

export class SessionsClient {
	constructor(private readonly api: ServerSessionsApi) {}

	listForUser(userId: string) {
		return this.api.listSessions({ userId });
	}

	async revokeAllForUser(userId: string): Promise<void> {
		await this.api.revokeAllSessions({ userId });
	}

	async revoke(userId: string, sessionId: string): Promise<void> {
		await this.api.revokeSession({ userId, sessionId });
	}
}

export type ToriiClient = {
	users: UsersClient;
	sessions: SessionsClient;
};

export function createToriiClient(options: ToriiClientOptions): ToriiClient {
	if (!options.secretKey) {
		throw new Error('createToriiClient: `secretKey` is required');
	}
	const fetchImpl = options.fetch ?? globalThis.fetch;
	if (typeof fetchImpl !== 'function') {
		throw new Error(
			'createToriiClient: no global fetch found — pass `fetch` explicitly (Node <18)',
		);
	}
	const config = new Configuration({
		basePath: (options.apiUrl ?? DEFAULT_API_URL).replace(/\/$/, ''),
		fetchApi: fetchImpl,
		// Spec doesn't declare a securityScheme, so authorise via a header on
		// every request rather than the `accessToken` config slot.
		headers: { authorization: `Bearer ${options.secretKey}` },
		middleware: [
			{
				// Translate the generated client's ResponseError into our
				// stable ToriiApiError so callers don't import generator
				// internals to catch failures.
				async post({ response }) {
					if (response.ok) return response;
					let body: unknown;
					const text = await response.clone().text();
					if (text) {
						try {
							body = JSON.parse(text);
						} catch {
							body = text;
						}
					}
					const message =
						extractErrorMessage(body) ?? `torii ${response.status} ${response.statusText}`.trim();
					throw new ToriiApiError(message, response.status, body);
				},
			},
		],
	});
	return {
		users: new UsersClient(new ServerUsersApi(config)),
		sessions: new SessionsClient(new ServerSessionsApi(config)),
	};
}

function extractErrorMessage(body: unknown): string | undefined {
	if (body && typeof body === 'object') {
		const b = body as Record<string, unknown>;
		if (typeof b.detail === 'string') return b.detail;
		if (typeof b.title === 'string') return b.title;
		if (typeof b.message === 'string') return b.message;
	}
	return undefined;
}

// Re-export so callers can `instanceof` check on errors thrown by the
// generated client middleware if they need to (rare — most should rely
// on `ToriiApiError`).
export { ResponseError };
