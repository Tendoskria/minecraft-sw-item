const express = require('express');
const router = express.Router();
const enchantmentController = require('../controllers/enchantmentController');

router.get('/', enchantmentController.getAll);
router.post('/', enchantmentController.create);
router.get('/:id', enchantmentController.getById);
router.put('/:id', enchantmentController.update);
router.delete('/:id', enchantmentController.delete);

module.exports = router;