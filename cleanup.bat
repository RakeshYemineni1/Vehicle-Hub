@echo off
echo Stopping all Docker containers...
docker stop $(docker ps -aq) 2>nul
docker rm $(docker ps -aq) 2>nul

echo Killing Java/Spring processes...
taskkill /F /IM java.exe 2>nul

echo Killing Docker processes...
taskkill /F /IM docker.exe 2>nul
taskkill /F /IM dockerd.exe 2>nul
taskkill /F /IM com.docker.backend.exe 2>nul

echo Killing Node processes...
taskkill /F /IM node.exe 2>nul

echo Done! All processes killed.
pause
