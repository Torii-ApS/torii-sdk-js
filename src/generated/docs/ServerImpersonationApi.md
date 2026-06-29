# ServerImpersonationApi

All URIs are relative to *https://api.torii.so*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**mintImpersonationToken**](ServerImpersonationApi.md#mintimpersonationtoken) | **POST** /api/server/v1/users/{userId}/impersonation-token | Mint an impersonation token |



## mintImpersonationToken

> ServerImpersonationTokenResponse mintImpersonationToken(userId, serverImpersonationTokenRequest)

Mint an impersonation token

Creates a single-use, short-lived impersonation token for the target user, attributed to &#x60;actorUserId&#x60;. Redeem it via &#x60;POST /_torii/auth/session/impersonate&#x60; to obtain a session and access token as the target user. Counts against the same per-period impersonation quota and usage ledger as the dashboard.

### Example

```ts
import {
  Configuration,
  ServerImpersonationApi,
} from '';
import type { MintImpersonationTokenRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerImpersonationApi(config);

  const body = {
    // string | The user to impersonate.
    userId: 01931a73-8b00-7000-8000-000000000000,
    // ServerImpersonationTokenRequest
    serverImpersonationTokenRequest: ...,
  } satisfies MintImpersonationTokenRequest;

  try {
    const data = await api.mintImpersonationToken(body);
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
| **userId** | `string` | The user to impersonate. | [Defaults to `undefined`] |
| **serverImpersonationTokenRequest** | [ServerImpersonationTokenRequest](ServerImpersonationTokenRequest.md) |  | |

### Return type

[**ServerImpersonationTokenResponse**](ServerImpersonationTokenResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The minted token and its lifetime. |  -  |
| **400** | Deleted target, or &#x60;expiresInSeconds&#x60; out of the 60..600 range. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **402** | Plan does not include impersonation, or the per-period quota is exhausted. |  -  |
| **403** | Target or actor is in another environment, or impersonation is disabled for this environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

