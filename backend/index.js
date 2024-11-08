const express = require('express');
require('dotenv').config();

const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const cartItemsRoutes = require('./routes/cartItem')



const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cartItems', cartItemsRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
