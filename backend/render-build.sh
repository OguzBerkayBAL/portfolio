#!/bin/bash

# Render.com Build Script for NestJS Backend
echo "🚀 Starting backend build for Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p uploads

echo "✅ Backend build completed!" 