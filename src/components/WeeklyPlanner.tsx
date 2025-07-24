import { useState } from 'react';
import { useAppStore } from '../hooks';
import { Recipe } from '../utils/types';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack 1', 'Snack 2'];

export function WeeklyPlanner() {
  const { currentSchedule, recipes, createWeeklySchedule, assignMealToSlot, removeMealFromSlot } = useAppStore();

  const [scheduleName, setScheduleName] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ day: number; meal: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (scheduleName.trim()) {
      createWeeklySchedule(scheduleName, new Date());
      setScheduleName('');
    }
  };

  const handleAssignMeal = () => {
    if (selectedSlot && selectedRecipe) {
      assignMealToSlot(selectedSlot.day, selectedSlot.meal, selectedRecipe);
      setSelectedSlot(null);
      setSelectedRecipe(null);
      setSearchTerm('');
    }
  };

  const filteredRecipes = recipes.filter(
    recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMealForSlot = (dayIndex: number, mealType: string) => {
    if (!currentSchedule) return null;
    const day = daysOfWeek[dayIndex];
    return currentSchedule.meals.find(meal => meal.day === day && meal.mealType === mealType);
  };

  if (!currentSchedule) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Meal Planner</h2>

        <form onSubmit={handleCreateSchedule} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Name</label>
            <input
              type="text"
              placeholder="e.g., Week of January 15th"
              value={scheduleName}
              onChange={e => setScheduleName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Weekly Schedule
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{currentSchedule.name}</h2>
          <p className="text-sm text-gray-600">
            Week starting {new Date(currentSchedule.startDate).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => createWeeklySchedule('New Schedule', new Date())}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          New Schedule
        </button>
      </div>

      {/* Recipe Selection Modal */}
      {selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[80vh] flex flex-col">
            <h3 className="text-lg font-semibold mb-4">
              Select Recipe for {daysOfWeek[selectedSlot.day]} - {selectedSlot.meal}
            </h3>

            {/* Search Field */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search recipes by name, category, or difficulty..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Recipe List */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {filteredRecipes.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  {recipes.length === 0
                    ? 'No recipes available. Create some recipes first!'
                    : 'No recipes match your search.'}
                </p>
              ) : (
                filteredRecipes.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`w-full text-left p-3 rounded-md border transition-colors ${
                      selectedRecipe?.id === recipe.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">{recipe.name}</div>
                    <div className="text-sm text-gray-600">
                      {recipe.category} • {recipe.difficulty} • {recipe.servings} servings
                      {recipe.cookingTime && ` • ${recipe.cookingTime} min`}
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAssignMeal}
                disabled={!selectedRecipe}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Assign Recipe
              </button>
              <button
                onClick={() => {
                  setSelectedSlot(null);
                  setSelectedRecipe(null);
                  setSearchTerm('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weekly Grid */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-gray-50 text-left font-medium text-gray-700">Meal</th>
              {daysOfWeek.map(day => (
                <th
                  key={day}
                  className="border border-gray-300 p-2 bg-gray-50 text-center font-medium text-gray-700 min-w-32"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mealTypes.map(mealType => (
              <tr key={mealType}>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium text-gray-700">{mealType}</td>
                {daysOfWeek.map((_, dayIndex) => {
                  const meal = getMealForSlot(dayIndex, mealType);
                  return (
                    <td key={dayIndex} className="border border-gray-300 p-2">
                      {meal?.recipe ? (
                        <div className="relative group">
                          <div className="text-sm font-medium text-gray-800 mb-1">{meal.recipe.name}</div>
                          <div className="text-xs text-gray-600">{meal.recipe.servings} servings</div>
                          <button
                            onClick={() => removeMealFromSlot(dayIndex, mealType)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedSlot({ day: dayIndex, meal: mealType })}
                          className="w-full h-16 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors text-sm"
                        >
                          + Add Recipe
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
