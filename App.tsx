import React from 'react';
import { FoodProvider } from './src/context/FoodContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <FoodProvider>
      <AppNavigator />
    </FoodProvider>
  );
};

export default App;
