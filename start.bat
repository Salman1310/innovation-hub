@echo off
title Innovation Hub - Dev Server
cd /d "%~dp0"
echo Starting Innovation Hub...
echo.
echo Once running, open http://localhost:3000 in your browser.
echo Press Ctrl+C to stop the server.
echo.
npm run dev
pause
