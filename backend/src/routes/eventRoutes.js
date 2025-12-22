const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getAll);
router.get('/grouped', eventController.getGrouped);
router.post('/', eventController.create);
router.get('/:id', eventController.getById);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.delete);

module.exports = router;