import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFood } from '../context/FoodContext';
import { parseNutrition } from '../utils/parseNutrition';

const FoodSelectionScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { foodItems, searchQuery } = route.params;
  const {setFood ,addFoodItem} = useFood();
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectFood = (apiFood) => {
    // Handle food selection - add to meal, navigate back, etc.
    Alert.alert(
      'Add Food',
      `Add "${apiFood.foodName}" to your meal?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Add', 
          onPress: () => {
            addFoodItem(apiFood);
            console.log('Adding food:', apiFood);
            navigation.popToTop();
          }
        }
      ]
    );
  };

  const renderFoodCard = ({ item }) => {    
    const nutrition = parseNutrition(item.foodDescription);
    return (
      <TouchableOpacity 
        style={styles.foodCard} 
        onPress={() => handleSelectFood(item)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.foodName}>{item.foodName}</Text>
          <Text style={styles.foodId}>ID: {item.foodId}</Text>
        </View>
        
        {nutrition && (
          <View style={styles.nutritionContainer}>
            <Text style={styles.nutritionLabel}>Per 100g:</Text>
            <View style={styles.nutritionGrid}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutrition.calories}</Text>
                <Text style={styles.nutritionUnit}>kcal</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutrition.fat}g</Text>
                <Text style={styles.nutritionUnit}>Fat</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutrition.carbs}g</Text>
                <Text style={styles.nutritionUnit}>Carbs</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>{nutrition.protein}g</Text>
                <Text style={styles.nutritionUnit}>Protein</Text>
              </View>
            </View>
          </View>
        )}
        
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Meal</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Food Item</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search Query Display */}
      <View style={styles.searchQueryContainer}>
        <Text style={styles.searchQueryText}>
          Results for "{searchQuery}" ({foodItems.length} items found)
        </Text>
      </View>

      {/* Food Items List */}
      <FlatList
        data={foodItems}
        renderItem={renderFoodCard}
        keyExtractor={(item) => item.foodId}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  placeholder: {
    width: 50,
  },
  searchQueryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  searchQueryText: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
  listContainer: {
    padding: 16,
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  foodName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  foodId: {
    fontSize: 12,
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nutritionContainer: {
    marginBottom: 16,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
    fontWeight: '500',
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutritionItem: {
    alignItems: 'center',
    flex: 1,
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  nutritionUnit: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#34C759',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FoodSelectionScreen;
