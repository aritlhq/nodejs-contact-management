# Address API Spec

## Create Address API

Endpoint: POST `/api/contacts/:contactId/addresses`

Headers:
- Authorization: token

Request Body:
```json
{
    "street": "Jalan Malioboro",
    "city": "Yogyakarta",
    "province": "Daerah Istimewa Yogyakarta",
    "country": "Indonesia",
    "postal_code": "55281"
}
```

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "street": "Jalan Malioboro",
        "city": "Yogyakarta",
        "province": "Daerah Istimewa Yogyakarta",
        "country": "Indonesia",
        "postal_code": "55281"
    }
}
```

Response Body Error:
```json
    "errors": "Country is required"
```

## Update Address API

Endpoint: PUT `/api/contacts/:contactId/addresses/:addressId`

Headers:
- Authorization: token

Request Body:
```json
{
    "street": "Jalan Malioboro",
    "city": "Yogyakarta",
    "province": "Daerah Istimewa Yogyakarta",
    "country": "Indonesia",
    "postal_code": "55281"
}
```

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "street": "Jalan Malioboro",
        "city": "Yogyakarta",
        "province": "Daerah Istimewa Yogyakarta",
        "country": "Indonesia",
        "postal_code": "55281"
    }
}
```

Response Body Error:
```json
{
    "errors": "Country is required"
}
```

## Get Address API

Endpoint: GET `/api/contacts/:contactId/addresses/:addressId`

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": {
        "id": 1,
        "street": "Jalan Malioboro",
        "city": "Yogyakarta",
        "province": "Daerah Istimewa Yogyakarta",
        "country": "Indonesia",
        "postal_code": "55281"
    }
}
```

Response Body Error:
```json
{
    "errors": "Address not found"
}
```

## List Address API

Endpoint: GET `/api/contacts/:contactId/addresses`

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan Malioboro",
            "city": "Yogyakarta",
            "province": "Daerah Istimewa Yogyakarta",
            "country": "Indonesia",
            "postal_code": "55281"
        },
        {
            "id": 2,
            "street": "Jalan Malioboro",
            "city": "Yogyakarta",
            "province": "Daerah Istimewa Yogyakarta",
            "country": "Indonesia",
            "postal_code": "55281"
        }
    ]
}
```

Response Body Error:
```json
{
    "errors": "Address not found"
}
```

## Remove Address API

Endpoint: DELETE `/api/contacts/:contactId/addresses/:addressId`

Headers:
- Authorization: token

Response Body Success:
```json
{
    "data": "OK"
}
```

Response Body Error:
```json
{
    "errors": "Address not found"
}
```