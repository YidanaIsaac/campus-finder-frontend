#!/bin/bash

# Campus Finder - Quick Start Script
echo "═══════════════════════════════════════════════════════"
echo " CAMPUS FINDER - Starting Services"
echo "═══════════════════════════════════════════════════════"
echo ""

# Check if MongoDB is installed
if ! command -v mongod &> /dev/null; then
    echo "❌ MongoDB not installed. Installing..."
    brew tap mongodb/brew && brew install mongodb-community@7.0
fi

# Start MongoDB
echo "🔄 Starting MongoDB..."
brew services start mongodb-community@7.0
sleep 3

# Check MongoDB status
if pgrep -x "mongod" > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "❌ MongoDB failed to start"
    exit 1
fi

# Start Backend
echo ""
echo "🔄 Starting Backend Server..."
cd ~/campus-finder-backend
npm install > /dev/null 2>&1

# Start backend in background
npm start &
BACKEND_PID=$!
echo "✅ Backend server started (PID: $BACKEND_PID)"
sleep 3

# Start Frontend
echo ""
echo "🔄 Starting Frontend Dev Server..."
cd ~/findme
npm install > /dev/null 2>&1

echo ""
echo "═══════════════════════════════════════════════════════"
echo " ✅ ALL SERVICES STARTED"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔧 Backend:  http://localhost:5000"
echo "💾 MongoDB:  mongodb://localhost:27017"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Start frontend (this will keep terminal open)
npm run dev
