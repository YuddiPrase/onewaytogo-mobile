import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Keyboard,
  Pressable,
  ToastAndroid,
  Dimensions
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Loader,
  Alert
} from '@components';
import { Text } from '@components/StyledText';
import Clipboard from '@react-native-community/clipboard';
import styles from './Styles';

const { width } = Dimensions.get('window');

export default function MemberCardScreen(props) {

  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);

  const [isKeyboardShow, setIsKeyboardShow] = useState(false);


  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    // alert("Keyboard Shown");
    setIsKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    // alert("Keyboard Hidden");
    setIsKeyboardShow(false);
  };

  const redirectLogin = () => {
    const user = {
      username: username,
      password: password
    }
    if (username && password) {
      props.login(user, props);
    } else {
      Alert.callAlert(null, 'Username and Password is Mandatory');
    }
  }

  const redirectRegister = () => {
    props.navigation?.navigate('Register');
  }

  const copyToClipboard = (value) => {
    try {
      Clipboard.setString(value.toString());
      ToastAndroid.show("Nomor Kartu disalin", ToastAndroid.SHORT);
    } catch (ex) {
      console.warn('ex', ex);
    }
  }

  return (
    <ImageBackground style={styles.container} source={null}>
      {!props.isConnect && <View style={{ position: 'absolute', top: 175, left: 25, elevation: 3 }}>
        <Text style={{ color: 'red' }}>Internet Connection is Lost</Text>
      </View>}
      <View style={{ flexDirection: 'column', flexGrow: 1, width: '100%', backgroundColor: 'white' }}>
        <ImageBackground
          source={null}
          resizeMode="cover"
          imageStyle={{}}
          style={{
            width: '100%',
            backgroundColor: 'rgb(250,250,250)',
            height: 70,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => props.navigation?.pop()}>
              <IconFeather name={'chevron-left'} size={25} style={[{ width: 30, height: 25, color: '#333', }]}></IconFeather>
              <Text size={20} bold={true} color={'#333'}>Kartu Anggota</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1 }}>
          <View style={styles.buttonContainer}>
            <ImageBackground
              source={require('@images/bg/uicard-5-01.png')}
              resizeMode="contain"
              imageStyle={{}}
              style={{
                width: '100%',
                backgroundColor: 'transparent',
                height: (width > 480) ? 260 : 220,
              }}
            >
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: 30 }}>
                <Text size={20} bold={true} color={'#fefefe'}>{props.userData?.fullname || 'Anonymous'}</Text>
                <Text size={12} color={'#fefefe'}>{props.userData?.kta_number || props.userData?.kta_number_old || 'xxxxxxxxx'}</Text>
              </View>
            </ImageBackground>
            <View style={{ marginLeft: 16, marginTop: 16, marginBottom: 5 }}>
              <Text bold size={14} color={'#888'}>Nomor Kartu</Text>
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 16, padding: 20, borderRadius: 15, backgroundColor:'#fefefe', elevation: 3, shadowRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Text size={20} bold={true} color={'#666'} style={{ flex: 1, textAlign: 'center' }}>{props.userData?.kta_number || props.userData?.kta_number_old || 'xxxxxxxxx'}</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center', paddingHorizontal: 10 }}>
                <Pressable onPress={() => copyToClipboard(props.userData?.kta_number_old || props.userData?.id || '')}>
                  <Icon name={'content-copy'} size={23} style={[{ width: 23, height: 23, color: '#aaa'}]}></Icon>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
