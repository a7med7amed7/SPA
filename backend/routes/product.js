const express = require('express');
const controllers = require('../controllers/product')
const router = express.Router();

router.get('/', controllers.getAllProducts);
router.get('/:id', controllers.getProduct);
router.patch('/:id', controllers.updateProduct);
router.delete('/:id', controllers.deleteProduct);
router.post('/', controllers.createProduct);
module.exports = router;