
# API Documentation

This document provides an overview of the available API endpoints.

---

## Authentication

### POST `/api/users/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `201`: User registered successfully.
  - `400`: Bad request.
  - `409`: User already exists.

### POST `/api/users/login`
- **Description:** Login with email and password.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses:**
  - `200`: Login successful.
  - `401`: Unauthorized (Invalid credentials).

---

## User Management

### GET `/api/users`
- **Description:** Retrieve all users (Admin only).
- **Responses:**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  ]
  ```

### GET `/api/users/{id}`
- **Description:** Get details of a specific user.
- **Parameters:**
  - `id` (path): User ID.
- **Responses:**
  ```json
  {
    "id": "string",
    "name": "string",
    "email": "string"
  }
  ```

### PUT `/api/users/{id}/edit/name`
- **Description:** Edit a user's name.
- **Request Body:**
  ```json
  {
    "name": "string"
  }
  ```
- **Responses:**
  - `200`: User name updated successfully.
  - `400`: Bad request.
  - `404`: User not found.

---

## Foods

### GET `/api/foods/categories`
- **Description:** Get all food categories.
- **Responses:**
  - `200`: Successfully retrieved categories.

### GET `/api/foods`
- **Description:** Retrieve all foods.
- **Responses:**
  - `200`: Successfully retrieved foods.

### POST `/api/foods`
- **Description:** Add a new food item (Admin only).
- **Request Body:**
  ```json
  {
    "name": "string",
    "price": "number",
    "category": "string",
    "description": "string",
    "imageUrl": "string"
  }
  ```
- **Responses:**
  - `201`: Food item added successfully.
  - `400`: Bad request.

---

## Orders

### POST `/api/orders/place-orders/{userId}`
- **Description:** Place an order for a user.
- **Request Body:**
  ```json
  {
    "items": [
      {
        "foodId": "string",
        "quantity": "integer"
      }
    ]
  }
  ```
- **Responses:**
  - `201`: Order placed successfully.

---

## Reviews

### POST `/api/reviews/{userId}`
- **Description:** Add a review for a food item.
- **Request Body:**
  ```json
  {
    "foodId": "string",
    "rating": "integer",
    "comment": "string"
  }
  ```
- **Responses:**
  - `201`: Review added successfully.

---

For more detailed information, please refer to the [Swagger UI](http://localhost:5000/api-docs).
