
# CreateUserRequest

Request body for creating an end-user in your environment. All fields are optional; supply at minimum an email if you want the user to be able to sign in via email + password.

## Properties

Name | Type
------------ | -------------
`email` | string
`password` | string
`firstName` | string
`lastName` | string
`publicMetadata` | { [key: string]: any; }
`privateMetadata` | { [key: string]: any; }
`unsafeMetadata` | { [key: string]: any; }

## Example

```typescript
import type { CreateUserRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "email": ada@example.com,
  "password": correct horse battery staple,
  "firstName": Ada,
  "lastName": Lovelace,
  "publicMetadata": {plan=free},
  "privateMetadata": {billingCustomerId=cus_123},
  "unsafeMetadata": {onboardingStep=0},
} satisfies CreateUserRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CreateUserRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


