# @torii-ts/backend

Backend SDK for [torii](https://torii.so) — verify end-user JWTs without a per-request round trip, manage users from your Node server, react to events from torii.

> **Status: 0.0.x preview.** Surface is stable for the verify + users + sessions path; outbound webhooks (`verifyWebhook`) is a stub that throws until torii's webhook subsystem ships (tracked in [Torii-ApS/torii#424](https://github.com/Torii-ApS/torii/issues/424) Phase 0.5).

## Install

```sh
bun add @torii-ts/backend
# or: npm install @torii-ts/backend
```

Node 18+ (global `fetch`). Bun is supported.

## Verify a JWT

```ts
import { verifyToken } from "@torii-ts/backend";

const auth = await verifyToken(req.headers.authorization!.slice(7), {
  issuer: "https://acme.torii.so", // or your verified custom domain
});

console.log(auth.userId, auth.environmentId, auth.emailVerified);
```

The first call fetches the issuer's JWKS; subsequent calls reuse the cache and rotate keys automatically (handled by [`jose`](https://github.com/panva/jose)). No network round trip per request.

## Express middleware

```ts
import express from "express";
import { requireAuth } from "@torii-ts/backend/express";

const app = express();

app.get(
  "/me",
  requireAuth({ issuer: "https://acme.torii.so" }),
  (req, res) => {
    res.json({ user: req.auth!.userId });
  },
);
```

## Backend API

```ts
import { createToriiClient } from "@torii-ts/backend";

const torii = createToriiClient({ secretKey: process.env.TORII_SECRET_KEY! });

// users
const page = await torii.users.list({ limit: 50 });
const user = await torii.users.create({ email: "x@y.com" });
await torii.users.ban(user.id);

// sessions
const sessions = await torii.sessions.listForUser(user.id);
await torii.sessions.revokeAllForUser(user.id);
```

Default base URL is `https://api.torii.so`. Override with `apiUrl` for staging or self-hosted.

### PATCH semantics

`torii.users.update()` takes a partial body where each field is tri-state — `T | null | undefined`:

```ts
await torii.users.update(userId, {
  name: "Ada",        // → server updates name
  phone: null,        // → server clears phone
  // address absent  → server leaves address alone
});
```

- A **value** (e.g. `"Ada"`) updates the field.
- `null` **clears** the field.
- `undefined` (or omitting the key) leaves the field alone.

This works because `JSON.stringify` drops `undefined` keys but emits `null` — which is exactly the wire contract the server expects for PATCH bodies.

## Verify outbound webhooks

```ts
import { verifyWebhook } from "@torii-ts/backend";

app.post("/webhooks/torii", express.raw({ type: "*/*" }), async (req, res) => {
  const event = await verifyWebhook({
    secret: process.env.TORII_WEBHOOK_SECRET!,
    headers: req.headers,
    payload: req.body, // raw Buffer, not parsed JSON
  });
  // ...
});
```

> Currently throws. Awaiting [Torii-ApS/torii#424](https://github.com/Torii-ApS/torii/issues/424) Phase 0.5 (outbound webhook subsystem).

## License

MIT
