import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import QuantityInput from './QuantityInput';

const FoodItem = ({ food, quantity, onQuantityChange }) => {
  const totalCalories = Math.round(food.calories * quantity);
  const totalProtein = Math.round(food.protein * quantity * 10) / 10;
  const totalFiber = Math.round(food.fiber * quantity * 10) / 10;
  const totalFat = Math.round(food.fat * quantity * 10) / 10;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{food.emoji}</Text>
        <View style={styles.foodInfo}>
          <Text style={styles.foodName}>{food.name}</Text>
          <Text style={styles.servingSize}>{food.serving}</Text>
        </View>
        <QuantityInput
          quantity={quantity}
          onQuantityChange={onQuantityChange}
        />
      </View>
      
      <View style={styles.nutritionRow}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionLabel}>Per Unit</Text>
          <Text style={styles.nutritionValue}>
            {food.calories}cal • {food.protein}p • {food.fiber}f • {food.fat}fat
          </Text>
        </View>
        
        {quantity > 0 && (
          <View style={styles.nutritionItem}>
            <Text style={styles.nutritionLabel}>Total</Text>
            <Text style={[styles.nutritionValue, styles.totalValue]}>
              {totalCalories}cal • {totalProtein}p • {totalFiber}f • {totalFat}fat
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  emoji: {
    fontSize: 24,
    marginRight: 12
  },
  foodInfo: {
    flex: 1
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  servingSize: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  nutritionRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12
  },
  nutritionItem: {
    marginBottom: 4
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500'
  },
  nutritionValue: {
    fontSize: 13,
    color: '#555',
    marginTop: 2
  },
  totalValue: {
    fontWeight: '600',
    color: '#007AFF'
  }
});

export default FoodItem;