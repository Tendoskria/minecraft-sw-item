const pool = require('../config/database');

class ItemModel {
  async findAll(filters = {}) {
    let query = `
      SELECT i.*, iv.nom_item as vanilla_name, e.annee, e.event_name
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
      query += ` AND e.annee = $${paramCount}`;
      params.push(filters.year);
      paramCount++;
    }
    
    if (filters.category) {
      query += ` AND i.category = $${paramCount}`;
      params.push(filters.category);
      paramCount++;
    }
    
    query += ' ORDER BY i.nom ASC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }

  async search(query) {
    const result = await pool.query(`
      SELECT DISTINCT i.*, iv.nom_item as vanilla_name, e.annee, e.event_name
      FROM item i
      LEFT JOIN item_vanilla iv ON i.id_item_vanilla = iv.id
      LEFT JOIN event e ON i.id_event = e.id
      LEFT JOIN item_enchantment ie ON i.id = ie.id_item
      LEFT JOIN enchantment en ON ie.id_enchantment = en.id
      WHERE i.nom ILIKE $1 OR en.nom ILIKE $1
      ORDER BY i.nom ASC
    `, [`%${query}%`]);
    
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(`
      SELECT i.*, iv.nom_item as vanilla_name, e.annee, e.event_name
      FROM item i
      LEFT JOIN item_vanilla iv ON i.id_item_vanilla = iv.id
      LEFT JOIN event e ON i.id_event = e.id
      WHERE i.id = $1
    `, [id]);
    
    return result.rows[0];
  }

  async create(data) {
    const { nom, id_event, id_item_vanilla, category } = data;
    const result = await pool.query(
      'INSERT INTO item (nom, id_event, id_item_vanilla, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, id_event, id_item_vanilla, category]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { nom, id_event, id_item_vanilla, category } = data;
    const result = await pool.query(
      'UPDATE item SET nom = $1, id_event = $2, id_item_vanilla = $3, category = $4 WHERE id = $5 RETURNING *',
      [nom, id_event, id_item_vanilla, category, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM item WHERE id = $1', [id]);
  }

  async getEnchantments(itemId) {
    const result = await pool.query(`
      SELECT e.id, e.nom, e.level
      FROM enchantment e
      JOIN item_enchantment ie ON e.id = ie.id_enchantment
      WHERE ie.id_item = $1
      ORDER BY e.nom ASC
    `, [itemId]);
    
    return result.rows;
  }

  async addEnchantment(itemId, enchantmentId) {
    await pool.query(
      'INSERT INTO item_enchantment (id_item, id_enchantment) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [itemId, enchantmentId]
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