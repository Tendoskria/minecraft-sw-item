const pool = require('../config/database');

class EventNameModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM nom_event ORDER BY nom ASC'
    );
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM nom_event WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async findByName(nom) {
    const result = await pool.query(
      'SELECT * FROM nom_event WHERE nom = $1',
      [nom]
    );
    return result.rows[0];
  }

  async create(data) {
    const { nom } = data;
    const result = await pool.query(
      'INSERT INTO nom_event (nom) VALUES ($1) RETURNING *',
      [nom]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { nom } = data;
    const result = await pool.query(
      'UPDATE nom_event SET nom = $1 WHERE id = $2 RETURNING *',
      [nom, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM nom_event WHERE id = $1', [id]);
  }
}

module.exports = new EventNameModel();