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
	type CreateUserRequest,
	ResponseError,
	type ServerUserSearchRequest,
	ServerSessionsApi,
	ServerUsersApi,
	type UpdateUserRequest,
} from './generated/index.js';
import { ToriiApiError, type ToriiClientOptions } from './types.js';

const DEFAULT_API_URL = 'https://api.torii.so';

// The public methods accept the generated request types directly, so a new
// spec field flows through with zero hand edits. Tri-state PATCH semantics are
// carried natively by the generated `T | null | undefined` fields: a key absent
// (undefined) is dropped by JSON.stringify (leave unchanged), `null` is emitted
// (clear), a value is emitted (set). Metadata bags are 2-state (omit vs object);
// a null-valued key inside a bag deletes that key. The pinned wire contract for
// all of this lives in contract-tests/fixtures/patch-wire and is asserted in
// __tests__/patch-wire.test.ts.

export type ListUsersOptions = {
	limit?: number;
	cursor?: string;
	/** Filter body. Every field is the generated tri-state shape (see ServerUserSearchRequest). */
	filter?: ServerUserSearchRequest;
};

export class UsersClient {
	constructor(private readonly api: ServerUsersApi) {}

	list(options: ListUsersOptions = {}) {
		return this.api.searchUsers({
			limit: options.limit,
			cursor: options.cursor,
			serverUserSearchRequest: options.filter,
		});
	}

	get(userId: string) {
		return this.api.getUser({ userId });
	}

	create(input: CreateUserRequest) {
		// Metadata bags are optional; omit them and the server defaults each to {}.
		return this.api.createUser({ createUserRequest: input });
	}

	update(userId: string, input: UpdateUserRequest) {
		// The generated UpdateUserRequest fields are T | null | undefined, which map
		// 1:1 to the PATCH wire contract via UpdateUserRequestToJSON + JSON.stringify:
		// absent (undefined) => omitted (leave), null => clear, value => set.
		return this.api.updateUser({ userId, updateUserRequest: input });
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
		// The spec declares a `bearerAuth` scheme, so the generated operations
		// send `Authorization: Bearer <accessToken>` on every request.
		accessToken: options.secretKey,
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
