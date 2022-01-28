import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import normalize from '@helpers/NormalizedText';
import { colors } from '../../styles';

import tabNavigationData from './tabNavigationData';

const { width } = Dimensions.get('screen');

const Tab = createBottomTabNavigator();

export default function BottomTabs(props) {
  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Platform.OS === 'ios' ? 90 : 60 } }}>
      {tabNavigationData.map((item, idx) => {
        if (!props.userData?.features?.is_feature_forum && item.name == 'Forum') {
          return null;
        } else if (!props.userData?.features?.is_feature_group_chat && item.name == 'Chat') {
          return null;
        }
        return (
          <Tab.Screen
            key={`tab_item${idx + 1}`}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.tabBarItemContainer}>
                  {/* <Icon
                    name={item.icon}
                    size={26}
                    style={[
                      styles.tabBarIcon, focused && styles.tabBarIconFocused,
                    ]}
                  /> */}
                  <Image
                    source={focused ? item.iconActive : item.iconInactive}
                    style={{ width: 20, height: 20, borderRadius: 5 }}
                  />
                </View>
              ),
              tabBarLabel: ({ focused }) => <Text style={{ fontSize: width > 480 ? normalize(12) : normalize(10), color: focused ? colors.primaryColor : colors.lightGray, marginBottom: 5 }}>{item.name}</Text>,
            }}
          />
        )})}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : -3,
  },
  tabBarIcon: {
    width: 26,
    height: 26,
    color: colors.lightGray
  },
  tabBarIconFocused: {
    // tintColor: colors.primary,
    color: 'rgba(250,180,0,0.7)'
  },
});
