#!/bin/bash

# Campus Finder - Complete Testing Guide
# Run this script to start both frontend and backend

echo "╔═══════════════════════════════════════════════════════╗"
echo "║     CAMPUS FINDER - FULL STACK STARTUP SCRIPT        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check MongoDB
echo -e "${BLUE}Step 1: Checking MongoDB...${NC}"
if pgrep -x "mongod" > /dev/null; then
    echo -e "${GREEN}✅ MongoDB is already running${NC}"
else
    echo -e "${YELLOW}⚠️  Starting MongoDB...${NC}"
    brew services start mongodb-community@7.0
    sleep 3
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ MongoDB started successfully${NC}"
    else
        echo -e "${RED}❌ Failed to start MongoDB${NC}"
        echo "Run: brew services start mongodb-community@7.0"
        exit 1
    fi
fi

echo ""
echo -e "${BLUE}Step 2: Starting Backend Server...${NC}"
echo "Open a new terminal and run:"
echo -e "${YELLOW}cd ~/campus-finder-backend && npm start${NC}"
echo ""
echo "Or run in background:"
echo -e "${YELLOW}cd ~/campus-finder-backend && npm start &${NC}"
echo ""

echo -e "${BLUE}Step 3: Starting Frontend...${NC}"
echo "After backend is running, run:"
echo -e "${YELLOW}cd ~/findme && npm run dev${NC}"
echo ""

echo "╔═══════════════════════════════════════════════════════╗"
echo "║                MANUAL STARTUP COMMANDS                 ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo "Terminal 1 - MongoDB:"
echo -e "${GREEN}brew services start mongodb-community@7.0${NC}"
echo ""
echo "Terminal 2 - Backend:"
echo -e "${GREEN}cd ~/campus-finder-backend${NC}"
echo -e "${GREEN}npm install  # First time only${NC}"
echo -e "${GREEN}npm start${NC}"
echo ""
echo "Terminal 3 - Frontend:"
echo -e "${GREEN}cd ~/findme${NC}"
echo -e "${GREEN}npm install  # First time only${NC}"
echo -e "${GREEN}npm run dev${NC}"
echo ""
echo "╔═══════════════════════════════════════════════════════╗"
echo "║                   ACCESS POINTS                        ║"
echo "╚═══════════════════════════════════════════════════════╝"
echo ""
echo -e "Frontend:  ${GREEN}http://localhost:5173${NC}"
echo -e "Backend:   ${GREEN}http://localhost:5000${NC}"
echo -e "MongoDB:   ${GREEN}mongodb://localhost:27017${NC}"
echo ""
