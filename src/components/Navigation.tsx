interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'ingredients', label: '🥬 Ingredients', icon: '🥬' },
  { id: 'recipes', label: '📝 Recipes', icon: '📝' },
  { id: 'planner', label: '📅 Weekly Planner', icon: '📅' },
  { id: 'shopping', label: '🛒 Shopping List', icon: '🛒' },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
