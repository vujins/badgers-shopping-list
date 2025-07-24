# 🍽️ Recipe Planner & Shopping List App

A comprehensive meal planning application that helps you manage ingredients, create recipes, plan your weekly meals, and generate smart shopping lists. Built with React, TypeScript, Tailwind CSS, and Zustand for state management.

## 🌟 Features

### 📦 Ingredient Management

- Add ingredients with custom units (cups, grams, pieces, etc.)
- Remove ingredients you no longer need
- All data persists locally in your browser

### 📝 Recipe Creation

- Create detailed recipes with multiple ingredients
- Set difficulty levels (Easy, Medium, Hard)
- Categorize recipes (Breakfast, Lunch, Dinner, Snack, Dessert)
- Specify servings and cooking time
- Add descriptions for your recipes

### 📅 Weekly Meal Planner

- Plan 5 meals per day (Breakfast, Lunch, Dinner, 2 Snacks) for 7 days
- Drag and drop interface to assign recipes to meal slots
- Visual weekly grid layout
- Easy meal removal and reassignment

### 🛒 Smart Shopping List

- Automatically generates shopping lists from your weekly meal plan
- Consolidates duplicate ingredients across recipes
- Shows which recipes use each ingredient
- Copy to clipboard or download as text file
- Shareable format for easy grocery shopping

## 🚀 Getting Started

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd badgers-shopping-list
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development servers**

   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3000/api`

## 📱 How to Use

### Step 1: Add Ingredients

1. Go to the "🥬 Ingredients" tab
2. Enter ingredient name and unit (e.g., "Chicken breast", "lbs")
3. Click "Add" to save the ingredient

### Step 2: Create Recipes

1. Navigate to "📝 Recipes" tab
2. Click "Create Recipe"
3. Fill in recipe details:
   - Name and description
   - Category and difficulty
   - Servings and cooking time
   - Add ingredients with quantities
4. Save your recipe

### Step 3: Plan Your Week

1. Go to "📅 Weekly Planner"
2. Create a new weekly schedule
3. Click on empty meal slots to assign recipes
4. Build your complete weekly meal plan

### Step 4: Generate Shopping List

1. Visit "🛒 Shopping List" tab
2. Review automatically generated list
3. Copy to clipboard or download as text file
4. Take it with you to the grocery store!

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: Zustand with persistence
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **Deployment**: Azure Web App

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── IngredientManager.tsx
│   ├── RecipeManager.tsx
│   ├── WeeklyPlanner.tsx
│   ├── ShoppingList.tsx
│   └── Navigation.tsx
├── hooks/              # Custom React hooks
│   └── useAppStore.ts  # Zustand store
├── utils/              # Utility functions and types
│   └── types.ts        # TypeScript interfaces
├── server/             # Express backend
└── App.tsx             # Main application component
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Debug tests in VS Code:

1. Press `Ctrl + Shift + D` to open Debug Tab
2. Select "Debug Jest - Run All Tests" or "Debug Jest - Run Single Test"
3. Set breakpoints and press F5 to launch

## 🚀 Deployment

This app is designed to be deployed on Azure Web App with both frontend and backend served from the same origin.

```bash
npm run build
npm start
```

## 💡 Pro Tips

- **Meal Planning**: Start with simpler recipes and gradually add more complex ones
- **Shopping Efficiency**: Group ingredients by store sections when shopping
- **Batch Cooking**: Plan recipes that can be made in larger quantities
- **Seasonal Planning**: Adjust recipes based on seasonal ingredient availability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
