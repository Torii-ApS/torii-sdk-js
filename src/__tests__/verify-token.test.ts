// Tests verifyToken() end-to-end: spins up an in-process HTTP server that
// serves a JWKS, signs a JWT against the matching private key, verifies it,
// and checks failure modes. No external network, no torii server required.

import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { createServer, type Server } from 'node:http';
import { exportJWK, generateKeyPair, type KeyLike, SignJWT } from 'jose';
import { ToriiAuthError } from '../types.js';
import { _clearJwksCacheForTests, verifyToken } from '../verify-token.js';

type Fixture = {
	server: Server;
	issuer: string;
	privateKey: KeyLike;
	kid: string;
};

async function setupIssuer(): Promise<Fixture> {
	const { publicKey, privateKey } = await generateKeyPair('ES256', { extractable: true });
	const jwk = await exportJWK(publicKey);
	const kid = 'test-key-1';
	jwk.kid = kid;
	jwk.alg = 'ES256';
	jwk.use = 'sig';

	const server = createServer((req, res) => {
		if (req.url === '/_torii/.well-known/jwks.json') {
			res.writeHead(200, { 'content-type': 'application/json' });
			res.end(JSON.stringify({ keys: [jwk] }));
			return;
		}
		res.writeHead(404);
		res.end();
	});
	await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
	const addr = server.address();
	if (!addr || typeof addr === 'string') throw new Error('listen failed');
	const issuer = `http://127.0.0.1:${addr.port}`;
	return { server, issuer, privateKey, kid };
}

function signTokenWith(
	privateKey: KeyLike,
	kid: string,
	claims: Record<string, unknown>,
	issuer: string,
) {
	return new SignJWT(claims)
		.setProtectedHeader({ alg: 'ES256', kid })
		.setIssuer(issuer)
		.setIssuedAt()
		.setExpirationTime('5m')
		.sign(privateKey);
}

describe('verifyToken', () => {
	let fixture: Fixture;

	beforeEach(async () => {
		_clearJwksCacheForTests();
		fixture = await setupIssuer();
	});

	afterEach(() => {
		fixture.server.close();
	});

	it('verifies a well-formed ES256 JWT and extracts claims', async () => {
		const token = await signTokenWith(
			fixture.privateKey,
			fixture.kid,
			{
				sub: 'user_123',
				pid: 'env_abc',
				email_verified: true,
				profile_complete: true,
				locale: 'en',
			},
			fixture.issuer,
		);
		const auth = await verifyToken(token, { issuer: fixture.issuer });
		expect(auth.userId).toBe('user_123');
		expect(auth.environmentId).toBe('env_abc');
		expect(auth.issuer).toBe(fixture.issuer);
		expect(auth.emailVerified).toBe(true);
		expect(auth.profileComplete).toBe(true);
		expect(auth.impersonating).toBe(false);
		expect(auth.locale).toBe('en');
	});

	it('rejects a JWT signed by a different key', async () => {
		const other = await generateKeyPair('ES256', { extractable: true });
		const token = await signTokenWith(
			other.privateKey,
			fixture.kid,
			{ sub: 'user_123', pid: 'env_abc' },
			fixture.issuer,
		);
		await expect(verifyToken(token, { issuer: fixture.issuer })).rejects.toBeInstanceOf(
			ToriiAuthError,
		);
	});

	it('rejects a JWT whose iss does not match the expected issuer', async () => {
		const token = await signTokenWith(
			fixture.privateKey,
			fixture.kid,
			{ sub: 'user_123', pid: 'env_abc' },
			'http://wrong-issuer.example',
		);
		await expect(verifyToken(token, { issuer: fixture.issuer })).rejects.toBeInstanceOf(
			ToriiAuthError,
		);
	});

	it('rejects a JWT missing required claims', async () => {
		const token = await signTokenWith(
			fixture.privateKey,
			fixture.kid,
			{ pid: 'env_abc' }, // no `sub`
			fixture.issuer,
		);
		await expect(verifyToken(token, { issuer: fixture.issuer })).rejects.toBeInstanceOf(
			ToriiAuthError,
		);
	});

	it('rejects an expired JWT', async () => {
		const token = await new SignJWT({ sub: 'user_123', pid: 'env_abc' })
			.setProtectedHeader({ alg: 'ES256', kid: fixture.kid })
			.setIssuer(fixture.issuer)
			.setIssuedAt(Math.floor(Date.now() / 1000) - 600)
			.setExpirationTime(Math.floor(Date.now() / 1000) - 300)
			.sign(fixture.privateKey);
		await expect(verifyToken(token, { issuer: fixture.issuer })).rejects.toBeInstanceOf(
			ToriiAuthError,
		);
	});
});
