import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Pressable,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-crop-picker';
import RadioForm from 'react-native-simple-radio-button';
import Moment from 'moment';
import _ from 'lodash';

import { Text } from '@components/StyledText';
import { 
  Input,
  Button,
  Datepicker,
  Loader,
} from '@components';
import { colors } from '@styles';

import styles from '../Styles';

const { width } = Dimensions.get('window');

const genderList = [
  {
    label: 'Laki-laki',
    value: 'male'
  },
  {
    label: 'Perempuan',
    value: 'female'
  }
];

export default function RequestUpgradeScreen(props) {

	const [onLoad, setOnLoad] = useState(false);

  const [kta, setKTA] = useState(props.route?.params?.ktaNumber);
  const [nik, setNIK] = useState(String);
  const [name, setName] = useState(String);
  const [birthdate, setBirthdate] = useState(String);
  const [gender, setGender] = useState(String);
  const [imageKTP, setImageKTP] = useState(String);
  const [imageSelfie, setImageSelfie] = useState(String);

  useEffect(() => {
    return () => {
    }
  }, [])
  
  const submit = async () => {
    const payload = {
      kta_number: kta,
      nik: nik,
      name: name,
      birth_date: Moment(birthdate).format('YYYY-MM-DD'),
      gender: gender,
      ktp_image: imageKTP,
      ktp_selfie_image: imageSelfie,
    }
    await props.storeRequestUpgrade(payload, props);
  }

  const uploadKTP = (event = null) => {
    if (event === 'gallery') {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.8,
        includeBase64: true,
      }).then(image => {
        if (image?.data) {
          setImageKTP(`data:${image.mime};base64,${image.data}`);
        }
      });
    } else {
      ImagePicker.openCamera({
        width: 1000,
        height: 1000,
        compressImageQuality: 0.8,
        cropping: false,
        includeBase64: true,
      }).then(image => {
        if (image?.data) {
          setImageKTP(`data:${image.mime};base64,${image.data}`);
        }
      });
    }
  }

  const uploadSelfie = (event = null) => {
    if (event === 'gallery') {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.8,
        includeBase64: true,
      }).then(image => {
        if (image?.data) {
          setImageSelfie(`data:${image.mime};base64,${image.data}`);
        }
      });
    } else {
      ImagePicker.openCamera({
        width: 1000,
        height: 1500,
        compressImageQuality: 0.8,
        cropping: false,
        includeBase64: true
      }).then(image => {
        if (image?.data) {
          setImageSelfie(`data:${image.mime};base64,${image.data}`);
        }
      });
    }
  }

  return (
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
			<ImageBackground
					source={null}
					resizeMode="cover"
					imageStyle={{}}
          style={{
            width: '100%',
            backgroundColor: 'rgb(250,250,250)',
            height: 70
          }}
			>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => props.navigation?.pop()}>
            <IconFeather name={'chevron-left'} size={25} style={[{ width: 30, height: 25, color: '#333', }]}></IconFeather>
            <Text size={20} color={colors.primaryDark} bold={true}>
              Alternatif Verifikasi 
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
      <ScrollView contentContainerStyle={{ overflow: 'scroll' }}>
          <View style={styles.topper}>
            <View style={styles.buttonContainer}>
              
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="Nomor KTA"
                  keyboardType={'default'}
                  flexItem={{ flex: 1 }}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setKTA}
                  value={kta}
                  // error={null}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="NIK (KTP)"
                  keyboardType={'number-pad'}
                  flexItem={{ flex: 1 }}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setNIK}
                  value={nik}
                  maxLength={16}
                />
              </View>
            
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="Nama Lengkap"
                  keyboardType={'default'}
                  flexItem={{ flex: 1 }}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setName}
                  value={name}
                  // error={null}
                />
              </View>

              <View style={styles.inputContainer}>
                <Datepicker
                  isSquare
                  isSquareLabel
                  style={styles.datePickerStyle}
                  placeholder={'Tanggal Lahir'}
                  date={birthdate}
                  onDateChange={setBirthdate}
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 14, color: '#666', marginLeft: 10, marginVertical: 10 }}>Jenis Kelamin</Text>
                  <RadioForm
                    radio_props={genderList}
                    initial={genderList.findIndex((v) => v.value == gender)}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={colors.primaryGreen}
                    buttonSize={14}
                    selectedButtonColor={colors.primaryGreen}
                    animation={false}
                    style={styles.radioStyle}
                    buttonWrapStyle={{ marginRight: 20 }}
                    labelStyle={styles.radioLabelStyles}
                    onPress={setGender}
                  />
                </View>
              </View>

              <View style={{ flexDirection: 'row', flex: 1, margin: 10, }}>
                <View style={[styles.btnUploadImg, { marginRight: 5, paddingVertical: 10 }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                      <Text color={'#666'}>Upload KTP</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 5, width: '100%' }}>
                        <TouchableOpacity onPress={uploadKTP} style={{ borderRadius: 15, padding: 5, paddingHorizontal: 10, backgroundColor: '#ddd', elevation: 3 }}>
                          <Icon
                            name={'camera'}
                            size={32}
                            style={[
                              { width: 30, height: 30, color: colors.primaryGreen }
                            ]}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>

                <View style={[styles.btnUploadImg, { marginLeft: 5, paddingVertical: 10 }]}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, height: 50, color: '#666' }}>
                    <Text color={'#666'}>Upload Foto Selfie</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 5, width: '100%' }}>
                      <TouchableOpacity onPress={uploadSelfie} style={{ borderRadius: 15, padding: 5, paddingHorizontal: 10, backgroundColor: '#ddd', elevation: 3 }}>
                        <Icon
                          name={'camera'}
                          size={32}
                          style={[
                            { width: 30, height: 30, color: colors.primaryGreen }
                          ]}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {imageKTP || imageSelfie ? <View style={{ flexDirection: 'row', flex: 1, margin: 15, }}>
                <TouchableOpacity onPress={() => uploadKTP()} style={{ flex: 1, }}>
                  <View style={[styles.btnUploadImg, { marginRight: 5, borderWidth: 0 }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, height: 250, }}>
                        { imageKTP ? <Image
                          source={{ uri: imageKTP }}
                          style={styles.imageContainer}
                        /> : null}
                      </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => uploadSelfie()} style={{ flex: 1, }}>
                  <View style={[styles.btnUploadImg, { marginLeft: 5, borderWidth: 0 }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, height: 250, color: '#666' }}>
                        { imageSelfie ? <Image
                          source={{ uri: imageSelfie }}
                          style={styles.imageContainer}
                        /> : null}
                      </View>
                  </View>
                </TouchableOpacity>
              </View>: null}

              <Button
                style={styles.buttonStyle}
                textStyle={styles.textStyle}
                onPress={() => submit()}
                loader={props.isLoading}
                >
                SUBMIT
              </Button>
            </View>
          </View>
      </ScrollView>
      <Loader visible={onLoad}/>
  </ImageBackground>
  );
}
