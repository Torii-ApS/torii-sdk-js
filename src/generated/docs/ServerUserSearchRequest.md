
# ServerUserSearchRequest

Optional filter body for `POST /users/search`. Every field is tri-state: omit to skip that filter, send a value to apply it. The three id-selectors (`userIds`, `emailAddresses`, `email`) resolve users to a set of ids and, when more than one is supplied, are combined with AND (intersection); a supplied id-selector whose resolved set is empty returns an empty page. `name` additionally accepts JSON null to match users with no name; an explicit null or blank `email` contributes no restriction; the non-nullable `statuses` field rejects null.

## Properties

Name | Type
------------ | -------------
`name` | string
`userIds` | Array&lt;string&gt;
`emailAddresses` | Array&lt;string&gt;
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
  "userIds": [01931a73-8b00-7000-8000-000000000000],
  "emailAddresses": [ada@example.com],
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


