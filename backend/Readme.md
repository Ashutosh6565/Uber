# User Registration API Documentation

## 1. Register User
Endpoint for registering a new user in the system.

### Endpoint
```
POST /users/register
```

### Request Body
```json
{
  "fullname": {
    "firstname": "string", // minimum 3 characters
    "lastname": "string"   // minimum 3 characters (optional)
  },
  "email": "string",      // valid email format, minimum 6 characters
  "password": "string"    // minimum 6 characters
}
```

### Validation Rules
- `fullname.firstname`: Required, minimum 3 characters
- `email`: Required, must be a valid email format, minimum 6 characters
- `password`: Required, minimum 6 characters
- `fullname.lastname`: Optional, but if provided must be minimum 3 characters

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response
**Code**: 201 CREATED
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", 
  "user": {
    "_id": "65f19d5a9f3f9c8c9a8b4567",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null,
    "__v": 0
  }
}
```

### Error Responses

#### Validation Error
**Code**: 400 BAD REQUEST
```json
{
  "errors": [
    {
      "msg": "First Name must be atleast 3 characters",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

#### Email Already Exists
**Code**: 400 BAD REQUEST
```json
{
  "errors": [
    {
      "msg": "Email already exists",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Missing Required Fields
**Code**: 400 BAD REQUEST
```json
{
  "errors": [
    {
      "msg": "All fields are required",
      "param": "fields",
      "location": "body"
    }
  ]
}
```

### Security Features
- Password is hashed using bcrypt with salt rounds of 10
- JWT token generated has 1 hour expiration
- Password field is excluded from query results (select: false)
- Email addresses must be unique in the system

### Notes
- All timestamps are in UTC
- The returned JWT token should be included in subsequent requests in the Authorization header
- Password requirements: minimum 6 characters
- Email must be unique in the database

## 2. Login User
Endpoint for authenticating existing users.

### Endpoint
```
POST /users/login
```

### Request Body
```json
{
  "email": "string",    // valid email format
  "password": "string"  // minimum 6 characters
}
```

### Validation Rules
- `email`: Required, must be a valid email format
- `password`: Required, minimum 6 characters

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Success Response
**Code**: 200 OK
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "65f19d5a9f3f9c8c9a8b4567",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketID": null,
    "__v": 0
  }
}
```

### Error Responses

#### Invalid Email
**Code**: 401 UNAUTHORIZED
```json
{
  "message": "Invalid Email"
}
```

#### Invalid Password
**Code**: 401 UNAUTHORIZED
```json
{
  "message": "Invalid Password"
}
```

#### Validation Error
**Code**: 400 BAD REQUEST
```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

### Security Features
- Passwords are compared using bcrypt
- JWT token generated has 1 hour expiration
- Password is never returned in the response

## 3. Get User Profile
Endpoint for retrieving the profile of the authenticated user.

### Endpoint
```
GET /users/profile
```

### Headers
- **Authorization**: Bearer `<JWT_TOKEN>` (required)

### Success Response
**Code**: 200 OK
```json
{
  "_id": "65f19d5a9f3f9c8c9a8b4567",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "socketID": null,
  "__v": 0
}
```

### Error Responses

#### Unauthorized Access
**Code**: 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized"
}
```

---

## 4. Logout User
Endpoint for logging out the authenticated user.

### Endpoint
```
GET /users/logout
```

### Headers
- **Authorization**: Bearer `<JWT_TOKEN>` (required)

### Success Response
**Code**: 200 OK
```json
{
  "message": "Logout Success"
}
```

### Error Responses

#### Unauthorized Access
**Code**: 401 UNAUTHORIZED
```json
{
  "message": "Unauthorized"
}
```

---

### Notes
- The `/users/profile` endpoint requires a valid JWT token in the `Authorization` header.
- The `/users/logout` endpoint clears the user's session by invalidating the token.


