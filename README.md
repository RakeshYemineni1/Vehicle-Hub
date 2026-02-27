# VehicleHub - Fleet Management System

A modern fleet management application built with Spring Boot and React, featuring role-based access control, vehicle tracking, and operational management.

## How It Works

**Authentication Flow**
1. User logs in with role-based credentials
2. JWT token generated and stored for session management
3. Role-based permissions control access to features

**Vehicle Management**
- Add/edit vehicles with details (make, model, license plate)
- Track vehicle status (Active, Maintenance, Retired)
- Monitor mileage and fuel consumption
- Retire vehicles when needed

**Driver Operations**
- Manage driver profiles and contact information
- Track license numbers and hire dates
- Suspend drivers for safety violations
- Monitor driver performance

**Trip Planning**
- Create trips with start/end locations
- Assign vehicles and drivers
- Track trip status (Scheduled, In Progress, Completed)
- Record distance and fuel usage

**Maintenance System**
- Schedule maintenance by vehicle
- Track maintenance types and costs
- Monitor maintenance status
- Generate maintenance reports

**Financial Reporting**
- Calculate revenue from completed trips
- Track operational costs (fuel, maintenance)
- Generate financial summaries
- Analyze profitability

## Features

- **Vehicle Management** - Track fleet status, maintenance, and utilization
- **Driver Management** - Monitor driver profiles and performance
- **Trip Planning** - Schedule and manage vehicle dispatching
- **Maintenance Tracking** - Record and schedule vehicle maintenance
- **Financial Reporting** - Revenue and cost analysis
- **Role-Based Access** - Manager, Dispatcher, Safety Officer, Financial Analyst

## Quick Start

### Prerequisites
- Docker Desktop

### Run Application
```bash
docker-compose up -d --build
```

### Access
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8081/api
- **Database**: PostgreSQL on port 5432

### Login Credentials
| Role | Username | Password |
|------|----------|----------|
| Manager | manager | password123 |
| Dispatcher | dispatcher | password123 |
| Safety Officer | safety | password123 |
| Financial Analyst | finance | password123 |

## Technology Stack

**Backend**
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL 15
- Maven

**Frontend**
- React 19
- TypeScript
- Vite
- TailwindCSS
- Radix UI Components

**Infrastructure**
- Docker & Docker Compose
- PostgreSQL 15 Alpine

## Project Structure

```
vehicleHub/
├── backend/
│   ├── src/main/java/com/fleetflow/
│   │   ├── config/          # Security & data configuration
│   │   ├── controller/      # REST API endpoints
│   │   ├── dto/            # Data transfer objects
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data access layer
│   │   ├── security/       # JWT & authentication
│   │   └── service/        # Business logic
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Application pages
│   │   └── services/       # API services
│   └── package.json
└── docker-compose.yml
```

## API Endpoints

**Authentication**
- `POST /api/auth/login`

**Vehicles**
- `GET /api/vehicles` - List vehicles
- `POST /api/vehicles` - Create vehicle (Manager)
- `PATCH /api/vehicles/{id}/retire` - Retire vehicle
- `DELETE /api/vehicles/{id}` - Delete vehicle

**Drivers**
- `GET /api/drivers` - List drivers
- `POST /api/drivers` - Create driver (Manager)
- `PATCH /api/drivers/{id}/suspend` - Suspend driver

**Trips**
- `GET /api/trips` - List trips
- `POST /api/trips` - Create trip (Manager/Dispatcher)
- `PATCH /api/trips/{id}/complete` - Complete trip

**Maintenance & Financial**
- `GET /api/maintenance` - Maintenance records
- `GET /api/financial/revenue` - Revenue data
- `GET /api/financial/costs` - Cost analysis

## Development

**View Logs**
```bash
docker-compose logs -f [service]
```

**Restart Services**
```bash
docker-compose restart
```

**Stop Application**
```bash
docker-compose down
```

## Database
- **Host**: localhost:5432
- **Database**: vehiclehub
- **User**: postgres
- **Password**: postgres