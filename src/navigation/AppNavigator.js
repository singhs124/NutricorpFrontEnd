import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CustomTabBar from '../components/CustomTabBar';
import { useFood } from '../context/FoodContext';
import CalculatorScreen from '../screens/CalculatorScreen';
import FoodSelectionScreen from '../screens/FoodSelectionScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Empty component for the middle tab (+ button)
const AddScreen = () => null;

const TabNavigator = ({addNewFood}) => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} addNewFood={addNewFood} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={CalculatorScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const {food, setFood} = useFood();
  const addNewFood = apiFood => {
    const newFoodItem = {
      id: apiFood.foodId,
      name: apiFood.foodName,
      serving: '100g',
      calories:
        parseFloat(extractValue(apiFood.foodDescription, 'Calories')) || 0,
      protein:
        parseFloat(extractValue(apiFood.foodDescription, 'Protein')) || 0,
      fiber: parseFloat(extractValue(apiFood.foodDescription, 'Carbs')) || 0,
      fat: parseFloat(extractValue(apiFood.foodDescription, 'Fat')) || 0,
      emoji: '🍽️',
      color: '#4A90E2',
    };
    setFood(prev=>[...prev,newFoodItem]);
  };

  const extractValue = (description, nutrient) => {
    const regex = new RegExp(`${nutrient}: ([\\d.]+)`, 'i');
    const match = description.match(regex);
    return match ? match[1] : '0';
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs">
          {props=>(
            <TabNavigator {...props} addNewFood = {addNewFood}/>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="FoodSelection"
          component={FoodSelectionScreen}
          options={{ presentation: 'modal', gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
