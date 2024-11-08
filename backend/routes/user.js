const express = require('express');
const controllers = require('../controllers/user')
const router = express.Router();

router.get('/', controllers.getAllUsers);
router.get('/:id', controllers.getUser);
router.patch('/:id', controllers.updateUser);
router.delete('/:id', controllers.deleteUser);
router.post('/', controllers.createUser);

module.exports = router;