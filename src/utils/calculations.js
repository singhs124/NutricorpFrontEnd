export const calculateTotals = (quantities, nutritionData) => {
  console.log(quantities);
  let totals = {
    calories: 0,
    protein: 0,
    fiber: 0,
    fat: 0
  };

  for(const foodId in quantities){
    console.log(foodId);
    const quantity = quantities[foodId];
    if(quantity>0){
      const FoodItem = nutritionData.find((item)=>String(item.id) === String(foodId));
      if(FoodItem){
        totals.calories += FoodItem.calories * quantity;
        totals.protein += FoodItem.protein * quantity;
        totals.fiber += FoodItem.fiber * quantity;
        totals.fat += FoodItem.fat * quantity;
      }
    }
  }

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