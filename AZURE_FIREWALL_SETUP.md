# Azure SQL Database Firewall Configuration

## Problem
Your Azure SQL Database exists and is reachable, but connections are being blocked by the firewall. This is the default security configuration for Azure SQL Database.

## Your Current IP Address
Your public IP address is: **109.93.214.223**

## Solution Steps

### Step 1: Access Azure Portal
1. Go to https://portal.azure.com
2. Sign in with your Microsoft account

### Step 2: Navigate to SQL Database
1. In the search bar at the top, type "SQL databases"
2. Click on "SQL databases" from the results
3. Click on your database: `badgers-shopping-list-database`

### Step 3: Configure Server Firewall
1. In the left sidebar menu, look for **"Firewalls and virtual networks"** or **"Set server firewall"**
2. Click on it to open the firewall settings

### Step 4: Add Your IP Address
1. Click **"Add client IP"** button - this should automatically add your current IP (109.93.214.223)
2. Alternatively, manually create a rule:
   - Rule name: `Local Development`
   - Start IP: `109.93.214.223`
   - End IP: `109.93.214.223`

### Step 5: Allow Azure Services (Important!)
1. Find the setting **"Allow Azure services and resources to access this server"**
2. Set it to **"Yes"** or **"On"**
3. This is required for many Azure features to work properly

### Step 6: Save Configuration
1. Click **"Save"** at the top of the page
2. Wait for the confirmation message

### Step 7: Test Connection
After saving the firewall rules, wait 1-2 minutes for the changes to propagate, then run:
```bash
npm run test:db
```

## Common Issues

### If you still can't connect:
1. **Check your IP hasn't changed**: Run `curl https://ipinfo.io/ip` again
2. **Corporate network**: Your company might have additional firewalls
3. **VPN**: If you're using a VPN, the IP might be different

### Alternative Solutions:
1. **Use Azure Cloud Shell**: Access the database from within Azure
2. **Azure SQL Database with Private Endpoint**: For more secure connections
3. **Temporary allow all IPs**: For testing only (0.0.0.0 to 255.255.255.255) - REMOVE THIS AFTER TESTING

## Next Steps
Once the firewall is configured and the test passes, your Recipe Planner app will work with Azure SQL Database!

The app has been designed to work offline as a fallback, so even during development, you'll have a seamless experience.
