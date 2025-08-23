import { Text, View } from 'react-native';
import { screenStyles } from '../styles/screenStyles';

const HomeScreen = () => {
  return (
    <View style={screenStyles.screenContainer}>
      <Text style={screenStyles.screenTitle}>Home Screen</Text>
      <Text style={screenStyles.screenSubtitle}>Your food items will appear here</Text>
      <View style={screenStyles.contentCard}>
        <Text style={screenStyles.cardIcon}>🍽️</Text>
        <Text style={screenStyles.cardText}>
          Add your first food item using the + button below!
        </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
