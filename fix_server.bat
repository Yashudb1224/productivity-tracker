@echo off
echo [FIX] Stopping all lingering server processes...
taskkill /F /IM node.exe
echo.
echo [FIX] Old processes killed.
echo [FIX] Starting the secured application...
echo.
npm run dev
pause
