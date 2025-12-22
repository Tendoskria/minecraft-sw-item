const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/', itemController.getAll);
router.get('/search', itemController.search);
router.post('/', itemController.create);
router.get('/:id', itemController.getById);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;