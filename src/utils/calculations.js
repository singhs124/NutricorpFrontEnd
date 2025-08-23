export const calculateTotals = (quantities, nutritionData) => {
  let totals = {
    calories: 0,
    protein: 0,
    fiber: 0,
    fat: 0
  };

  nutritionData.forEach((food, index) => {
    const quantity = quantities[index] || 0;
    totals.calories += food.calories * quantity;
    totals.protein += food.protein * quantity;
    totals.fiber += food.fiber * quantity;
    totals.fat += food.fat * quantity;
  });

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein * 10) / 10,
    fiber: Math.round(totals.fiber * 10) / 10,
    fat: Math.round(totals.fat * 10) / 10
  };
};

export const formatNumber = (number, decimals = 1) => {
  return decimals === 0 ? Math.round(number) : Math.round(number * 10) / 10;
};