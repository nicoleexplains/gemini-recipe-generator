
import React, { useState, useCallback } from 'react';
import { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import { MEAL_TYPES, DIETARY_RESTRICTIONS } from './constants';
import RecipeCard from './components/RecipeCard';
import ChefHatIcon from './components/icons/ChefHatIcon';
import SparklesIcon from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('chicken breast, broccoli, rice, soy sauce, garlic');
  const [mealType, setMealType] = useState<string>('Dinner');
  const [dietary, setDietary] = useState<string>('None');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Please enter some ingredients.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    try {
      const result = await generateRecipe(ingredients, mealType, dietary);
      setRecipe(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, mealType, dietary]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <ChefHatIcon className="h-10 w-10 text-emerald-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-transparent bg-clip-text">
              Gemini Recipe Generator
            </h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400">
            Turn your pantry items into a delicious meal!
          </p>
        </header>

        <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8 space-y-6 border border-slate-200 dark:border-slate-700">
          <div>
            <label htmlFor="ingredients" className="block text-lg font-medium mb-2 text-slate-700 dark:text-slate-300">
              What ingredients do you have?
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="e.g., chicken, tomatoes, pasta, cheese"
              rows={4}
              className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-emerald-500 focus:ring-emerald-500 rounded-lg transition duration-200 ease-in-out text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="mealType" className="block text-lg font-medium mb-2 text-slate-700 dark:text-slate-300">
                Meal Type
              </label>
              <select
                id="mealType"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-emerald-500 focus:ring-emerald-500 rounded-lg transition duration-200 ease-in-out appearance-none"
              >
                {MEAL_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dietary" className="block text-lg font-medium mb-2 text-slate-700 dark:text-slate-300">
                Dietary Restrictions
              </label>
              <select
                id="dietary"
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                className="w-full p-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-emerald-500 focus:ring-emerald-500 rounded-lg transition duration-200 ease-in-out appearance-none"
              >
                {DIETARY_RESTRICTIONS.map((diet) => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            onClick={handleGenerateRecipe}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:cursor-not-allowed disabled:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon className="h-5 w-5" />
                Generate Recipe
              </>
            )}
          </button>
        </div>

        <div className="mt-10">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
              <p className="font-bold">Oops!</p>
              <p>{error}</p>
            </div>
          )}
          {recipe && !isLoading && <RecipeCard recipe={recipe} />}
           {!recipe && !isLoading && !error && (
            <div className="text-center p-10 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-2xl">
              <ChefHatIcon className="mx-auto h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300">Your recipe will appear here</h3>
              <p className="text-slate-400 dark:text-slate-500">Enter some ingredients and let the magic happen!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
