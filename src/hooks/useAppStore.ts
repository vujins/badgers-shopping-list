import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Ingredient, MealSlot, Recipe, ShoppingListItem, WeeklySchedule } from '../server/types';

interface AppStore {
  // Ingredients
  ingredients: Ingredient[];
  addIngredient: (name: string, unit: string) => void;
  updateIngredient: (id: string, name: string, unit: string) => void;
  removeIngredient: (id: string) => void;

  // Recipes
  recipes: Recipe[];
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  updateRecipe: (id: string, recipe: Partial<Recipe>) => void;
  removeRecipe: (id: string) => void;

  // Weekly Schedule
  currentSchedule: WeeklySchedule | null;
  createWeeklySchedule: (name: string, startDate: Date) => void;
  assignMealToSlot: (dayIndex: number, mealType: string, recipe: Recipe) => void;
  removeMealFromSlot: (dayIndex: number, mealType: string) => void;

  // Shopping List
  generateShoppingList: () => ShoppingListItem[];
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Snack 1', 'Lunch', 'Dinner', 'Snack 2'];

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ingredients: [],
      recipes: [],
      currentSchedule: null,

      addIngredient: (name: string, unit: string) => {
        const newIngredient: Ingredient = {
          id: uuidv4(),
          name: name.trim(),
          unit: unit.trim(),
        };
        set(state => ({
          ingredients: [...state.ingredients, newIngredient],
        }));
      },

      updateIngredient: (id: string, name: string, unit: string) => {
        set(state => ({
          ingredients: state.ingredients.map(ingredient =>
            ingredient.id === id ? { ...ingredient, name: name.trim(), unit: unit.trim() } : ingredient
          ),
        }));
      },

      removeIngredient: (id: string) => {
        set(state => ({
          ingredients: state.ingredients.filter(ingredient => ingredient.id !== id),
        }));
      },

      addRecipe: (recipe: Omit<Recipe, 'id'>) => {
        const newRecipe: Recipe = {
          ...recipe,
          id: uuidv4(),
        };
        set(state => ({
          recipes: [...state.recipes, newRecipe],
        }));
      },

      updateRecipe: (id: string, updates: Partial<Recipe>) => {
        set(state => ({
          recipes: state.recipes.map(recipe => (recipe.id === id ? { ...recipe, ...updates } : recipe)),
        }));
      },

      removeRecipe: (id: string) => {
        set(state => ({
          recipes: state.recipes.filter(recipe => recipe.id !== id),
        }));
      },

      createWeeklySchedule: (name: string, startDate: Date) => {
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
      },

      assignMealToSlot: (dayIndex: number, mealType: string, recipe: Recipe) => {
        const state = get();
        if (!state.currentSchedule) return;

        const day = daysOfWeek[dayIndex];
        const updatedMeals = state.currentSchedule.meals.map(meal => {
          if (meal.day === day && meal.mealType === mealType) {
            return { ...meal, recipe };
          }
          return meal;
        });

        set({
          currentSchedule: {
            ...state.currentSchedule,
            meals: updatedMeals,
          },
        });
      },

      removeMealFromSlot: (dayIndex: number, mealType: string) => {
        const state = get();
        if (!state.currentSchedule) return;

        const day = daysOfWeek[dayIndex];
        const updatedMeals = state.currentSchedule.meals.map(meal => {
          if (meal.day === day && meal.mealType === mealType) {
            return { ...meal, recipe: null };
          }
          return meal;
        });

        set({
          currentSchedule: {
            ...state.currentSchedule,
            meals: updatedMeals,
          },
        });
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
