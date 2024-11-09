const express = require('express');
require('dotenv').config();
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const cartItemRoutes = require('./routes/cartItem')
const orderRoutes = require('./routes/order')


const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cartItems', cartItemRoutes);
app.use('/api/v1/orders', orderRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
/*
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  card_number CHAR(16) NOT NULL,
  expiry_date CHAR(5) NOT NULL,
  cvv CHAR(3) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  zip_code VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/
