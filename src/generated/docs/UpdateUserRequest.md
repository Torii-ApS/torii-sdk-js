
# UpdateUserRequest

PATCH body for updating an end-user. Every field is tri-state: omit the key entirely to leave the field unchanged, send a non-null value to set it, or send JSON null to clear it.

## Properties

Name | Type
------------ | -------------
`firstName` | string
`lastName` | string
`locale` | string
`unsafeMetadata` | { [key: string]: any; }

## Example

```typescript
import type { UpdateUserRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "firstName": Ada,
  "lastName": Lovelace,
  "locale": null,
  "unsafeMetadata": {onboardingStep=2},
} satisfies UpdateUserRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateUserRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


