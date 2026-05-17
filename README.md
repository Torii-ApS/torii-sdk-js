# @torii-backend/sdk

Backend SDK for [torii](https://torii.so) — verify end-user JWTs without a per-request round trip and manage users from your Node server.

> **v0.x — API may still change.**

## Setup

1. Sign in to [app.torii.so](https://app.torii.so) and from your dashboard copy:
   - your **issuer URL** (e.g. `https://acme.torii.so`)
   - a **secret key** (`sk_test_…` for development, `sk_live_…` for production)

2. Install the SDK:

   ```sh
   bun add @torii-backend/sdk
   # or: npm install @torii-backend/sdk
   ```

   Node 18+ (global `fetch`). Bun is supported.

3. Verify an end-user JWT:

   ```ts
   import { verifyToken } from "@torii-backend/sdk";

   const auth = await verifyToken(token, {
     issuer: "https://acme.torii.so",
   });

   console.log(auth.userId, auth.environmentId, auth.emailVerified);
   ```

   The first call fetches the issuer's JWKS; subsequent calls reuse the cache and rotate keys automatically (handled by [`jose`](https://github.com/panva/jose)). No round trip per request.

4. Call the backend REST API:

   ```ts
   import { createToriiClient } from "@torii-backend/sdk";

   const torii = createToriiClient({
     secretKey: process.env.TORII_SECRET_KEY!,
   });

   const user = await torii.users.get(userId);
   ```

   Default base URL is `https://api.torii.so`. Override with `apiUrl` for staging or self-hosted.

## Express middleware

```ts
import express from "express";
import { requireAuth } from "@torii-backend/sdk/express";

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
const page = await torii.users.list({ limit: 50 });
const user = await torii.users.create({ email: "x@y.com" });
await torii.users.ban(user.id);

const sessions = await torii.sessions.listForUser(user.id);
await torii.sessions.revokeAllForUser(user.id);
```

### PATCH semantics

`torii.users.update()` takes a partial body where each field is tri-state — `T | null | undefined`:

```ts
await torii.users.update(userId, {
  name: "Ada",       // → server updates name
  phone: null,       // → server clears phone
  // address absent  → server leaves address alone
});
```

- A **value** (e.g. `"Ada"`) updates the field.
- `null` **clears** the field.
- `undefined` (or omitting the key) leaves the field alone.

This works because `JSON.stringify` drops `undefined` keys but emits `null` — which is exactly the wire contract the server expects for PATCH bodies.

## License

MIT
