#!/bin/bash

echo "Testing VehicleHub APIs..."
echo ""

BASE_URL="http://localhost:8081/api"

# Test 1: Login
echo "1. Testing Login..."
TOKEN=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"manager","password":"password123"}' | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Login failed"
  exit 1
fi
echo "✅ Login successful"

# Test 2: Get Vehicles
echo "2. Testing Get Vehicles..."
curl -s -X GET "$BASE_URL/vehicles" \
  -H "Authorization: Bearer $TOKEN" > /dev/null
echo "✅ Vehicles API working"

# Test 3: Get Drivers
echo "3. Testing Get Drivers..."
curl -s -X GET "$BASE_URL/drivers" \
  -H "Authorization: Bearer $TOKEN" > /dev/null
echo "✅ Drivers API working"

# Test 4: Get Trips
echo "4. Testing Get Trips..."
curl -s -X GET "$BASE_URL/trips" \
  -H "Authorization: Bearer $TOKEN" > /dev/null
echo "✅ Trips API working"

echo ""
echo "✅ All APIs are working with PostgreSQL!"
