// Webhook signature verification. torii's outbound webhook subsystem is
// being designed under #424 Phase 0.5; we ship a placeholder here so the
// public SDK surface is stable when webhooks land — adopting this signature
// won't be a breaking change for SDK users.
//
// Once 0.5 lands with the final signing scheme (Svix-compatible HMAC or
// homegrown), this function becomes the real verifier.

import { ToriiAuthError } from './types.js';

export type VerifyWebhookOptions = {
	/** Webhook signing secret from the torii dashboard, e.g. `whsec_...`. */
	secret: string;
	/**
	 * Raw HTTP request headers, exactly as torii sent them. Required for
	 * signature reconstruction.
	 */
	headers: Record<string, string | string[] | undefined>;
	/**
	 * Raw request body (string or Buffer). MUST be the exact bytes torii
	 * signed — don't pass a re-serialized JSON object.
	 */
	payload: string | Buffer;
};

export type WebhookEvent = {
	type: string;
	id: string;
	created_at: string;
	data: Record<string, unknown>;
};

export async function verifyWebhook(_options: VerifyWebhookOptions): Promise<WebhookEvent> {
	throw new ToriiAuthError(
		"verifyWebhook: torii's outbound webhook subsystem has not shipped yet. " +
			"This stub keeps the SDK surface stable so adopting it later doesn't break callers. " +
			'Track progress on GitHub issue #424 (Phase 0.5).',
	);
}
