# Task Manager API - Backend Interview Challenge

> **Time Limit**: 1h30min  
> **Role**: Backend Engineer (Node.js/TypeScript)

Build a clean TypeScript backend API for a Task Management system with authentication, CRUD operations, and proper error handling.

## 🎯 Challenge Overview

Create a RESTful API that allows users to:

- Register and authenticate with JWT
- Manage personal tasks (CRUD operations)
- Secure endpoints with proper validation
- Handle errors gracefully

## 🏗️ Tech Stack

| Layer                | Technology       |
| -------------------- | ---------------- |
| **Language**         | TypeScript       |
| **Framework**        | Express.js       |
| **Database**         | PostgreSQL       |
| **ORM**              | Prisma           |
| **Authentication**   | JWT + bcrypt     |
| **Validation**       | Zod              |
| **Testing**          | Jest + Supertest |
| **Containerization** | Docker           |

## 📋 Requirements

### Core Features

#### 🔐 Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- JWT token-based authentication
- Password hashing with bcrypt

#### ✅ Task Management

- `GET /api/tasks` - Get user's tasks (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

### Technical Requirements

- **TypeScript**: Strict typing, no `any` types (except in catch blocks)
- **Validation**: Request validation using Zod
- **Error Handling**: Centralized error handling middleware
- **Security**: Input sanitization
- **Database**: Prisma with PostgreSQL
- **Testing**: Unit tests (integration tests as an extra)
- **Docker**: Containerized application

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19.3
- PostgreSQL
- Docker (optional)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Docker Setup

```bash
# Start with Docker Compose
docker-compose up --build

# Access API at http://localhost:3000
```

## 📁 Project Structure

```
src/
├── controllers/     # Route handlers
├── services/        # Business logic
├── routes/          # Express routers
├── middlewares/     # Auth, validation, error handling
├── validators/      # Zod schemas
├── utils/           # Helper functions
└── server.ts        # Express app setup

tests/               # Jest tests
prisma/              # Database schema and migrations
├── schema.prisma
└── migrations/
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm test             # Run tests
```

## API Endpoints

### Health Check

```http
GET /health
```

### Authentication

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Tasks (Protected Routes)

```http
GET /api/tasks
Authorization: Bearer <jwt_token>
```

```http
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete the interview challenge"
}
```

```http
PUT /api/tasks/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": true
}
```

```http
DELETE /api/tasks/:id
Authorization: Bearer <jwt_token>
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker Configuration

The project includes Docker configuration for easy deployment:

- `Dockerfile` - Application container
- `docker-compose.yml` - Multi-container setup with PostgreSQL

## 🔒 Environment Variables

Check .env.example for environment variables.

## Evaluation Criteria

- **Code Quality**: Clean, readable, well-structured TypeScript code
- **Architecture**: Proper separation of concerns (controllers, services, routes)
- **Security**: JWT implementation, input validation, error handling
- **Database**: Proper Prisma usage and schema design
- **Testing**: Unit and integration test coverage
- **Documentation**: Clear API documentation and code comments
- **Error Handling**: Comprehensive error handling and logging
- **Performance**: Efficient database queries and response times

## Bonus Points

- Swagger/OpenAPI documentation (TSOA can be used)
- Logging
- Graceful shutdown handling
- Input sanitization
- CORS configuration
- Health check endpoint
- Postman Collection

## Notes

- Focus on code quality over quantity
- Implement proper TypeScript types
- Follow SOLID principles
- Write meaningful tests
- Handle edge cases gracefully
- Use appropriate HTTP status codes

---

**Good luck with your interview!**
