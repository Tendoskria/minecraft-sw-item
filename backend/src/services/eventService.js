const EventModel = require('../models/eventModel');

class EventService {
  async getAll() {
    return await EventModel.findAll();
  }

  async getGrouped() {
    const events = await EventModel.findAllWithNames();
    const grouped = {};
    
    events.forEach(event => {
      if (!grouped[event.nom]) {
        grouped[event.nom] = [];
      }
      grouped[event.nom].push({
        id: event.id,
        annee: event.annee,
        created_at: event.created_at
      });
    });
    
    return grouped;
  }

  async getById(id) {
    return await EventModel.findById(id);
  }

  async create(data) {
    const { id_nom_event, annee } = data;
    
    if (!id_nom_event || !annee) {
      throw new Error('Event name ID and year are required');
    }
    
    if (annee.length !== 4 || isNaN(annee)) {
      throw new Error('Year must be a 4-digit number');
    }
    
    return await EventModel.create({ id_nom_event, annee });
  }

  async update(id, data) {
    return await EventModel.update(id, data);
  }

  async delete(id) {
    return await EventModel.delete(id);
  }
}

module.exports = new EventService();