const pool = require('../config/database');

class EventModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM event ORDER BY annee DESC'
    );
    return result.rows;
  }

  async findAllWithNames() {
    const result = await pool.query(`
      SELECT e.id, e.event_name, e.annee, e.created_at
      FROM event e
      ORDER BY e.event_name ASC, e.annee DESC
    `);
    return result.rows;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM event WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async findByNameAndYear(nomEvent, annee) {
    const result = await pool.query(
      'SELECT * FROM event WHERE event_name = $1 AND annee = $2',
      [nomEvent, annee]
    );
    return result.rows[0];
  }

  async create(data) {
    const { eventName, annee } = data;
    const result = await pool.query(
      'INSERT INTO event (event_name, annee) VALUES ($1, $2) RETURNING *',
      [eventName, annee]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { eventName, annee } = data;
    const result = await pool.query(
      'UPDATE event SET event_name = $1, annee = $2 WHERE id = $3 RETURNING *',
      [eventName, annee, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM event WHERE id = $1', [id]);
  }
}

module.exports = new EventModel();