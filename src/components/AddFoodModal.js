import React, { useState } from 'react';
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { modalStyles } from '../styles/modalStyles';

const AddFoodModal = ({ visible, onClose }) => {
  const [foodName, setFoodName] = useState('');
  const [slideAnim] = useState(new Animated.Value(300));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.spring(slideAnim, {
      toValue: 300,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start(() => {
      onClose();
      setFoodName('');
    });
  };

  const handleAddFood = async () => {
    if (foodName.trim()) {
      try {
        // Here you can call your backend API
        // const response = await fetch('YOUR_API_ENDPOINT', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ food: foodName }),
        // });
        // const data = await response.json();
        
        Alert.alert('Success', `Added: ${foodName}`);
        handleClose();
      } catch (error) {
        Alert.alert('Error', 'Failed to add food item');
      }
    } else {
      Alert.alert('Error', 'Please enter a food name');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.simpleBlurOverlay} />
        
        <TouchableOpacity
          style={modalStyles.modalBackground}
          activeOpacity={1}
          onPress={handleClose}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={modalStyles.keyboardAvoidingView}
          >
            <Animated.View
              style={[
                modalStyles.modalContent,
                {
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={modalStyles.modalHandle} />
              
              <Text style={modalStyles.modalTitle}>Add Food Item</Text>
              
              <View style={modalStyles.inputContainer}>
                <Text style={modalStyles.inputIcon}>🍽️</Text>
                <TextInput
                  style={modalStyles.textInput}
                  placeholder="Enter food name"
                  placeholderTextColor="#999"
                  value={foodName}
                  onChangeText={setFoodName}
                  autoFocus={true}
                  returnKeyType="done"
                  onSubmitEditing={handleAddFood}
                />
              </View>

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity
                  style={modalStyles.cancelButton}
                  onPress={handleClose}
                  activeOpacity={0.8}
                >
                  <Text style={modalStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={modalStyles.addFoodButton}
                  onPress={handleAddFood}
                  activeOpacity={0.8}
                >
                  <Text style={modalStyles.buttonIcon}>✅</Text>
                  <Text style={modalStyles.addFoodButtonText}>Add Food</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </KeyboardAvoidingView>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddFoodModal;
