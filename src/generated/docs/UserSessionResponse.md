
# UserSessionResponse

An active end-user session in your environment.

## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`environmentId` | string
`userAgent` | string
`ipAddress` | string
`createdAt` | Date
`expiresAt` | Date
`lastUsedAt` | Date
`activeOrganizationId` | string
`impersonatedBy` | string

## Example

```typescript
import type { UserSessionResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": 01931a74-1234-7000-8000-000000000000,
  "userId": 01931a73-8b00-7000-8000-000000000000,
  "environmentId": 01931a72-0000-7000-8000-000000000000,
  "userAgent": Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_0) AppleWebKit/537.36,
  "ipAddress": 203.0.113.42,
  "createdAt": 2026-05-16T09:30:00Z,
  "expiresAt": 2026-05-23T09:30:00Z,
  "lastUsedAt": 2026-05-16T11:42:00Z,
  "activeOrganizationId": null,
  "impersonatedBy": null,
} satisfies UserSessionResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UserSessionResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


