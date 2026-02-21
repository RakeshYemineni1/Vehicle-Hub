@echo off
echo ========================================
echo FleetFlow - Enterprise Setup
echo ========================================
echo.

echo Step 1: Checking PostgreSQL...
psql -U postgres -c "SELECT version();" > nul 2>&1
if %errorlevel% neq 0 (
    echo PostgreSQL not found. Please install PostgreSQL 15 or start Docker.
    echo Download: https://www.postgresql.org/download/windows/
    pause
    exit /b 1
)

echo Step 2: Creating database...
psql -U postgres -c "DROP DATABASE IF EXISTS fleetflow;"
psql -U postgres -c "CREATE DATABASE fleetflow;"

echo Step 3: Starting Backend...
cd backend
start cmd /k "mvnw spring-boot:run"

echo Step 4: Installing Frontend dependencies...
cd ..\frontend
call npm install

echo Step 5: Starting Frontend...
start cmd /k "npm run dev"

echo.
echo ========================================
echo FleetFlow is starting!
echo Backend: http://localhost:8081
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Login with: manager / password123
pause
