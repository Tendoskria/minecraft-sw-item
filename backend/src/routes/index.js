const express = require('express');
const router = express.Router();

const eventRoutes = require('./eventRoutes');
const itemRoutes = require('./itemRoutes');
const enchantmentRoutes = require('./enchantmentRoutes');

router.use('/events', eventRoutes);
router.use('/items', itemRoutes);
router.use('/enchantments', enchantmentRoutes);

module.exports = router;