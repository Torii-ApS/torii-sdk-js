
# UpdateUserMetadataRequest

PATCH body for a user\'s metadata bags. Each bag is tri-state: omit to leave it unchanged, or send an object value. Whether the object merges into or replaces the bag depends on the endpoint (see its operation description).

## Properties

Name | Type
------------ | -------------
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`unsafeMetadata` | { [key: string]: any; }

## Example

```typescript
import type { UpdateUserMetadataRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "publicMetadata": {plan=pro},
  "privateMetadata": {stripeId=cus_123},
  "unsafeMetadata": {onboardingStep=2},
} satisfies UpdateUserMetadataRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateUserMetadataRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


