const ItemVanillaModel = require('../models/itemVanillaModel');

class ItemVanillaService {
  async getAll() {
    return await ItemVanillaModel.findAll();
  }

  async search(query) {
    return await ItemVanillaModel.search(query);
  }

  async create(data) {
    const { item_name } = data;
    if (!item_name) {
      throw new Error('Item name is required');
    }
    return await ItemVanillaModel.create({ item_name });
  }
}

module.exports = new ItemVanillaService();