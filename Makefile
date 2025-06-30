# 🚀 Dark Tech Portfolio - Development Commands

.PHONY: help dev prod db-only clean logs shell backup restore

# Default target
help: ## Show this help message
	@echo "🚀 Dark Tech Portfolio - Available Commands:"
	@echo "════════════════════════════════════════════"
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ 🛠️  Development Commands

dev: ## Start development environment (databases only)
	@echo "🚀 Starting Dark Tech Portfolio development environment..."
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d postgres redis adminer
	@echo "✅ Development databases started!"
	@echo "📋 PostgreSQL: localhost:5433"
	@echo "🗄️  Adminer: http://localhost:8080"
	@echo "🚀 Redis: localhost:6379"

db-only: ## Start only the database services
	@echo "🐘 Starting database services..."
	docker compose -f docker-compose.yml -f docker-compose.override.yml up -d postgres
	@echo "✅ PostgreSQL ready on localhost:5433"

stop: ## Stop all services
	@echo "🛑 Stopping all services..."
	docker compose -f docker-compose.yml -f docker-compose.override.yml down
	@echo "✅ All services stopped"

##@ 🚀 Production Commands

prod: ## Start production environment
	@echo "🚀 Starting production environment..."
	docker compose up -d
	@echo "✅ Production environment started!"

prod-build: ## Build and start production environment
	@echo "🔨 Building and starting production environment..."
	docker compose up -d --build
	@echo "✅ Production environment built and started!"

##@ 📊 Monitoring Commands

logs: ## View logs from all services
	docker compose logs -f

logs-db: ## View database logs
	docker compose logs -f postgres

logs-backend: ## View backend logs
	docker compose logs -f backend

status: ## Show status of all services
	@echo "📊 Service Status:"
	@echo "═══════════════════"
	docker compose ps

##@ 🔧 Utility Commands

shell-db: ## Connect to PostgreSQL shell
	docker compose exec postgres psql -U portfolio_user -d dark_tech_portfolio_dev

shell-redis: ## Connect to Redis shell
	docker compose exec redis redis-cli -a dark_tech_redis_dev

clean: ## Clean up containers, volumes, and images
	@echo "🧹 Cleaning up Docker resources..."
	docker compose down -v --remove-orphans
	docker system prune -a --volumes -f
	@echo "✅ Cleanup completed!"

reset-db: ## Reset database with fresh data
	@echo "🔄 Resetting database..."
	docker compose down postgres
	docker volume rm dark-tech-postgres-dev-data || true
	docker compose up -d postgres
	@echo "✅ Database reset completed!"

##@ 📦 Backup & Restore

backup: ## Backup database
	@echo "💾 Creating database backup..."
	docker compose exec postgres pg_dump -U portfolio_user -d dark_tech_portfolio_dev > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup created!"

restore: ## Restore database from backup (usage: make restore FILE=backup.sql)
	@echo "📥 Restoring database from $(FILE)..."
	cat $(FILE) | docker compose exec -T postgres psql -U portfolio_user -d dark_tech_portfolio_dev
	@echo "✅ Database restored!"

##@ 🎯 Quick Start

install: ## Install dependencies for all services
	@echo "📦 Installing dependencies..."
	cd backend && npm install
	# cd frontend && npm install  # When frontend is ready
	@echo "✅ Dependencies installed!"

setup: ## Complete development setup
	@echo "🎯 Setting up Dark Tech Portfolio development environment..."
	make install
	make dev
	@echo ""
	@echo "🚀 Development environment ready!"
	@echo "════════════════════════════════════════════"
	@echo "📋 PostgreSQL: localhost:5433"
	@echo "   User: portfolio_user"
	@echo "   Password: dark_tech_2024"
	@echo "   Database: dark_tech_portfolio_dev"
	@echo ""
	@echo "🗄️  Adminer: http://localhost:8080"
	@echo "   System: PostgreSQL"
	@echo "   Server: postgres"
	@echo ""
	@echo "🚀 Redis: localhost:6379"
	@echo "   Password: dark_tech_redis_dev"
	@echo ""
	@echo "💻 Next steps:"
	@echo "   cd backend && npm run start:dev"
	@echo "   # cd frontend && npm run dev" 