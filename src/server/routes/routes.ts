import dotenv from 'dotenv';
import express, { Router } from 'express';
import DatabaseService from '../config/database.js';
import { IngredientDAO } from '../dao/IngredientDAO.js';
import { RecipeDAO } from '../dao/RecipeDAO.js';
import { WeeklyScheduleDAO } from '../dao/WeeklyScheduleDAO.js';

dotenv.config();

console.log('server started');

const router: Router = express.Router();
const ingredientDAO = new IngredientDAO();
const recipeDAO = new RecipeDAO();
const scheduleDAO = new WeeklyScheduleDAO();

// Initialize database connection and tables
const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing Azure SQL Database connection...');
    const db = DatabaseService.getInstance();
    await db.connect();
    await db.initializeTables();
    console.log('✅ Database initialized successfully');
  } catch (error: any) {
    console.error('❌ Failed to initialize database:', error.message);
    console.log('📱 App will continue to work with local storage only');
    console.log('💡 To fix database connection, check AZURE_DATABASE_SETUP.md');
  }
};

// Call initialization
console.log('🚀 Starting Recipe Planner API server...');
initializeDatabase();

interface CommunityData {
  websites: string[];
}

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    authEnabled: process.env.IS_AUTH_ENABLED !== 'false',
    token: req.headers['x-ms-token-aad-access-token'],
    'x-ms-client-principal': req.headers['x-ms-client-principal'],
  });
});

// Ingredient routes
router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await ingredientDAO.getAll();
    res.json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
});

router.post('/ingredients', async (req, res) => {
  try {
    const { name, unit } = req.body;
    if (!name || !unit) {
      return res.status(400).json({ error: 'Name and unit are required' });
    }
    const ingredient = await ingredientDAO.create(name, unit);
    res.status(201).json(ingredient);
  } catch (error) {
    console.error('Error creating ingredient:', error);
    res.status(500).json({ error: 'Failed to create ingredient' });
  }
});

router.put('/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit } = req.body;
    if (!name || !unit) {
      return res.status(400).json({ error: 'Name and unit are required' });
    }
    const ingredient = await ingredientDAO.update(id, name, unit);
    if (!ingredient) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    res.json(ingredient);
  } catch (error) {
    console.error('Error updating ingredient:', error);
    res.status(500).json({ error: 'Failed to update ingredient' });
  }
});

router.delete('/ingredients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ingredientDAO.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ingredient not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ error: 'Failed to delete ingredient' });
  }
});

// Recipe routes
router.get('/recipes', async (req, res) => {
  try {
    const recipes = await recipeDAO.getAll();
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

router.get('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeDAO.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

router.post('/recipes', async (req, res) => {
  try {
    const recipe = await recipeDAO.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

router.put('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipeDAO.update(id, req.body);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

router.delete('/recipes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await recipeDAO.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

// Weekly schedule routes
router.get('/schedules', async (req, res) => {
  try {
    const schedules = await scheduleDAO.getAll();
    res.json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

router.get('/schedules/current', async (req, res) => {
  try {
    const schedule = await scheduleDAO.getCurrentSchedule();
    res.json(schedule);
  } catch (error) {
    console.error('Error fetching current schedule:', error);
    res.status(500).json({ error: 'Failed to fetch current schedule' });
  }
});

router.post('/schedules', async (req, res) => {
  try {
    const { name, startDate } = req.body;
    if (!name || !startDate) {
      return res.status(400).json({ error: 'Name and startDate are required' });
    }
    const schedule = await scheduleDAO.create(name, new Date(startDate));
    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

router.post('/schedules/:id/meals', async (req, res) => {
  try {
    const { id } = req.params;
    const { day, mealType, recipeId } = req.body;
    if (!day || !mealType || !recipeId) {
      return res.status(400).json({ error: 'Day, mealType, and recipeId are required' });
    }
    await scheduleDAO.assignMeal(id, day, mealType, recipeId);
    res.status(204).send();
  } catch (error) {
    console.error('Error assigning meal:', error);
    res.status(500).json({ error: 'Failed to assign meal' });
  }
});

router.delete('/schedules/:id/meals', async (req, res) => {
  try {
    const { id } = req.params;
    const { day, mealType } = req.query;
    if (!day || !mealType) {
      return res.status(400).json({ error: 'Day and mealType are required' });
    }
    await scheduleDAO.removeMeal(id, day as string, mealType as string);
    res.status(204).send();
  } catch (error) {
    console.error('Error removing meal:', error);
    res.status(500).json({ error: 'Failed to remove meal' });
  }
});

router.delete('/schedules/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await scheduleDAO.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Schedule not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

export default router;
