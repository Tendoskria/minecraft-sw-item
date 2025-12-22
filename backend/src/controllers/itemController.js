const ItemService = require('../services/itemService');

class ItemController {
  async getAll(req, res, next) {
    try {
      const { event, year, category } = req.query;
      const items = await ItemService.getAll({ event, year, category });
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
      const items = await ItemService.search(q);
      res.json(items);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const item = await ItemService.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const item = await ItemService.create(req.body);
      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const item = await ItemService.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await ItemService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ItemController();