import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Pressable,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from '@components/StyledText';
import styles from './Styles';
import { colors } from '../../styles';
import slides from './Intro';
import {
  Button,
} from '@components';

export default function LoginDashboardScreen(props) {

  const [showRealApp, setShowRealApp] = useState(false);

  useEffect(() => {
    onCheckFirst();
  }, [])

  const redirectLogin = () => {
    props.navigation?.navigate('Login');
  }

  const redirectRegister = () => {
    props.navigation?.navigate('Register');
  }

  const checkSignUp = () => {
    props.navigation?.navigate('Check Status');
  }

  const onCheckFirst = async () => {
    const v = await AsyncStorage.getItem('@init');
    // await AsyncStorage.removeItem('@init');
    if (v !== 'true') {
      setShowRealApp(false);
    } else {
      setShowRealApp(true);
    }
  }

  const renderMultiButton = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderWidth: 1, borderColor: '#ddd', marginTop: 48 }}>
          <Pressable
            onPress={() => redirectLogin()}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, paddingHorizontal: 50, borderRadius: 50, borderWidth: 5, backgroundColor: colors.primaryColor, borderColor: colors.primaryColor, }}>
              <Text bold color={'white'} size={16}>Masuk</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => redirectRegister()}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12, paddingHorizontal: 50, borderRadius: 50 }}>
              <Text bold color={colors.primaryColor} size={16}>Daftar</Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  }

  const _onDone = async () => {
    await AsyncStorage.setItem('@init', 'true')
    setShowRealApp(true);
  }

  const _renderNextButton = () => {
    return (
      <View style={{ padding: 10, paddingHorizontal: 20, backgroundColor: colors.primaryColor, borderRadius: 30 }}>
        <Text size={16} bold color={'white'}>Selanjutnya</Text>
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={{ padding: 10, paddingHorizontal: 30, backgroundColor: colors.primaryColor, borderRadius: 30 }}>
        <Text size={16} bold color={'white'}>Mulai</Text>
      </View>
    );
  };

  const _renderIntroItem = ({ item }) => {
    return (
      <View style={styles.introSlide}>
        <Image source={item.image} style={styles.introImage}/>
        <Text style={styles.introTitle} bold={true}>{item.title}</Text>
        <Text style={styles.introText}>{item.text}</Text>
      </View>
    );
  }

  if (!showRealApp) {
    return <AppIntroSlider renderItem={_renderIntroItem} data={slides} onDone={_onDone} renderNextButton={_renderNextButton} renderDoneButton={_renderDoneButton} activeDotStyle={styles.activeDotStyle}/>
  }

  return (
    <ImageBackground style={styles.container} source={null}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
        showHideTransition={'fade'}
      />
      <View
        style={{
          width: '100%',
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white'
        }}
      >

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={require('@images/pages/delivery-items.png')}
            style={{ height: 160 }}
          />
        </View>

        <View style={{ flexDirection: 'column' }}>
          <View style={styles.buttonContainer}>
              <View
                style={{ flexDirection: 'column', marginTop: 15 }}
              >
                <Text size={18} bold color={'#333'}>Haloo, Partner Kurir !</Text>
                <Text size={18} bold color={'#333'}>Sudah siap antar paket ?</Text>
              </View>
              <View
                style={{ flexDirection: 'column', marginTop: 15 }}
              >
                <Text size={14} color={'#333'}>Yuk, masuk untuk pilih paket yang ingin kamu antar</Text>
              </View>
              <View
                style={{ flexDirection: 'column', marginTop: 15 }}
              >
                <Button
                  style={styles.buttonStyle}
                  textStyle={styles.textStyle}
                  onPress={() => redirectLogin()}
                >
                  Masuk
                </Button>

                <Button
                  styleType={'secondary'}
                  style={styles.buttonStyle}
                  textStyle={styles.textStyle}
                  onPress={() => redirectRegister()}
                >
                  Daftar Jadi Partner
                </Button>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15
                }}
              >
                <Text size={14} color={'#333'}>
                  Sudah daftar ? Cek pendaftaran kamu
                </Text>
                <TouchableOpacity
                  testID={"checksignup"}
                  onPress={() => checkSignUp()}
                  style={{
                    marginLeft: 3,
                    height: 30,
                  }}
                >
                  <Text size={14} color={'#333'} style={styles.linkText} bold={true}>Disini</Text>
                </TouchableOpacity>
              </View>

          </View>
        </View>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 50,
          }}
        >
          <Text size={12} color={'#333'}>
            Hak Cipta dilindungi oleh
          </Text>

            <Text size={12} color={'#333'} bold={true} style={{ marginLeft: 3 }}>
              SiCepat Express
            </Text>
        </View>

      </View>
    </ImageBackground>
  );
}
