@echo off
REM 🚀 Dark Tech Portfolio - Windows Development Scripts

if "%1"=="help" goto help
if "%1"=="dev" goto dev
if "%1"=="stop" goto stop
if "%1"=="logs" goto logs
if "%1"=="status" goto status
if "%1"=="db-shell" goto db-shell
if "%1"=="clean" goto clean
if "%1"=="test-api" goto test-api
if "%1"=="" goto help

:help
echo.
echo 🚀 Dark Tech Portfolio - Available Commands:
echo ════════════════════════════════════════════
echo.
echo   scripts dev       Start development databases
echo   scripts stop      Stop all services
echo   scripts logs      View container logs
echo   scripts status    Show container status
echo   scripts db-shell  Connect to PostgreSQL
echo   scripts clean     Clean up containers
echo   scripts test-api  Test API endpoints
echo.
goto end

:dev
echo 🚀 Starting Dark Tech Portfolio development environment...
docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d postgres redis adminer
echo.
echo ✅ Development databases started!
echo 📋 PostgreSQL: localhost:5433
echo 🗄️  Adminer: http://localhost:8080
echo 🚀 Redis: localhost:6379
goto end

:stop
echo 🛑 Stopping all services...
docker-compose -f docker-compose.yml -f docker-compose.override.yml down
echo ✅ All services stopped
goto end

:logs
docker-compose logs -f
goto end

:status
echo 📊 Container Status:
echo ═══════════════════
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
goto end

:db-shell
echo 🐘 Connecting to PostgreSQL...
docker-compose exec postgres psql -U portfolio_user -d dark_tech_portfolio_dev
goto end

:clean
echo 🧹 Cleaning up Docker resources...
docker-compose down -v --remove-orphans
docker system prune -a --volumes -f
echo ✅ Cleanup completed!
goto end

:test-api
echo 🧪 Testing Dark Tech Portfolio API...
echo.
echo 🎯 Health Check:
curl -s http://localhost:3001/ | jq .
echo.
echo 💻 Terminal Status:
curl -s http://localhost:3001/terminal | jq .ascii_banner
echo.
echo 📖 API Documentation: http://localhost:3001/docs
goto end

:end 