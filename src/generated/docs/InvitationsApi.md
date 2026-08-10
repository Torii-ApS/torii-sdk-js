# InvitationsApi

All URIs are relative to *https://api.toriiauth.eu*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**create**](InvitationsApi.md#create) | **POST** /api/server/v1/invitations | Create an invitation with optional pre-seeded metadata |
| [**get**](InvitationsApi.md#get) | **GET** /api/server/v1/invitations/{invitationId} | Get an invitation by id, including both metadata bags |
| [**list1**](InvitationsApi.md#list1) | **GET** /api/server/v1/invitations | List invitations for this environment |
| [**resend**](InvitationsApi.md#resend) | **POST** /api/server/v1/invitations/{invitationId}/resend | Resend a pending invitation with a fresh link |
| [**revoke**](InvitationsApi.md#revoke) | **DELETE** /api/server/v1/invitations/{invitationId} | Revoke a pending invitation |
| [**updateMetadata**](InvitationsApi.md#updatemetadata) | **PATCH** /api/server/v1/invitations/{invitationId} | Deep-merge metadata into a pending invitation |



## create

> EnvironmentInvitationResponse create(createEnvironmentInvitationServerRequest)

Create an invitation with optional pre-seeded metadata

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { CreateRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // CreateEnvironmentInvitationServerRequest
    createEnvironmentInvitationServerRequest: ...,
  } satisfies CreateRequest;

  try {
    const data = await api.create(body);
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
| **createEnvironmentInvitationServerRequest** | [CreateEnvironmentInvitationServerRequest](CreateEnvironmentInvitationServerRequest.md) |  | |

### Return type

[**EnvironmentInvitationResponse**](EnvironmentInvitationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | The created invitation. The email has been sent. |  -  |
| **400** | Invalid body, metadata over the 8KB budget, or the environment has no sign-up URL configured. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **409** | This email already has an account in the environment. |  -  |
| **429** | The environment\&#39;s invitation rate limit is exhausted. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## get

> EnvironmentInvitationDetailResponse get(invitationId)

Get an invitation by id, including both metadata bags

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { GetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetRequest;

  try {
    const data = await api.get(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**EnvironmentInvitationDetailResponse**](EnvironmentInvitationDetailResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## list1

> CursorPageResponseEnvironmentInvitationResponse list1(status, search, limit, cursor)

List invitations for this environment

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { List1Request } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // Array<string> (optional)
    status: ...,
    // string (optional)
    search: search_example,
    // number (optional)
    limit: 56,
    // string (optional)
    cursor: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies List1Request;

  try {
    const data = await api.list1(body);
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
| **status** | `Array<string>` |  | [Optional] |
| **search** | `string` |  | [Optional] [Defaults to `undefined`] |
| **limit** | `number` |  | [Optional] [Defaults to `20`] |
| **cursor** | `string` |  | [Optional] [Defaults to `undefined`] |

### Return type

[**CursorPageResponseEnvironmentInvitationResponse**](CursorPageResponseEnvironmentInvitationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## resend

> EnvironmentInvitationResponse resend(invitationId)

Resend a pending invitation with a fresh link

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { ResendRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies ResendRequest;

  try {
    const data = await api.resend(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**EnvironmentInvitationResponse**](EnvironmentInvitationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## revoke

> revoke(invitationId)

Revoke a pending invitation

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { RevokeRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies RevokeRequest;

  try {
    const data = await api.revoke(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateMetadata

> EnvironmentInvitationDetailResponse updateMetadata(invitationId, updateEnvironmentInvitationMetadataRequest)

Deep-merge metadata into a pending invitation

### Example

```ts
import {
  Configuration,
  InvitationsApi,
} from '';
import type { UpdateMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new InvitationsApi(config);

  const body = {
    // string
    invitationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateEnvironmentInvitationMetadataRequest
    updateEnvironmentInvitationMetadataRequest: ...,
  } satisfies UpdateMetadataRequest;

  try {
    const data = await api.updateMetadata(body);
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
| **invitationId** | `string` |  | [Defaults to `undefined`] |
| **updateEnvironmentInvitationMetadataRequest** | [UpdateEnvironmentInvitationMetadataRequest](UpdateEnvironmentInvitationMetadataRequest.md) |  | |

### Return type

[**EnvironmentInvitationDetailResponse**](EnvironmentInvitationDetailResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated invitation. |  -  |
| **400** | Merged metadata over the 8KB budget, or a body naming neither bag. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **404** | No such invitation in this environment. |  -  |
| **409** | The invitation is accepted, revoked or expired (&#x60;invitation_not_pending&#x60;, with the state on &#x60;invitationStatus&#x60;), or its state could not be resolved consistently (&#x60;invitation_patch_conflict&#x60;, a server-side fault — do not retry in a loop). |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

