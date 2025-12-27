const EventService = require('../services/eventService');

class EventController {
  async findAllForCards(req, res, next) {
    try {
      const events = await EventService.findAllForCards();
      res.json(events);
    } catch (error) {
      next(error);
    }
  }

  async getGrouped(req, res, next) {
    try {
      const grouped = await EventService.getGrouped();
      res.json(grouped);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const event = await EventService.getById(req.params.id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async findByIdWithYear(req, res, next) {
    try {
      const event = await EventService.findByIdWithYear(req.params.id, req.params.year);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const event = await EventService.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const event = await EventService.update(req.params.id, req.body);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await EventService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new EventController();