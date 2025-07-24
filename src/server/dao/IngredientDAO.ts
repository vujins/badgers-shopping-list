import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import DatabaseService from '../config/database.js';
import { Ingredient } from '../types.js';

export class IngredientDAO {
  private db = DatabaseService.getInstance();

  async getAll(): Promise<Ingredient[]> {
    const pool = await this.db.getPool();
    const result = await pool.request().query('SELECT * FROM Ingredients ORDER BY name');
    return result.recordset.map(row => ({
      id: row.id,
      name: row.name,
      unit: row.unit,
    }));
  }

  async getById(id: string): Promise<Ingredient | null> {
    const pool = await this.db.getPool();
    const result = await pool.request().input('id', sql.NVarChar, id).query('SELECT * FROM Ingredients WHERE id = @id');

    if (result.recordset.length === 0) return null;

    const row = result.recordset[0];
    return {
      id: row.id,
      name: row.name,
      unit: row.unit,
    };
  }

  async create(name: string, unit: string): Promise<Ingredient> {
    const id = uuidv4();
    const pool = await this.db.getPool();

    await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('name', sql.NVarChar, name)
      .input('unit', sql.NVarChar, unit)
      .query('INSERT INTO Ingredients (id, name, unit) VALUES (@id, @name, @unit)');

    return { id, name, unit };
  }

  async update(id: string, name: string, unit: string): Promise<Ingredient | null> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('name', sql.NVarChar, name)
      .input('unit', sql.NVarChar, unit).query(`
        UPDATE Ingredients 
        SET name = @name, unit = @unit, updatedAt = GETDATE() 
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) return null;

    return { id, name, unit };
  }

  async delete(id: string): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool.request().input('id', sql.NVarChar, id).query('DELETE FROM Ingredients WHERE id = @id');

    return result.rowsAffected[0] > 0;
  }
}
