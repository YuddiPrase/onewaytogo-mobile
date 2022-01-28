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

const assessmentList = [
    {
      title: 'Pendaftaran Partner',
      image: require('@images/pages/courier-sicepat.png'),
      description: 'Pendaftaran Anda berhasil, tunggu 1x24 jam untuk proses pendaftaran. Anda akan mendapatkan email dan SMS konfirmasi tentang status pendaftaran Anda',
      detailInfo: 'Cek Berkala Status Pendaftaran',
      actionText: 'Cek Proses Pendaftaran'
    },
    {
      title: 'Status Pendaftaran',
      image: require('@images/pages/checked-success.png'),
      description: 'Pendaftaran Anda berhasil, Silakan Masuk',
      detailInfo: null,
      actionText: 'Masuk'
    },
    {
      title: 'Status Pendaftaran',
      image: require('@images/pages/document-warning.png'),
      description: 'Ooooopppsss! Terdapat kesalahan pada dokumen Anda',
      detailInfo: 'KTP tidak jelas dan STNK berbeda plat nomor',
      actionText: 'Perbaiki Dokumen'
    },
  ];

export default function AssessmentScreen(props) {

  const assessmentType = props.route.params?.status === 'berhasil' ? assessmentList[1] : assessmentList[0];
  const [dataAssessment, setDataAssessment] = useState(props.route.params?.status === 'gagal' ? assessmentList[2] : assessmentType);

  const onAction = () => {
    if (props.route.params?.status) {
      props.navigation?.reset({
        index: 0,
        routes: [{ name: 'Login Dashboard' }],
      });
    } else {
      props.navigation?.reset({
        index: 0,
        routes: [{ name: 'Login Dashboard' }, { name: 'Check Status' }],
      });
    }
  }

  return (
    <ImageBackground style={styles.container} source={null}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, width: width-20, backgroundColor: 'white' }}>

        <View style={{ width: width-80, position: 'absolute', top: 30 }}>
          <View style={{ marginVertical: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text size={22} color={'#333'} bold>{dataAssessment.title}</Text>
          </View>

          <View
            style={{
              width: width-80,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 30
            }}
          >
            <Image
              source={dataAssessment.image}
              style={{ width: 150, height: 150, resizeMode: 'contain', marginBottom: 30 }}
            />
          </View>
        </View>

        <View
          style={{
            width: width/2+80,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <Text size={14} color={'#4F4F4F'} style={{ textAlign: 'center' }}>
            {dataAssessment.description}
          </Text>
          <Text size={14} color={'#4F4F4F'} bold style={{ textAlign: 'center', marginTop: 30 }}>
            {dataAssessment.detailInfo}
          </Text>
        </View>

        <View style={{ width: width-80, position: 'absolute', bottom: 30 }}>
          <Button
            style={styles.buttonStyle}
            textStyle={styles.textStyle}
            onPress={() => onAction()}
          >
            {dataAssessment.actionText}
          </Button>
        </View>

      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
