import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ingredientAPI, recipeAPI, scheduleAPI } from '../api/server-api';
import { Ingredient, MealSlot, Recipe, ShoppingListItem, WeeklySchedule } from '../server/types';

interface AppStore {
  // Data loading states
  isLoading: boolean;
  error: string | null;
  isOnline: boolean;

  // Ingredients
  ingredients: Ingredient[];
  loadIngredients: () => Promise<void>;
  addIngredient: (name: string, unit: string) => Promise<void>;
  updateIngredient: (id: string, name: string, unit: string) => Promise<void>;
  removeIngredient: (id: string) => Promise<void>;

  // Recipes
  recipes: Recipe[];
  loadRecipes: () => Promise<void>;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => Promise<void>;
  removeRecipe: (id: string) => Promise<void>;

  // Weekly Schedule
  currentSchedule: WeeklySchedule | null;
  loadCurrentSchedule: () => Promise<void>;
  createWeeklySchedule: (name: string, startDate: Date) => Promise<void>;
  assignMealToSlot: (dayIndex: number, mealType: string, recipe: Recipe) => Promise<void>;
  removeMealFromSlot: (dayIndex: number, mealType: string) => Promise<void>;

  // Shopping List
  generateShoppingList: () => ShoppingListItem[];

  // Utility functions
  setError: (error: string | null) => void;
  clearError: () => void;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Snack 1', 'Lunch', 'Dinner', 'Snack 2'];

// Helper function to check if we're online and can connect to the API
const checkOnlineStatus = async (): Promise<boolean> => {
  // In test environment or if fetch is not available, return false
  if (process.env.NODE_ENV === 'test' || typeof fetch === 'undefined') {
    return false;
  }

  try {
    const response = await fetch('/api/health', {
      method: 'GET',
      timeout: 5000,
    } as any);
    return response.ok;
  } catch {
    return false;
  }
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      error: null,
      isOnline: false,
      ingredients: [],
      recipes: [],
      currentSchedule: null,

      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),

      // Load data from backend on app start
      loadIngredients: async () => {
        try {
          set({ isLoading: true, error: null });
          const isOnline = await checkOnlineStatus();
          set({ isOnline });

          if (isOnline) {
            const ingredients = await ingredientAPI.getAll();
            set({ ingredients: ingredients || [] });
          }
        } catch (error) {
          console.error('Failed to load ingredients:', error);
          set({ error: 'Failed to load ingredients from server. Using local data.' });
          // Ensure ingredients is always an array
          const { ingredients } = get();
          if (!Array.isArray(ingredients)) {
            set({ ingredients: [] });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      loadRecipes: async () => {
        try {
          set({ isLoading: true, error: null });
          const isOnline = await checkOnlineStatus();
          set({ isOnline });

          if (isOnline) {
            const recipes = await recipeAPI.getAll();
            set({ recipes: recipes || [] });
          }
        } catch (error) {
          console.error('Failed to load recipes:', error);
          set({ error: 'Failed to load recipes from server. Using local data.' });
          // Ensure recipes is always an array
          const { recipes } = get();
          if (!Array.isArray(recipes)) {
            set({ recipes: [] });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      loadCurrentSchedule: async () => {
        try {
          set({ isLoading: true, error: null });
          const isOnline = await checkOnlineStatus();
          set({ isOnline });

          if (isOnline) {
            const schedule = await scheduleAPI.getCurrent();
            set({ currentSchedule: schedule });
          }
        } catch (error) {
          console.error('Failed to load current schedule:', error);
          set({ error: 'Failed to load schedule from server. Using local data.' });
        } finally {
          set({ isLoading: false });
        }
      },

      addIngredient: async (name: string, unit: string) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Create on server
            const newIngredient = await ingredientAPI.create(name, unit);
            set(state => ({
              ingredients: [...state.ingredients, newIngredient],
            }));
          } else {
            // Create locally
            const newIngredient: Ingredient = {
              id: uuidv4(),
              name: name.trim(),
              unit: unit.trim(),
            };
            set(state => ({
              ingredients: [...state.ingredients, newIngredient],
            }));
          }
        } catch (error) {
          console.error('Failed to add ingredient:', error);
          set({ error: 'Failed to add ingredient' });
        }
      },

      updateIngredient: async (id: string, name: string, unit: string) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Update on server
            await ingredientAPI.update(id, name, unit);
          }

          // Update locally (optimistic update)
          set(state => ({
            ingredients: state.ingredients.map(ingredient =>
              ingredient.id === id ? { ...ingredient, name: name.trim(), unit: unit.trim() } : ingredient
            ),
          }));
        } catch (error) {
          console.error('Failed to update ingredient:', error);
          set({ error: 'Failed to update ingredient' });
        }
      },

