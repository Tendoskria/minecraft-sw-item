const EventNameModel = require('../models/eventNameModel');

class EventNameService {
  async getAll() {
    return await EventNameModel.findAll();
  }

  async getById(id) {
    return await EventNameModel.findById(id);
  }

  async create(data) {
    const { nom } = data;
    if (!nom) {
      throw new Error('Event name is required');
    }
    return await EventNameModel.create({ nom });
  }

  async update(id, data) {
    return await EventNameModel.update(id, data);
  }

  async delete(id) {
    return await EventNameModel.delete(id);
  }
}

module.exports = new EventNameService();