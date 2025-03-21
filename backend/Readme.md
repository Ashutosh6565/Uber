# User Registration API Documentation

## Register User
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