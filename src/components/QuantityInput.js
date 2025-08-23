import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

const QuantityInput = ({ quantity, onQuantityChange, step = 0.5 }) => {
  const handleIncrement = () => {
    onQuantityChange(quantity + step);
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, quantity - step);
    onQuantityChange(newQuantity);
  };

  const handleTextChange = (text) => {
    const numValue = parseFloat(text) || 0;
    onQuantityChange(Math.max(0, numValue));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleDecrement}
      >
        <Text style={styles.buttonText}>−</Text>
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        value={quantity.toString()}
        onChangeText={handleTextChange}
        keyboardType="numeric"
        textAlign="center"
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={handleIncrement}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 4
  },
  button: {
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 60,
    fontSize: 16
  }
});

export default QuantityInput;