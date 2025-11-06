#!/bin/bash

# Campus Finder - Pre-Testing Verification Script
# Run this before testing to ensure everything is ready

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║        🔍 CAMPUS FINDER - PRE-TEST VERIFICATION 🔍           ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check MongoDB
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Checking MongoDB..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}✅ MongoDB is installed${NC}"
    if pgrep -x "mongod" > /dev/null; then
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    else
        echo -e "${YELLOW}⚠️  MongoDB is not running. Starting...${NC}"
        brew services start mongodb-community@7.0 2>/dev/null || echo -e "${RED}❌ Failed to start MongoDB${NC}"
    fi
else
    echo -e "${RED}❌ MongoDB is not installed${NC}"
    echo "   Run: brew install mongodb-community@7.0"
fi
echo ""

# Check Node.js
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. Checking Node.js..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js is installed: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js is not installed${NC}"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm is installed: v$NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm is not installed${NC}"
fi
echo ""

# Check Backend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. Checking Backend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d ~/campus-finder-backend ]; then
    echo -e "${GREEN}✅ Backend directory exists${NC}"
    
    if [ -f ~/campus-finder-backend/.env ]; then
        echo -e "${GREEN}✅ Backend .env file exists${NC}"
        
        # Check important env vars
        if grep -q "MONGO_URI" ~/campus-finder-backend/.env; then
            echo -e "${GREEN}✅ MONGO_URI configured${NC}"
        else
            echo -e "${YELLOW}⚠️  MONGO_URI not found in .env${NC}"
        fi
        
        if grep -q "JWT_SECRET" ~/campus-finder-backend/.env; then
            echo -e "${GREEN}✅ JWT_SECRET configured${NC}"
        else
            echo -e "${YELLOW}⚠️  JWT_SECRET not found in .env${NC}"
        fi
    else
        echo -e "${RED}❌ Backend .env file missing${NC}"
        echo "   Create it at: ~/campus-finder-backend/.env"
    fi
    
    if [ -f ~/campus-finder-backend/package.json ]; then
        echo -e "${GREEN}✅ Backend package.json exists${NC}"
    else
        echo -e "${RED}❌ Backend package.json missing${NC}"
    fi
else
    echo -e "${RED}❌ Backend directory not found${NC}"
    echo "   Expected at: ~/campus-finder-backend"
fi
echo ""

# Check Frontend
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. Checking Frontend..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -d ~/findme ]; then
    echo -e "${GREEN}✅ Frontend directory exists${NC}"
    
    if [ -f ~/findme/.env ]; then
        echo -e "${GREEN}✅ Frontend .env file exists${NC}"
        
        if grep -q "VITE_API_BASE_URL" ~/findme/.env; then
            echo -e "${GREEN}✅ VITE_API_BASE_URL configured${NC}"
        else
            echo -e "${YELLOW}⚠️  VITE_API_BASE_URL not found in .env${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Frontend .env file missing (optional)${NC}"
    fi
    
    if [ -f ~/findme/package.json ]; then
        echo -e "${GREEN}✅ Frontend package.json exists${NC}"
    fi
    
    # Check key files
    echo ""
    echo "   Checking critical files:"
    
    FILES=(
        "src/pages/Login.jsx"
        "src/pages/Chat.jsx"
        "src/pages/Home.jsx"
        "src/pages/Browse.jsx"
        "src/pages/Report.jsx"
        "src/utils/api.js"
        "src/App.jsx"
    )
    
    for file in "${FILES[@]}"; do
        if [ -f ~/findme/$file ]; then
            LINES=$(wc -l < ~/findme/$file)
            if [ $LINES -gt 0 ]; then
                echo -e "   ${GREEN}✅ $file ($LINES lines)${NC}"
            else
                echo -e "   ${RED}❌ $file (empty!)${NC}"
            fi
        else
            echo -e "   ${RED}❌ $file (missing!)${NC}"
        fi
    done
else
    echo -e "${RED}❌ Frontend directory not found${NC}"
fi
echo ""

# Check Dependencies
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. Checking Dependencies..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Backend dependencies
if [ -d ~/campus-finder-backend/node_modules ]; then
    echo -e "${GREEN}✅ Backend node_modules exists${NC}"
else
    echo -e "${YELLOW}⚠️  Backend dependencies not installed${NC}"
    echo "   Run: cd ~/campus-finder-backend && npm install"
fi

# Frontend dependencies
if [ -d ~/findme/node_modules ]; then
    echo -e "${GREEN}✅ Frontend node_modules exists${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend dependencies not installed${NC}"
    echo "   Run: cd ~/findme && npm install"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "To start testing:"
echo ""
echo "Option 1 (Quick Start):"
echo "  cd ~/findme && ./start-all.sh"
echo ""
echo "Option 2 (Manual):"
echo "  Terminal 1: brew services start mongodb-community@7.0"
echo "  Terminal 2: cd ~/campus-finder-backend && npm start"
echo "  Terminal 3: cd ~/findme && npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo ""
echo "📖 See TESTING_GUIDE.txt for detailed testing instructions"
echo ""
echo "╚═══════════════════════════════════════════════════════════════╝"
