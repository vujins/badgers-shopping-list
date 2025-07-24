import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import DatabaseService from '../config/database.js';
import { ShoppingListItem, Ingredient } from '../types.js';

export class ShoppingListDAO {
  private db = DatabaseService.getInstance();

  async getByScheduleId(scheduleId: string): Promise<ShoppingListItem[]> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('scheduleId', sql.NVarChar, scheduleId)
      .query(`
        SELECT 
          sli.id,
          sli.scheduleId,
          sli.totalQuantity,
          sli.recipes,
          sli.isChecked,
          i.id as ingredientId,
          i.name as ingredientName,
          i.unit as ingredientUnit
        FROM ShoppingListItems sli
        JOIN Ingredients i ON sli.ingredientId = i.id
        WHERE sli.scheduleId = @scheduleId
        ORDER BY sli.isChecked ASC, i.name ASC
      `);

    return result.recordset.map(row => ({
      id: row.id,
      scheduleId: row.scheduleId,
      ingredient: {
        id: row.ingredientId,
        name: row.ingredientName,
        unit: row.ingredientUnit,
      },
      totalQuantity: row.totalQuantity,
      recipes: JSON.parse(row.recipes),
      isChecked: row.isChecked,
    }));
  }

  async upsertItem(item: Omit<ShoppingListItem, 'id'>): Promise<ShoppingListItem> {
    const pool = await this.db.getPool();
    const id = uuidv4();

    // Try to update existing item first
    const updateResult = await pool
      .request()
      .input('scheduleId', sql.NVarChar, item.scheduleId)
      .input('ingredientId', sql.NVarChar, item.ingredient.id)
      .input('totalQuantity', sql.Decimal(10, 2), item.totalQuantity)
      .input('recipes', sql.NVarChar, JSON.stringify(item.recipes))
      .query(`
        UPDATE ShoppingListItems 
        SET totalQuantity = @totalQuantity,
            recipes = @recipes,
            updatedAt = GETDATE()
        WHERE scheduleId = @scheduleId AND ingredientId = @ingredientId
      `);

    if (updateResult.rowsAffected[0] === 0) {
      // Insert new item if it doesn't exist
      await pool
        .request()
        .input('id', sql.NVarChar, id)
        .input('scheduleId', sql.NVarChar, item.scheduleId)
        .input('ingredientId', sql.NVarChar, item.ingredient.id)
        .input('totalQuantity', sql.Decimal(10, 2), item.totalQuantity)
        .input('recipes', sql.NVarChar, JSON.stringify(item.recipes))
        .input('isChecked', sql.Bit, item.isChecked)
        .query(`
          INSERT INTO ShoppingListItems (id, scheduleId, ingredientId, totalQuantity, recipes, isChecked)
          VALUES (@id, @scheduleId, @ingredientId, @totalQuantity, @recipes, @isChecked)
        `);
    }

    return {
      id,
      ...item,
    };
  }

  async updateCheckedStatus(id: string, isChecked: boolean): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('isChecked', sql.Bit, isChecked)
      .query(`
        UPDATE ShoppingListItems 
        SET isChecked = @isChecked,
            updatedAt = GETDATE()
        WHERE id = @id
      `);

    return result.rowsAffected[0] > 0;
  }

  async deleteByScheduleId(scheduleId: string): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('scheduleId', sql.NVarChar, scheduleId)
      .query('DELETE FROM ShoppingListItems WHERE scheduleId = @scheduleId');

    return result.rowsAffected[0] > 0;
  }

  async regenerateForSchedule(scheduleId: string, items: Omit<ShoppingListItem, 'id'>[]): Promise<ShoppingListItem[]> {
    const pool = await this.db.getPool();

    // Start transaction
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // Get existing checked items to preserve their status
      const existingResult = await transaction
        .request()
        .input('scheduleId', sql.NVarChar, scheduleId)
        .query(`
          SELECT ingredientId, isChecked 
          FROM ShoppingListItems 
          WHERE scheduleId = @scheduleId AND isChecked = 1
        `);

      const checkedItems = new Set(existingResult.recordset.map(row => row.ingredientId));

      // Delete all existing items for this schedule
      await transaction
        .request()
        .input('scheduleId', sql.NVarChar, scheduleId)
        .query('DELETE FROM ShoppingListItems WHERE scheduleId = @scheduleId');

      // Insert new items, preserving checked status for existing ingredients
      const savedItems: ShoppingListItem[] = [];
      for (const item of items) {
        const id = uuidv4();
        const isChecked = checkedItems.has(item.ingredient.id);

        await transaction
          .request()
          .input('id', sql.NVarChar, id)
          .input('scheduleId', sql.NVarChar, item.scheduleId)
          .input('ingredientId', sql.NVarChar, item.ingredient.id)
          .input('totalQuantity', sql.Decimal(10, 2), item.totalQuantity)
          .input('recipes', sql.NVarChar, JSON.stringify(item.recipes))
          .input('isChecked', sql.Bit, isChecked)
          .query(`
            INSERT INTO ShoppingListItems (id, scheduleId, ingredientId, totalQuantity, recipes, isChecked)
            VALUES (@id, @scheduleId, @ingredientId, @totalQuantity, @recipes, @isChecked)
          `);

        savedItems.push({
          id,
          ...item,
          isChecked,
        });
      }

      await transaction.commit();
      return savedItems;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
