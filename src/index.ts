// @torii-ts/backend — torii Backend SDK for Node.
//
// Verify JWTs networklessly, call /api/server/v1/** with a secret key,
// and (soon) verify outbound webhook signatures. Framework-agnostic; an
// Express middleware adapter is published under `@torii-ts/backend/express`.

export {
	type AuthenticateRequestOptions,
	authenticateRequest,
	type RequestLike,
} from './authenticate-request.js';
// Generated data types — re-exported under stable Torii* aliases so the
// public surface is independent of the generator's naming.
export type {
	CreateUserRequest as ToriiCreateUserInput,
	CursorPageResponseUserResponse as ToriiCursorPageUser,
	UpdateUserRequest as ToriiUpdateUserInput,
	UserResponse as ToriiUser,
	UserSessionResponse as ToriiSession,
} from './generated/index.js';
export {
	type CreateUserInput,
	createToriiClient,
	type ListUsersOptions,
	SessionsClient,
	type ToriiClient,
	type UpdateUserInput,
	UsersClient,
} from './torii.js';
export {
	ToriiApiError,
	type ToriiAuth,
	ToriiAuthError,
	type ToriiClientOptions,
} from './types.js';
export {
	_clearJwksCacheForTests,
	type VerifyTokenOptions,
	verifyToken,
} from './verify-token.js';
export { type VerifyWebhookOptions, verifyWebhook, type WebhookEvent } from './verify-webhook.js';
