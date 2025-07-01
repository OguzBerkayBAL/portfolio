#!/bin/bash

# Render.com Build Script for MongoDB Portfolio Backend
echo "🚀 Starting MongoDB Portfolio Backend Build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building TypeScript application..."
npm run build

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p uploads

echo "✅ Build completed successfully!"
echo "🌱 Application will auto-seed MongoDB on first run" 