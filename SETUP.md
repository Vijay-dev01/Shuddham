# Setup Instructions

## Issue: MongoDB Connection Failed

The backend is trying to connect to `mongodb://localhost:27017/shuddham` but MongoDB is not running locally.

## Solutions:

### Option 1: Use MongoDB Atlas (Cloud - Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/shuddham`)
4. Update `server/.env`:
   ```
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/shuddham?retryWrites=true&w=majority
   ```

### Option 2: Install MongoDB Locally
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. Keep the current `.env` setting: `MONGO_URI=mongodb://localhost:27017/shuddham`

## After Setting Up MongoDB:

1. **Run the data seeder:**
   ```bash
   cd server
   npm run seed
   ```
   Expected output: "Data Imported!" and "MongoDB Connected: ..."

2. **Start the backend:**
   ```bash
   npm run dev
   ```

3. **Start the frontend (in another terminal):**
   ```bash
   cd client
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## TypeScript Errors - FIXED ✅
All TypeScript compilation errors in the User model have been resolved.
