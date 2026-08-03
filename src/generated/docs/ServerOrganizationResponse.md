
# ServerOrganizationResponse


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`slug` | string
`roleSetId` | string
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`createdAt` | Date

## Example

```typescript
import type { ServerOrganizationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "slug": null,
  "roleSetId": null,
  "publicMetadata": null,
  "privateMetadata": null,
  "createdAt": null,
} satisfies ServerOrganizationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerOrganizationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


