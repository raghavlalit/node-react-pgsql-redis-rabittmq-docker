// backend/index.ts

import dotenv from 'dotenv';
import express from 'express';
import { Pool } from 'pg';
import Redis from 'ioredis';
import amqp from 'amqplib';

dotenv.config();

const app = express();
app.use(express.json());

/** -------------------- PostgreSQL Setup -------------------- */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/** -------------------- Redis Setup -------------------- */
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
});

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

connectRabbitMQ();

/** -------------------- Health Check Route -------------------- */

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows[0]);
    } catch (error) {
        console.error('DB Error:', error);
        res.status(500).json({ error: error.message });
    }
});


app.get('/api/health', async (req, res) => {
  try {
    // Check Postgres
    const dbRes = await pool.query('SELECT NOW()');

    // Check Redis
    const redisRes = await redis.ping();

    res.json({
      status: 'OK',
      postgres: dbRes.rows[0],
      redis: redisRes,
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
