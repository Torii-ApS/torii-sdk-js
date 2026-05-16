# Contributing

Thanks for your interest in `@torii-ts/backend` (this repo: `torii-sdk-js`)!

## Reporting bugs

Open an issue with:

- The version of `@torii-ts/backend` you're using (`npm ls @torii-ts/backend` or check your `package.json`).
- A minimal reproduction — a few lines that exhibit the bug.
- What you expected to happen vs. what actually happened.

For security-sensitive issues (anything that could let an attacker forge or bypass token verification), please email **security@torii.so** instead of filing a public issue.

## Development

```sh
git clone https://github.com/GOOD-Code-ApS/torii-sdk-js
cd torii-sdk-js
bun install
bun run typecheck
bun test
bunx biome check src
```

The REST client under `src/generated/` is produced by [`openapi-generator`](https://openapi-generator.tech/) from `spec/server-v1.json`. Don't hand-edit it. To regenerate after a spec update:

```sh
bunx @openapitools/openapi-generator-cli generate \
  -i spec/server-v1.json -g typescript-fetch -o src/generated \
  --additional-properties=supportsES6=true,typescriptThreePlus=true,withInterfaces=true
```

The hand-written surface (`src/torii.ts`, `src/verify-token.ts`, `src/authenticate-request.ts`, `src/express.ts`, `src/verify-webhook.ts`, `src/types.ts`) is where bug reports and PRs typically land.

## Pull requests

1. Open an issue first for non-trivial changes so we can discuss the shape.
2. Branch off `main`, name it `fix/<short>` or `feat/<short>`.
3. Run `bun run typecheck`, `bun test`, and `bunx biome check src` before pushing — CI checks all three.
4. Keep PRs small and focused. One concern per PR.
5. Update `README.md` if you change the public surface.

## Releases

Tagged off `main`. Bump `version` in `package.json` and any references in `README.md`, then:

```sh
git tag v0.0.2
git push origin v0.0.2
```

Publishing to npm is done by a maintainer (`bun publish` or `npm publish`).

## Code of Conduct

Be kind. Disagreements happen; argue the position, not the person.
