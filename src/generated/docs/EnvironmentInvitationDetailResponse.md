
# EnvironmentInvitationDetailResponse


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
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }

## Example

```typescript
import type { EnvironmentInvitationDetailResponse } from ''

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
  "publicMetadata": null,
  "privateMetadata": null,
} satisfies EnvironmentInvitationDetailResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as EnvironmentInvitationDetailResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


