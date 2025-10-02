@echo off
echo Starting Cryptography & Number Theory Lab...
echo.
echo Installing dependencies...
call npm install
echo.
echo Installing client dependencies...
cd client
call npm install
cd ..
echo.
echo Starting the application...
echo Backend will run on http://localhost:5000
echo Frontend will run on http://localhost:3000
echo.
call npm run dev
pause
