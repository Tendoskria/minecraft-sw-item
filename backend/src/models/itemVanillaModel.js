const pool = require('../config/database');

class ItemVanillaModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM item_vanilla ORDER BY item_name ASC'
    );
    return result.rows;
  }

  async search(query) {
    const result = await pool.query(
      'SELECT * FROM item_vanilla WHERE item_name ILIKE $1 ORDER BY item_name ASC LIMIT 50',
      [`%${query}%`]
    );
    return result.rows;
  }

  async findByName(item_name) {
    const result = await pool.query(
      'SELECT * FROM item_vanilla WHERE item_name = $1',
      [item_name]
    );
    return result.rows[0];
  }

  async create(data) {
    const { item_name } = data;
    const result = await pool.query(
      'INSERT INTO item_vanilla (item_name) VALUES ($1) RETURNING *',
      [item_name]
    );
    return result.rows[0];
  }
}

module.exports = new ItemVanillaModel();