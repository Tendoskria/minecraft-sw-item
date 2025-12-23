const EnchantmentModel = require('../models/enchantmentModel');

class EnchantmentService {
  async getAll() {
    return await EnchantmentModel.findAll();
  }

  async getById(id) {
    return await EnchantmentModel.findById(id);
  }

  async create(data) {
    const { name } = data;
    
    if (!name) {
      throw new Error('Enchantment name is required');
    }

    return await EnchantmentModel.create({ name: name || null });
  }

  async update(id, data) {
    return await EnchantmentModel.update(id, data);
  }

  async delete(id) {
    return await EnchantmentModel.delete(id);
  }
}

module.exports = new EnchantmentService();