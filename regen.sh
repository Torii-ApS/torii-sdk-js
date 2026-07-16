#!/usr/bin/env bash
# Regenerate the generated REST client under src/generated/ from
# spec/server-v1.json. Idempotent; safe to re-run after a spec bump.
# The hand-written surface (src/torii.ts, verify-token.ts, etc.) is untouched.
set -euo pipefail
cd "$(dirname "$0")"

pnpm dlx @openapitools/openapi-generator-cli generate \
  -i spec/server-v1.json -g typescript-fetch -o src/generated \
  --additional-properties=supportsES6=true,typescriptThreePlus=true,withInterfaces=true

echo "✓ regenerated src/generated/ from spec/server-v1.json"
