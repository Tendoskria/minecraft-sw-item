const EventModel = require('../models/eventModel');

class EventService {
  async getAll() {
    return await EventModel.findAll();
  }

  async getGrouped() {
    const events = await EventModel.findAllWithNames();
    const grouped = {};
    
    events.forEach(event => {
      if (!grouped[event.event_name]) {
        grouped[event.event_name] = [];
      }
      grouped[event.event_name].push({
        id: event.id,
        eventName: event.event_name,
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
    console.log('Creating event with data:', data);
    const { eventName: eventName, annee } = data;
    
    if (!eventName || !annee) {
      throw new Error('Event name ID and year are required');
    }
    
    if (annee.length !== 4 || isNaN(annee)) {
      throw new Error('Year must be a 4-digit number');
    }
    
    return await EventModel.create({ eventName: eventName, annee });
  }

  async update(id, data) {
    return await EventModel.update(id, data);
  }

  async delete(id) {
    return await EventModel.delete(id);
  }
}

module.exports = new EventService();