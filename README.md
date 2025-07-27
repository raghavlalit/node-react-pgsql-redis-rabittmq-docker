# Occasio - Event Booking App

A full-stack event booking application built with React, Node.js, PostgreSQL, Redis, and RabbitMQ.

## 🏗️ Architecture

- **Frontend**: React + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + PostgreSQL + Redis + RabbitMQ
- **Database**: PostgreSQL with PgAdmin for management
- **Cache**: Redis for session management and caching
- **Message Queue**: RabbitMQ for asynchronous processing
- **Containerization**: Docker Compose for easy deployment

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 20+ (for local development)

### Running with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-booking-app
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - PgAdmin: http://localhost:5050 (admin@admin.com / admin)
   - RabbitMQ Management: http://localhost:15672 (guest / guest)

### Local Development

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env with your API configuration
   npm run dev
   ```

## 📁 Project Structure

```
event-booking-app/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── app.js         # Main application file
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Authentication & validation
│   │   └── routes/        # API routes
│   ├── Dockerfile
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── components/    # UI components
│   │   ├── context/       # React context
│   │   └── api/           # API configuration
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Multi-service orchestration
└── README.md
```

## 🔧 Services

### Backend API (Port 5000)
- RESTful API endpoints
- Database operations with PostgreSQL
- Redis caching
- RabbitMQ message processing
- Health check endpoints

### Frontend (Port 5173)
- React application with Vite
- TypeScript support
- Tailwind CSS styling
- Hot module replacement

### Database Services
- **PostgreSQL** (Port 5432): Main database
- **Redis** (Port 6379): Caching and sessions
- **RabbitMQ** (Ports 5672, 15672): Message queue
- **PgAdmin** (Port 5050): Database management interface

## 🛠️ Development

### Available Scripts

**Backend:**
```bash
npm run dev          # Start development server with nodemon
```

**Frontend:**
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### API Endpoints

- `GET /api/health` - Health check for all services
- `GET /api/test-db` - Database connection test

## 🔒 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgres://eventuser:eventpass@postgres:5432/eventdb
REDIS_HOST=redis
REDIS_PORT=6379
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Occasio
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose up --build

# Access specific service
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 📊 Monitoring

- **Health Check**: http://localhost:5000/api/health
- **Database**: http://localhost:5050 (PgAdmin)
- **Message Queue**: http://localhost:15672 (RabbitMQ Management)

## 🚧 TODO

- [ ] Implement event creation and management
- [ ] Add user authentication and authorization
- [ ] Create booking system with real-time updates
- [ ] Add payment integration
- [ ] Implement email notifications
- [ ] Add admin dashboard
- [ ] Write comprehensive tests
- [ ] Add CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 5000, 5173, 5432, 6379, 15672, 5050 are available
2. **Database connection**: Check if PostgreSQL container is healthy
3. **Frontend not loading**: Verify Vite dev server is running on port 5173
4. **Environment variables**: Ensure `.env` files are properly configured

### Reset Everything

```bash
# Stop and remove all containers, networks, and volumes
docker-compose down -v

# Remove all images
docker system prune -a

# Start fresh
docker-compose up --build
```
