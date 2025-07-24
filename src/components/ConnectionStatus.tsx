import { useEffect } from 'react';
import { useAppStore } from '../hooks/useAppStoreWithBackend';

export function ConnectionStatus() {
  const { isOnline, isLoading, error, clearError, loadIngredients, loadRecipes, loadCurrentSchedule } = useAppStore();

  useEffect(() => {
    // Don't auto-load in test environment
    if (process.env.NODE_ENV === 'test') return;

    // Load data on app start
    const initializeData = async () => {
      await Promise.all([loadIngredients(), loadRecipes(), loadCurrentSchedule()]);
    };

    initializeData();
  }, [loadIngredients, loadRecipes, loadCurrentSchedule]);

  const handleRefresh = async () => {
    await Promise.all([loadIngredients(), loadRecipes(), loadCurrentSchedule()]);
  };

  if (isLoading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
          <span className="text-sm text-blue-700">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm text-yellow-700">{error}</span>
          </div>
          <button onClick={clearError} className="text-yellow-600 hover:text-yellow-800 text-sm">
            ×
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border rounded-md p-3 mb-4 ${
        isOnline ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
          <span className={`text-sm ${isOnline ? 'text-green-700' : 'text-gray-600'}`}>
            {isOnline ? 'Connected to Azure Database' : 'Working Offline (Local Storage)'}
          </span>
        </div>
        <button onClick={handleRefresh} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          Refresh
        </button>
      </div>
    </div>
  );
}
