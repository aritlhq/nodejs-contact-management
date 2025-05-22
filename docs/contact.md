# Contact API Spec

## Create Contact API
Endpoint : POST `/api/contacts`

Headers :
- Authorization : token

Request Body :
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@doe.com",
    "phone": "081234567890"
}
```

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@doe.com",
        "phone": "081234567890"
    }
}
```

Response Body Error :
```json
{
    "errors": "Email is not valid format"
}
```

## Update Contact API
Endpoint : PUT `/api/contacts/:id`

Headers :
- Authorization : token

Request Body :
```json
{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@doe.com",
    "phone": "081234567890"
}
```

Response Body Success :
```json
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@doe.com",
        "phone": "081234567890"
    }
```

Response Body Error :
```json
{
    "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : GET `/api/contacts/:id`

Headers :
- Authorization : token

Response Body Success :
```json
{
    "data": {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@doe.com",
        "phone": "081234567890"
    }
}
```

Response Body Error :
```json
{
    "errors": "Contact not found"
}
```

## Search Contact API

Endpoint : GET `/api/contacts`

Headers :
- Authorization : token

Query Params :
- name: for search by `first_name` or `last_name`, using `LIKE`, optional
- email: for search by email using `LIKE`, optional
- phone: for search by phone using `LIKE`, optional
- page: number of page, optional, default `1`
- size: size per page, optional, default `10` 

Response Body Success :
```json
{
    "data": [
        {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@doe.com",
            "phone": "081234567890"
        },
        {
            "id": 2,
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@doe.com",
            "phone": "081234567890"
        },
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```

Response Body Error :
```json
{
    "errors": "Contact not found"
}
```

## Remove Contact API

Endpoint : DELETE `/api/contacts/:id`

Headers :
- Authorization : token

Response Body Success :
```json
{
    "data": "OK"
}
```

Response Body Error :
```json
{
    "errors": "Contact not found"
}
```

