# Azure SQL Database Setup Guide

This guide will help you set up Azure SQL Database for your Recipe Planner application.

## 🚨 Quick Fix for "getaddrinfo ENOTFOUND" Error

If you're getting a connection error, the most likely issue is an incorrect server name:

1. **Test your connection**: `npm run test:db` (this will show detailed error info)
2. **Go to Azure Portal** → **SQL databases** → **Your database**
3. **Copy the exact "Server name"** (should end with `.database.windows.net`)
4. **Update your `.env` file** with the correct server name
5. **Test again**: `npm run test:db`
6. **Restart your development server**: `npm run dev`

If you don't have a server yet, follow the full setup guide below.

---

## Prerequisites

- Azure account (free tier is sufficient)
- Azure CLI installed (optional, but recommended)

## Step 1: Create Azure SQL Database

### Option A: Using Azure Portal

1. **Go to Azure Portal**: https://portal.azure.com
2. **Create a resource** → Search for "SQL Database" → Create
3. **Configure the database**:
   - **Subscription**: Choose your subscription
   - **Resource Group**: Create new or select existing
   - **Database Name**: `recipe-planner-db` (or your preferred name)
   - **Server**: Create new server
     - **Server Name**: `your-recipe-app-server` (must be globally unique)
     - **Location**: Choose closest to your users
     - **Authentication**: SQL Authentication
     - **Server Admin Login**: `recipeadmin`
     - **Password**: Create a strong password
   - **Compute + Storage**:
     - **Service Tier**: Basic (5 DTU, 2GB) for development
     - Or **Serverless** for cost optimization
4. **Networking**:
   - **Allow Azure services**: Yes
   - **Add current client IP**: Yes
5. **Review and Create**

### Option B: Using Azure CLI

```bash
# Create resource group
az group create --name recipe-planner-rg --location eastus

# Create SQL server
az sql server create \
  --name your-recipe-app-server \
  --resource-group recipe-planner-rg \
  --location eastus \
  --admin-user recipeadmin \
  --admin-password "YourStrongPassword123!"

# Create SQL database
az sql db create \
  --resource-group recipe-planner-rg \
  --server your-recipe-app-server \
  --name recipe-planner-db \
  --service-objective Basic

# Configure firewall (allow Azure services)
az sql server firewall-rule create \
  --resource-group recipe-planner-rg \
  --server your-recipe-app-server \
  --name AllowAzureServices \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0

# Add your current IP
az sql server firewall-rule create \
  --resource-group recipe-planner-rg \
  --server your-recipe-app-server \
  --name AllowMyIP \
  --start-ip-address $(curl -s https://ipinfo.io/ip) \
  --end-ip-address $(curl -s https://ipinfo.io/ip)
```

## Step 2: Configure Environment Variables

1. **Copy `.env.example` to `.env`**:

   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your database details**:
   ```env
   AZURE_SQL_SERVER=your-recipe-app-server.database.windows.net
   AZURE_SQL_DATABASE=recipe-planner-db
   AZURE_SQL_USER=recipeadmin
   AZURE_SQL_PASSWORD=YourStrongPassword123!
   NODE_ENV=development
   ```

## Step 3: Test the Connection

1. **Test your database connection**:

   ```bash
   npm run test:db
   ```

   This will verify your connection and show detailed error messages if something is wrong.

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Check the connection status** in the app - you should see "Connected to Azure Database" in green.

4. **Test the API** by going to: http://localhost:3000/api/health

## Step 4: Deploy to Azure Web App

When deploying to Azure Web App, you can configure the environment variables in the Azure Portal:

1. **Go to your Azure Web App** → Configuration → Application Settings
2. **Add the following settings**:
   - `AZURE_SQL_SERVER`: your-recipe-app-server.database.windows.net
   - `AZURE_SQL_DATABASE`: recipe-planner-db
   - `AZURE_SQL_USER`: recipeadmin
   - `AZURE_SQL_PASSWORD`: YourStrongPassword123!
   - `NODE_ENV`: production

## Database Schema

The application will automatically create the following tables when it first connects:

- **Ingredients**: Stores ingredient information
- **Recipes**: Stores recipe details
- **RecipeIngredients**: Junction table linking recipes to ingredients
- **WeeklySchedules**: Stores weekly meal plans
- **ScheduleMeals**: Stores individual meal assignments

