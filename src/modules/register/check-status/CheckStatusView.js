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
import { colors } from '../../../styles';

const { width } = Dimensions.get('screen');

export default function CheckStatusScreen(props) {

  const [username, setUsername] = useState(String);

  const checkStatus = () => {
    props.navigation?.navigate('Assessment', { status: username ? 'berhasil' : 'gagal' });
  }

  return (
    <ImageBackground style={styles.container} source={null}>
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

        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', marginTop: 15 }}>
          <View style={styles.buttonContainer}>

              <View style={{ marginHorizontal: 10, marginBottom: 20 }}>
                <Text size={14} color={'#333'} bold>
                  Masukan Nomor Handphone Kamu Untuk Check Status Pendaftaran
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
                onPress={() => checkStatus()}
              >
                Check Status
              </Button>
          </View>
        </View>

      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
