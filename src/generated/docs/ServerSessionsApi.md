# ServerSessionsApi

All URIs are relative to *https://api.toriiauth.eu*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**listSessions**](ServerSessionsApi.md#listsessions) | **GET** /api/server/v1/users/{userId}/sessions | List user sessions |
| [**revokeAllSessions**](ServerSessionsApi.md#revokeallsessions) | **DELETE** /api/server/v1/users/{userId}/sessions | Revoke all sessions |
| [**revokeSession**](ServerSessionsApi.md#revokesession) | **DELETE** /api/server/v1/users/{userId}/sessions/{sessionId} | Revoke specific session |



## listSessions

> Array&lt;UserSessionResponse&gt; listSessions(userId)

List user sessions

Returns all active (unexpired, unrevoked) sessions for the user, ordered by most recently used.

### Example

```ts
import {
  Configuration,
  ServerSessionsApi,
} from '';
import type { ListSessionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerSessionsApi(config);

  const body = {
    // string | Identifier of the user whose sessions to list.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies ListSessionsRequest;

  try {
    const data = await api.listSessions(body);
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
| **userId** | `string` | Identifier of the user whose sessions to list. | [Defaults to `undefined`] |

### Return type

[**Array&lt;UserSessionResponse&gt;**](UserSessionResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | All active sessions for the user. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeAllSessions

> revokeAllSessions(userId)

Revoke all sessions

Immediately revokes every active session for the user. Idempotent.

### Example

```ts
import {
  Configuration,
  ServerSessionsApi,
} from '';
import type { RevokeAllSessionsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerSessionsApi(config);

  const body = {
    // string | Identifier of the user whose sessions to revoke.
    userId: 01931a73-8b00-7000-8000-000000000000,
  } satisfies RevokeAllSessionsRequest;

  try {
    const data = await api.revokeAllSessions(body);
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
| **userId** | `string` | Identifier of the user whose sessions to revoke. | [Defaults to `undefined`] |

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
| **204** | Sessions revoked. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User belongs to a different environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revokeSession

> revokeSession(userId, sessionId)

Revoke specific session

Revokes a single session by id. Idempotent: returns 204 even if the session was already revoked or expired.

### Example

```ts
import {
  Configuration,
  ServerSessionsApi,
} from '';
import type { RevokeSessionRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerSessionsApi(config);

  const body = {
    // string | Identifier of the user who owns the session.
    userId: 01931a73-8b00-7000-8000-000000000000,
    // string | Identifier of the session to revoke.
    sessionId: 01931a74-1234-7000-8000-000000000000,
  } satisfies RevokeSessionRequest;

  try {
    const data = await api.revokeSession(body);
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
| **userId** | `string` | Identifier of the user who owns the session. | [Defaults to `undefined`] |
| **sessionId** | `string` | Identifier of the session to revoke. | [Defaults to `undefined`] |

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
| **204** | Session revoked. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **403** | User or session belongs to a different environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

