
# CreateEnvironmentInvitationServerRequest


## Properties

Name | Type
------------ | -------------
`email` | string
`expiresInDays` | number
`redirectUrl` | string
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }

## Example

```typescript
import type { CreateEnvironmentInvitationServerRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "email": null,
  "expiresInDays": null,
  "redirectUrl": null,
  "publicMetadata": null,
  "privateMetadata": null,
} satisfies CreateEnvironmentInvitationServerRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateEnvironmentInvitationServerRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


