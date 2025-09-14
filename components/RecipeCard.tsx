
import React from 'react';
import { Recipe } from '../types';
import UtensilsIcon from './icons/UtensilsIcon';
import ListIcon from './icons/ListIcon';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in border border-slate-200 dark:border-slate-700">
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-transparent bg-clip-text">
        {recipe.recipeName}
      </h2>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-8 italic">
        {recipe.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h3 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
            <ListIcon className="h-6 w-6 text-emerald-500" />
            Ingredients
          </h3>
          <ul className="space-y-2 list-none pl-0">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 font-bold mr-2 mt-1">✓</span>
                <span className="text-slate-600 dark:text-slate-300">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="flex items-center gap-2 text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
            <UtensilsIcon className="h-6 w-6 text-emerald-500" />
            Instructions
          </h3>
          <ol className="space-y-4 list-none pl-0">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-emerald-500 text-white font-bold rounded-full h-7 w-7 flex items-center justify-center mr-4 mt-0.5">{index + 1}</span>
                <p className="text-slate-600 dark:text-slate-300">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
