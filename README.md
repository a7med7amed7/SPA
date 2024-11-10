## How to use

```
docker-compose up -d --build
```
```
docker-compose exec mysql mysql -u root -p
```
password: rootpassword
```
SHOW DATABASES;
```
You should see "testdb"
```
USE testdb;
```
copy the content of /backend/backup.sql and paste it into "MySQL"

```
SHOW TABLES;
```
You should see 4 tables (products, cart_items, orders, users)

## Endpoints (Products)

### 1. **Get All Products**

- **Endpoint**: `/products`
- **Method**: `GET`
- **Description**: Retrieves all products from the database.
- **Response**:
  - **Status 200**: Returns a JSON object containing all products.
  - **Status 500**: Error retrieving products.

### 2. **Get Product by ID**

- **Endpoint**: `/products/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific product by ID.
- **Response**:
  - **Status 200**: Returns the product data.
  - **Status 404**: Product not found.
  - **Status 500**: Error retrieving product.

### 3. **Create Product**

- **Endpoint**: `/products`
- **Method**: `POST`
- **Description**: Creates a new product.
- **Request Body**: JSON object with product details (`name`, `description`, `price`).
- **Response**:
  - **Status 200**: Returns the created product data.
  - **Status 500**: Error creating product.

### 4. **Update Product**

- **Endpoint**: `/products/:id`
- **Method**: `PATCH`
- **Description**: Updates a product by ID.
- **Request Body**: JSON object with updated fields  (`name`, `description`, `price`).
- **Response**:
  - **Status 200**: Success message if product is updated.
  - **Status 404**: Product not found.
  - **Status 500**: Error updating product.

### 5. **Delete Product**

- **Endpoint**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Deletes a product and associated cart items.
- **Response**:
  - **Status 200**: Success message if product and cart items are deleted.
  - **Status 404**: Product not found.
  - **Status 500**: Error deleting product.

## Endpoints (Cart)

### Cart Endpoints

1. **Get All Cart Items**
   - **Endpoint**: `/cart/items`
   - **Method**: `POST`
   - **Description**: Retrieves all items in the cart.
   - **Response**:
     - **Status 200**: JSON object with all cart items.
     - **Status 500**: Error retrieving cart items.

2. **Get Cart Item by ID**
   - **Endpoint**: `/cart/items/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a specific cart item by its ID.
   - **Response**:
     - **Status 200**: JSON object with cart item data.
     - **Status 404**: Cart item not found.
     - **Status 500**: Error retrieving cart item.

3. **Create Cart Item**
   - **Endpoint**: `/cart/items`
   - **Method**: `POST`
   - **Description**: Adds a new item to the cart.
   - **Response**:
     - **Status 200**: Success message with created cart item.
     - **Status 400**: Item already in cart.
     - **Status 404**: Product not found or insufficient stock.
     - **Status 500**: Error creating cart item.

4. **Update Cart Item Quantity**
   - **Endpoint**: `/cart/items/:id`
   - **Method**: `PATCH`
   - **Description**: Updates the quantity of an item in the cart.
   - **Response**:
     - **Status 200**: Success message with updated item.
     - **Status 404**: Item or product not found.
     - **Status 500**: Error updating item quantity.

5. **Delete Cart Item**
   - **Endpoint**: `/cart/items/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a specific cart item by its ID.
   - **Response**:
     - **Status 200**: Success message.
     - **Status 404**: Item not found.
     - **Status 500**: Error deleting cart item.

6. **Clear Cart**
   - **Endpoint**: `/cart/clear/:id`
   - **Method**: `DELETE`
   - **Description**: Clears all items from the cart.
   - **Response**:
     - **Status 200**: Success message.
     - **Status 404**: No items to clear.
     - **Status 500**: Error clearing the cart.

### Endpoints (Orders)

1. **Get All Orders**
   - **Endpoint**: `/orders`
   - **Method**: `GET`
   - **Description**: Retrieves all orders.
   - **Response**:
     - **Status 200**: JSON object with all orders.
     - **Status 500**: Error retrieving orders.

2. **Get Order by ID**
   - **Endpoint**: `/orders/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a specific order by its ID.
   - **Response**:
     - **Status 200**: JSON object with order data.
     - **Status 404**: Order not found.
     - **Status 500**: Error retrieving order.

3. **Create Order**
   - **Endpoint**: `/orders`
   - **Method**: `POST`
   - **Description**: Creates a new order with payment validation.
   - **Request Body**:
     - **products**: List of products with `price` and `quantity`.
     - **billingAddress**: Contains `firstName`, `lastName`, `city`, `country`, `address`, `zipCode`, `phone`, `email`.
     - **payment**: Contains `cardNumber`, `expiryDate`, `CVV`.
   - **Response**:
     - **Status 200**: Success message with created order.
     - **Status 404**: Missing fields in the request body.
     - **Status 500**: Error during payment or order creation.

4. **Update Order**
   - **Endpoint**: `/orders/:id`
   - **Method**: `PATCH`
   - **Description**: Updates the billing address of an order by its ID.
   - **Response**:
     - **Status 200**: Success message with updated order.
     - **Status 404**: Order not found.
     - **Status 500**: Error updating order.

5. **Delete Order**
   - **Endpoint**: `/orders/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a specific order by its ID.
   - **Response**:
     - **Status 200**: Success message.
     - **Status 404**: Order not found.
     - **Status 500**: Error deleting order.


### Endpoints (Users)

1. **Get All Users**
   - **Endpoint**: `/users`
   - **Method**: `GET`
   - **Description**: Retrieves all users.
   - **Response**:
     - **Status 200**: JSON object with all users.
     - **Status 500**: Error retrieving users.

2. **Get User by ID**
   - **Endpoint**: `/users/:id`
   - **Method**: `GET`
   - **Description**: Retrieves a specific user by their ID.
   - **Response**:
     - **Status 200**: JSON object with user data.
     - **Status 404**: User not found.
     - **Status 500**: Error retrieving user.

3. **Create User**
   - **Endpoint**: `/users`
   - **Method**: `POST`
   - **Description**: Creates a new user with hashed password for security.
   - **Request Body**:
     - **username**: Username of the new user.
     - **email**: Email address of the new user.
     - **password**: Plain text password (will be hashed before storing).
   - **Response**:
     - **Status 200**: Success message with created user data.
     - **Status 500**: Error creating user.

4. **Update User**
   - **Endpoint**: `/users/:id`
   - **Method**: `PATCH`
   - **Description**: Updates an existing user's information, including hashing the password.
   - **Request Body**:
     - **username**: Updated username.
     - **email**: Updated email address.
     - **password**: Updated plain text password (will be hashed before storing).
   - **Response**:
     - **Status 200**: Success message if user is updated.
     - **Status 404**: User not found.
     - **Status 500**: Error updating user.

5. **Delete User**
   - **Endpoint**: `/users/:id`
   - **Method**: `DELETE`
   - **Description**: Deletes a specific user by their ID.
   - **Response**:
     - **Status 200**: Success message if user is deleted.
     - **Status 404**: User not found.
     - **Status 500**: Error deleting user.
