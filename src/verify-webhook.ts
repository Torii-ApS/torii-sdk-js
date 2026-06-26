// Webhook signature verification. torii's outbound webhook subsystem is not
// yet available; we ship a placeholder here so the public SDK surface is
// stable when webhooks land — adopting this signature won't be a breaking
// change for SDK users.

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
		"verifyWebhook: torii's outbound webhook subsystem is not yet available.",
	);
}
