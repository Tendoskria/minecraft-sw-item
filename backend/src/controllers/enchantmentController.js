const EnchantmentService = require('../services/enchantmentService');

class EnchantmentController {
  async getAll(req, res, next) {
    try {
      const enchantments = await EnchantmentService.getAll();
      res.json(enchantments);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const enchantment = await EnchantmentService.getById(req.params.id);
      if (!enchantment) {
        return res.status(404).json({ error: 'Enchantment not found' });
      }
      res.json(enchantment);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const enchantment = await EnchantmentService.create(req.body);
      res.status(201).json(enchantment);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const enchantment = await EnchantmentService.update(req.params.id, req.body);
      if (!enchantment) {
        return res.status(404).json({ error: 'Enchantment not found' });
      }
      res.json(enchantment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await EnchantmentService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EnchantmentController();