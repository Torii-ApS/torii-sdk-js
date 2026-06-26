# AllowedOriginsApi

All URIs are relative to *https://api.torii.so*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**list**](AllowedOriginsApi.md#list) | **GET** /api/server/v1/allowed-origins | List escape-hatch origins for this environment |
| [**set**](AllowedOriginsApi.md#set) | **PUT** /api/server/v1/allowed-origins | Replace the escape-hatch origins for this environment |



## list

> AllowedOriginsResponse list()

List escape-hatch origins for this environment

### Example

```ts
import {
  Configuration,
  AllowedOriginsApi,
} from '';
import type { ListRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AllowedOriginsApi();

  try {
    const data = await api.list();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**AllowedOriginsResponse**](AllowedOriginsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## set

> AllowedOriginsResponse set(setAllowedOriginsRequest)

Replace the escape-hatch origins for this environment

Full origins incl. non-http schemes (e.g. capacitor://localhost). Replaces the list.

### Example

```ts
import {
  Configuration,
  AllowedOriginsApi,
} from '';
import type { SetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AllowedOriginsApi();

  const body = {
    // SetAllowedOriginsRequest
    setAllowedOriginsRequest: ...,
  } satisfies SetRequest;

  try {
    const data = await api.set(body);
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
| **setAllowedOriginsRequest** | [SetAllowedOriginsRequest](SetAllowedOriginsRequest.md) |  | |

### Return type

[**AllowedOriginsResponse**](AllowedOriginsResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

