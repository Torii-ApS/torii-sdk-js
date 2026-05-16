// Networkless JWT verification. The first call to verifyToken() for a given
// issuer fetches that issuer's OIDC discovery doc + JWKS; subsequent calls
// reuse the cached JWKS until the cache TTL expires or kid rotation forces
// a re-fetch (jose's createRemoteJWKSet handles both).
//
// This is the core DX win behind a backend SDK — `clerk.verifyToken(token)`
// has no per-request round trip to torii.

import { createRemoteJWKSet, type JWTPayload, jwtVerify } from 'jose';
import { type ToriiAuth, ToriiAuthError } from './types.js';

export type VerifyTokenOptions = {
	/**
	 * Expected issuer URL (per-tenant), e.g. `https://acme.torii.so` or
	 * `https://auth.acme.com`. Required — strict iss validation is the
	 * point of OIDC-style verification.
	 */
	issuer: string;
	/**
	 * Optional audience claim to enforce. torii tokens don't set `aud` today,
	 * so leaving this undefined skips the check. Reserved for future-compat.
	 */
	audience?: string | string[];
	/**
	 * Clock skew tolerance in seconds when checking exp/nbf. Defaults to 30.
	 */
	clockTolerance?: number;
};

const jwksCache = new Map<string, ReturnType<typeof createRemoteJWKSet>>();

function jwksForIssuer(issuer: string): ReturnType<typeof createRemoteJWKSet> {
	const normalized = issuer.replace(/\/$/, '');
	let jwks = jwksCache.get(normalized);
	if (!jwks) {
		// Hard-coded path: torii's JWKS endpoint lives at /_torii/.well-known/jwks.json
		// for every tenant. We could discover via /.well-known/openid-configuration
		// first, but that's an extra round-trip on the cold path for no gain — the
		// JWKS URL is a stable contract documented in our OIDC discovery doc.
		jwks = createRemoteJWKSet(new URL(`${normalized}/_torii/.well-known/jwks.json`));
		jwksCache.set(normalized, jwks);
	}
	return jwks;
}

export async function verifyToken(token: string, options: VerifyTokenOptions): Promise<ToriiAuth> {
	const { issuer, audience, clockTolerance = 30 } = options;
	if (!token || typeof token !== 'string') {
		throw new ToriiAuthError('verifyToken: token must be a non-empty string');
	}
	if (!issuer) {
		throw new ToriiAuthError('verifyToken: `issuer` option is required');
	}

	const jwks = jwksForIssuer(issuer);

	let payload: JWTPayload;
	try {
		const result = await jwtVerify(token, jwks, {
			issuer,
			audience,
			clockTolerance,
			algorithms: ['ES256'],
		});
		payload = result.payload;
	} catch (err) {
		throw new ToriiAuthError(
			err instanceof Error ? `JWT verification failed: ${err.message}` : 'JWT verification failed',
			err,
		);
	}

	const userId = payload.sub;
	const environmentId = typeof payload.pid === 'string' ? payload.pid : undefined;
	const iss = payload.iss;
	if (!userId || !environmentId || !iss) {
		throw new ToriiAuthError(
			`JWT is missing required claims (sub=${!!userId}, pid=${!!environmentId}, iss=${!!iss})`,
		);
	}

	return {
		userId,
		environmentId,
		issuer: iss,
		emailVerified: payload.email_verified === true,
		profileComplete: payload.profile_complete !== false, // default true if absent
		impersonating: payload.impersonating === true,
		locale: typeof payload.locale === 'string' ? payload.locale : null,
		raw: payload as Record<string, unknown>,
	};
}

/**
 * Test-only: clear the JWKS cache. Production code should never call this —
 * jose's `createRemoteJWKSet` handles rotation via `kid` lookup automatically.
 */
export function _clearJwksCacheForTests(): void {
	jwksCache.clear();
}
