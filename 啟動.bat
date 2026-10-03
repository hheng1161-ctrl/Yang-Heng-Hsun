@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   Yang Heng-Hsun CV (React) - Dev Server
echo ============================================
echo.

if not exist "node_modules" (
  echo [1/2] Installing dependencies... first run may take 1-2 minutes.
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo [ERROR] npm install failed. Is Node.js installed?
    pause
    exit /b 1
  )
) else (
  echo [1/2] Dependencies already installed. Skipping.
)

echo.
echo [2/2] Starting dev server...
echo      URL will appear below. Press Ctrl+C to stop.
echo.
call npm run dev
pause
