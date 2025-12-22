const pool = require('../config/database');

class EnchantmentModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM enchantment ORDER BY nom ASC'
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

  async findByName(nom) {
    const result = await pool.query(
      'SELECT * FROM enchantment WHERE nom = $1',
      [nom]
    );
    return result.rows[0];
  }

  async create(data) {
    const { nom, level } = data;
    const result = await pool.query(
      'INSERT INTO enchantment (nom, level) VALUES ($1, $2) RETURNING *',
      [nom, level]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { nom, level } = data;
    const result = await pool.query(
      'UPDATE enchantment SET nom = $1, level = $2 WHERE id = $3 RETURNING *',
      [nom, level, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM enchantment WHERE id = $1', [id]);
  }
}

module.exports = new EnchantmentModel();