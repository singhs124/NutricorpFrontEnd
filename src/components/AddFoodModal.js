import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import { foodApi } from '../api/foodApi';
import { modalStyles } from '../styles/modalStyles';


const AddFoodModal = ({ visible, onClose}) => {
  const [foodName, setFoodName] = useState('');
  const [slideAnim] = useState(new Animated.Value(300));
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
      setLoading(false);
    });
  };

  const handleAddFood = async () => {
    if(!foodName.trim()) {
      Alert.alert('Error', 'Please enter a food name');
      return;
    }
    setLoading(true);
    try{
      const response = await foodApi(foodName.trim());
      const result = await response.json();
      console.log(result);
      if(result.success && result.data && result.data.length > 0){
        setFoodName('');
        setLoading(false)
        onClose();
        navigation.navigate('FoodSelection' , {
          foodItems: result.data,
          searchQuery: foodName.trim()
        });
      } else if(result.success && (!result.data || result.data.length == 0)){
        Alert.alert('No Results', 'No Food Item Found')
      } else{
        const errorMessage = result.error || "Unknown Error"
        Alert.alert('Error' , errorMessage);
      }
    } catch(error){
      console.log("Api Error: ", error);
      Alert.alert("Error" , "Failed to get Food Item. Please try again.")
    } finally{
      setLoading(false);
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
          onPress={loading ? null : handleClose}
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
                  style={[modalStyles.addFoodButton , loading && modalStyles.addFoodButtonDisabled]}
                  onPress={handleAddFood}
                  activeOpacity={0.8}
                  disabled = {loading}
                >
                  {loading ? (
                    <ActivityIndicator size = "small" color = "#ffffff"/>
                  ) : (
                    <>
                      <Text style={modalStyles.buttonIcon}>✅</Text>
                      <Text style={modalStyles.addFoodButtonText}>Add Food</Text>
                    </>
                  )}                  
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
