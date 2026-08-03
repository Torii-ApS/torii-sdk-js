
# ServerOrganizationMemberResponse


## Properties

Name | Type
------------ | -------------
`organizationId` | string
`userId` | string
`role` | string
`roleName` | string
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`joinedAt` | Date

## Example

```typescript
import type { ServerOrganizationMemberResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "organizationId": null,
  "userId": null,
  "role": null,
  "roleName": null,
  "publicMetadata": null,
  "privateMetadata": null,
  "joinedAt": null,
} satisfies ServerOrganizationMemberResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerOrganizationMemberResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


