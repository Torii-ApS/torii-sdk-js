import { describe, expect, it } from 'bun:test';

describe('UpdateUserInput tri-state serialisation', () => {
	it('set: includes the key with the value', () => {
		expect(JSON.stringify({ firstName: 'Ada' })).toBe('{"firstName":"Ada"}');
	});
	it('clear: includes the key with null', () => {
		expect(JSON.stringify({ firstName: null })).toBe('{"firstName":null}');
	});
	it('omit: drops the key entirely', () => {
		expect(JSON.stringify({ firstName: undefined })).toBe('{}');
	});
	it('mixed', () => {
		const body = JSON.stringify({ firstName: 'Ada', phone: null, address: undefined });
		expect(JSON.parse(body)).toEqual({ firstName: 'Ada', phone: null });
	});
});
