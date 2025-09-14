
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "The name of the recipe."
    },
    description: {
        type: Type.STRING,
        description: "A short, enticing description of the dish."
    },
    ingredients: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "An ingredient with its quantity, e.g., '1 cup of flour'."
      },
      description: "A list of all ingredients required for the recipe, including quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        description: "A single, clear step in the cooking process."
      },
      description: "The step-by-step instructions to prepare the dish."
    },
  },
  required: ['recipeName', 'description', 'ingredients', 'instructions'],
};

export async function generateRecipe(
  ingredients: string,
  mealType: string,
  dietary: string
): Promise<Recipe> {
    
  const prompt = `
    You are a creative chef. Generate a delicious recipe based on the following details.

    Available Ingredients: ${ingredients}
    ${mealType !== 'Any' ? `Meal Type: ${mealType}` : ''}
    ${dietary !== 'None' ? `Dietary Restriction: ${dietary}` : ''}

    Please use primarily the ingredients provided, but you can assume common pantry staples are available (like salt, pepper, oil, water).
    Create a clear, easy-to-follow recipe.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const recipeData: Recipe = JSON.parse(jsonText);
    
    return recipeData;
  } catch (error) {
    console.error("Error generating recipe:", error);
    if (error instanceof Error && error.message.includes('429')) {
         throw new Error("API rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to generate a recipe from the provided ingredients. Please check your input or try again.");
  }
}
