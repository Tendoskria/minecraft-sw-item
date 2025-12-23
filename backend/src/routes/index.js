const express = require('express');
const router = express.Router();

const eventRoutes = require('./eventRoutes');
const itemRoutes = require('./itemRoutes');
const enchantmentRoutes = require('./enchantmentRoutes');
const itemVanillaRoutes = require('./itemVanillaRoutes');

router.use('/events', eventRoutes);
router.use('/items', itemRoutes);
router.use('/enchantments', enchantmentRoutes);
router.use('/vanilla-items', itemVanillaRoutes);

module.exports = router;