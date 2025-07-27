import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const EventsController = {
  // GET /api/events?search=&category=&date=&page=&limit=
  async getEvents(req, res) {
    try {
      const { search = '', category, date, page = 1, limit = 10 } = req.query;
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const take = parseInt(limit);
      const where = {};

      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
        ];
      }
      if (category) {
        // If you add a category field to Event, filter here
        where.category = category;
      }
      if (date) {
        // Filter events that start on or after the given date
        where.startTime = { gte: new Date(date) };
      }

      const [events, total] = await Promise.all([
        prisma.event.findMany({
          where,
          skip,
          take,
          orderBy: { startTime: 'asc' },
        }),
        prisma.event.count({ where }),
      ]);

      res.json({
        events,
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  },

  // GET /api/events/featured
  async getFeaturedEvents(req, res) {
    try {
      // If you add a 'featured' boolean field to Event, filter here
      const events = await prisma.event.findMany({
        where: { featured: true },
        orderBy: { startTime: 'asc' },
        take: 10,
      });
      res.json({ events });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch featured events' });
    }
  },

  // GET /api/events/latest
  async getLatestEvents(req, res) {
    try {
      const events = await prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
      res.json({ events });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch latest events' });
    }
  },

  // GET /api/events/:id
  async getEventById(req, res) {
    try {
      const { id } = req.params;
      const event = await prisma.event.findUnique({
        where: { id },
      });
      if (!event) return res.status(404).json({ error: 'Event not found' });
      res.json({ event });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch event' });
    }
  },
};

export default EventsController; 