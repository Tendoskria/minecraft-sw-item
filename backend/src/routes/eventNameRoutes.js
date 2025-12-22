const express = require('express');
const router = express.Router();
const eventNameController = require('../controllers/eventNameController');

router.get('/', eventNameController.getAll);
router.post('/', eventNameController.create);
router.get('/:id', eventNameController.getById);
router.put('/:id', eventNameController.update);
router.delete('/:id', eventNameController.delete);

module.exports = router;