import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { StackNavigationData } from './stackNavigationData';

import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { getAuth, setAppOpened } from './../AppState';

const Stack = createStackNavigator();

function NavigatorView(props) {

  const headerLeftComponentMenu = () => (
    <TouchableOpacity
      onPress={() => props.navigation.toggleDrawer()}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('@images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  );
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ props.auth?.access_token ? 'Start' : 'Login Dashboard'}>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}
          component={item.component}
          options={
            item.headerHide ? {
              headerShown: !item.headerHide,
              gestureEnabled: true,
              gestureDirection: item.isDetail ? 'horizontal' : 'vertical',
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: item.isDetail ? [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ] :
                    [
                      {
                        translateY: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.height, 0],
                        }),
                      },
                    ]
                  },
                }
              }
            } :
            {
              headerLeft: item.headerLeft || headerLeftComponentMenu,
              headerBackground: () => (
                <Image style={styles.headerImage} source={item.headerBackground.source} />
              ),
              headerTitleStyle: item.headerTitleStyle,
            }
          }
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: `${100}%`,
    height: Header.height,
  },
});

export default compose(
  connect(
    (state) => ({
      isFirstOpen: state.app.isFirstOpen,
      auth: state.app.auth
    }),
    (dispatch) => ({
      getAuth: () => dispatch(getAuth()),
      setAppOpened: (v) => dispatch(setAppOpened(v)),
    }),
  ),
  lifecycle({
    async componentDidMount() {
      this.props.getAuth();
    },
  }),
)(NavigatorView);

