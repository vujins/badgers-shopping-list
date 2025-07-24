import sql from 'mssql';
import { v4 as uuidv4 } from 'uuid';
import { Recipe, RecipeIngredient } from '../../utils/types.js';
import DatabaseService from '../config/database.js';

export class RecipeDAO {
  private db = DatabaseService.getInstance();

  async getAll(): Promise<Recipe[]> {
    const pool = await this.db.getPool();

    // Get all recipes
    const recipesResult = await pool.request().query(`
      SELECT * FROM Recipes ORDER BY name
    `);

    // Get all recipe ingredients with ingredient details
    const ingredientsResult = await pool.request().query(`
      SELECT 
        ri.recipeId,
        ri.ingredientId,
        ri.quantity,
        i.name as ingredientName,
        i.unit as ingredientUnit
      FROM RecipeIngredients ri
      JOIN Ingredients i ON ri.ingredientId = i.id
    `);

    // Group ingredients by recipe
    const ingredientsByRecipe: { [key: string]: RecipeIngredient[] } = {};
    ingredientsResult.recordset.forEach(row => {
      if (!ingredientsByRecipe[row.recipeId]) {
        ingredientsByRecipe[row.recipeId] = [];
      }
      ingredientsByRecipe[row.recipeId].push({
        ingredient: {
          id: row.ingredientId,
          name: row.ingredientName,
          unit: row.ingredientUnit,
        },
        quantity: row.quantity,
      });
    });

    // Combine recipes with their ingredients
    return recipesResult.recordset.map(row => ({
      id: row.id,
      name: row.name,
      category: row.category,
      difficulty: row.difficulty,
      servings: row.servings,
      cookingTime: row.cookingTime,
      instructions: row.instructions,
      ingredients: ingredientsByRecipe[row.id] || [],
    }));
  }

  async getById(id: string): Promise<Recipe | null> {
    const pool = await this.db.getPool();

    // Get recipe
    const recipeResult = await pool
      .request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM Recipes WHERE id = @id');

    if (recipeResult.recordset.length === 0) return null;

    // Get recipe ingredients
    const ingredientsResult = await pool.request().input('recipeId', sql.NVarChar, id).query(`
        SELECT 
          ri.quantity,
          i.id as ingredientId,
          i.name as ingredientName,
          i.unit as ingredientUnit
        FROM RecipeIngredients ri
        JOIN Ingredients i ON ri.ingredientId = i.id
        WHERE ri.recipeId = @recipeId
      `);

    const row = recipeResult.recordset[0];
    const ingredients: RecipeIngredient[] = ingredientsResult.recordset.map(ingRow => ({
      ingredient: {
        id: ingRow.ingredientId,
        name: ingRow.ingredientName,
        unit: ingRow.ingredientUnit,
      },
      quantity: ingRow.quantity,
    }));

    return {
      id: row.id,
      name: row.name,
      category: row.category,
      difficulty: row.difficulty,
      servings: row.servings,
      cookingTime: row.cookingTime,
      instructions: row.instructions,
      ingredients,
    };
  }

  async create(recipe: Omit<Recipe, 'id'>): Promise<Recipe> {
    const id = uuidv4();
    const pool = await this.db.getPool();

    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      // Insert recipe
      await transaction
        .request()
        .input('id', sql.NVarChar, id)
        .input('name', sql.NVarChar, recipe.name)
        .input('category', sql.NVarChar, recipe.category)
        .input('difficulty', sql.NVarChar, recipe.difficulty)
        .input('servings', sql.Int, recipe.servings)
        .input('cookingTime', sql.Int, recipe.cookingTime || null)
        .input('instructions', sql.NVarChar, recipe.instructions || '').query(`
          INSERT INTO Recipes (id, name, category, difficulty, servings, cookingTime, instructions)
          VALUES (@id, @name, @category, @difficulty, @servings, @cookingTime, @instructions)
        `);

      // Insert recipe ingredients
      for (const recipeIngredient of recipe.ingredients) {
        await transaction
          .request()
          .input('id', sql.NVarChar, uuidv4())
          .input('recipeId', sql.NVarChar, id)
          .input('ingredientId', sql.NVarChar, recipeIngredient.ingredient.id)
          .input('quantity', sql.Decimal(10, 2), recipeIngredient.quantity).query(`
            INSERT INTO RecipeIngredients (id, recipeId, ingredientId, quantity)
            VALUES (@id, @recipeId, @ingredientId, @quantity)
          `);
      }

      await transaction.commit();

      return { id, ...recipe };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id: string, recipe: Omit<Recipe, 'id'>): Promise<Recipe | null> {
    const pool = await this.db.getPool();

    const transaction = new sql.Transaction(pool);

    try {
      await transaction.begin();

      // Update recipe
      const updateResult = await transaction
        .request()
        .input('id', sql.NVarChar, id)
        .input('name', sql.NVarChar, recipe.name)
        .input('category', sql.NVarChar, recipe.category)
        .input('difficulty', sql.NVarChar, recipe.difficulty)
        .input('servings', sql.Int, recipe.servings)
        .input('cookingTime', sql.Int, recipe.cookingTime || null)
        .input('instructions', sql.NVarChar, recipe.instructions || '').query(`
          UPDATE Recipes 
          SET name = @name, category = @category, difficulty = @difficulty, 
              servings = @servings, cookingTime = @cookingTime, 
              instructions = @instructions, updatedAt = GETDATE()
          WHERE id = @id
        `);

      if (updateResult.rowsAffected[0] === 0) {
        await transaction.rollback();
        return null;
      }

      // Delete existing recipe ingredients
      await transaction
        .request()
        .input('recipeId', sql.NVarChar, id)
        .query('DELETE FROM RecipeIngredients WHERE recipeId = @recipeId');

      // Insert updated recipe ingredients
      for (const recipeIngredient of recipe.ingredients) {
        await transaction
          .request()
          .input('id', sql.NVarChar, uuidv4())
          .input('recipeId', sql.NVarChar, id)
          .input('ingredientId', sql.NVarChar, recipeIngredient.ingredient.id)
          .input('quantity', sql.Decimal(10, 2), recipeIngredient.quantity).query(`
            INSERT INTO RecipeIngredients (id, recipeId, ingredientId, quantity)
            VALUES (@id, @recipeId, @ingredientId, @quantity)
          `);
      }

      await transaction.commit();

      return { id, ...recipe };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const pool = await this.db.getPool();

    const result = await pool.request().input('id', sql.NVarChar, id).query('DELETE FROM Recipes WHERE id = @id');

    return result.rowsAffected[0] > 0;
  }
}
