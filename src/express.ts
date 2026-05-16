// Express middleware adapter. Attaches `req.auth: ToriiAuth` on success;
// responds 401 with a JSON error body otherwise. Mounted by the caller on
// whichever routes need protection.
//
// Express is a peerDependency — installing torii-backend doesn't pull it in.

import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { type AuthenticateRequestOptions, authenticateRequest } from './authenticate-request.js';
import { type ToriiAuth, ToriiAuthError } from './types.js';

declare module 'express-serve-static-core' {
	interface Request {
		auth?: ToriiAuth;
	}
}

export type RequireAuthOptions = AuthenticateRequestOptions & {
	/**
	 * Called when authentication fails. Default: writes a JSON 401.
	 * Throw or call `next(err)` here to delegate to your error handler.
	 */
	onAuthError?: (err: unknown, req: Request, res: Response, next: NextFunction) => void;
};

export function requireAuth(options: RequireAuthOptions): RequestHandler {
	const { onAuthError, ...verifyOptions } = options;

	return async (req, res, next) => {
		try {
			req.auth = await authenticateRequest(req, verifyOptions);
			next();
		} catch (err) {
			if (onAuthError) {
				onAuthError(err, req, res, next);
				return;
			}
			const message = err instanceof ToriiAuthError ? err.message : 'Authentication failed';
			res.status(401).json({ error: { code: 'authentication_failed', message } });
		}
	};
}
