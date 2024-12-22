# Food Ordering Backend Service

This is a Node.js, Express, and MongoDB-based backend service for a food ordering application. Below is a detailed list of all the available API endpoints.

## Authentication

### 1. User Sign Up

**URL:** `/api/users/signup`  
**Method:** POST  
**Description:** Register a new user.  
**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

### 2. User Login

**URL:** `/api/users/login`  
**Method:** POST  
**Description:** Log in with email and password.  
**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "name": "string",
    "email": "string"
  }
}
```

### 3. Send Verification OTP to Email after SignUp

**URL:** `/api/users//send-verification-otp`  
**Method:** POST  
**Description:** Send OTP to user email.  
**Request Body:**

```json
{
  "email": "string"
}
```

**Response:**

```json
{
  "message": "OTP sent to your email"
}
```

### 3. Verify Email with OTP

**URL:** `/api/users/verify-email`  
**Method:** POST  
**Description:** Verify user email with OTP.  
**Request Body:**

```json
{
  "email": "string",
  "otp": "string"
}
```

**Response:**

```json
{
  "message": "Email verified successfully"
}
```

### 4. Send Forgot Password Verification OTP to Email

**URL:** `/api/users/send-forgot-password-otp`  
**Method:** POST  
**Description:** Send an OTP for password reset.  
**Request Body:**

```json
{
  "email": "string"
}
```

**Response:**

```json
{
  "message": "OTP sent to your email"
}
```

### 5. Reset Password with OTP

**URL:** `/api/users/reset-password`  
**Method:** POST  
**Description:** Reset password using OTP.  
**Request Body:**

```json
{
  "email": "string",
  "otp": "string",
  "newPassword": "string"
}
```

**Response:**

```json
{
  "message": "Password reset successfully"
}
```

...

## Orders

### 1. Place an Order

**URL:** `/api/orders/place-orders`  
**Method:** POST  
**Description:** Place a new order.  
**Request Body:**

```json
{
  "items": [
    {
      "foodId": "string",
      "quantity": "number"
    }
  ]
}
```

**Response:**

```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "string",
    "userId": "string",
    "items": [
      {
        "foodId": "string",
        "quantity": "number"
      }
    ],
    "totalPrice": "number",
    "status": "string"
  }
}
```

...

## Admin Actions

### 1. Add Food

**URL:** `/api/foods`
**Method:** POST  
**Description:** Add a new food item.  
**Request Body:**

```json
{
  "name": "string",
  "category": "string",
  "price": "number",
  "description": "string",
  "imageUrl": "string"
}
```

**Response:**

```json
{
  "message": "Food added successfully",
  "food": {
    "_id": "string",
    "name": "string",
    "category": "string",
    "price": "number",
    "description": "string",
    "image": "string",
    "available": true
  }
}
```

...

## Notes

- Ensure to replace sensitive keys with your actual environment variables when testing the APIs.
- This service assumes a properly configured MongoDB connection.
