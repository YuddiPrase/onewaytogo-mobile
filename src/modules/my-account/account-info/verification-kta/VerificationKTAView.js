import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ToastAndroid
} from 'react-native';

import { 
  Input, 
  Button, 
  Loader,
} from '@components';
import { Text } from '@components/StyledText';

import styles from './Styles';

export default function VerificationKTAScreen(props) {

  const [numberKTA, setNumberKTA] = useState(String);

  const submitKTA = () => {
    if (numberKTA) {
      const body = {
        _method: 'PUT',
        kta_number: numberKTA
      }
      props.updateAccount(body, props);
    } else {
      ToastAndroid.show('Pastikan Nomor KTA sudah kamu isi!', ToastAndroid.SHORT);
    }
  }

  return (
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', flexGrow: 1, width: '100%', backgroundColor: 'white' }}>
        <ImageBackground
          source={null}
          resizeMode="cover"
          imageStyle={{}}
          style={{
                width: '100%',
                backgroundColor: 'transparent',
                height: 200,
          }}
        > 
            <View style={{ flexGrow: 1 }}>
              <Image resizeMode="contain" style={{ width: 50, height: 50, margin: 28, marginHorizontal: 32 }} source={require('@images/logo/115-square-yellow.png')}/>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', flex: 1, marginHorizontal: 32 }}>
                <Text size={28} bold color={'#333'}>Nomor KTA</Text>
                <Text size={16} color={'#aaa'}>Masukan nomor KTA kamu yang telah terdaftar</Text>
              </View>
            </View>
        </ImageBackground>
        <View style={{ backgroundColor: 'white', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', flexGrow: 1 }}>
          <View style={styles.buttonContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Input
                isSquare
                placeholder="Nomor Kartu Tanda Anggota"
                keyboardType={'number-pad'}
                flexItem={{ flex: 1 }}
                style={styles.inputStyle}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={(v) => setNumberKTA(v)}
                value={numberKTA}
                // error={this.state.phoneError}
              />
            </View>
            <Button
              style={[styles.buttonStyle, ]}
              textStyle={styles.textStyle}
              onPress={submitKTA}
            >
              Verifikasi
            </Button>
          </View>
        </View>
      </View>
      <Loader visible={props.isLoading || props.isLoadingArea}/>
  </ImageBackground>
  );
}
