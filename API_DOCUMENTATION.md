# FleetFlow API Documentation

Base URL: `http://localhost:8081/api`

## Authentication

### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "username": "manager",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "FLEET_MANAGER"
}
```

**All subsequent requests require:**
```
Authorization: Bearer <token>
```

---

## Vehicles API

### Get All Vehicles
```
GET /api/vehicles
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER, SAFETY_OFFICER
```

### Get Vehicle by ID
```
GET /api/vehicles/{id}
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER, SAFETY_OFFICER
```

### Create Vehicle
```
POST /api/vehicles
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
Content-Type: application/json

Body:
{
  "name": "Volvo FH16",
  "licensePlate": "TX-492-AB",
  "maxCapacity": 44.0,
  "acquisitionCost": 145000.0,
  "currentOdometer": 125430.0
}
```

### Retire Vehicle
```
PATCH /api/vehicles/{id}/retire
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

### Delete Vehicle
```
DELETE /api/vehicles/{id}
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

---

## Drivers API

### Get All Drivers
```
GET /api/drivers
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER, SAFETY_OFFICER
```

### Get Driver by ID
```
GET /api/drivers/{id}
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER, SAFETY_OFFICER
```

### Create Driver
```
POST /api/drivers
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "licenseNumber": "DL123456",
  "licenseCategory": "Commercial",
  "licenseExpiryDate": "2026-12-31"
}
```

### Suspend Driver
```
PATCH /api/drivers/{id}/suspend
Authorization: Bearer <token>
Roles: FLEET_MANAGER, SAFETY_OFFICER
```

### Delete Driver
```
DELETE /api/drivers/{id}
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

---

## Trips API

### Get All Trips
```
GET /api/trips
Authorization: Bearer <token>
Roles: All authenticated users
```

### Create Trip
```
POST /api/trips
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER
Content-Type: application/json

Body:
{
  "vehicleId": 1,
  "driverId": 1,
  "origin": "Dallas, TX",
  "destination": "Chicago, IL",
  "cargoWeight": 38.5,
  "revenue": 5000.0
}
```

### Complete Trip
```
PATCH /api/trips/{id}/complete
Authorization: Bearer <token>
Roles: FLEET_MANAGER, DISPATCHER
```

---

## Maintenance API

### Schedule Maintenance
```
POST /api/maintenance/schedule/{vehicleId}?description=Engine Overhaul&cost=5000
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

### Start Maintenance
```
PATCH /api/maintenance/start/{maintenanceId}
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

### Complete Maintenance
```
PATCH /api/maintenance/complete/{maintenanceId}
Authorization: Bearer <token>
Roles: FLEET_MANAGER only
```

### Get Vehicle Maintenance History
```
GET /api/maintenance/vehicle/{vehicleId}
Authorization: Bearer <token>
Roles: All authenticated users
```

---

## Financial API

### Get Maintenance Cost
```
GET /api/finance/maintenance-cost/{vehicleId}
Authorization: Bearer <token>
Roles: FINANCIAL_ANALYST, FLEET_MANAGER
```

### Get Revenue
```
GET /api/finance/revenue/{vehicleId}
Authorization: Bearer <token>
Roles: FINANCIAL_ANALYST, FLEET_MANAGER
```

### Get ROI
```
GET /api/finance/roi/{vehicleId}
Authorization: Bearer <token>
Roles: FINANCIAL_ANALYST, FLEET_MANAGER
```

### Get Cost Per KM
```
GET /api/finance/cost-per-km/{vehicleId}
Authorization: Bearer <token>
Roles: FINANCIAL_ANALYST, FLEET_MANAGER
```

---

## User Roles & Permissions

| Role | Username | Password | Permissions |
|------|----------|----------|-------------|
| FLEET_MANAGER | manager | password123 | Full access to all endpoints |
| DISPATCHER | dispatcher | password123 | View vehicles/drivers, manage trips |
| SAFETY_OFFICER | safety | password123 | View vehicles/drivers, suspend drivers |
| FINANCIAL_ANALYST | finance | password123 | View financial metrics |

---

## Response Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Example: Complete Workflow

### 1. Login
```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"manager","password":"password123"}'
```

### 2. Get All Vehicles
```bash
curl -X GET http://localhost:8081/api/vehicles \
  -H "Authorization: Bearer <your-token>"
```

### 3. Create Trip
```bash
curl -X POST http://localhost:8081/api/trips \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": 1,
    "driverId": 1,
    "origin": "Dallas, TX",
    "destination": "Chicago, IL",
    "cargoWeight": 38.5,
    "revenue": 5000.0
  }'
```

### 4. Complete Trip
```bash
curl -X PATCH http://localhost:8081/api/trips/1/complete \
  -H "Authorization: Bearer <your-token>"
```
