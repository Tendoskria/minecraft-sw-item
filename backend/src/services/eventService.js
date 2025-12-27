const EventModel = require('../models/eventModel');

class EventService {
  async findAllForCards() {
    return await EventModel.findAllForCards();
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
        year: event.year,
        created_at: event.created_at
      });
    });
    
    return grouped;
  }

  async getById(id) {
    return await EventModel.findById(id);
  }

  async findByIdWithYear(id, year) {
    return await EventModel.findByIdWithYear(id, year);
  }

  async create(data) {
    console.log('Creating event with data:', data);
    const { eventName: eventName, year } = data;
    
    if (!eventName || !year) {
      throw new Error('Event name ID and year are required');
    }
    
    if (year.length !== 4 || isNaN(year)) {
      throw new Error('Year must be a 4-digit number');
    }
    
    return await EventModel.create({ eventName: eventName, year });
  }

  async update(id, data) {
    return await EventModel.update(id, data);
  }

  async delete(id) {
    return await EventModel.delete(id);
  }
}

module.exports = new EventService();