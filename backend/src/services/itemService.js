const ItemModel = require('../models/itemModel');
const EnchantmentModel = require('../models/enchantmentModel');

class ItemService {
  async getAll(filters = {}) {
    return await ItemModel.findAll(filters);
  }

  async search(query) {
    return await ItemModel.search(query);
  }

  async getById(id) {
    const item = await ItemModel.findById(id);
    if (item) {
      item.enchantments = await ItemModel.getEnchantments(id);
    }
    return item;
  }

  async create(data) {
    const { name, id_event, id_item_vanilla, category, enchantments } = data;
    
    if (!name || !id_event) {
      throw new Error('Item name and event ID are required');
    }
    
    const item = await ItemModel.create({
      name,
      id_event,
      id_item_vanilla: id_item_vanilla || null,
      category: category || 'Autres'
    });
    
    // Add enchantments if provided
    if (enchantments && Array.isArray(enchantments)) {
      for (const enchData of enchantments) {
        let enchantment = await EnchantmentModel.findByName(enchData.name);
        
        if (!enchantment) {
          enchantment = await EnchantmentModel.create({
            name: enchData.name
          });
        }
        
        await ItemModel.addEnchantment(item.id, enchantment.id, enchData.level);
      }
    }
    
    return await this.getById(item.id);
  }

  async update(id, data) {
    const item = await ItemModel.update(id, data);
    
    if (item && data.enchantments) {
      // Remove old enchantments
      await ItemModel.removeAllEnchantments(id);
      
      // Add new enchantments
      for (const enchData of data.enchantments) {
        let enchantment = await EnchantmentModel.findByName(enchData.name);
        
        if (!enchantment) {
          enchantment = await EnchantmentModel.create({
            name: enchData.name
         });
        }
        
        await ItemModel.addEnchantment(id, enchantment.id, enchData.level);
      }
    }
    
    return await this.getById(id);
  }

  async delete(id) {
    return await ItemModel.delete(id);
  }
}

module.exports = new ItemService();