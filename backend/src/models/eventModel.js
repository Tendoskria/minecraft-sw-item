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
      SELECT e.id, e.annee, e.created_at, ne.nom
      FROM event e
      JOIN nom_event ne ON e.id_nom_event = ne.id
      ORDER BY ne.nom ASC, e.annee DESC
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

  async findByNameAndYear(idNomEvent, annee) {
    const result = await pool.query(
      'SELECT * FROM event WHERE id_nom_event = $1 AND annee = $2',
      [idNomEvent, annee]
    );
    return result.rows[0];
  }

  async create(data) {
    const { id_nom_event, annee } = data;
    const result = await pool.query(
      'INSERT INTO event (id_nom_event, annee) VALUES ($1, $2) RETURNING *',
      [id_nom_event, annee]
    );
    return result.rows[0];
  }

  async update(id, data) {
    const { id_nom_event, annee } = data;
    const result = await pool.query(
      'UPDATE event SET id_nom_event = $1, annee = $2 WHERE id = $3 RETURNING *',
      [id_nom_event, annee, id]
    );
    return result.rows[0];
  }

  async delete(id) {
    await pool.query('DELETE FROM event WHERE id = $1', [id]);
  }
}

module.exports = new EventModel();