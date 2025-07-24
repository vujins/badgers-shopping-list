#!/usr/bin/env node

/**
 * Azure SQL Database Connection Test Script
 * 
 * This script helps test your Azure SQL Database connection
 * Run with: node scripts/test-database-connection.js
 */

const sql = require('mssql');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  user: process.env.AZURE_SQL_USER,
  password: process.env.AZURE_SQL_PASSWORD,
  server: process.env.AZURE_SQL_SERVER,
  database: process.env.AZURE_SQL_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

async function testConnection() {
  console.log('🧪 Testing Azure SQL Database Connection...\n');
  
  // Check environment variables
  console.log('📋 Configuration Check:');
  console.log(`   Server: ${config.server || '❌ MISSING'}`);
  console.log(`   Database: ${config.database || '❌ MISSING'}`);
  console.log(`   User: ${config.user || '❌ MISSING'}`);
  console.log(`   Password: ${config.password ? '✅ SET' : '❌ MISSING'}\n`);
  
  if (!config.server || !config.database || !config.user || !config.password) {
    console.log('❌ Missing required environment variables in .env file:');
    console.log('   AZURE_SQL_SERVER');
    console.log('   AZURE_SQL_DATABASE');
    console.log('   AZURE_SQL_USER');
    console.log('   AZURE_SQL_PASSWORD\n');
    console.log('💡 Copy .env.example to .env and fill in your Azure SQL details');
    process.exit(1);
  }
  
  let pool;
  
  try {
    console.log('🔄 Attempting to connect to Azure SQL Database...');
    console.log(`   Connecting to: ${config.server}`);
    
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    
    console.log('✅ Connection successful!');
    
    // Test a simple query
    console.log('🔄 Testing database query...');
    const result = await pool.request().query('SELECT @@VERSION as version');
    console.log('✅ Query successful!');
    console.log(`   SQL Server Version: ${result.recordset[0].version.split('\n')[0]}`);
    
    // Test table creation (this will be done automatically by the app)
    console.log('🔄 Testing table creation permissions...');
    try {
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ConnectionTest' AND xtype='U')
        CREATE TABLE ConnectionTest (id INT PRIMARY KEY, test_date DATETIME2)
      `);
      await pool.request().query('DROP TABLE ConnectionTest');
      console.log('✅ Table creation permissions verified!');
    } catch (tableError) {
      console.log('⚠️  Warning: Limited database permissions');
      console.log('   The app may not be able to create tables automatically');
      console.log(`   Error: ${tableError.message}`);
    }
    
    console.log('\n🎉 Database connection test completed successfully!');
    console.log('   Your Recipe Planner app should work with Azure SQL Database');
    
  } catch (error) {
    console.log('\n❌ Database connection failed:');
    
    if (error.code === 'ENOTFOUND') {
      console.log('   🔍 Server not found - this usually means:');
      console.log('      1. The server name is incorrect');
      console.log('      2. The server doesn\'t exist in Azure');
      console.log('      3. Typo in AZURE_SQL_SERVER environment variable');
      console.log('\n   💡 Fix:');
      console.log('      1. Go to Azure Portal → SQL databases → Your database');
      console.log('      2. Copy the exact "Server name" (ends with .database.windows.net)');
      console.log('      3. Update your .env file with the correct server name');
    } else if (error.code === 'ELOGIN') {
      console.log('   🔐 Login failed - this usually means:');
      console.log('      1. Wrong username or password');
      console.log('      2. Incorrect AZURE_SQL_USER or AZURE_SQL_PASSWORD');
      console.log('\n   💡 Fix:');
      console.log('      1. Double-check your username and password');
      console.log('      2. Try logging in through Azure Portal Query Editor');
    } else if (error.code === 'ETIMEOUT') {
      console.log('   ⏰ Connection timeout - this usually means:');
      console.log('      1. Firewall is blocking the connection');
      console.log('      2. Your IP address is not allowed');
      console.log('\n   💡 Fix:');
      console.log('      1. Go to Azure Portal → SQL servers → Your server → Networking');
      console.log('      2. Add your current IP address to firewall rules');
      console.log('      3. Ensure "Allow Azure services" is enabled');
    } else {
      console.log(`   Error: ${error.message}`);
    }
    
    console.log('\n📖 For detailed troubleshooting, see AZURE_DATABASE_SETUP.md');
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Run the test
testConnection();
