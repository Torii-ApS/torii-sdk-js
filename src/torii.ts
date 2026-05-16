// Public entry point for the REST surface. Wraps the openapi-generator
// output (`./generated/`) behind a thin, hand-written facade so callers
// see ergonomic methods instead of the generator's verbose
// `requestParameters`-wrapped signatures.
//
// Per the design philosophy in #424: types + endpoints are generated
// from `spec/server-v1.json`; we hand-write only the wrapper + the auth
// helpers. When the spec grows, regenerate, then add a one-line wrapper
// method here per new endpoint.

import {
	Configuration,
	type CreateUserRequest,
	ResponseError,
	ServerSessionsApi,
	ServerUsersApi,
	type UpdateUserRequest,
} from './generated/index.js';
import { ToriiApiError, type ToriiClientOptions } from './types.js';

const DEFAULT_API_URL = 'https://api.torii.so';

// Public input types for the public methods. We accept the same shapes
// the generated `*Request` models declare, but rename for ergonomics
// and keep the surface independent of generator naming churn.
export type CreateUserInput = CreateUserRequest;
export type UpdateUserInput = UpdateUserRequest;

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
		return this.api.searchUsers({
			limit,
			cursor,
			// The generated search-body type wraps its fields in tri-state
			// `PatchValue<>` wrappers (a Kotlin idiom). For the SDK surface we
			// pass plain values and rely on the server's permissive search
			// semantics — empty fields are omitted from the filter.
			// biome-ignore lint/suspicious/noExplicitAny: bridging Kotlin tri-state shape to plain values
			serverUserSearchRequest: { name, email, statuses, createdAfter, createdBefore } as any,
		});
	}

	get(userId: string) {
		return this.api.getUser({ userId });
	}

	create(input: CreateUserInput) {
		return this.api.createUser({ createUserRequest: input });
	}

	update(userId: string, input: UpdateUserInput) {
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
