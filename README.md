# FleetFlow - Enterprise Fleet Management System

## Quick Start (5 minutes)

### 1. Start PostgreSQL
```bash
docker-compose up -d
```

### 2. Start Backend
```bash
cd backend
mvnw spring-boot:run
```

### 3. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Login Credentials
- **Manager**: `manager` / `password123`
- **Dispatcher**: `dispatcher` / `password123`
- **Safety Officer**: `safety` / `password123`
- **Financial Analyst**: `finance` / `password123`

### 5. Access
- Frontend: http://localhost:5173
- Backend API: http://localhost:8081/api

## API Endpoints

### Auth
- POST `/api/auth/login` - Login

### Vehicles
- GET `/api/vehicles` - List all vehicles
- POST `/api/vehicles` - Create vehicle (Manager only)
- GET `/api/vehicles/{id}` - Get vehicle by ID
- PATCH `/api/vehicles/{id}/retire` - Retire vehicle (Manager only)
- DELETE `/api/vehicles/{id}` - Delete vehicle (Manager only)

### Drivers
- GET `/api/drivers` - List all drivers
- POST `/api/drivers` - Create driver (Manager only)
- GET `/api/drivers/{id}` - Get driver by ID
- PATCH `/api/drivers/{id}/suspend` - Suspend driver (Manager/Safety)
- DELETE `/api/drivers/{id}` - Delete driver (Manager only)

### Trips
- GET `/api/trips` - List all trips
- POST `/api/trips` - Create trip (Manager/Dispatcher)
- PATCH `/api/trips/{id}/complete` - Complete trip (Manager/Dispatcher)

### Maintenance
- GET `/api/maintenance` - List all maintenance records
- POST `/api/maintenance` - Create maintenance record

### Financial
- GET `/api/financial/revenue` - Get revenue data
- GET `/api/financial/costs` - Get cost data

## Tech Stack
- **Backend**: Spring Boot 4.0.3, PostgreSQL, JWT Auth
- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Database**: PostgreSQL 15