      removeIngredient: async (id: string) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Delete on server
            await ingredientAPI.delete(id);
          }

          // Delete locally (optimistic update)
          set(state => ({
            ingredients: state.ingredients.filter(ingredient => ingredient.id !== id),
          }));
        } catch (error) {
          console.error('Failed to remove ingredient:', error);
          set({ error: 'Failed to remove ingredient' });
        }
      },

      addRecipe: async (recipe: Omit<Recipe, 'id'>) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Create on server
            const newRecipe = await recipeAPI.create(recipe);
            set(state => ({
              recipes: [...state.recipes, newRecipe],
            }));
          } else {
            // Create locally
            const newRecipe: Recipe = {
              ...recipe,
              id: uuidv4(),
            };
            set(state => ({
              recipes: [...state.recipes, newRecipe],
            }));
          }
        } catch (error) {
          console.error('Failed to add recipe:', error);
          set({ error: 'Failed to add recipe' });
        }
      },

      updateRecipe: async (id: string, updates: Partial<Recipe>) => {
        try {
          set({ error: null });
          const { isOnline, recipes } = get();

          const existingRecipe = recipes.find(r => r.id === id);
          if (!existingRecipe) {
            throw new Error('Recipe not found');
          }

          const updatedRecipe = { ...existingRecipe, ...updates };

          if (isOnline) {
            // Update on server
            await recipeAPI.update(id, updatedRecipe);
          }

          // Update locally (optimistic update)
          set(state => ({
            recipes: state.recipes.map(recipe => (recipe.id === id ? updatedRecipe : recipe)),
          }));
        } catch (error) {
          console.error('Failed to update recipe:', error);
          set({ error: 'Failed to update recipe' });
        }
      },

      removeRecipe: async (id: string) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Delete on server
            await recipeAPI.delete(id);
          }

          // Delete locally (optimistic update)
          set(state => ({
            recipes: state.recipes.filter(recipe => recipe.id !== id),
          }));
        } catch (error) {
          console.error('Failed to remove recipe:', error);
          set({ error: 'Failed to remove recipe' });
        }
      },

      createWeeklySchedule: async (name: string, startDate: Date) => {
        try {
          set({ error: null });
          const { isOnline } = get();

          if (isOnline) {
            // Create on server
            const newSchedule = await scheduleAPI.create(name, startDate);
            set({ currentSchedule: newSchedule });
          } else {
            // Create locally
            const meals: MealSlot[] = [];
            daysOfWeek.forEach(day => {
              mealTypes.forEach(mealType => {
                meals.push({
                  id: uuidv4(),
                  day,
                  mealType: mealType as any,
                  recipe: null,
                });
              });
            });

            const newSchedule: WeeklySchedule = {
              id: uuidv4(),
              name,
              startDate,
              meals,
            };

            set({ currentSchedule: newSchedule });
          }
        } catch (error) {
          console.error('Failed to create weekly schedule:', error);
          set({ error: 'Failed to create weekly schedule' });
        }
      },

      assignMealToSlot: async (dayIndex: number, mealType: string, recipe: Recipe) => {
        try {
          set({ error: null });
          const { isOnline, currentSchedule } = get();
          if (!currentSchedule) return;

          const day = daysOfWeek[dayIndex];

          if (isOnline) {
            // Update on server
            await scheduleAPI.assignMeal(currentSchedule.id, day, mealType, recipe.id);
          }

          // Update locally (optimistic update)
          const updatedMeals = currentSchedule.meals.map(meal => {
            if (meal.day === day && meal.mealType === mealType) {
              return { ...meal, recipe };
            }
            return meal;
          });

          set({
            currentSchedule: {
              ...currentSchedule,
              meals: updatedMeals,
            },
          });
        } catch (error) {
          console.error('Failed to assign meal:', error);
          set({ error: 'Failed to assign meal' });
        }
      },

      removeMealFromSlot: async (dayIndex: number, mealType: string) => {
        try {
          set({ error: null });
          const { isOnline, currentSchedule } = get();
          if (!currentSchedule) return;

          const day = daysOfWeek[dayIndex];

          if (isOnline) {
            // Update on server
            await scheduleAPI.removeMeal(currentSchedule.id, day, mealType);
          }

          // Update locally (optimistic update)
          const updatedMeals = currentSchedule.meals.map(meal => {
            if (meal.day === day && meal.mealType === mealType) {
              return { ...meal, recipe: null };
            }
            return meal;
          });

          set({
            currentSchedule: {
              ...currentSchedule,
              meals: updatedMeals,
            },
          });
        } catch (error) {
          console.error('Failed to remove meal:', error);
          set({ error: 'Failed to remove meal' });
        }
      },

      generateShoppingList: (): ShoppingListItem[] => {
        const state = get();
        if (!state.currentSchedule) return [];

        const ingredientMap = new Map<
          string,
          {
            ingredient: Ingredient;
            totalQuantity: number;
            recipes: string[];
          }
        >();

        state.currentSchedule.meals.forEach(meal => {
          if (meal.recipe) {
            const recipe = meal.recipe;
            recipe.ingredients.forEach(recipeIngredient => {
              const ingredientId = recipeIngredient.ingredient.id;
              const existing = ingredientMap.get(ingredientId);

              if (existing) {
                existing.totalQuantity += recipeIngredient.quantity;
                if (!existing.recipes.includes(recipe.name)) {
                  existing.recipes.push(recipe.name);
                }
              } else {
                ingredientMap.set(ingredientId, {
                  ingredient: recipeIngredient.ingredient,
                  totalQuantity: recipeIngredient.quantity,
                  recipes: [recipe.name],
                });
              }
            });
          }
        });

        return Array.from(ingredientMap.values());
      },
    }),
    {
      name: 'recipe-app-storage',
    }
  )
);
