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
    const { name } = data;
    const result = await pool.query(
      'INSERT INTO enchantment (name) VALUES ($1) RETURNING *',
      [name]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { name } = data;
    const result = await pool.query(
      'UPDATE enchantment SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM enchantment WHERE id = $1', [id]);
  }
}

module.exports = new EnchantmentModel();