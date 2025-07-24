import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import DatabaseService from '../config/database.js';
import { MealSlot, WeeklySchedule } from '../types.js';
import { RecipeDAO } from './RecipeDAO.js';

export class WeeklyScheduleDAO {
  private db = DatabaseService.getInstance();
  private recipeDAO = new RecipeDAO();

  async getAll(): Promise<WeeklySchedule[]> {
    const pool = await this.db.getPool();

    // Get all schedules
    const schedulesResult = await pool.request().query(`
      SELECT * FROM WeeklySchedules ORDER BY startDate DESC
    `);

    // Get all schedule meals
    const mealsResult = await pool.request().query(`
      SELECT 
        sm.scheduleId,
        sm.day,
        sm.mealType,
        sm.recipeId,
        r.name as recipeName,
        r.category as recipeCategory,
        r.difficulty as recipeDifficulty,
        r.servings as recipeServings,
        r.cookingTime as recipeCookingTime,
        r.instructions as recipeInstructions
      FROM ScheduleMeals sm
      JOIN Recipes r ON sm.recipeId = r.id
    `);

    // Group meals by schedule
    const mealsBySchedule: { [key: string]: MealSlot[] } = {};
    mealsResult.recordset.forEach(row => {
      if (!mealsBySchedule[row.scheduleId]) {
        mealsBySchedule[row.scheduleId] = [];
      }

      mealsBySchedule[row.scheduleId].push({
        id: uuidv4(), // Generate temp ID for meal slot
        day: row.day,
        mealType: row.mealType,
        recipe: {
          id: row.recipeId,
          name: row.recipeName,
          category: row.recipeCategory,
          difficulty: row.recipeDifficulty,
          servings: row.recipeServings,
          cookingTime: row.recipeCookingTime,
          instructions: row.recipeInstructions,
          ingredients: [], // Not loading ingredients for schedule view for performance
        },
      });
    });

    // Combine schedules with their meals
    return schedulesResult.recordset.map(row => ({
      id: row.id,
      name: row.name,
      startDate: row.startDate,
      meals: mealsBySchedule[row.id] || [],
    }));
  }

  async getById(id: string): Promise<WeeklySchedule | null> {
    const pool = await this.db.getPool();

    // Get schedule
    const scheduleResult = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM WeeklySchedules WHERE id = @id');

    if (scheduleResult.recordset.length === 0) return null;

    // Get schedule meals with full recipe data
    const mealsResult = await pool.request().input('scheduleId', sql.NVarChar, id).query(`
        SELECT 
          sm.day,
          sm.mealType,
          sm.recipeId
        FROM ScheduleMeals sm
        WHERE sm.scheduleId = @scheduleId
      `);

    const meals: MealSlot[] = [];
    for (const mealRow of mealsResult.recordset) {
      const recipe = await this.recipeDAO.getById(mealRow.recipeId);
      if (recipe) {
        meals.push({
          id: uuidv4(),
          day: mealRow.day,
          mealType: mealRow.mealType,
          recipe,
        });
      }
    }

    const row = scheduleResult.recordset[0];
    return {
      id: row.id,
      name: row.name,
      startDate: row.startDate,
      meals,
    };
  }

  async create(name: string, startDate: Date): Promise<WeeklySchedule> {
    const id = uuidv4();
    const pool = await this.db.getPool();

    await pool
      .request()
      .input('id', sql.NVarChar, id)
      .input('name', sql.NVarChar, name)
      .input('startDate', sql.DateTime2, startDate).query(`
        INSERT INTO WeeklySchedules (id, name, startDate)
        VALUES (@id, @name, @startDate)
      `);

    return { id, name, startDate, meals: [] };
  }

  async assignMeal(scheduleId: string, day: string, mealType: string, recipeId: string): Promise<boolean> {
    const pool = await this.db.getPool();

    // Remove existing meal for this slot if any
    await pool
      .request()
      .input('scheduleId', sql.NVarChar, scheduleId)
      .input('day', sql.NVarChar, day)
      .input('mealType', sql.NVarChar, mealType).query(`
        DELETE FROM ScheduleMeals 
        WHERE scheduleId = @scheduleId AND day = @day AND mealType = @mealType
      `);

    // Insert new meal assignment
    await pool
      .request()
      .input('id', sql.NVarChar, uuidv4())
      .input('scheduleId', sql.NVarChar, scheduleId)
      .input('day', sql.NVarChar, day)
      .input('mealType', sql.NVarChar, mealType)
      .input('recipeId', sql.NVarChar, recipeId).query(`
        INSERT INTO ScheduleMeals (id, scheduleId, day, mealType, recipeId)
        VALUES (@id, @scheduleId, @day, @mealType, @recipeId)
      `);

    return true;
  }

  async removeMeal(scheduleId: string, day: string, mealType: string): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('scheduleId', sql.NVarChar, scheduleId)
      .input('day', sql.NVarChar, day)
      .input('mealType', sql.NVarChar, mealType).query(`
        DELETE FROM ScheduleMeals 
        WHERE scheduleId = @scheduleId AND day = @day AND mealType = @mealType
      `);

    return result.rowsAffected[0] > 0;
  }

  async delete(id: string): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query('DELETE FROM WeeklySchedules WHERE id = @id');

    return result.rowsAffected[0] > 0;
  }

  async getCurrentSchedule(): Promise<WeeklySchedule | null> {
    const pool = await this.db.getPool();

    // Get the most recent schedule
    const scheduleResult = await pool.request().query(`
      SELECT TOP 1 * FROM WeeklySchedules ORDER BY startDate DESC
    `);

    if (scheduleResult.recordset.length === 0) return null;

    const schedule = scheduleResult.recordset[0];

    // Get schedule meals with full recipe data (including ingredients)
    const mealsResult = await pool
      .request()
      .input('scheduleId', sql.NVarChar, schedule.id)
      .query(`
        SELECT 
          sm.day,
          sm.mealType,
          sm.recipeId
        FROM ScheduleMeals sm
        WHERE sm.scheduleId = @scheduleId
      `);

    const meals: MealSlot[] = [];
    for (const mealRow of mealsResult.recordset) {
      const recipe = await this.recipeDAO.getById(mealRow.recipeId);
      if (recipe) {
        meals.push({
          id: uuidv4(),
          day: mealRow.day,
          mealType: mealRow.mealType,
          recipe,
        });
      }
    }

    return {
      id: schedule.id,
      name: schedule.name,
      startDate: schedule.startDate,
      meals,
    };
  }
}
