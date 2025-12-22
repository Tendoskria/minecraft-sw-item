const EnchantmentModel = require('../models/enchantmentModel');

class EnchantmentService {
  async getAll() {
    return await EnchantmentModel.findAll();
  }

  async getById(id) {
    return await EnchantmentModel.findById(id);
  }

  async create(data) {
    const { nom, level } = data;
    
    if (!nom) {
      throw new Error('Enchantment name is required');
    }
    
    return await EnchantmentModel.create({ nom, level: level || null });
  }

  async update(id, data) {
    return await EnchantmentModel.update(id, data);
  }

  async delete(id) {
    return await EnchantmentModel.delete(id);
  }
}

module.exports = new EnchantmentService();