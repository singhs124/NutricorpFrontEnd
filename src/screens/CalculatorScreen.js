import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import FoodItem from '../components/FoodItem';
import NutritionSummary from '../components/NutritionSummary';
import { nutritionData } from '../data/nutritionData';
import { calculateTotals } from '../utils/calculations';
import { TextInput } from 'react-native-gesture-handler';

const CalculatorScreen = () => {
  const [quantities, setQuantities] = useState({});
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    fiber: 0,
    fat: 0
  });

  // Initialize quantities
  useEffect(() => {
    const initialQuantities = {};
    nutritionData.forEach((food) => {
      initialQuantities[food.id] = 0;
    });
    setQuantities(initialQuantities);
  }, []);

  // Calculate totals when quantities change
  useEffect(() => {
    const newTotals = calculateTotals(quantities, nutritionData);
    setTotals(newTotals);
  }, [quantities]);

  const handleQuantityChange = (foodId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [foodId]: newQuantity
    }));
  };

  const handleReset = () => {
    const resetQuantities = {};
    nutritionData.forEach((food) => {
      resetQuantities[food.id] = 0;
    });
    setQuantities(resetQuantities);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Diet Plan Calculator</Text>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <NutritionSummary totals={totals} />
        <View style={styles.foodSection}>
          <Text style={styles.sectionTitle}>Food Items</Text>
          {nutritionData.map((food) => (
            <FoodItem
              key={food.id}
              food={food}
              quantity={quantities[food.id] || 0}
              onQuantityChange={(newQuantity) => 
                handleQuantityChange(food.id, newQuantity)
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6
  },
  resetButtonText: {
    color: 'white',
    fontWeight: '600'
  },
  scrollView: {
    flex: 1
  },
  foodSection: {
    paddingBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8
  }
});

export default CalculatorScreen;