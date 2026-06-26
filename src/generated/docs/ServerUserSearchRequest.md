
# ServerUserSearchRequest

Optional filter body for `POST /users/search`. Every field is tri-state: omit to skip that filter, send a value to require it. Fields whose inner type is nullable (currently `name`, `email`) additionally accept JSON null to filter for users where that column is null; the non-nullable `statuses` field rejects null.

## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`statuses` | Set&lt;string&gt;
`createdAfter` | Date
`createdBefore` | Date

## Example

```typescript
import type { ServerUserSearchRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": Ada,
  "email": @example.com,
  "statuses": null,
  "createdAfter": 2026-01-01T00:00:00Z,
  "createdBefore": 2026-12-31T23:59:59Z,
} satisfies ServerUserSearchRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as ServerUserSearchRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


