import { Text, View } from 'react-native';
import { screenStyles } from '../styles/screenStyles';

const ProfileScreen = () => {
  return (
    <View style={screenStyles.screenContainer}>
      <Text style={screenStyles.screenTitle}>Profile Screen</Text>
      <Text style={screenStyles.screenSubtitle}>Manage your profile</Text>
      <View style={screenStyles.contentCard}>
        <Text style={screenStyles.cardIcon}>👤</Text>
        <Text style={screenStyles.cardText}>
          Your profile settings and preferences
        </Text>
      </View>
    </View>
  );
};

export default ProfileScreen;
