const EventNameService = require('../services/eventNameService');

class EventNameController {
  async getAll(req, res, next) {
    try {
      const eventNames = await EventNameService.getAll();
      res.json(eventNames);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const eventName = await EventNameService.getById(req.params.id);
      if (!eventName) {
        return res.status(404).json({ error: 'Event name not found' });
      }
      res.json(eventName);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const eventName = await EventNameService.create(req.body);
      res.status(201).json(eventName);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const eventName = await EventNameService.update(req.params.id, req.body);
      if (!eventName) {
        return res.status(404).json({ error: 'Event name not found' });
      }
      res.json(eventName);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await EventNameService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventNameController();