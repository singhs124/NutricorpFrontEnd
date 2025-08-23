import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TAB_ICONS } from '../data/constants';
import { tabBarStyles } from '../styles/tabBarStyles';
import AddFoodModal from './AddFoodModal';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleTabPress = (route, index) => {
    if (route.name === 'Add') {
      openModal();
      return;
    }

    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    const isFocused = state.index === index;
    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const getTabIcon = (routeName) => {
    return TAB_ICONS[routeName] || TAB_ICONS.Home;
  };

  const renderAddButton = (route, index) => (
    <TouchableOpacity
      key={index}
      onPress={() => handleTabPress(route, index)}
      style={tabBarStyles.addButton}
      activeOpacity={0.8}
    >
      <View style={tabBarStyles.addButtonInner}>
        <Text style={tabBarStyles.addButtonIcon}>{getTabIcon(route.name)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderTabButton = (route, index) => {
    const isFocused = state.index === index;
    const iconColor = isFocused ? '#007AFF' : '#8E8E93';

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleTabPress(route, index)}
        style={tabBarStyles.tabButton}
        activeOpacity={0.8}
      >
        <Text style={[tabBarStyles.tabIcon, { color: iconColor }]}>
          {getTabIcon(route.name)}
        </Text>
        <Text style={[tabBarStyles.tabLabel, { color: iconColor }]}>
          {route.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={tabBarStyles.tabBarContainer}>
        {state.routes.map((route, index) => {
          return route.name === 'Add'
            ? renderAddButton(route, index)
            : renderTabButton(route, index);
        })}
      </View>

      <AddFoodModal visible={modalVisible} onClose={closeModal} />
    </>
  );
};

export default CustomTabBar;
