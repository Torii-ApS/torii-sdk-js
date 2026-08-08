# ServerOrganizationsApi

All URIs are relative to *https://api.toriiauth.eu*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**getOrganization**](ServerOrganizationsApi.md#getorganization) | **GET** /api/server/v1/organizations/{organizationId} | Get an organization |
| [**listMembers**](ServerOrganizationsApi.md#listmembers) | **GET** /api/server/v1/organizations/{organizationId}/members | List organization members |
| [**listOrganizations**](ServerOrganizationsApi.md#listorganizations) | **GET** /api/server/v1/organizations | List organizations |
| [**updateMemberMetadata**](ServerOrganizationsApi.md#updatemembermetadata) | **PATCH** /api/server/v1/organizations/{organizationId}/members/{memberUserId}/metadata | Update organization membership metadata |
| [**updateOrganizationMetadata**](ServerOrganizationsApi.md#updateorganizationmetadataoperation) | **PATCH** /api/server/v1/organizations/{organizationId}/metadata | Update organization metadata |



## getOrganization

> ServerOrganizationResponse getOrganization(organizationId)

Get an organization

One organization with both metadata bags.

### Example

```ts
import {
  Configuration,
  ServerOrganizationsApi,
} from '';
import type { GetOrganizationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerOrganizationsApi(config);

  const body = {
    // string
    organizationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies GetOrganizationRequest;

  try {
    const data = await api.getOrganization(body);
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
| **organizationId** | `string` |  | [Defaults to `undefined`] |

### Return type

[**ServerOrganizationResponse**](ServerOrganizationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The organization. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **404** | No organization with this id in the key\&#39;s environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listMembers

> CursorPageResponseServerOrganizationMemberResponse listMembers(organizationId, limit, cursor)

List organization members

Cursor-paginated page of the organization\&#39;s USER memberships, each with both metadata bags. Ordered by member user id ascending (a creation-ordered uuid v7, which is also the seek key), NOT by join time.

### Example

```ts
import {
  Configuration,
  ServerOrganizationsApi,
} from '';
import type { ListMembersRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerOrganizationsApi(config);

  const body = {
    // string
    organizationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // number | Maximum number of items in the returned page (default 20; values outside 1-100 are clamped). (optional)
    limit: 50,
    // string | Opaque cursor returned by the previous page\'s `nextCursor`. Omit to fetch the first page. (optional)
    cursor: 01931a73-8b00-7000-8000-000000000000,
  } satisfies ListMembersRequest;

  try {
    const data = await api.listMembers(body);
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
| **organizationId** | `string` |  | [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of items in the returned page (default 20; values outside 1-100 are clamped). | [Optional] [Defaults to `20`] |
| **cursor** | `string` | Opaque cursor returned by the previous page\&#39;s &#x60;nextCursor&#x60;. Omit to fetch the first page. | [Optional] [Defaults to `undefined`] |

### Return type

[**CursorPageResponseServerOrganizationMemberResponse**](CursorPageResponseServerOrganizationMemberResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Page of the organization\&#39;s members. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **404** | No organization with this id in the key\&#39;s environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## listOrganizations

> CursorPageResponseServerOrganizationResponse listOrganizations(name, limit, cursor)

List organizations

Cursor-paginated page of the environment\&#39;s organizations, with both metadata bags. Optional &#x60;name&#x60; filter is a case-insensitive substring match.

### Example

```ts
import {
  Configuration,
  ServerOrganizationsApi,
} from '';
import type { ListOrganizationsRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerOrganizationsApi(config);

  const body = {
    // string | Case-insensitive substring filter on the organization name. (optional)
    name: acme,
    // number | Maximum number of items in the returned page (default 20; values outside 1-100 are clamped). (optional)
    limit: 50,
    // string | Opaque cursor returned by the previous page\'s `nextCursor`. Omit to fetch the first page. (optional)
    cursor: 01931a73-8b00-7000-8000-000000000000,
  } satisfies ListOrganizationsRequest;

  try {
    const data = await api.listOrganizations(body);
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
| **name** | `string` | Case-insensitive substring filter on the organization name. | [Optional] [Defaults to `undefined`] |
| **limit** | `number` | Maximum number of items in the returned page (default 20; values outside 1-100 are clamped). | [Optional] [Defaults to `20`] |
| **cursor** | `string` | Opaque cursor returned by the previous page\&#39;s &#x60;nextCursor&#x60;. Omit to fetch the first page. | [Optional] [Defaults to `undefined`] |

### Return type

[**CursorPageResponseServerOrganizationResponse**](CursorPageResponseServerOrganizationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Page of organizations. |  -  |
| **401** | Missing or invalid secret key. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateMemberMetadata

> ServerOrganizationMemberResponse updateMemberMetadata(organizationId, memberUserId, updateOrganizationMetadataRequest)

Update organization membership metadata

Deep-merges into either bag on one membership, with the same tri-state contract as the organization endpoint. Each bag on the membership has its own 8 KB budget, separate from the organization\&#39;s bags.

### Example

```ts
import {
  Configuration,
  ServerOrganizationsApi,
} from '';
import type { UpdateMemberMetadataRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerOrganizationsApi(config);

  const body = {
    // string
    organizationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // string
    memberUserId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateOrganizationMetadataRequest
    updateOrganizationMetadataRequest: ...,
  } satisfies UpdateMemberMetadataRequest;

  try {
    const data = await api.updateMemberMetadata(body);
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
| **organizationId** | `string` |  | [Defaults to `undefined`] |
| **memberUserId** | `string` |  | [Defaults to `undefined`] |
| **updateOrganizationMetadataRequest** | [UpdateOrganizationMetadataRequest](UpdateOrganizationMetadataRequest.md) |  | |

### Return type

[**ServerOrganizationMemberResponse**](ServerOrganizationMemberResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated membership. |  -  |
| **400** | The merged metadata exceeds the size limit. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **404** | No such organization in the key\&#39;s environment, or the user is not a member of it. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## updateOrganizationMetadata

> ServerOrganizationResponse updateOrganizationMetadata(organizationId, updateOrganizationMetadataRequest)

Update organization metadata

Deep-merges into either metadata bag. Each bag is tri-state: omit the key to leave the bag unchanged, or send an object to deep-merge into it (a key set to null removes it). Each bag is capped at 8 KB on its own, measured on the merged result rather than on the patch you send. A request naming neither bag is a 400.

### Example

```ts
import {
  Configuration,
  ServerOrganizationsApi,
} from '';
import type { UpdateOrganizationMetadataOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: bearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ServerOrganizationsApi(config);

  const body = {
    // string
    organizationId: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // UpdateOrganizationMetadataRequest
    updateOrganizationMetadataRequest: ...,
  } satisfies UpdateOrganizationMetadataOperationRequest;

  try {
    const data = await api.updateOrganizationMetadata(body);
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
| **organizationId** | `string` |  | [Defaults to `undefined`] |
| **updateOrganizationMetadataRequest** | [UpdateOrganizationMetadataRequest](UpdateOrganizationMetadataRequest.md) |  | |

### Return type

[**ServerOrganizationResponse**](ServerOrganizationResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`, `application/problem+json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | The updated organization. |  -  |
| **400** | The merged metadata exceeds the size limit. |  -  |
| **401** | Missing or invalid secret key. |  -  |
| **404** | No organization with this id in the key\&#39;s environment. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

