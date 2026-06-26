// @torii-backend/sdk — torii Backend SDK for Node.
//
// Verify JWTs networklessly, call /api/server/v1/** with a secret key,
// and (soon) verify outbound webhook signatures. Framework-agnostic; an
// Express middleware adapter is published under `@torii-backend/sdk/express`.

export {
	type AuthenticateRequestOptions,
	authenticateRequest,
	type RequestLike,
} from './authenticate-request.js';
// Generated data types — re-exported under stable Torii* aliases so the
// public surface is independent of the generator's naming. The request types
// carry tri-state PATCH semantics natively (`T | null | undefined`), so the
// public methods accept them directly with no hand-written wrapper.
export type {
	CreateUserRequest as ToriiCreateUserInput,
	CursorPageResponseServerUserResponse as ToriiCursorPageUser,
	ProblemDetail as ToriiProblemDetail,
	ServerUserResponse as ToriiUser,
	ServerUserSearchRequest as ToriiUserSearchFilter,
	UpdateUserRequest as ToriiUpdateUserInput,
	UserSessionResponse as ToriiSession,
} from './generated/index.js';
export {
	createToriiClient,
	type ListUsersOptions,
	SessionsClient,
	type ToriiClient,
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
