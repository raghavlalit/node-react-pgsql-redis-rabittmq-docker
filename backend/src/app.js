import dotenv from 'dotenv';
import express from 'express';
import Redis from 'ioredis';
import amqp from 'amqplib';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.js';
import eventsRoutes from './routes/events.js';
import { authenticateToken, requireRole } from './middleware/auth.js';
import cors from 'cors';

dotenv.config();

const app = express();

// 1. CORS middleware FIRST
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// 2. Then JSON parser and other middleware
app.use(express.json());

/** -------------------- Prisma Setup -------------------- */
const prisma = new PrismaClient();

/** -------------------- Redis Setup -------------------- */
// const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });

/** -------------------- RabbitMQ Setup -------------------- */
let channel;

async function connectRabbitMQ() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue('bookingQueue');
    console.log('✅ Connected to RabbitMQ and bookingQueue asserted.');
  } catch (err) {
    console.error('❌ Failed to connect to RabbitMQ. Retrying in 5s...', err.message);
    setTimeout(connectRabbitMQ, 5000);
  }
}

// connectRabbitMQ();

/** -------------------- Routes -------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/events', eventsRoutes);

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ 
    message: 'This is a protected route', 
    user: req.user 
  });
});

// Admin only route example
app.get('/api/admin', authenticateToken, requireRole(['ADMIN']), (req, res) => {
  res.json({ 
    message: 'Admin access granted', 
    user: req.user 
  });
});

/** -------------------- Health Check Routes -------------------- */

// PostgreSQL via Prisma
app.get('/api/test-db', async (req, res) => {
  try {
    const now = await prisma.$queryRaw`SELECT NOW()`;
    res.json({ timestamp: now[0].now });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Redis + Prisma
app.get('/api/health', async (req, res) => {
  try {
    const dbNow = await prisma.$queryRaw`SELECT NOW()`;
    // const redisRes = await redis.ping();

    res.json({
      status: 'OK',
      postgres: dbNow[0].now,
      // redis: redisRes,
    });
  } catch (err) {
    console.error('❌ Health check failed:', err.message);
    res.status(500).json({ status: 'ERROR', error: err.message });
  }
});

/** -------------------- Server Start -------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
