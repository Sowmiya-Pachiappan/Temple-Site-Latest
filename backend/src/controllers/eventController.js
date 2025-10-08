import Event from '../models/eventModel.js';
import Temple from '../models/templeModel.js';
import User from '../models/userModel.js';

export const createEvent = async (req, res) => {
  try {
    const { templeId, eventDate, details } = req.body;

    if (!templeId || !eventDate || !details) {
      return res
        .status(400)
        .send({ message: 'All fields are required' });
    }

    const temple = await Temple.findByPk(templeId);
    if (!temple) {
      return res
        .status(404)
        .send({ message: 'Temple not found' });
    }

    const event = await Event.create({
      templeId,
      eventDate,
      details,
      createdBy: req.user.id,
    });

    res.status(201).send({
      message: 'Event created successfully',
      event,
    });
  } catch (error) {
    console.error('Create Event Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        { model: Temple, attributes: ['mandirName'] },
        { model: User, attributes: ['name', 'email'] },
      ],
      order: [['eventDate', 'ASC']],
    });

    res.send({ events });
  } catch (error) {
    console.error('Get All Events Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: Temple, attributes: ['mandirName'] },
        { model: User, attributes: ['name', 'email'] },
      ],
    });

    if (!event) {
      return res
        .status(404)
        .send({ message: 'Event not found' });
    }

    res.send({ event });
  } catch (error) {
    console.error('Get Event By ID Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res
        .status(404)
        .send({ message: 'Event not found' });
    }

    const { eventDate, details } = req.body;

    if (eventDate) event.eventDate = eventDate;
    if (details) event.details = details;

    await event.save();

    res.send({
      message: 'Event updated successfully',
      event,
    });
  } catch (error) {
    console.error('Update Event Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res
        .status(404)
        .send({ message: 'Event not found' });
    }

    await event.destroy();

    res.send({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete Event Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};

export const getEventsByTemple = async (req, res) => {
  try {
    const events = await Event.findAll({
      where: { templeId: req.params.templeId },
      order: [['eventDate', 'ASC']],
      include: [{ model: User, attributes: ['name'] }],
    });

    res.send({ events });
  } catch (error) {
    console.error('Get Events By Temple Error:', error);
    res.status(500).send({
      message: error.message,
    });
  }
};
