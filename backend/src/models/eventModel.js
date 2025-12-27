const pool = require('../config/database');

class EventModel {
  async findAllForCards() {
    const result = await pool.query(`
      SELECT
        e.id,
        e.event_name,
        e.symbol,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT i.year ORDER BY i.year DESC), NULL) AS years
      FROM event e
      LEFT JOIN item i ON i.id_event = e.id
      GROUP BY e.id, e.event_name, e.symbol
      ORDER BY e.event_name ASC
    `);

    return result.rows;
  }

  async findAllWithNames() {
    const result = await pool.query(`
      SELECT e.id, e.event_name, e.created_at
      FROM event e
      ORDER BY e.event_name ASC
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

  async findByIdWithYear(eventId, year) {
    const result = await pool.query(
      `SELECT e.*, $2 as year FROM event e WHERE e.id = $1`,
      [eventId, year]
    );
    return result.rows[0];
  }

  async create(data) {
    const { eventName, symbol } = data;
    const result = await pool.query(
      'INSERT INTO event (event_name, symbol) VALUES ($1, $2) RETURNING *',
      [eventName, symbol]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { eventName, symbol } = data;
    const result = await pool.query(
      'UPDATE event SET event_name = $1, symbol = $2 WHERE id = $3 RETURNING *',
      [eventName, symbol, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM event WHERE id = $1', [id]);
  }
}

module.exports = new EventModel();