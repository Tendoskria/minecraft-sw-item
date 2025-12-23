const express = require('express');
const router = express.Router();
const itemVanillaController = require('../controllers/itemVanillaController.js');

router.get('/', itemVanillaController.getAll);
router.get('/search', itemVanillaController.search);
router.post('/', itemVanillaController.create);

module.exports = router;