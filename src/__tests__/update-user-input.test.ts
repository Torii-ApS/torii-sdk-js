import { describe, expect, it } from 'bun:test';

describe('UpdateUserInput tri-state serialisation', () => {
	it('set: includes the key with the value', () => {
		expect(JSON.stringify({ name: 'Ada' })).toBe('{"name":"Ada"}');
	});
	it('clear: includes the key with null', () => {
		expect(JSON.stringify({ name: null })).toBe('{"name":null}');
	});
	it('omit: drops the key entirely', () => {
		expect(JSON.stringify({ name: undefined })).toBe('{}');
	});
	it('mixed', () => {
		const body = JSON.stringify({ name: 'Ada', phone: null, address: undefined });
		expect(JSON.parse(body)).toEqual({ name: 'Ada', phone: null });
	});
});
