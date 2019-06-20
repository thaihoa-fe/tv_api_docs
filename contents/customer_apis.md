---
date: 3rd May 2019
title: "Customer API"
---

## Authentication mechanism

We use HMAC authentication which has been widely used by Amazon and Google to grant
access to many of their APIs.

How it works:

1. API access key is a pair:

    - Access key ID: a unique identifier (UUID) of the API access key.
    - Access key secret: a secret key that will be used to sign the requests.

   TrustVision team will create access key ID and access key secret for each customers before integration.

2. Client signs a request:

    The client must generate a signature for each request, and send it in the
    `Authorization` header. Following is pseudo code that illustrates the
    construction of the `Authorization` request header:

    ```code
    Authorization = "TV" + " " + AccessKeyID + ":" + Signature;

    Signature = Base64( HMAC-SHA256( AccessKeySecret, UTF-8-Encoding-Of( StringToSign ) ) );

    StringToSign = HTTP-Verb + "\n" + URI + "\n" + Timestamp;
    ```

    Where:
    - AccessKeyID and AccessKeySecret: are the access key provided by Trust Vision.
    - HTTP-Verb: is either `POST` `GET` `PUT` `PATCH` `DELETE`.
    - URI: is the relative route path of the resource (exclude the domain).
    - Timestamp: the time of the request in RFC3339 format. The client must also
    send this timestamp with the request in the `X-TV-Timestamp` header.

    Example:

    - API Access key:
      - Access key ID: `62C1EB34-CB6A-41CE-AA5D-54C317954242`
      - Access key secret: `42*Esi8e#1aWb55KQ3UnOe4JVcuNS2ns`

    - Request:

    ```curl
    curl -X POST \
    https://tv-testing.trustingsocial.com/tv_api/v1/images \
    -H 'Authorization: TV 62C1EB34-CB6A-41CE-AA5D-54C317954242:7R2t1HSzE40HN51ydeNJ5f3NLIEyWp1dZIt3BUxE51U=' \
    -H 'X-TV-Timestamp: 2019-04-21T18:00:15+07:00' \
    -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
    -F file=@/images/portrait.jpg
    ```

    - String to sign:

    ```text
    POST\n/v1/images\n2019-04-21T18:00:15+07:00
    ```

3. Server verifies the request signature:

    To verify the signature, the server first takes the request timestamp from
    `X-TV-Timestamp` header, compares it with current timestamp of the server.
    If the difference between 2 timestamps is more than 15 minutes, it will
    reject the request and return `RequestTimeTooSkewed` error to the client.
    The intention of this restriction is to limit the possibility that
    intercepted requests could be replayed by an adversary.

    If the timestamp is within the limit, the server will then parse value from
    `Authorization` header to get `AccessKeyID` and `Signature` (separated by `:`).
    It looks up `AccessKeyID` to get the corresponding `AccessKeySecret`.

    After that, the server uses the request timestamp to generate the string to
    sign, and use the `AccessKeySecret` to creates the signature with the same
    method as described before.

    Finally, the request is authorized if the generated signature matches the
    request signature.

## Interaction Flows

### Flow 1: Compare faces between images

