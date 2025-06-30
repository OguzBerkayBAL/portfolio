#!/bin/bash

# Render.com Build Script for React Frontend
echo "🎨 Starting frontend build for Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building React application..."
npm run build

echo "✅ Frontend build completed!" 