## Security Best Practices

1. **Use strong passwords** for your database admin account
2. **Restrict IP access** - only allow necessary IP addresses
3. **Use Azure AD authentication** for production (optional advanced setup)
4. **Enable SSL** (already enabled by default for Azure SQL)
5. **Regular backups** (Azure SQL has automatic backups)

## Cost Optimization

- **Use Serverless tier** for development - automatically pauses when not in use
- **Basic tier** is sufficient for small applications
- **Monitor usage** in Azure Portal to avoid unexpected costs
- **Set up budget alerts** in Azure

## Troubleshooting

### Connection Issues

1. **Check firewall rules** - ensure your IP is allowed
2. **Verify credentials** - double-check username and password
3. **Check server name** - must include .database.windows.net
4. **SSL requirement** - Azure SQL requires encrypted connections

### Common Error Messages

- **"Login failed"**: Check username/password
- **"Cannot open server"**: Check firewall rules
- **"Database does not exist"**: Verify database name
- **"Connection timeout"**: Check network connectivity
- **"getaddrinfo ENOTFOUND"**: Server name doesn't exist or is incorrect

### Fix "getaddrinfo ENOTFOUND" Error

This error means the server name cannot be found. Here's how to fix it:

#### Step 1: Verify Your Server Name

1. **Go to Azure Portal** → SQL databases → Your database
2. **Copy the exact server name** from the "Server name" field
3. **Or go to SQL servers** → Your server → Copy the "Server name"

The server name should look like: `your-unique-server-name.database.windows.net`

#### Step 2: Common Server Name Issues

- **Missing .database.windows.net suffix** - Always include this
- **Typos in server name** - Server names are case-sensitive
- **Server doesn't exist** - Create the server first
- **Wrong region** - Make sure you're looking in the correct Azure region

#### Step 3: Test Server Connectivity

```bash
# Test if you can reach the server (Windows)
nslookup your-server-name.database.windows.net

# Test if you can reach the server (Mac/Linux)
dig your-server-name.database.windows.net

# Test port connectivity (Windows)
telnet your-server-name.database.windows.net 1433

# Test port connectivity (Mac/Linux)
nc -zv your-server-name.database.windows.net 1433
```

#### Step 4: Update Your .env File

Make sure your `.env` file has the correct server name:

```env
# ❌ Wrong - server doesn't exist
AZURE_SQL_SERVER=badgers-shopping-list-server.database.windows.net

# ✅ Correct - use your actual server name
AZURE_SQL_SERVER=your-actual-server-name.database.windows.net
```

#### Step 5: Create Server if Missing

If the server doesn't exist, create it:

**Using Azure Portal:**
1. Go to **SQL servers** → **Create**
2. Choose a **globally unique name** (try adding random numbers)
3. Example: `recipe-planner-server-2025.database.windows.net`

**Using Azure CLI:**
```bash
# Try different server names until you find an available one
az sql server create \
  --name recipe-planner-server-2025 \
  --resource-group recipe-planner-rg \
  --location eastus \
  --admin-user recipeadmin \
  --admin-password "YourStrongPassword123!"
```

### Debug Mode

Add this to your `.env` for detailed SQL logging:

```env
DEBUG=true
SQL_DEBUG=true
```

## Offline Functionality

The app includes hybrid offline/online functionality:

- **When online**: Data syncs with Azure SQL Database
- **When offline**: Uses local storage
- **Automatic retry**: Attempts to reconnect and sync when back online

## Data Migration

If you have existing local data and want to migrate to Azure SQL:

1. **Export your local data** (the app will show a warning with instructions)
2. **Manually recreate** important recipes and schedules
3. **Or contact support** for migration assistance

## Support

For issues with this setup:

1. Check the **browser console** for error messages
2. Check the **server logs** in Azure Web App
3. Verify **database connectivity** using Azure Portal Query Editor
4. Review **firewall settings** in Azure SQL

## Next Steps

Once your database is set up:

1. **Test all functionality** - create ingredients, recipes, and schedules
2. **Deploy to production** using the Azure Web App deployment guide
3. **Set up monitoring** and alerts for your database
4. **Consider backup strategies** for important data
