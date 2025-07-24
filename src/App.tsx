import { useState } from 'react';
import {
  ConnectionStatus,
  IngredientManager,
  Navigation,
  RecipeManager,
  ShoppingList,
  WeeklyPlanner,
} from './components';

export const App = () => {
  const [activeTab, setActiveTab] = useState('ingredients');

  const renderContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return <IngredientManager />;
      case 'recipes':
        return <RecipeManager />;
      case 'planner':
        return <WeeklyPlanner />;
      case 'shopping':
        return <ShoppingList />;
      default:
        return <IngredientManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">🍽️ Recipe Planner & Shopping List</h1>
            <p className="mt-2 text-gray-600">Create recipes, plan your week, and generate smart shopping lists</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Connection Status */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <ConnectionStatus />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 pb-8">{renderContent()}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>🧑‍🍳 Happy cooking! Make meal planning easier with smart recipe management.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
