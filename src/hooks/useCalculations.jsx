import { useEffect, useState } from 'react';
import { calculateTotals } from '../utils/calculations';

const useCalculations = food => {
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    fiber: 0,
    fat: 0,
  });
  // Initialize quantities
  useEffect(() => {
    setQuantities(prev => {
      const newQuantities = { ...prev };
      food.forEach(item => {
        if (newQuantities[item.id] === undefined) {
          console.log(food);
          newQuantities[item.id] = 0;
        }
      });
      return newQuantities;
    });
  }, [food]);

  useEffect(() => {
    console.log('Executed NewTotals');
    const newTotals = calculateTotals(quantities, food);
    setTotals(newTotals);
  }, [quantities, food]);

  const handleQuantityChange = (foodId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [foodId]: Math.max(0, Number(newQuantity)),
    }));
  };

  const handleReset = () => {
    const resetQuantities = {};
    food.forEach(item => {
      resetQuantities[item.id] = 0;
    });
    setQuantities(resetQuantities);
  };

  return { quantities, totals, handleQuantityChange, handleReset };
};

export default useCalculations;
