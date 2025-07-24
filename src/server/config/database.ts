import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const config: sql.config = {
  user: process.env.AZURE_SQL_USER || '',
  password: process.env.AZURE_SQL_PASSWORD || '',
  server: process.env.AZURE_SQL_SERVER || '',
  database: process.env.AZURE_SQL_DATABASE || '',
  options: {
    encrypt: true, // Required for Azure SQL
    trustServerCertificate: false,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  connectionTimeout: 30000,
  requestTimeout: 30000,
};

class DatabaseService {
  private static instance: DatabaseService;
  private pool: sql.ConnectionPool | null = null;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async connect(): Promise<void> {
    try {
      if (!this.pool) {
        // Validate configuration before attempting connection
        if (!config.server || !config.database || !config.user || !config.password) {
          throw new Error('Missing Azure SQL Database configuration. Please check your environment variables:\n' +
            'AZURE_SQL_SERVER, AZURE_SQL_DATABASE, AZURE_SQL_USER, AZURE_SQL_PASSWORD');
        }

        console.log(`Attempting to connect to Azure SQL Database: ${config.server}`);
        this.pool = new sql.ConnectionPool(config);
        await this.pool.connect();
        console.log('✅ Connected to Azure SQL Database successfully');
      }
    } catch (error: any) {
      const errorMessage = this.getDetailedErrorMessage(error);
      console.error('❌ Database connection failed:', errorMessage);
      throw new Error(errorMessage);
    }
  }

  private getDetailedErrorMessage(error: any): string {
    if (error.code === 'ENOTFOUND') {
      return `Server not found: "${config.server}"\n` +
        'This usually means:\n' +
        '1. The server name is incorrect\n' +
        '2. The server doesn\'t exist in Azure\n' +
        '3. Check your AZURE_SQL_SERVER environment variable\n' +
        'Go to Azure Portal → SQL databases → Your database → Copy the "Server name"';
    }
    
    if (error.code === 'ELOGIN') {
      return `Login failed for user "${config.user}"\n` +
        'This usually means:\n' +
        '1. Wrong username or password\n' +
        '2. Check your AZURE_SQL_USER and AZURE_SQL_PASSWORD environment variables';
    }
    
    if (error.code === 'ETIMEOUT') {
      return `Connection timeout to server "${config.server}"\n` +
        'This usually means:\n' +
        '1. Firewall is blocking the connection\n' +
        '2. Add your IP address to Azure SQL firewall rules\n' +
        '3. Ensure "Allow Azure services" is enabled';
    }

    return `${error.message}\nServer: ${config.server}\nDatabase: ${config.database}\nUser: ${config.user}`;
  }

  public async getPool(): Promise<sql.ConnectionPool> {
    if (!this.pool) {
      await this.connect();
    }
    return this.pool!;
  }

  public async disconnect(): Promise<void> {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
      console.log('Disconnected from Azure SQL Database');
    }
  }

  public async initializeTables(): Promise<void> {
    try {
      const pool = await this.getPool();

      // Create Ingredients table
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Ingredients' AND xtype='U')
        CREATE TABLE Ingredients (
          id NVARCHAR(50) PRIMARY KEY,
          name NVARCHAR(255) NOT NULL,
          unit NVARCHAR(100) NOT NULL,
          createdAt DATETIME2 DEFAULT GETDATE(),
          updatedAt DATETIME2 DEFAULT GETDATE()
        )
      `);

      // Create Recipes table
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Recipes' AND xtype='U')
        CREATE TABLE Recipes (
          id NVARCHAR(50) PRIMARY KEY,
          name NVARCHAR(255) NOT NULL,
          category NVARCHAR(100) NOT NULL,
          difficulty NVARCHAR(50) NOT NULL,
          servings INT NOT NULL,
          cookingTime INT,
          instructions NVARCHAR(MAX),
          createdAt DATETIME2 DEFAULT GETDATE(),
          updatedAt DATETIME2 DEFAULT GETDATE()
        )
      `);

      // Create RecipeIngredients table (junction table)
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='RecipeIngredients' AND xtype='U')
        CREATE TABLE RecipeIngredients (
          id NVARCHAR(50) PRIMARY KEY,
          recipeId NVARCHAR(50) NOT NULL,
          ingredientId NVARCHAR(50) NOT NULL,
          quantity DECIMAL(10,2) NOT NULL,
          FOREIGN KEY (recipeId) REFERENCES Recipes(id) ON DELETE CASCADE,
          FOREIGN KEY (ingredientId) REFERENCES Ingredients(id) ON DELETE CASCADE
        )
      `);

      // Create WeeklySchedules table
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='WeeklySchedules' AND xtype='U')
        CREATE TABLE WeeklySchedules (
          id NVARCHAR(50) PRIMARY KEY,
          name NVARCHAR(255) NOT NULL,
          startDate DATETIME2 NOT NULL,
          createdAt DATETIME2 DEFAULT GETDATE(),
          updatedAt DATETIME2 DEFAULT GETDATE()
        )
      `);

      // Create ScheduleMeals table
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ScheduleMeals' AND xtype='U')
        CREATE TABLE ScheduleMeals (
          id NVARCHAR(50) PRIMARY KEY,
          scheduleId NVARCHAR(50) NOT NULL,
          day NVARCHAR(20) NOT NULL,
          mealType NVARCHAR(50) NOT NULL,
          recipeId NVARCHAR(50) NOT NULL,
          FOREIGN KEY (scheduleId) REFERENCES WeeklySchedules(id) ON DELETE CASCADE,
          FOREIGN KEY (recipeId) REFERENCES Recipes(id)
        )
      `);

      // Create ShoppingListItems table
      await pool.request().query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ShoppingListItems' AND xtype='U')
        CREATE TABLE ShoppingListItems (
          id NVARCHAR(50) PRIMARY KEY,
          scheduleId NVARCHAR(50) NOT NULL,
          ingredientId NVARCHAR(50) NOT NULL,
          totalQuantity DECIMAL(10,2) NOT NULL,
          recipes NVARCHAR(MAX) NOT NULL, -- JSON array of recipe names
          isChecked BIT DEFAULT 0,
          createdAt DATETIME2 DEFAULT GETDATE(),
          updatedAt DATETIME2 DEFAULT GETDATE(),
          FOREIGN KEY (scheduleId) REFERENCES WeeklySchedules(id) ON DELETE CASCADE,
          FOREIGN KEY (ingredientId) REFERENCES Ingredients(id) ON DELETE CASCADE,
          UNIQUE(scheduleId, ingredientId) -- One entry per ingredient per schedule
        )
      `);

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database tables:', error);
      throw error;
    }
  }
}

export default DatabaseService;
