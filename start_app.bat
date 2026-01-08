@echo off
echo Starting Productivity Tracker System...
echo ---------------------------------------
echo [1/2] Launching Backend Server (Port 3001)...
start "Backend Server" cmd /k "cd backend && node server.js"
echo [2/2] Launching Frontend Interface (Port 3000)...
start "Frontend App" cmd /k "cd frontend && npm run dev"
echo ---------------------------------------
echo System Initialized.
echo Access the app at: http://localhost:3000
pause



