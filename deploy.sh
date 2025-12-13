#!/bin/bash
# Deployment Script for Drive Pixel (Auto-update & Persistent Run)

# ---------------------------
# CONFIGURATION
# ---------------------------
PROJECT_DIR="/var/www/drivepixel"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR"
BACKEND_PORT=5000
FRONTEND_PORT=3000
GIT_BRANCH="main"   # ضع اسم الفرع المطلوب
ENV_FILE="$BACKEND_DIR/.env"

# ---------------------------
# FUNCTIONS
# ---------------------------
echo "Starting Drive Pixel Auto Deployment..."

# 1. Pull latest changes from GitHub
echo "Step 1: Pulling latest changes from GitHub..."
cd $PROJECT_DIR || exit
git fetch origin $GIT_BRANCH
git reset --hard origin/$GIT_BRANCH

# 2. Install/update dependencies
echo "Step 2: Installing/updating dependencies..."
cd $BACKEND_DIR || exit
npm install

cd $FRONTEND_DIR || exit
npm install

# 3. Build backend and frontend
echo "Step 3: Building backend..."
cd $BACKEND_DIR || exit
npm run build

echo "Step 4: Building frontend..."
cd $FRONTEND_DIR || exit
npx next build

# 4. Start backend & frontend with PM2 (keeps app alive)
echo "Step 5: Starting backend & frontend with PM2..."
cd $BACKEND_DIR || exit

# Backend
pm2 delete drivepixel-backend 2>/dev/null
pm2 start src/server.ts --name drivepixel-backend --interpreter ./node_modules/.bin/ts-node-dev -- --respawn --transpile-only

# Frontend
pm2 delete drivepixel-frontend 2>/dev/null
pm2 start npm --name drivepixel-frontend -- start --prefix $FRONTEND_DIR

# 6. Save PM2 process list for auto-start on server reboot
pm2 save
pm2 startup

# 7. Confirmation
echo "Deployment finished!"
echo "Backend running on port $BACKEND_PORT"
echo "Frontend running on port $FRONTEND_PORT"
echo "Project is now persistent with PM2 and will auto-restart on server reboot."
