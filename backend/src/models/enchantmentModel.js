const pool = require('../config/database');

class EnchantmentModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM enchantment ORDER BY name ASC'
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM enchantment WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async findByName(name) {
    const result = await pool.query(
      'SELECT * FROM enchantment WHERE name = $1',
      [name]
    );
    return result.rows[0];
  }

  async create(data) {
    const { name, level } = data;
    const result = await pool.query(
      'INSERT INTO enchantment (name, level) VALUES ($1, $2) RETURNING *',
      [name, level]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { name, level } = data;
    const result = await pool.query(
      'UPDATE enchantment SET name = $1, level = $2 WHERE id = $3 RETURNING *',
      [name, level, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM enchantment WHERE id = $1', [id]);
  }
}

module.exports = new EnchantmentModel();