[![Flow 1: Compare faces between 2 images](https://static.swimlanes.io/daa882c11dff1ba9a48534d037ffee7d.png)](https://swimlanes.io/d/bG0Nf-0xm)

### Flow 2: Verify face liveness in images

Note that we're going towards no-gesture liveness verification, however we can
also support gesture based liveness verification, so in this flow, we allow
clients to send at most 3 images with optional gestures (more than 3 can create
bad user experience, we're aiming for using only 1).

[![Flow 2: Verify face liveness in images](https://static.swimlanes.io/cc1af44fa4d0860755893ea35d3a7c81.png)](https://swimlanes.io/d/LG0aS5vDZ)

## List of APIs

### Upload Image

1. Request

    Client should call this API:

    | method | URL          | content-type          |
    |--------|--------------|-----------------------|
    | POST   | `/v1/images` | `multipart/form-data` |

    With following parameters:

    | field      | type       | required |  description                                                                       |
    |------------|------------|----------|------------------------------------------------------------------------------------|
    | `file`     | file       | yes      | the image file to be uploaded                                                      |
    | `label`    | string     | no       | label of the image                                                                 |
    | `metadata` | dictionary | no       | any key-value metadata to save with the image, both key and value should be string |

    Image label should be one of following values:

    | label                            | description                                                                  |
    |----------------------------------|------------------------------------------------------------------------------|
    | `portrait`                       | the portrait photo                                                           |
    | `id_card.in.aadhaar.front`       | the front side of India Aadhaar card                                         |
    | `id_card.in.aadhaar.back`        | the back side of India Aadhaar card                                          |
    | `id_card.in.pan.front`           | the front side of India PAN card                                             |
    | `id_card.in.pan.back`            | the back side of India PAN card                                              |
    | `id_card.in.voter.front`         | the front side of India Voter card                                           |
    | `id_card.in.passport.front`      | the front side of India passport                                             |
    | `id_card.vn.cmnd_old.front`      | the front side of Vietnam national ID old version (Chứng minh nhân dân cũ)   |
    | `id_card.vn.cmnd_old.back`       | the back side of Vietnam national ID old version (Chứng minh nhân dân cũ)    |
    | `id_card.vn.cmnd_new.front`      | the front side of Vietnam national ID new version (Chứng minh nhân dân mới)  |
    | `id_card.vn.cmnd_new.back`       | the back side of Vietnam national ID new version (Chứng minh nhân dân mới)   |
    | `id_card.vn.cccd.front`          | the front side of Vietnam national ID latest version (Căn cước công dân)     |
    | `id_card.vn.cccd.back`           | the back side of Vietnam national ID latest version (Căn cước công dân)      |
    | `id_card.vn.passport.front`      | the front side of Vietnam passport                                           |

    Authentication mechanism is described in [Authentication](#authentication-mechanism).

2. Response

    The response will be a JSON with following format:

    ``` go
    {
        "data": {
            "image_id": string, // ID of the uploaded image in StoreDB
        },
        "errors": [
            {
                "code": string,
                "message": string,
                "detail": {
                    "field": string, // optional, which parameter is invalid.
                    ... // any other information that can be useful for client
                },
            },
            ... // other errors
        ]
    }
    ```

    In case of success, the HTTP status code will be 200, and the `data` will be
    an object containing following fields:

    | field      | type   | description                     |
    |------------|--------|---------------------------------|
    | `image_id` | string | ID of the uploaded image (UUID) |

    In case of error, the `data` will be empty, and server sends following HTTP
    status code and error information:

    | HTTP code | error code                       | description                                               |
    |-----------|----------------------------------|-----------------------------------------------------------|
    | 400       | `invalid_parameter_exception`    | Input parameter violates a constraint.                    |
    | 401       | `access_denied_exception`        | You are not authorized to perform the action.             |
    | 413       | `image_too_large_exception`      | The input image size exceeds the allowed limit (15MB).    |
    | 415       | `invalid_image_format_exception` | The provided image format is not supported (JPG/PNG)      |
    | 429       | `rate_limit_exception`           | The number of requests exceeded your throughput limit.    |
    | 500       | `internal_server_error`          | Some unexpected error occurs while processing the request |

### Compare face between 2 images

1. Request

    Client should call this API:

    | method | URL                 | content-type       |
    |--------|---------------------|--------------------|
    | POST   | `/v1/compare_faces` | `application/json` |

    Body:

    ```go
    {
        "image1_id": string,
        "image2_id": string
    }
    ```

    Where:

    | key         | type   | required | description              |
    |-------------|--------|----------|--------------------------|
    | `image1_id` | string | yes      | ID of image1 in Store DB |
    | `image2_id` | string | yes      | ID of image2 in Store DB |

    Authentication mechanism is described in [Authentication](#authentication-mechanism).

2. Response

    The response will be a JSON with following format:

    ```go
    {
        "data": {
            "request_id": string, // "processing", "success" or "failure"
        },
        "errors": [
            {
                "code": string,
                "message": string,
                "detail": {
                    "field": string, // optional, which parameter is invalid.
                    ... // any other information that can be useful for client
                },
            },
            ... // other errors
        ]
    }
     ```

    In case of success, the HTTP status code will be 200, and the `data` will be
    an object containing following fields:

    | field        | type   | description              |
    |--------------|--------|--------------------------|
    | `request_id` | string | ID of the request (UUID) |

    In case of error, the `data` will be empty, and server sends following HTTP
    status code and error information:

    | HTTP code | error code                       | description                                               |
    |-----------|----------------------------------|-----------------------------------------------------------|
    | 400       | `invalid_parameter_exception`    | Input parameter violates a constraint.                    |
    | 401       | `access_denied_exception`        | You are not authorized to perform the action.             |
    | 404       | `image_not_found_exception`      | The image ID is not found in Store DB.                    |
    | 415       | `invalid_image_format_exception` | The provided image format is not supported (JPG/PNG)      |
    | 429       | `rate_limit_exception`           | The number of requests exceeded your throughput limit.    |
    | 500       | `internal_server_error`          | Some unexpected error occurs while processing the request |

### Get compare faces result

1. Request

    Client should call this API:

    | method | URL                              | content-type       |
    |--------|----------------------------------|--------------------|
    | GET    | `/v1/compare_faces/{request_id}` | `application/json` |

    Where `request_id` is the ID of the request returned in previous API call.

2. Response

    The response will be a JSON body with following format:

    ```go
    {
        "data": {
            "status": string, // "processing", "success" or "failure"
            "image1": {
                "id": string,
                "transformed_image_id": string // optional, just in case the image is transformed
                "faces": [
                    {
                        "id": string, // id of the face in image1
                        "bounding_box": {
                            "top": int, // the top edge of the box
                            "right": int, // the right edge of the box
                            "bottom": int, // the bottom edge of the box
                            "left": int, // the left edge of the box
                            "angle": int // the angle at which the box is rotated
                        }
                    },
                    ... // other faces in image1
                ],
            },
            "image2": {
                "id": string,
                "transformed_image_id": string // optional, just in case the image is transformed
                "faces": [
                    {
                        "id": string, // id of the face in image2
                        "bounding_box": {
                            "top": int, // the top edge of the box
                            "right": int, // the right edge of the box
                            "bottom": int, // the bottom edge of the box
                            "left": int, // the left edge of the box
                            "angle": int // the angle at which the box is rotated
                        }
                    },
                    ... // other faces in image2
                ],
            },
            "compare_faces": [
                {
                    "face1_id": string, // id of the face in image1
                    "face2_id": string, // id of the face in image2
                    "score": float, // how likely that face1 and face2 are matched (0-1)
                    "result": string // "matched", "unmatched", "unsure"
                },
                ... // other pair of faces in image1 and image2
            ]
        }
        "errors": [
            {
                "code": string,
                "message": string,
                "detail": {
                    "field": string, // optional, which parameter is invalid.
                    ... // any other information that can be useful for client
                },
            },
            ... // other errors
        ]
    }
    ```

    In case the request is still being processed, the HTTP status code will be `200`,
    and the `data.status` is `"processing"`:

    In case the request processing has been finished, the HTTP status code will be
    `200`, and the `data.status` is either `"success"` or `"failure"` depending on
    whether the request has been successfully processed or not.

    If the `data.status` is `"failure"`, the `"errors"` field will tell you why it
    failed.

    | error code           | description                           |
    |----------------------|---------------------------------------|
    | `image_too_blur`     | the input image is too blur           |
    | `image_too_dark`     | the input image is too dark           |
    | `image_too_bright`   | the input image is too bright (glare) |
    | `image_has_no_faces` | the input image has no faces          |

    In case of any other errors, the `data` field will be empty, and the server
    sends one of following HTTP status code with error code:

    | HTTP code | error code                    | description                                               |
    |-----------|-------------------------------|-----------------------------------------------------------|
    | `400`     | `invalid_parameter_exception` | Input parameter violates a constraint.                    |
    | `401`     | `access_denied_exception`     | You are not authorized to perform the action.             |
    | `404`     | `request_not_found_exception` | The request ID is not found in Memory Cache and Store DB. |
    | `429`     | `rate_limit_exception`        | The number of requests exceeded your throughput limit.    |
    | `500`     | `internal_server_error`       | Some unexpected error occurs while processing the request |

### Verify face liveness

1. Request

    Client should call this API:

    | method | URL                        | content-type          |
    |--------|----------------------------|-----------------------|
    | POST   | `/v1/verify_face_liveness` | `application/json`    |

    With following form-data fields:

    | field         | type       | required | description                                          |
    |---------------|------------|----------|------------------------------------------------------|
    | `image_ids`   | []string   | yes      | array of image IDs in Store DB                       |
    | `gestures`    | []string   | no       | array of expected gestures of the face in each image |

    For now, we support using at most 3 images (this can be changed in the
    future).

    The length of the `gestures` array (if provided) should be equal to the
    length of `image_ids`.

    Authentication mechanism is described in [Authentication](#authentication-mechanism).

2. Response

    The response will be a JSON with following format:

    ```go
    {
        "data": {
            "request_id": string,
        },
        "errors": [
            {
                "code": string,
                "message": string,
                "detail": {
                    "field": string, // optional, which parameter is invalid.
                    ... // any other information that can be useful for client
                },
            },
            ... // other errors
        ]
    }
    ```

    In case of success, the HTTP status code will be 200, and the `data` will be
    an object containing following fields:

    | field        | type   | description              |
    |--------------|--------|--------------------------|
    | `request_id` | string | ID of the request (UUID) |

    In case of error, the `data` will be empty, and server sends following HTTP
    status code and error information:

    | HTTP code | error code                       | description                                               |
    |-----------|----------------------------------|-----------------------------------------------------------|
    | 400       | `invalid_parameter_exception`    | Input parameter violates a constraint.                    |
    | 401       | `access_denied_exception`        | You are not authorized to perform the action.             |
    | 404       | `image_not_found_exception`      | The image ID is not found in Store DB.                    |
    | 415       | `invalid_image_format_exception` | The provided image format is not supported (JPG/PNG)      |
    | 429       | `rate_limit_exception`           | The number of requests exceeded your throughput limit.    |
    | 500       | `internal_server_error`          | Some unexpected error occurs while processing the request |
  
### Get verify face liveness result

1. Request

    Client should call this API:

    | method | URL                                     | content-type          |
    |--------|-----------------------------------------|-----------------------|
    | GET    | `/v1/verify_face_liveness/{request_id}` | `application/json`    |

    Where `request_id` is the ID of the request returned in previous API call.

2. Response

    The response will be a JSON body with following format:

    ```go
    {
        "data": {
            "status": string, // "processing", "success" or "failure"
            "is_live": bool, // the face is live or not
            "score": float // how likely that the face is live (0-1)
            "images": [
                {
                    "id": string, // ID of the image
                    "is_live": bool, // liveness result of this image only
                    "score": float // how likely that the face is live (0-1)
                },
                ... // up to 3 images
            ]
        },
        "errors": [
            {
                "code": string,
                "message": string,
                "detail": {
                    "field": string, // optional, which parameter is invalid.
                    ... // any other information that can be useful for client
                },
            },
            ... // other errors
        ]
    }
    ```

    In case the request is still being processed, the HTTP status code will be
    `200`, and the `data.status` is `"processing"`:

    In case the request processing has been finished, the HTTP status code will
    be `200`, and the `data.status` is either `"success"` or `"failure"`,
    depending on whether the request has been successfully processed or not.

    If the `data.status` is `"failure"`, the `"errors"` field will tell you why
    it failed.

    | error code           | description                           |
    |----------------------|---------------------------------------|
    | `image_too_blur`     | the input image is too blur           |
    | `image_too_dark`     | the input image is too dark           |
    | `image_too_bright`   | the input image is too bright (glare) |
    | `image_has_no_faces` | the input image has no faces          |

    In case of any other errors, the `data` field will be empty, and the server
    sends one of following HTTP status code with error code:

    | HTTP code | error code                    | description                                               |
    |-----------|-------------------------------|-----------------------------------------------------------|
    | `400`     | `invalid_parameter_exception` | Input parameter violates a constraint.                    |
    | `401`     | `access_denied_exception`     | You are not authorized to perform the action.             |
    | `404`     | `request_not_found_exception` | The request ID is not found in Memory Cache and Store DB. |
    | `429`     | `rate_limit_exception`        | The number of requests exceeded your throughput limit.    |
    | `500`     | `internal_server_error`       | Some unexpected error occurs while processing the request |
