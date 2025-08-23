import { StyleSheet } from 'react-native';
import { COLORS } from '../data/constants';
import { globalStyles } from './globalStyles';

export const tabBarStyles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...globalStyles.shadow,
    ...globalStyles.safeArea,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  addButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  addButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...globalStyles.cardShadow,
    shadowColor: COLORS.primary,
  },
  addButtonIcon: {
    fontSize: 28,
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
