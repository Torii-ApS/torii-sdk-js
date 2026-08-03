
# ServerUserOrganizationResponse


## Properties

Name | Type
------------ | -------------
`organizationId` | string
`name` | string
`slug` | string
`role` | string
`roleName` | string
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`joinedAt` | Date

## Example

```typescript
import type { ServerUserOrganizationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "organizationId": null,
  "name": null,
  "slug": null,
  "role": null,
  "roleName": null,
  "publicMetadata": {seat=billable},
  "privateMetadata": {crmContactId=con_123},
  "joinedAt": null,
} satisfies ServerUserOrganizationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerUserOrganizationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


