import { useState } from 'react';
import { useAppStore } from '../hooks';
import { Ingredient } from '../server/types';

export function IngredientManager() {
  const { ingredients, addIngredient, updateIngredient, removeIngredient } = useAppStore();
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);
  const [editName, setEditName] = useState('');
  const [editUnit, setEditUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && unit.trim()) {
      addIngredient(name, unit);
      setName('');
      setUnit('');
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIngredient && editName.trim() && editUnit.trim()) {
      updateIngredient(editingIngredient.id, editName, editUnit);
      setEditingIngredient(null);
      setEditName('');
      setEditUnit('');
    }
  };

  const startEditing = (ingredient: Ingredient) => {
    setEditingIngredient(ingredient);
    setEditName(ingredient.name);
    setEditUnit(ingredient.unit);
  };

  const cancelEditing = () => {
    setEditingIngredient(null);
    setEditName('');
    setEditUnit('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Ingredient name (e.g., Chicken breast)"
            value={name}
            onChange={e => setName(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Unit (e.g., lbs, cups, pieces)"
            value={unit}
            onChange={e => setUnit(e.target.value)}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {ingredients.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No ingredients yet. Add some above!</p>
        ) : (
          ingredients.map(ingredient => (
            <div
              key={ingredient.id}
              className={`p-3 rounded-md ${
                editingIngredient?.id === ingredient.id ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
              }`}
            >
              {editingIngredient?.id === ingredient.id ? (
                <form onSubmit={handleEditSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Ingredient name"
                    />
                    <input
                      type="text"
                      value={editUnit}
                      onChange={e => setEditUnit(e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Unit"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      type="submit"
                      disabled={!editName.trim() || !editUnit.trim()}
                      className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={cancelEditing}
                      className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">
                    <strong>{ingredient.name}</strong> ({ingredient.unit})
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditing(ingredient)}
                      className="text-blue-500 hover:text-blue-700 transition-colors text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeIngredient(ingredient.id)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
