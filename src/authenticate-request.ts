// Framework-agnostic request authenticator. Frameworks adapt their req shape
// to a `{ headers: Record<string,string> }` view; everything else flows
// through verifyToken. Keeping this layer thin means Fastify/Hono/Next/...
// adapters can be ~20 lines each.

import { type ToriiAuth, ToriiAuthError } from './types.js';
import { type VerifyTokenOptions, verifyToken } from './verify-token.js';

export type AuthenticateRequestOptions = VerifyTokenOptions & {
	/**
	 * Optional override: by default we read the bearer token from
	 * `Authorization: Bearer ...`. Override if your gateway forwards the
	 * token in a different header.
	 */
	header?: string;
};

export type RequestLike = {
	headers: Record<string, string | string[] | undefined>;
};

function readHeader(headers: RequestLike['headers'], name: string): string | undefined {
	const key = name.toLowerCase();
	for (const [k, v] of Object.entries(headers)) {
		if (k.toLowerCase() !== key) continue;
		if (typeof v === 'string') return v;
		if (Array.isArray(v) && v.length > 0) return v[0];
	}
	return undefined;
}

export async function authenticateRequest(
	req: RequestLike,
	options: AuthenticateRequestOptions,
): Promise<ToriiAuth> {
	const headerName = options.header ?? 'authorization';
	const raw = readHeader(req.headers, headerName);
	if (!raw) {
		throw new ToriiAuthError(`Missing ${headerName} header`);
	}
	const match = /^Bearer\s+(.+)$/i.exec(raw);
	if (!match) {
		throw new ToriiAuthError(`${headerName} header is not in 'Bearer <token>' form`);
	}
	return verifyToken(match[1].trim(), options);
}
