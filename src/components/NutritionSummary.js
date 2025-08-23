import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const NutritionSummary = ({ totals }) => {
  const summaryItems = [
    {
      label: 'Calories',
      value: totals.calories,
      unit: 'kcal',
      color: '#4CAF50',
      emoji: '🔥'
    },
    {
      label: 'Protein',
      value: totals.protein,
      unit: 'g',
      color: '#2196F3',
      emoji: '💪'
    },
    {
      label: 'Fiber',
      value: totals.fiber,
      unit: 'g',
      color: '#FF9800',
      emoji: '🌾'
    },
    {
      label: 'Fat',
      value: totals.fat,
      unit: 'g',
      color: '#F44336',
      emoji: '🟡'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Nutrition Summary</Text>
      <View style={styles.grid}>
        {summaryItems.map((item, index) => (
          <View key={index} style={[styles.card, { borderLeftColor: item.color }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, { color: item.color }]}>
              {item.value}
            </Text>
            <Text style={styles.unit}>{item.unit}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 16,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderLeftWidth: 4
  },
  emoji: {
    fontSize: 20,
    marginBottom: 4
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4
  },
  unit: {
    fontSize: 12,
    color: '#888'
  }
});

export default NutritionSummary;