
# ServerImpersonationTokenResponse

A minted impersonation token.

## Properties

Name | Type
------------ | -------------
`token` | string
`expiresInSeconds` | number
`url` | string

## Example

```typescript
import type { ServerImpersonationTokenResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "token": null,
  "expiresInSeconds": 600,
  "url": https://auth.example.com/_torii/auth/session/impersonate?token=…,
} satisfies ServerImpersonationTokenResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerImpersonationTokenResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


