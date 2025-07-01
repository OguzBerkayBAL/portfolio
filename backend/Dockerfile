# 🚀 Dark Tech Portfolio - Backend Dockerfile
FROM node:18-alpine AS development

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install native dependencies for SQLite3
RUN apk add --no-cache python3 make g++ sqlite

# Add non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install production dependencies (including sqlite3)
RUN npm install --production && npm cache clean --force

# Copy built application from development stage
COPY --from=development /usr/src/app/dist ./dist

# Create uploads and data directories
RUN mkdir -p uploads data && chown -R nestjs:nodejs uploads data

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3001/ || exit 1

# Start the application
CMD ["node", "dist/main"] 