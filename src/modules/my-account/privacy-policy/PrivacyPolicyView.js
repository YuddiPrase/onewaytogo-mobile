import React from 'react';
import {
  View,
  ImageBackground,
  Pressable,
  Dimensions,
  ScrollView
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import {
  Loader,
} from '@components';
import { Text } from '@components/StyledText';
import styles from './Styles';
import HTML from 'react-native-render-html';

const { width } = Dimensions.get('window');

export default function PrivacyPolicyScreen(props) {

  return (
    <ImageBackground style={styles.container} source={null}>
      {/* {!props.isConnect && <View style={{ position: 'absolute', top: 175, left: 25, elevation: 3 }}>
        <Text style={{ color: 'red' }}>Internet Connection is Lost</Text>
      </View>} */}
      <View style={{ flexDirection: 'column', flexGrow: 1, width: '100%', backgroundColor: 'rgb(250,250,250)' }}>
        <ImageBackground
          source={null}
          resizeMode="cover"
          imageStyle={{}}
          style={{
            width: '100%',
            backgroundColor: 'transparent',
            height: 70,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => props.navigation?.pop()}>
              <IconFeather name={'chevron-left'} size={25} style={[{ width: 30, height: 25, color: '#333', }]}></IconFeather>
              <Text size={20} bold={true} color={'#333'}>Privacy Policy</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, overflow: 'hidden' }}>
            <View style={{ margin: 25 }}>
              <HTML source={{ html: props?.dataPrivacyPolicy?.body || ''}} />
            </View>
          </ScrollView>
        </View>
      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
