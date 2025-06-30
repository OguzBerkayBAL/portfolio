# Environment Configuration

## Environment Variables

Copy `.env.example` to `.env` and configure the following variables:

### Database Configuration
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=portfolio_user
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=dark_tech_portfolio
```

### JWT Secret
```bash
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### API Configuration
```bash
API_PORT=3001
API_PREFIX=api/v1
FRONTEND_URL=http://localhost:3000
```

### Email Configuration (for contact form)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
```

### File Upload Configuration
```bash
UPLOAD_DEST=./uploads
MAX_FILE_SIZE=5242880  # 5MB in bytes
```

### Redis (optional, for caching)
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
```

### Application Configuration
```bash
NODE_ENV=development
LOG_LEVEL=debug
CORS_ORIGIN=http://localhost:3000
```

### Rate Limiting
```bash
RATE_LIMIT_TTL=60
RATE_LIMIT_LIMIT=100
```

## Setup Instructions

1. **PostgreSQL Setup:**
   ```bash
   # Install PostgreSQL
   # Create database and user
   psql -U postgres
   CREATE DATABASE dark_tech_portfolio;
   CREATE USER portfolio_user WITH PASSWORD 'your_password_here';
   GRANT ALL PRIVILEGES ON DATABASE dark_tech_portfolio TO portfolio_user;
   ```

2. **Gmail SMTP Setup:**
   - Enable 2-factor authentication
   - Generate app password
   - Use app password in SMTP_PASS

3. **JWT Secret Generation:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ``` 