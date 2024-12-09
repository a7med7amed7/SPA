const express = require('express');
require('dotenv').config();
const cors = require('cors')
const productRoutes = require('./routes/product')
const userRoutes = require('./routes/user')
const cartItemRoutes = require('./routes/cartItem')
const orderRoutes = require('./routes/order')
const ErrorHandlerMiddlewares = require('./errorHandlers/index').errorHandlerMiddlewares
const logger = require('./logger/index');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/cartItems', cartItemRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use(ErrorHandlerMiddlewares.ValidationErrorHandler)
app.use(ErrorHandlerMiddlewares.APIErrorHandler)
app.use(ErrorHandlerMiddlewares.DatabaseErrorHandler)
app.use(ErrorHandlerMiddlewares.CriticalErrorHandler)
app.use(ErrorHandlerMiddlewares.OperationalErrorHandler)
app.use(ErrorHandlerMiddlewares.CentralizedErrorHandler)

// process.on("unhandledRejection", (err) => { // .then without .catch
//   console.log(err);
// })

// process.on("uncaughtException", (err) => {
//   console.log(err);
//   // HandleUnCaughtException
//   // process.exit(1);
// })

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
