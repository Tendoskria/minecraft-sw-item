const pool = require('../config/database');

class ItemModel {
  async findAll(filters = {}) {
    let query = `
      SELECT i.*, iv.item_name as vanilla_name, e.year, e.event_name
      FROM item i
      LEFT JOIN item_vanilla iv ON i.id_item_vanilla = iv.id
      LEFT JOIN event e ON i.id_event = e.id
      WHERE 1=1
    `;
    
    const params = [];
    let paramCount = 1;
    
    if (filters.event) {
      query += ` AND e.event_name = $${paramCount}`;
      params.push(filters.event);
      paramCount++;
    }
    
    if (filters.year) {
      query += ` AND e.year = $${paramCount}`;
      params.push(filters.year);
      paramCount++;
    }
    
    if (filters.category) {
      query += ` AND i.category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }
    
    query += ' ORDER BY i.name ASC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }

  async search(query) {
    const result = await pool.query(`
      SELECT DISTINCT i.*, iv.item_name as vanilla_name, e.year, e.event_name
      FROM item i
      LEFT JOIN item_vanilla iv ON i.id_item_vanilla = iv.id
      LEFT JOIN event e ON i.id_event = e.id
      LEFT JOIN item_enchantment ie ON i.id = ie.id_item
      LEFT JOIN enchantment en ON ie.id_enchantment = en.id
      WHERE i.name ILIKE $1 OR en.name ILIKE $1
      ORDER BY i.name ASC
    `, [`%${query}%`]);
    
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(`
      SELECT i.*, iv.item_name as vanilla_name, e.year, e.event_name
      FROM item i
      LEFT JOIN item_vanilla iv ON i.id_item_vanilla = iv.id
      LEFT JOIN event e ON i.id_event = e.id
      WHERE i.id = $1
    `, [id]);
    
    return result.rows[0];
  }

  async create(data) {
    const { name, id_event, id_item_vanilla, category } = data;
    const result = await pool.query(
      'INSERT INTO item (name, id_event, id_item_vanilla, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, id_event, id_item_vanilla, category]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { name, id_event, id_item_vanilla, category } = data;
    const result = await pool.query(
      'UPDATE item SET name = $1, id_event = $2, id_item_vanilla = $3, category = $4 WHERE id = $5 RETURNING *',
      [name, id_event, id_item_vanilla, category, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM item WHERE id = $1', [id]);
  }

  async getEnchantments(itemId) {
    const result = await pool.query(`
      SELECT e.id, e.name, ie.level
      FROM enchantment e
      JOIN item_enchantment ie ON e.id = ie.id_enchantment
      WHERE ie.id_item = $1
      ORDER BY e.name ASC
    `, [itemId]);
    
    return result.rows;
  }

  async addEnchantment(itemId, enchantmentId, level) {
    await pool.query(
      'INSERT INTO item_enchantment (id_item, id_enchantment, level) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING',
      [itemId, enchantmentId, level || null]
    );
  }

  async removeEnchantment(itemId, enchantmentId) {
    await pool.query(
      'DELETE FROM item_enchantment WHERE id_item = $1 AND id_enchantment = $2',
      [itemId, enchantmentId]
    );
  }

  async removeAllEnchantments(itemId) {
    await pool.query(
      'DELETE FROM item_enchantment WHERE id_item = $1',
      [itemId]
    );
  }
}

module.exports = new ItemModel();