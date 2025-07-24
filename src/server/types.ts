export interface Ingredient {
  id: string;
  name: string;
  unit: string; // e.g., 'cups', 'tbsp', 'grams', 'pieces'
}

export interface RecipeIngredient {
  ingredient: Ingredient;
  quantity: number;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  instructions?: string; // Added for detailed cooking instructions
  ingredients: RecipeIngredient[];
  servings: number;
  cookingTime?: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';
}

export interface MealSlot {
  id: string;
  day: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack 1' | 'Snack 2';
  recipe: Recipe | null;
}

export interface WeeklySchedule {
  id: string;
  name: string;
  startDate: Date;
  meals: MealSlot[];
}

export interface ShoppingListItem {
  ingredient: Ingredient;
  totalQuantity: number;
  recipes: string[]; // Recipe names that use this ingredient
}
