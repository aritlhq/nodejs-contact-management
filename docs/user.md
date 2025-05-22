# User API Spec

## Register User API

Endpoint: POST `/api/users`

Request Body:

```json
{
    "username": "john_doe",
    "password": "password123",
    "name": "John Doe"
}
```

Response Body Success:

```json
    "data": {
        "username": "john_doe",
        "name": "John Doe"
    }
```

Response Body Error:

```json
    "errors": "Username already registered"
```

## Login User API

Endpoint: POST `/api/users/login`

Request Body: 

```json
{
    "username": "john_doe",
    "password": "password123"
}
```

Response Body Success:

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Error:

```json
{
    "errors": "Username or Password wrong"
}
```

## Update User API

Endpoint: PATCH `/api/users/current`

Headers: 
- Authorization: token

Request Body:

```json
{
    "name": "John Doe",             // optional
    "password": "newpassword123"    // optional
}
```

Response Body Success:

```json
{
    "data": {
        "username": "john_doe",
        "name": "John Doe"
    }
}
```

Repsonse Body Error:

```json
{
    "errors": "Name length max 100 character"
}
```

## Get User API

Endpoint: GET `/api/users/current`

Headers:
- Authorization: token

Response Body Success:

```json
{
    "data": {
        "username": "john_doe",
        "name": "John Doe"
    }
}
```

Response Body Error:

```json
{
    "errors": "Unauthorized"
}
```


## Logout User API

Endpoint: DELETE `/api/users/logout`

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
    "errors": "Unauthorized"
}
```