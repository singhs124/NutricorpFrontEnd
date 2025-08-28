import { createContext, useContext, useState } from 'react';
import { nutritionData } from '../data/nutritionData';
import { parseNutrition } from '../utils/parseNutrition';

const FoodContext = createContext(null);

export const useFood = () => {
  const food = useContext(FoodContext);
  return food;
};

export const FoodProvider = props => {
  const [food, setFood] = useState(nutritionData);

  const addFoodItem = (apiFood) => {
    const nutrition = parseNutrition(apiFood.foodDescription);
    const newFoodItem = {
      id: apiFood.foodId,
      name: apiFood.foodName,
      serving: '100g',
      calories: nutrition.calories,
      protein: nutrition.protein,
      fiber: nutrition.carbs,
      fat: nutrition.fat,
      emoji: '🍽️',
      color: '#4A90E2',
    };
    setFood(prev => [...prev, newFoodItem]);
  };

  return (
    <FoodContext.Provider value={{ food, setFood , addFoodItem}}>
      {props.children}
    </FoodContext.Provider>
  );
};
