# ServerUsersApi

All URIs are relative to *https://api.torii.so*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**banUser**](ServerUsersApi.md#banuser) | **POST** /api/server/v1/users/{userId}/ban | Ban user |
| [**createUser**](ServerUsersApi.md#createuseroperation) | **POST** /api/server/v1/users | Create user |
| [**deleteUser**](ServerUsersApi.md#deleteuser) | **DELETE** /api/server/v1/users/{userId} | Delete user |
| [**getUser**](ServerUsersApi.md#getuser) | **GET** /api/server/v1/users/{userId} | Get user |
| [**searchUsers**](ServerUsersApi.md#searchusers) | **POST** /api/server/v1/users/search | Search users |
| [**unbanUser**](ServerUsersApi.md#unbanuser) | **POST** /api/server/v1/users/{userId}/unban | Unban user |
| [**updateUser**](ServerUsersApi.md#updateuseroperation) | **PATCH** /api/server/v1/users/{userId} | Update user |
| [**updateUserMetadata**](ServerUsersApi.md#updateusermetadataoperation) | **PATCH** /api/server/v1/users/{userId}/metadata | Update user metadata |



## banUser

> ServerUserResponse banUser(userId)

Ban user

Marks the user as banned and revokes all their active sessions.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { BanUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to ban.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies BanUserRequest;

  try {
    const data = await api.banUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to ban. | [Defaults to `undefined`] |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The (now banned) user. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## createUser

> ServerUserResponse createUser(createUserRequest)

Create user

Creates an end-user in your environment. All body fields are optional; supply at minimum an email if you want the user to be able to sign in via email + password.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { CreateUserOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // CreateUserRequest
    createUserRequest: ...,
  } satisfies CreateUserOperationRequest;

  try {
    const data = await api.createUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **createUserRequest** | [CreateUserRequest](CreateUserRequest.md) |  | |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | The created user. |  -  |
| **400** | Invalid body (e.g. weak password, malformed email). |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **409** | Another user with this email already exists in the environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## deleteUser

> deleteUser(userId)

Delete user

Soft-deletes the user. Not idempotent at the HTTP layer: the authorization grant for the user is revoked on the first successful delete, so a subsequent DELETE for the same id returns 403 rather than 204. Treat 403 from a retry as a confirmation that the user is already deleted.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { DeleteUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to delete.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies DeleteUserRequest;

  try {
    const data = await api.deleteUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to delete. | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | User deleted. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## getUser

> ServerUserResponse getUser(userId)

Get user

Returns the full profile for one end-user.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { GetUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to fetch.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies GetUserRequest;

  try {
    const data = await api.getUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to fetch. | [Defaults to `undefined`] |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The user. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## searchUsers

> CursorPageResponseServerUserResponse searchUsers(limit, cursor, serverUserSearchRequest)

Search users

Returns a cursor-paginated page of end-users in the environment matching the optional filters. Filters use the same tri-state PATCH semantics as &#x60;UpdateUserRequest&#x60;: omit a field to skip that filter, send a value to require it, send null to require null. Uses POST so the filter body can be sent without URL-encoding.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { SearchUsersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // number | Maximum number of items in the returned page (default 20). (optional)
    limit: 50,
    // string | Opaque cursor returned by the previous page\'s `nextCursor`. Omit to fetch the first page. (optional)
    cursor: 01931a73-8b00-7000-8000-000000000000,
    // ServerUserSearchRequest (optional)
    serverUserSearchRequest: ...,
  } satisfies SearchUsersRequest;

  try {
    const data = await api.searchUsers(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **limit** | `number` | Maximum number of items in the returned page (default 20). | [Optional] [Defaults to `20`] |
| **cursor** | `string` | Opaque cursor returned by the previous page\&#39;s &#x60;nextCursor&#x60;. Omit to fetch the first page. | [Optional] [Defaults to `undefined`] |
| **serverUserSearchRequest** | [ServerUserSearchRequest](ServerUserSearchRequest.md) |  | [Optional] |

### Return type

[**CursorPageResponseServerUserResponse**](CursorPageResponseServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Page of matching users. |  -  |
| **401** | Missing or invalid secret key. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## unbanUser

> ServerUserResponse unbanUser(userId)

Unban user

Reverses a previous ban. The user can sign in again on next request.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { UnbanUserRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to unban.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies UnbanUserRequest;

  try {
    const data = await api.unbanUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to unban. | [Defaults to `undefined`] |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The (now active) user. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateUser

> ServerUserResponse updateUser(userId, updateUserRequest)

Update user

Partial update with tri-state PATCH semantics. Every field in &#x60;UpdateUserRequest&#x60; is tri-state: omit the key to leave the field unchanged, send a non-null value to set it, or send JSON null to clear it.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { UpdateUserOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to update.
    userId: 01931a73-8b00-7000-8000-000000000000,
    // UpdateUserRequest
    updateUserRequest: ...,
  } satisfies UpdateUserOperationRequest;

  try {
    const data = await api.updateUser(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to update. | [Defaults to `undefined`] |
| **updateUserRequest** | [UpdateUserRequest](UpdateUserRequest.md) |  | |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated user. |  -  |
| **400** | Invalid body. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateUserMetadata

> ServerUserResponse updateUserMetadata(userId, updateUserMetadataRequest)

Update user metadata

Deep-merges into any of the three metadata bags. Each bag is tri-state: omit the key to leave the bag unchanged, or send an object to deep-merge into the existing bag (a key set to null removes it). The merged result is capped at 512 bytes for &#x60;publicMetadata&#x60;/&#x60;unsafeMetadata&#x60; and 4096 bytes for &#x60;privateMetadata&#x60;.

### Example

```ts
import {
  Configuration,
  ServerUsersApi,
} from '';
import type { UpdateUserMetadataOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerUsersApi(config);

  const body = {
    // string | Identifier of the user to update.
    userId: 01931a73-8b00-7000-8000-000000000000,
    // UpdateUserMetadataRequest
    updateUserMetadataRequest: ...,
  } satisfies UpdateUserMetadataOperationRequest;

  try {
    const data = await api.updateUserMetadata(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **userId** | `string` | Identifier of the user to update. | [Defaults to `undefined`] |
| **updateUserMetadataRequest** | [UpdateUserMetadataRequest](UpdateUserMetadataRequest.md) |  | |

### Return type

[**ServerUserResponse**](ServerUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated user. |  -  |
| **400** | A bag exceeds its size limit. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |
| **404** | No user with this id. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

