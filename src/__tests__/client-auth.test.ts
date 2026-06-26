import { describe, expect, it } from 'bun:test';
import { createToriiClient } from '../torii';

// A canned ServerUserResponse so the generated client can parse the reply; the
// tests only care about the outbound request.
const USER_JSON = JSON.stringify({
	id: '00000000-0000-0000-0000-000000000001',
	environmentId: '00000000-0000-0000-0000-000000000002',
	status: 'active',
	createdAt: '2024-01-01T00:00:00Z',
	updatedAt: '2024-01-01T00:00:00Z',
	publicMetadata: {},
	privateMetadata: {},
	unsafeMetadata: {},
});

type Capture = { url?: string; method?: string; auth?: string | null; body?: string };

function mockFetch(cap: Capture): typeof fetch {
	return (async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
		cap.url = String(input);
		cap.method = init?.method;
		cap.auth = new Headers(init?.headers).get('Authorization');
		cap.body = init?.body ? String(init.body) : undefined;
		return new Response(USER_JSON, {
			status: 200,
			headers: { 'content-type': 'application/json' },
		});
	}) as typeof fetch;
}

describe('client bearer auth (generated bearerAuth scheme)', () => {
	it('create sends Authorization: Bearer and omits unset metadata', async () => {
		const cap: Capture = {};
		const torii = createToriiClient({
			secretKey: 'sk_test_abc',
			apiUrl: 'https://api.example',
			fetch: mockFetch(cap),
		});

		await torii.users.create({ email: 'ada@example.com' });

		expect(cap.auth).toBe('Bearer sk_test_abc');
		expect(cap.method).toBe('POST');
		expect(JSON.parse(cap.body ?? '{}')).toEqual({ email: 'ada@example.com' });
	});

	it('update sends Authorization: Bearer', async () => {
		const cap: Capture = {};
		const torii = createToriiClient({
			secretKey: 'sk_test_abc',
			apiUrl: 'https://api.example',
			fetch: mockFetch(cap),
		});

		await torii.users.update('00000000-0000-0000-0000-000000000001', { firstName: 'Ada' });

		expect(cap.auth).toBe('Bearer sk_test_abc');
	});
});
