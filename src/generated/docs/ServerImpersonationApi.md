# ServerImpersonationApi

All URIs are relative to *https://api.toriiauth.eu*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**mintImpersonationToken**](ServerImpersonationApi.md#mintimpersonationtoken) | **POST** /api/server/v1/users/{userId}/impersonation-token | Mint an impersonation token |



## mintImpersonationToken

> ServerImpersonationTokenResponse mintImpersonationToken(userId, serverImpersonationTokenRequest)

Mint an impersonation token

Creates a single-use, short-lived impersonation token for the target user, attributed to &#x60;actorUserId&#x60;. Redeem it programmatically via &#x60;POST /_torii/auth/session/impersonate&#x60; (access token in the body), or hand the returned &#x60;url&#x60; to an operator to open in a browser (establishes the session and redirects to the landing URL). Counts against the same per-period impersonation quota and usage ledger as the dashboard.

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
| **200** | The minted token, its lifetime, and (when a landing URL resolves) a ready-to-use redeem URL. |  -  |
| **400** | Deleted target, &#x60;expiresInSeconds&#x60; out of the 60..600 range, or &#x60;redirectUrl&#x60; malformed / not in the environment\&#39;s allowed origins. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **402** | Plan does not include impersonation, or the per-period quota is exhausted. |  -  |
| **403** | Target or actor is in another environment, or impersonation is disabled for this environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

