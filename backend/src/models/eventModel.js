const pool = require('../config/database');

class EventModel {
  async findAll() {
    const result = await pool.query(
      'SELECT * FROM event ORDER BY year DESC'
    );
    return result.rows;
  }

  async findAllWithNames() {
    const result = await pool.query(`
      SELECT e.id, e.event_name, e.year, e.created_at
      FROM event e
      ORDER BY e.event_name ASC, e.year DESC
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

  async findByNameAndYear(eventName, year) {
    const result = await pool.query(
      'SELECT * FROM event WHERE event_name = $1 AND year = $2',
      [eventName, year]
    );
    return result.rows[0];
  }

  async create(data) {
    const { eventName, year } = data;
    const result = await pool.query(
      'INSERT INTO event (event_name, year) VALUES ($1, $2) RETURNING *',
      [eventName, year]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { eventName, year } = data;
    const result = await pool.query(
      'UPDATE event SET event_name = $1, year = $2 WHERE id = $3 RETURNING *',
      [eventName, year, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM event WHERE id = $1', [id]);
  }
}

module.exports = new EventModel();