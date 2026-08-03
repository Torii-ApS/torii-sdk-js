
# CursorPageResponseServerOrganizationResponse

A single page of results in a cursor-paginated list. Pass `nextCursor` as the `cursor` query parameter to fetch the following page.

## Properties

Name | Type
------------ | -------------
`items` | [Array&lt;ServerOrganizationResponse&gt;](ServerOrganizationResponse.md)
`nextCursor` | string
`hasMore` | boolean

## Example

```typescript
import type { CursorPageResponseServerOrganizationResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "items": null,
  "nextCursor": 01931a73-8b00-7000-8000-000000000000,
  "hasMore": true,
} satisfies CursorPageResponseServerOrganizationResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CursorPageResponseServerOrganizationResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


