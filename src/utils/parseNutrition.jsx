export const parseNutrition = (description) => {
    const nutritionRegex = /Calories: ([\d.]+)kcal.*Fat: ([\d.]+)g.*Carbs: ([\d.]+)g.*Protein: ([\d.]+)g/;
    const match = description.match(nutritionRegex);
    
    if (match) {
      return {
        calories: match[1],
        fat: match[2],
        carbs: match[3],
        protein: match[4],
      };
    }
    return null;
  };