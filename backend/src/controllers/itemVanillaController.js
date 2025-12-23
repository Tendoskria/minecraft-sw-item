const ItemVanillaService = require('../services/itemVanillaService');

class ItemVanillaController {
  async getAll(req, res, next) {
    try {
      const items = await ItemVanillaService.getAll();
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ error: 'Search query required' });
      }
      const items = await ItemVanillaService.search(q);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const item = await ItemVanillaService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemVanillaController();