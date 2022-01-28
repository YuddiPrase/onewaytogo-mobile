import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  ToastAndroid,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Pressable
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import Moment from 'moment';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Input,
  Button,
  Loader,
  Datepicker,
  Select,
  Checkbox
} from '@components';
import { Text } from '@components/StyledText';
import { colors } from '@styles';

import styles from './Styles';

const { width } = Dimensions.get('screen');

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

const vehicleList = [
  {
    label: 'Motor',
    value: ''
  },
  {
    label: 'Mobil',
    value: 'female'
  }
];

export default function RegisterScreen(props) {

	const [isInit, setIsInit] = useState(false);

  const [numberKTA, setNumberKTA] = useState(String);

  const [isNotMember, setIsNotMember] = useState(true);
  const [province, setProvince] = useState(String);
  const [city, setCity] = useState(String);
  const [district, setDistrict] = useState(String);
  const [subDistrict, setSubDistrict] = useState(String);
  const [agreement, setAgreement] = useState(false);
  const [password, setPassword] = useState(String);
  const [passwordConfirm, setPasswordConfirm] = useState(String);

  const [evidence, setEvidence] = useState(String);
  const [evidenceFile, setEvidenceFile] = useState(String);

  // DATA DIRI
  const [firstName, setFirstName] = useState(String);
  const [lastName, setLastName] = useState(String);
  const [gender, setGender] = useState(String);
  const [email, setEmail] = useState(String);
  const [phone, setPhone] = useState(String);
  const [address, setAddress] = useState(String);

  // DOKUMEN
  const [fullname, setFullname] = useState(String);
  const [birthdate, setBirthdate] = useState(String);
  const [numberKTP, setNumberKTP] = useState(String);
  const [fotoProfil, setFotoProfil] = useState(String);
  const [fotoKTP, setFotoKTP] = useState(String);
  const [fotoSelfieKTP, setFotoSelfieKTP] = useState(String);
  const [vehicle, setVehicle] = useState(String);
  const [fotoSTNK, setFotoSTNK] = useState(String);
  const [fotoSTNKOtherSide, setFotoSTNKOtherSide] = useState(String);
  const [fotoFrontVehicle, setFotoFrontVehicle] = useState(String);
  const [fotoBesideVehicle, setFotoBesideVehicle] = useState(String);

  // AKUN BANK
  const [bankAccountName, setBankAccountName] = useState(String);
  const [bankName, setBankName] = useState(String);
  const [bankAccountNumber, setBankAccountNumber] = useState(String);
  const [fotoBukuRekening, setFotoBukuRekening] = useState(String);

  const [dataStep, setDataStep] = useState([
    {
      title: 'Data Diri',
      isStep: true
    },
    {
      title: 'Dokumen',
      isStep: false
    },
    {
      title: 'Akun Bank',
      isStep: false
    }
  ]);
  const [indexStep, setIndexStep] = useState(0);

  const onChangeProvince = (v) => {
    setProvince(v);
    setCity(null);
    setDistrict(null);
    setSubDistrict(null);
    if (v) {
      props.getListCities({ province_id: v });
      setAreaId(v);
    }
  }

  const onChangeCity = (v) => {
    setCity(v);
    setDistrict(null);
    setSubDistrict(null);
    if (v) {
      props.getListDistricts({ city_id: v });
      setAreaId(v);
    } else {
      if (isInit) {
        setCity(dataDetail.city_id);
      }
    }
  }

  const onChangeDistrict = (v) => {
    setDistrict(v);
    setSubDistrict(null);
    if (v) {
      props.getListSubDistricts({ district_id: v });
      setAreaId(v);
    } else {
      if (isInit) {
        setDistrict(dataDetail.district_id);
      }
    }
  }

  const onChangeSubDistrict = (v) => {
    setSubDistrict(v);
    if (v) {
      setAreaId(v);
    } else {
      if (isInit) {
        setSubDistrict(dataDetail.sub_district_id);
        setIsInit(false);
      }
    }
  }

  const checkKTA = () => {
    props.checkKTANumber({ kta_number: numberKTA }, props)
  }

  const redirectRegisterNotMember = () => {
    setIsNotMember(true);
  }

  const submitRegisterNotMember = () => {
    const payload = {
      email: email,
      phone: '+62' + phone,
      fullname: fullname,
      gender: gender,
      birth_date: Moment(birthdate).format('YYYY-MM-DD'),
      password: password,
      province_id: province,
      city_id: city,
      district_id: district,
      sub_district_id: subDistrict
    }
    if (password == passwordConfirm) {
      if (agreement) {
        props.storeProfile(payload, props);
      } else {
        ToastAndroid.show('Pastikan kamu menyetujui syarat & ketentuan serta kebijakan privasi penggunaaan aplikasi ini', ToastAndroid.SHORT);
      }
    }
  }

  const submitRegisterIsMember = () => {
    const payload = {
      kta_number: props.route?.params?.kta_number,
      code: props.route?.params?.code,
      password: password
    }
    if (password == passwordConfirm) {
      props.storeProfile(payload, props, props.route?.params?.isMember);
    }
  }

  const onShoot = (type = null) => {
    ImagePicker.openCamera({
      width: 1000,
      height: 1000,
      compressImageQuality: 0.8,
      cropping: false,
      includeBase64: true,
    }).then(image => {
      if (image?.data) {

        if (type === 'profil') {
          setFotoProfil(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'KTP') {
          setFotoKTP(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'selfieKTP') {
          setFotoSelfieKTP(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'STNK1') {
          setFotoSTNK(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'STNK2') {
          setFotoSTNKOtherSide(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'frontVehicle') {
          setFotoFrontVehicle(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'besideVehicle') {
          setFotoBesideVehicle(`data:${image.mime};base64,${image.data}`);
        } else if (type === 'bukuRekening') {
          setFotoBukuRekening(`data:${image.mime};base64,${image.data}`);
        }
      }
    });
  }

  const _renderPhotoContainer = ({ label, type, placeholder, file }) => {
    return (
      <View style={{ flexDirection: 'column', flex: 1, margin: 10 }}>
        <Text size={16} color={'#666'} style={{ marginBottom: 5 }}>{label}</Text>
        <Pressable onPress={() => onShoot(type)}>
          { !file ?
            <View style={styles.btnUploadImg}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, padding: 20 }}>
                  <Text color={'#BDBDBD'} style={{ textAlign: 'center' }}>{placeholder}</Text>
                </View>
            </View> :
            <View style={styles.btnUploadImg}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                <Image
                  source={{ uri: file }}
                  style={styles.imageContainer}
                />
              </View>
            </View>
          }
        </Pressable>
      </View>
    )
  }

  const nextStep = () => {
    if (indexStep === dataStep.length-1) {
      props.navigation?.reset({
        index: 0,
        routes: [{ name: 'Login Dashboard' }, { name: 'Assessment' }],
      });
    } else {
      let addStep = false;
      const newStep = dataStep.map((item, i) => {
        if (!addStep && !item.isStep) {
          item.isStep = addStep = true;
          setIndexStep(i);
        }
        return item;
      });
      setDataStep(newStep);
    }
  }

  const _renderDetailStep = () => {
    if (indexStep == 0) {
      return(
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="Nama Depan"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setFullname}
                value={fullname}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="Nama Belakang"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setFullname}
                value={fullname}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', display: 'flex' }}>
                <Text style={{ fontSize: 14, color: '#666', marginLeft: 10, marginVertical: 10 }}>Jenis Kelamin</Text>
                <RadioForm
                  radio_props={genderList}
                  initial={genderList.findIndex((v) => v.value == gender)}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={colors.primaryColor}
                  buttonSize={12}
                  selectedButtonColor={colors.primaryColor}
                  animation={false}
                  style={styles.radioStyle}
                  buttonWrapStyle={{ marginRight: 20 }}
                  labelStyle={styles.radioLabelStyles}
                  onPress={setGender}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="Email"
                keyboardType={'email-address'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setEmail}
                value={email}
                autoCapitalize={'none'}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="No. Handphone"
                placeholder2="08xxxxxxxxxxx"
                keyboardType={'number-pad'}
                flexItem={{ flex: 1 }}
                style={styles.inputStyle}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setPhone}
                value={phone}
              />
            </View>
            <View style={styles.inputContainer}>
                <View style={{ flexDirection: 'column', flexGrow: 1, paddingHorizontal: 10, marginBottom: 10 }}>
                  <Text size={16} color={'#666'} style={{ marginBottom: 5 }}>Alamat</Text>
                  <TextInput
                    placeholder={'Masukan Alamat Tempat Tinggal Kamu'}
                    placeholderTextColor={'#b2b2b2'}
                    underlineColorAndroid='transparent'
                    style={[styles.inputMultiline]}
                    onChangeText={setAddress}
                    value={address}
                    autoCapitalize='none'
                    autoCorrect={false}
                    numberOfLines={3}
                    multiline
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Select
                  isSquare
                  isSquareLabel
                  items={props.provinces}
                  placeholder='Provinsi'
                  iteratorKey={'id'}
                  iteratorLabel={'name'}
                  value={province}
                  onValueChange={onChangeProvince}
                />
              </View>
              <View style={styles.inputContainer}>
                <Select
                  isSquare
                  isSquareLabel
                  items={props.cities}
                  placeholder='Kota/Kabupaten'
                  iteratorKey={'id'}
                  iteratorLabel={'name'}
                  value={city}
                  onValueChange={onChangeCity}
                />
              </View>
              <View style={styles.inputContainer}>
                <Select
                  isSquare
                  isSquareLabel
                  items={props.districts}
                  placeholder='Kecamatan'
                  iteratorKey={'id'}
                  iteratorLabel={'name'}
                  value={district}
                  onValueChange={onChangeDistrict}
                />
              </View>
              <View style={styles.inputContainer}>
                <Select
                  isSquare
                  isSquareLabel
                  items={props.subDistricts}
                  placeholder='Kelurahan/Desa'
                  iteratorKey={'id'}
                  iteratorLabel={'name'}
                  value={subDistrict}
                  onValueChange={onChangeSubDistrict}
                />
              </View>

          </View>
        </View>
      );
    } else if (indexStep == 1) {
      return(
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="Nama Sesuai KTP"
                placeholder2="Masukan Nama Sesuai KTP"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setFullname}
                value={fullname}
              />
            </View>
            <View style={styles.inputContainer}>
              <Datepicker
                isSquare
                isSquareLabel
                style={styles.datePickerStyle}
                placeholder={'Tanggal Lahir'}
                placeholder2={'DD/MM/YYYY'}
                formatDate={'DD/MM/YYYY'}
                date={birthdate}
                onDateChange={setBirthdate}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="No. KTP"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setNumberKTP}
                value={numberKTP}
              />
            </View>

            {_renderPhotoContainer({
              label: 'Foto Profil',
              type: 'profil',
              placeholder: 'Klik disini untuk unggah Foto Profil',
              file: fotoProfil
            })}

            {_renderPhotoContainer({
              label: 'Foto KTP',
              type: 'KTP',
              placeholder: 'Klik disini untuk unggah KTP',
              file: fotoKTP
            })}

            {_renderPhotoContainer({
              label: 'Foto Selfie Dengan KTP',
              type: 'selfieKTP',
              placeholder: 'Klik disini untuk unggah Foto Selfie dengan KTP',
              file: fotoSelfieKTP
            })}

            <View style={styles.inputContainer}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', display: 'flex' }}>
                <Text style={{ fontSize: 14, color: '#666', marginLeft: 10, marginVertical: 10 }}>Jenis Kendaraan</Text>
                <RadioForm
                  radio_props={vehicleList}
                  initial={vehicleList.findIndex((v) => v.value == vehicle)}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={colors.primaryColor}
                  buttonSize={12}
                  selectedButtonColor={colors.primaryColor}
                  animation={false}
                  style={styles.radioStyle}
                  buttonWrapStyle={{ marginRight: 20 }}
                  labelStyle={styles.radioLabelStyles}
                  onPress={setVehicle}
                />
              </View>
            </View>

            {_renderPhotoContainer({
              label: 'Foto STNK sisi 1',
              type: 'STNK1',
              placeholder: 'Klik disini untuk unggah STNK (Sisi 1)',
              file: fotoSTNK
            })}

            {_renderPhotoContainer({
              label: 'Foto STNK sisi 2',
              type: 'STNK2',
              placeholder: 'Klik disini untuk unggah STNK (Sisi 2)',
              file: fotoSTNKOtherSide
            })}

            {_renderPhotoContainer({
              label: 'Foto Kendaraan Tampak Depan',
              type: 'frontVehicle',
              placeholder: 'Klik disini untuk unggah Foto Kendaraan (Tampak Depan)',
              file: fotoKTP
            })}

            {_renderPhotoContainer({
              label: 'Foto Kendaraan Tampak Samping',
              type: 'besideVehicle',
              placeholder: 'Klik disini untuk unggah Foto Kendaraan (Tampak Samping)',
              file: fotoKTP
            })}

          </View>
        </View>
      );
    } else {
      return(
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="Nama Pada Akun Bank"
                placeholder2="Masukan Nama Pada Akun Bank"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setBankAccountName}
                value={bankAccountName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Select
                isSquare
                isSquareLabel
                items={props.subDistricts}
                placeholder='Nama Bank'
                iteratorKey={'id'}
                iteratorLabel={'name'}
                value={subDistrict}
                onValueChange={onChangeSubDistrict}
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                isSquare
                isSquareLabel
                placeholder="No. Akun Bank"
                placeholder2="Masukan Nomor Rekening"
                keyboardType={'default'}
                flexItem={{ flex: 1 }}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setBankAccountNumber}
                value={bankAccountNumber}
              />
            </View>

            {_renderPhotoContainer({
              label: 'Foto Buku Rekening',
              type: 'bukuRekening',
              placeholder: 'Klik disini untuk unggah Buku Rekening',
              file: fotoBukuRekening
            })}

          </View>
        </View>
      );
    }
  }

  return (
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', alignItems: 'center', flexGrow: 1, width: '100%', backgroundColor: 'white' }}>

        <View style={{ width: width, height: 120, position: 'absolute', backgroundColor: 'white', elevation: 0.1 }}>
          <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center' }}>
            <Text size={22} color={'#333'} bold>Pendaftaran Partner</Text>
          </View>

          <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <View style={{ width: width-120, borderBottomWidth: 3, borderBottomColor: colors.primaryColor, marginTop: 15 }}>
            </View>
            <View style={{ width: width-80, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 5 }}>
              { dataStep.map((item, i) => {
                return(
                  <View key={item.title} style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }} >
                    <View style={{ width: 20, height: 20, borderRadius: 15, backgroundColor: item.isStep ? colors.primaryColor : 'white',
                    borderWidth: 3, borderColor: colors.primaryColor, marginBottom: 5 }} />
                    <Text size={12} color={'#333'}>{item.title}</Text>
                  </View>
                );
                })
              }
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={{ width: width, paddingTop: 120, alignItems: 'center', position: 'relative' }}>
          {_renderDetailStep()}

          <View style={{ width: width-80, marginVertical: 10 }}>
            <Button
              style={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => nextStep()}
            >
              {indexStep === dataStep.length-1 ? 'Daftar' : 'Lanjutkan'}
            </Button>
          </View>

        </ScrollView>

      </View>
    </ImageBackground>
  )
}
