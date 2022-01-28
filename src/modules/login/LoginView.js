import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Dimensions,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import {
  Input,
  Button,
  Loader,
  Alert
} from '@components';
import { Text } from '@components/StyledText';
import styles from './Styles';
import { colors } from '../../styles';

const { width } = Dimensions.get('screen');

const NUMBER = {
  zero: 0,
  one: 1,
  five: 5,
  oneThousand: 1000
}

export default function LoginScreen(props) {

  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);

  const [isOTP, setIsOTP] = useState(false);
  const [OTP, setOTP] = useState(String);
  const [timer, setTimer] = useState(NUMBER.zero);

  useEffect(() => {

    if (timer > 0) {
      const callT = setInterval(() => {
        decrementClock();
      }, NUMBER.oneThousand);
      return () => clearInterval(callT);
    }

  }, [timer])

  const decrementClock = () => {
    if (timer > NUMBER.zero) {
      setTimer(t => t - NUMBER.one);
    } else {
      setTimer(NUMBER.zero);
    }
  };

  const redirectLogin = () => {
    // const user = {
    //   username: username,
    //   password: password
    // }
    // if (username && password) {
    //   props.login(user, props);
    // } else {
    //   Alert.callAlert(null, 'Username and Password is Mandatory');
    // }

    props.navigation?.reset({
      index: NUMBER.zero,
      routes: [{ name: 'Start' }],
    });
  }

  const forgotPassword = () => {
    ToastAndroid.show('Forgot Password', ToastAndroid.SHORT);
  }

  const sendOTP = () => {
    setIsOTP(true);
    setTimer(NUMBER.five);
  }


  const resendOTP = () => {
    setIsOTP(true);
    setTimer(NUMBER.five);
  }

  const _renderOTP = () => {
    return (
      <View style={[{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15 }, styles.buttonContainer ]}>
        <View style={{ flexDirection: 'row' }}>
          <Input
            isOTP
            placeholder={'Type Your OTP'}
            keyboardType={'number-pad'}
            flexItem={{ flex: 1 }}
            style={styles.inputStyle}
            placeholderTextColor={'#b2b2b2'}
            onChangeText={(v) => {
              setOTP(v)
            }}
            value={OTP}
            onKeyPress={(v) => {
              console.log('cc', v);
            }}
          />
        </View>

        <View style={{ width: '100%', marginTop: 30 }}>
          <Button
            testID={'redirectToLogin'}
            style={styles.buttonStyle}
            textStyle={styles.textStyle}
            onPress={() => redirectLogin()}
            disabled={OTP.length < 6}
          >
            Masuk
          </Button>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 15
          }}
        >
          <TouchableOpacity
            testID={"resendOTP"}
            onPress={() => resendOTP()}
            style={{
              marginLeft: 3,
              height: 30,
            }}
           >
            <Text size={14} color={colors.primaryColor} style={styles.linkText} bold={true}>Kirim Ulang OTP { timer > 0 ? `(${timer})` : null }</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  return (
    <ImageBackground style={styles.container} source={null}>
      {!props.isConnect && <View style={{ marginTop: 20, position: 'absolute' }}>
        <Text style={{ color: 'red' }}>Internet Connection is Lost</Text>
      </View>}
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, width: '100%', backgroundColor: 'white' }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text size={24} color={'#333'} bold>
            SiCepat
          </Text>
          <Text size={24} color={'#333'} bold>
            One Way To Go
          </Text>
          <Image
            source={require('@images/logo/sicepat.png')}
            style={{ height: 64, marginVertical: 15 }}
          />
        </View>

        { !isOTP ?
        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15 }}>
          <View style={styles.buttonContainer}>

              <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                <Text size={14} color={'#333'} bold>
                  Masukan Nomor Handphone Kamu Untuk Masuk
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  placeholder="08xxxxxxxxxxxx"
                  keyboardType={'email-address'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setUsername}
                  value={username}
                />
              </View>
              <Button
                style={styles.buttonStyle}
                textStyle={styles.textStyle}
                onPress={() => sendOTP()}
              >
                Kirim OTP
              </Button>
          </View>
        </View> : _renderOTP() }

      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
