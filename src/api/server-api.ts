import { Ingredient, Recipe, WeeklySchedule } from '../server/types';

const isDevelopment = process.env.NODE_ENV === 'development';
const API_BASE_URL = isDevelopment ? 'http://localhost:3002/api' : '/api';

const getHeaders = async (): Promise<HeadersInit> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  return headers;
};

// Helper function for making authenticated API calls
const apiCall = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const method = options.method?.toUpperCase() || 'GET';

  const authHeaders = await getHeaders();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...authHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorMessage = `API call failed: ${method} ${endpoint}`;

    try {
      const errorText = await response.text();
      errorMessage += ` - Status: ${response.status} ${response.statusText}`;
      if (errorText) {
        errorMessage += ` - Response: ${errorText}`;
      }
    } catch (textError) {
      errorMessage += ` - Status: ${response.status} ${response.statusText}`;
    }

    throw new Error(errorMessage);
  }

  const parseJson = method !== 'DELETE';
  return parseJson ? response.json() : undefined;
};

// Ingredient API functions
export const ingredientAPI = {
  getAll: (): Promise<Ingredient[]> => apiCall('/ingredients'),

  create: (name: string, unit: string): Promise<Ingredient> =>
    apiCall('/ingredients', {
      method: 'POST',
      body: JSON.stringify({ name, unit }),
    }),

  update: (id: string, name: string, unit: string): Promise<Ingredient> =>
    apiCall(`/ingredients/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, unit }),
    }),

  delete: (id: string): Promise<void> =>
    apiCall(`/ingredients/${id}`, {
      method: 'DELETE',
    }),
};

// Recipe API functions
export const recipeAPI = {
  getAll: (): Promise<Recipe[]> => apiCall('/recipes'),

  getById: (id: string): Promise<Recipe> => apiCall(`/recipes/${id}`),

  create: (recipe: Omit<Recipe, 'id'>): Promise<Recipe> =>
    apiCall('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    }),

  update: (id: string, recipe: Omit<Recipe, 'id'>): Promise<Recipe> =>
    apiCall(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipe),
    }),

  delete: (id: string): Promise<void> =>
    apiCall(`/recipes/${id}`, {
      method: 'DELETE',
    }),
};

// Weekly Schedule API functions
export const scheduleAPI = {
  getAll: (): Promise<WeeklySchedule[]> => apiCall('/schedules'),

  getCurrent: (): Promise<WeeklySchedule | null> => apiCall('/schedules/current'),

  create: (name: string, startDate: Date): Promise<WeeklySchedule> =>
    apiCall('/schedules', {
      method: 'POST',
      body: JSON.stringify({ name, startDate: startDate.toISOString() }),
    }),

  assignMeal: (scheduleId: string, day: string, mealType: string, recipeId: string): Promise<void> =>
    apiCall(`/schedules/${scheduleId}/meals`, {
      method: 'POST',
      body: JSON.stringify({ day, mealType, recipeId }),
    }),

  removeMeal: (scheduleId: string, day: string, mealType: string): Promise<void> =>
    apiCall(`/schedules/${scheduleId}/meals?day=${encodeURIComponent(day)}&mealType=${encodeURIComponent(mealType)}`, {
      method: 'DELETE',
    }),

  delete: (id: string): Promise<void> =>
    apiCall(`/schedules/${id}`, {
      method: 'DELETE',
    }),
};

// Health check function
export const healthCheck = (): Promise<any> => apiCall('/health');
