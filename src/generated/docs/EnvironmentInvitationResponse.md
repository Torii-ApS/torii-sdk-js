
# EnvironmentInvitationResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`environmentId` | string
`email` | string
`status` | string
`expiresAt` | Date
`createdAt` | Date
`acceptedAt` | Date
`revokedAt` | Date

## Example

```typescript
import type { EnvironmentInvitationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "environmentId": null,
  "email": null,
  "status": null,
  "expiresAt": null,
  "createdAt": null,
  "acceptedAt": null,
  "revokedAt": null,
} satisfies EnvironmentInvitationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnvironmentInvitationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


