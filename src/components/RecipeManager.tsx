import { useState } from 'react';
import { useAppStore } from '../hooks';
import { Recipe, RecipeIngredient } from '../utils/types';

export function RecipeManager() {
  const { recipes, ingredients, addRecipe, updateRecipe, removeRecipe } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recipes</h2>
        <button
          onClick={() => setIsCreating(true)}
          disabled={isCreating || editingRecipe !== null}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Create Recipe
        </button>
      </div>

      {isCreating && (
        <RecipeForm
          ingredients={ingredients}
          onSubmit={recipe => {
            addRecipe(recipe);
            setIsCreating(false);
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      {editingRecipe && (
        <RecipeForm
          ingredients={ingredients}
          recipe={editingRecipe}
          onSubmit={recipe => {
            updateRecipe(editingRecipe.id, recipe);
            setEditingRecipe(null);
          }}
          onCancel={() => setEditingRecipe(null)}
          isEditing={true}
        />
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recipes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recipes yet. Create one above!</p>
        ) : (
          recipes.map(recipe => (
            <div
              key={recipe.id}
              className={`border rounded-lg p-4 ${
                editingRecipe?.id === recipe.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{recipe.name}</h3>
                  <p className="text-sm text-gray-600">
                    {recipe.category} • {recipe.difficulty} • {recipe.servings} servings
                    {recipe.cookingTime && ` • ${recipe.cookingTime} min`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingRecipe(recipe)}
                    disabled={isCreating || editingRecipe !== null}
                    className="text-blue-500 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeRecipe(recipe.id)}
                    disabled={isCreating || editingRecipe !== null}
                    className="text-red-500 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {recipe.description && <p className="text-gray-700 mb-3">{recipe.description}</p>}

              <div className="space-y-1">
                <h4 className="font-medium text-gray-800">Ingredients:</h4>
                {recipe.ingredients.map((ing, index) => (
                  <div key={index} className="text-sm text-gray-600 ml-2">
                    • {ing.quantity} {ing.ingredient.unit} {ing.ingredient.name}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface RecipeFormProps {
  ingredients: any[];
  recipe?: Recipe;
  onSubmit: (recipe: Omit<Recipe, 'id'>) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function RecipeForm({ ingredients, recipe, onSubmit, onCancel, isEditing = false }: RecipeFormProps) {
  const [name, setName] = useState(recipe?.name || '');
  const [description, setDescription] = useState(recipe?.description || '');
  const [category, setCategory] = useState<Recipe['category']>(recipe?.category || 'Lunch');
  const [difficulty, setDifficulty] = useState<Recipe['difficulty']>(recipe?.difficulty || 'Easy');
  const [servings, setServings] = useState(recipe?.servings || 1);
  const [cookingTime, setCookingTime] = useState(recipe?.cookingTime?.toString() || '');
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>(recipe?.ingredients || []);

  const handleAddIngredient = () => {
    setRecipeIngredients([...recipeIngredients, { ingredient: ingredients[0], quantity: 1 }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && recipeIngredients.length > 0) {
      onSubmit({
        name: name.trim(),
        description: description.trim() || undefined,
        category,
        difficulty,
        servings,
        cookingTime: cookingTime ? parseInt(cookingTime) : undefined,
        ingredients: recipeIngredients,
      });
    }
  };

  if (ingredients.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800">
          You need to add some ingredients first before {isEditing ? 'editing' : 'creating'} a recipe!
        </p>
        <button
          onClick={onCancel}
          className="mt-2 px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Recipe' : 'Create New Recipe'}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Recipe name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value as Recipe['category'])}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          rows={2}
        />

        <div className="grid grid-cols-3 gap-4">
          <select
            value={difficulty}
            onChange={e => setDifficulty(e.target.value as Recipe['difficulty'])}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <input
            type="number"
            placeholder="Servings"
            value={servings}
            onChange={e => setServings(parseInt(e.target.value) || 1)}
            min="1"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />

          <input
            type="number"
            placeholder="Cooking time (min)"
            value={cookingTime}
            onChange={e => setCookingTime(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium text-gray-700">Ingredients</label>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Add Ingredient
            </button>
          </div>

          <div className="space-y-2">
            {recipeIngredients.map((recipeIng, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Qty"
                  value={recipeIng.quantity}
                  onChange={e => {
                    const newIngredients = [...recipeIngredients];
                    newIngredients[index].quantity = parseFloat(e.target.value) || 0;
                    setRecipeIngredients(newIngredients);
                  }}
                  min="0"
                  step="0.1"
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                />

                <select
                  value={recipeIng.ingredient.id}
                  onChange={e => {
                    const ingredient = ingredients.find(ing => ing.id === e.target.value);
                    if (ingredient) {
                      const newIngredients = [...recipeIngredients];
                      newIngredients[index].ingredient = ingredient;
                      setRecipeIngredients(newIngredients);
                    }
                  }}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  {ingredients.map(ing => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!name.trim() || recipeIngredients.length === 0}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isEditing ? 'Update Recipe' : 'Create Recipe'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
