# VehicleHub

VehicleHub is a fleet management system for tracking vehicles, drivers, trips, maintenance, and operational costs. It uses role-based access so each user only sees what is relevant to their job.

<img width="1916" height="1107" alt="VH1" src="https://github.com/user-attachments/assets/e8b274a2-03fd-42e2-bb22-3b28b2e246c7" />

<img width="1916" height="1107" alt="VH2" src="https://github.com/user-attachments/assets/442bb53f-9699-4cff-8b17-482d2ac7cfaf" />

<img width="1916" height="1107" alt="VH3" src="https://github.com/user-attachments/assets/605f74a9-97d0-44c7-bec5-8b59df22ce09" />

<img width="1916" height="1107" alt="VH4" src="https://github.com/user-attachments/assets/730e7589-8a87-440e-9513-97ef80a555d2" />

---

## Requirements

- Docker Desktop

---

## Running the Application

```bash
docker compose up -d --build
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8081/api
- Database: localhost:5432

---

## Login Credentials

| Role             | Username   | Password    |
|------------------|------------|-------------|
| Manager          | manager    | password123 |
| Dispatcher       | dispatcher | password123 |
| Safety Officer   | safety     | password123 |
| Financial Analyst| finance    | password123 |

---

## Roles and Access

**Manager**
Full access. Can add, edit, and delete vehicles, drivers, trips, and maintenance records. Views analytics and financial reports.

**Dispatcher**
Can create and manage trips. Assigns vehicles and drivers. Views fleet and maintenance status.

**Safety Officer**
Can suspend drivers and view incident reports. Manages maintenance records.

**Financial Analyst**
Views trip history, revenue, and cost reports. No write access to operations.

---

## How to Use

**Vehicles**
Go to Fleet. Add a vehicle with make, model, year, and license plate. Set its status to Available, Active, or Maintenance. Retire vehicles that are no longer in service.

**Drivers**
Go to Drivers. Add a driver with contact details and license number. Suspend a driver if needed. Drivers must be active to be assigned to trips.

**Trips**
Go to Trips. Create a trip with start and end location. Assign an available vehicle and an active driver. Update the trip status as it progresses. Completed trips feed into financial reports.

**Maintenance**
Go to Maintenance. Schedule a maintenance record for a vehicle. Track the type, cost, and status. Completed maintenance updates the vehicle's service history.

**Analytics**
Go to Analytics. View utilization rates, trip counts, fuel usage, and cost breakdowns. Available to Manager, Dispatcher, and Financial Analyst.

---

## Stopping the Application

```bash
docker compose down
```

To remove all data including the database volume:

```bash
docker compose down -v
```

---

## Tech Stack

- Backend: Spring Boot 3, Spring Security, JWT, PostgreSQL 15
- Frontend: React 19, TypeScript, Vite, TailwindCSS
- Infrastructure: Docker, Docker Compose
