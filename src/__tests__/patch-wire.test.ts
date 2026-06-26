import { describe, expect, it } from 'bun:test';
import {
	CreateUserRequestToJSON,
	ServerUserSearchRequestToJSON,
	UpdateUserMetadataRequestToJSON,
	UpdateUserRequestToJSON,
} from '../generated/index.js';
import fixtureManifest from './patch-wire-fixtures.json';

// The generated `*ToJSON` serializer + JSON.stringify IS the SDK's wire-encoding
// path. This test pins that the path emits exactly the bytes the shared contract
// blesses (the same fixtures the server round-trip test asserts), so tri-state
// behaviour stays at parity with every other SDK. See
// contract-tests/fixtures/patch-wire/fixtures.json.
const serializers: Record<string, (value: unknown) => unknown> = {
	UpdateUserRequest: UpdateUserRequestToJSON,
	CreateUserRequest: CreateUserRequestToJSON,
	ServerUserSearchRequest: ServerUserSearchRequestToJSON,
	UpdateUserMetadataRequest: UpdateUserMetadataRequestToJSON,
};

type Fixture = {
	name: string;
	schema: string;
	expectedBody: Record<string, unknown>;
};

const fixtures = (fixtureManifest as { fixtures: Fixture[] }).fixtures;

describe('patch-wire parity: the SDK emits the blessed wire bytes', () => {
	for (const fixture of fixtures) {
		it(fixture.name, () => {
			const toJSON = serializers[fixture.schema];
			expect(toJSON, `no serializer registered for schema ${fixture.schema}`).toBeDefined();
			// Build the request from expectedBody, serialize through the generated path,
			// and assert the wire JSON round-trips identically: absent keys stay absent
			// (leave), null stays null (clear), and nested nulls survive (key delete).
			const wire = JSON.parse(JSON.stringify(toJSON(fixture.expectedBody)));
			expect(wire).toEqual(fixture.expectedBody);
		});
	}
});
