
# ServerUserResponse

An end-user, including server-only private metadata. Returned only on the secret-key backend API.

## Properties

Name | Type
------------ | -------------
`id` | string
`environmentId` | string
`name` | string
`firstName` | string
`lastName` | string
`locale` | string
`status` | string
`createdAt` | Date
`updatedAt` | Date
`email` | string
`emailVerifiedAt` | Date
`deletedAt` | Date
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`unsafeMetadata` | { [key: string]: any; }

## Example

```typescript
import type { ServerUserResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 01931a73-8b00-7000-8000-000000000000,
  "environmentId": 01931a72-0000-7000-8000-000000000000,
  "name": Ada Lovelace,
  "firstName": Ada,
  "lastName": Lovelace,
  "locale": null,
  "status": null,
  "createdAt": 2026-05-16T09:30:00Z,
  "updatedAt": 2026-05-16T10:00:00Z,
  "email": ada@example.com,
  "emailVerifiedAt": 2026-05-16T09:35:00Z,
  "deletedAt": 2026-05-20T12:00:00Z,
  "publicMetadata": {plan=pro},
  "privateMetadata": {stripeId=cus_123},
  "unsafeMetadata": {onboardingStep=2},
} satisfies ServerUserResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerUserResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


