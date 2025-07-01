#!/bin/bash

# Render.com Build Script for NestJS Backend
echo "🚀 Starting backend build for Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p uploads
mkdir -p data

# Initialize SQLite database if needed
echo "🗄️ Setting up SQLite database..."
if [ "$USE_SQLITE" = "true" ]; then
    echo "SQLite will be initialized on first run"
fi

echo "✅ Backend build completed!" 