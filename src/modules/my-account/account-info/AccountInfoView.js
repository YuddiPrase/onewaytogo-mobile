import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Modal,
  RefreshControl,
  TextInput,
} from 'react-native';
import Moment from 'moment';
import RadioForm from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';

import {
  Input,
  Button,
  Datepicker
} from '@components';
import { Text } from '@components/StyledText';
import { colors } from '@styles';

import styles from './Styles';


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

export default function AccountInfoScreen(props) {

	const [isVisibleModalVKTA, setIsVisibleModalVKTA] = useState(false);
	const [isImageProfile, setIsImageProfile] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);

  const [nik, setNIK] = useState(props?.userData?.nik);
  const [username, setUsername] = useState(props?.userData?.username);
  const [fullname, setFullname] = useState(props?.userData?.fullname);
  const [phone, setPhone] = useState(props?.userData?.phone ? props?.userData?.phone.replace(/^\+62|\+62$/gm,'') : props?.userData?.phone);
  const [birthdate, setBirthdate] = useState(props?.userData?.birth_date ? new Date(props?.userData?.birth_date) : String);
  const [gender, setGender] = useState(props?.userData?.gender);
  const [address, setAddress] = useState(props?.userData?.address);
  const [status, setStatus] = useState(props?.userData?.status);
  const [ktaNumber, setKTANumber] = useState(props?.userData?.kta_number);
  const [level, setLevel] = useState(props?.userData?.level);
  const [membership, setMembership] = useState(props?.userData?.membership);
  const [profession, setProfession] = useState(props?.userData?.profession_name);
  const [education, setEducation] = useState(props?.userData?.education_name);
  const [imageUser, setImageUser] = useState(props?.userData?.image_url);
  const [oldPassword, setOldPassword] = useState(String);
  const [newPassword, setNewPassword] = useState(String);
  const [confirmNewPassword, setConfirmNewPassword] = useState(String);

  const [isEdit, setIsEdit] = useState(false);
  const [refScroll, setRefScroll] = useState(null);

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

	const refreshView = async () => {
		setIsRefreshing(true);
    await props.getUser();
    setIsRefreshing(false);
	}

  const submit = async () => {
    if (isEdit) {
      const body = {
        _method: 'PUT',
        kta_number: ktaNumber,
        username: username,
        nik: nik,
        fullname: fullname,
        birth_date: Moment(birthdate).format('YYYY-MM-DD'),
        gender: gender,
        phone: phone,
        image: imageUser,
        address: address,
        old_password: oldPassword,
        password: newPassword
      }
      if (newPassword === confirmNewPassword) {
        await props.updateProfile(body, props);
        setIsEdit(false);
      }
    } else {
      scrollToTop();
      setIsEdit(true);
    }
  }

  const scrollToBottom = () => {
    if (refScroll) {
      try {
        refScroll.scrollToEnd();
        setTimeout(() => {
          refScroll.scrollToEnd();
        }, 500);
      } catch (ex) {}
    }
  }

  const scrollToTop = () => {
    if (refScroll) {
      try {
        refScroll.scrollTo({ x:0, y: 0, animated: true });
        setTimeout(() => {
          refScroll.scrollTo({ x:0, y: 0, animated: true });
        }, 500);
      } catch (ex) {}
    }
  }

  const uploadFoto = (event = null) => {
    if (event === 'gallery') {
      ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.8,
        includeBase64: true,
      }).then(image => {
        if (image?.data) {
          setImageUser(`data:${image.mime};base64,${image.data}`);
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
          setImageUser(`data:${image.mime};base64,${image.data}`);
        }
      });
    }
  }

  const startVerification = () => {
      // setIsFormBar(true);
      // setStatusForm('Verifikasi KTA');
    props.navigation?.navigate('Verifikasi KTA');
  }

  const onErrorImageProfile = (err) => {
    setIsImageProfile(false);
  }

  const _renderImageProfile = () => {
		if (isImageProfile && props.userData?.image_url) {
			return (<Image
				style={{ width: 99, height: 99, borderRadius: 50 }}
				source={{ uri: props.userData?.image_url }}
				resizeMode={'cover'}
        onError={onErrorImageProfile.bind(this)}
			/>);
		}
		return (<Image
			style={{ width: 99, height: 99, borderRadius: 50 }}
			source={require('@images/avatar2.png')}
			resizeMode={'cover'}
		/>);
	}

  const renderModalVKTA = () => {
    return (
      <Modal
      visible={isVisibleModalVKTA}
      transparent
      onRequestClose={() => setIsVisibleModalVKTA(false)}
      >
        <View>

        </View>
      </Modal>
    );
  }

  const RenderStatusAccountInfo = () => {
    if (!isEdit) {
      if (props?.userData?.status_account == 'unverified') {
        return (
          <View style={[styles.inputContainer, { padding: 16, margin: 24, marginBottom: 0, borderRadius: 15, backgroundColor: colors.primaryColor, elevation: 3, shadowRadius: 10, }]}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
              <Text size={14} color={'white'} style={{ textAlign: 'center' }}>Akun kamu belum terverifikasi, silakan masukan Nomor Kartu Tanda Anggota (KTA Number) yang sudah kamu miliki.</Text>
              <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={startVerification}>
                <View style={{ backgroundColor: colors.primaryGreen, paddingVertical: 5, paddingHorizontal: 15, borderRadius: 25 }}>
                  <Text size={16} color={'white'}>Mulai Verifikasi</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else if (props?.userData?.status_account == 'pending-verify') {
        return (
          <View style={[styles.inputContainer, { padding: 16, margin: 24, marginBottom: 0, borderRadius: 15, backgroundColor: '#EA9A40', elevation: 3, shadowRadius: 10, }]}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
              <Text size={16} color={'white'} style={{ textAlign: 'center' }}>Akun kamu sedang dalam proses verifikasi.</Text>
            </View>
          </View>
        );
      } else if (props?.userData?.status_account == 'reject-verify') {
        return (
          <View style={[styles.inputContainer, { padding: 16, margin: 24, marginBottom: 0, borderRadius: 15, backgroundColor: '#EA2020', elevation: 3, shadowRadius: 10, }]}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 8 }}>
              <Text size={14} color={'white'} style={{ textAlign: 'center' }}>Maaf, kami tidak dapat memverifikasi akun kamu, silakan masukan kembali Nomor Kartu Tanda Anggota (KTA Number) yang sudah kamu miliki atau hubungi Admin CS.</Text>
              <TouchableOpacity style={{ marginTop: 10, alignSelf: 'center' }} onPress={startVerification}>
                <View style={{ backgroundColor:'white', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 25 }}>
                  <Text size={16} color={'#EA2020'}>Mulai Verifikasi Ulang</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    return null;
  }

  return (
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
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
            <Text size={20} bold={true} color={'#333'}>Account Info</Text>
          </Pressable>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 0 }}>
        <ScrollView
          ref={(s) => setRefScroll(s)}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              // this.handleLoadMoreIndex();
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshView}
            />
          }
          keyboardShouldPersistTaps='handled'
        >
          { !isEdit ?
          <View style={{ marginHorizontal: 20, marginTop: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 60, width: 100, height: 100, backgroundColor: 'rgb(250,250,250)', borderWidth: 1, borderColor: '#ddd' }}>
                  {props.userData?.image_url ? _renderImageProfile() : null}
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
                  <Text bold size={20} color={'#333'}>{props.userData?.fullname}</Text>
                  <Text bold size={16} color={'#333'}>{props.userData?.phone}</Text>
                </View>
              </View>
            </View>
          </View>
          : null}
          <RenderStatusAccountInfo/>
          <View style={[{ margin: 20 }]}>
            {!isEdit ?
            <View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Username'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  value={props?.userData?.username}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  isSquareLabelPhone
                  placeholder={'Phone'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setPhone}
                  value={props?.userData?.phone?.replace(/^\+62|\+62$/gm,'')}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Tanggal Lahir'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  value={props?.userData?.birthdate}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Jenis Kelamin'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  value={props?.userData?.gender}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Alamat'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  value={props?.userData?.address}
                  editable={false}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Status'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  value={props?.userData?.status}
                  editable={false}
                />
              </View>
            </View> :
            <View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Username'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  onChangeText={setUsername}
                  value={username}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder={'Fullname'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
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
                    formHorizontal={true}
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
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  isSquareLabelPhone
                  placeholder={'Phone'}
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
                  <Text size={14} color={'#666'} style={{ marginBottom: 5 }}>Alamat</Text>
                  <TextInput
                    placeholder={'Alamat'}
                    underlineColorAndroid='transparent'
                    style={styles.inputMultiline}
                    onChangeText={setAddress}
                    value={address}
                    autoCapitalize='none'
                    autoCorrect={false}
                    numberOfLines={3}
                    multiline
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', flex: 1, margin: 10, }}>
                <View style={[styles.btnUploadImg, { marginRight: 5, paddingVertical: 10 }]}>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1,}}>
                      <Text color={'#666'}>Upload Foto</Text>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 10, width: '100%' }}>
                        <TouchableOpacity onPress={uploadFoto} style={{ borderRadius: 15, padding: 10, paddingHorizontal: 20, backgroundColor: '#ddd', elevation: 3 }}>
                          <Icon
                            name={'camera'}
                            size={32}
                            style={[
                              { width: 30, height: 30, color: colors.primaryGreen }
                            ]}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => uploadFoto('gallery')} style={{ borderRadius: 15, padding: 10, paddingHorizontal: 20, backgroundColor: '#ddd', elevation: 3, marginLeft: 10 }}>
                          <Icon
                            name={'camera-image'}
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

              {imageUser ?
              <View style={{ flexDirection: 'row', flex: 1, margin: 15, }}>
                <TouchableOpacity onPress={() => uploadFoto('gallery')} style={{ flex: 1, }}>
                  <View style={[styles.btnUploadImg, { marginRight: 5, borderWidth: 0 }]}>
                      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, height: 250, }}>
                        { imageUser ? <Image
                          source={{ uri: imageUser }}
                          style={styles.imageContainer}
                        /> : null}
                      </View>
                  </View>
                </TouchableOpacity>
              </View>
              : null}
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="Password Saat Ini"
                  keyboardType={'default'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  secureTextEntry={true}
                  onChangeText={setOldPassword}
                  value={oldPassword}
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="Password Baru"
                  keyboardType={'default'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  secureTextEntry={true}
                  onChangeText={setNewPassword}
                  value={newPassword}
                  autoCapitalize={'none'}
                />
              </View>
              <View style={styles.inputContainer}>
                <Input
                  isSquare
                  isSquareLabel
                  placeholder="Konfirmasi Password Baru"
                  keyboardType={'default'}
                  flexItem={{ flex: 1 }}
                  style={styles.inputStyle}
                  placeholderTextColor={'#b2b2b2'}
                  secureTextEntry={true}
                  onChangeText={setConfirmNewPassword}
                  value={confirmNewPassword}
                  error={confirmNewPassword !== newPassword ? 'Password Tidak Sama' : null}
                />
              </View>
            </View>
            }

            <Button
              style={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => submit()}
              loader={props.isLoading}
            >
              {isEdit ? 'SIMPAN' : 'EDIT'}
            </Button>

            {isEdit ?
            <Button
              style={[styles.buttonStyle, { backgroundColor: 'red' }]}
              textStyle={styles.textStyle}
              onPress={() => setIsEdit(false)}
            >
              BATALKAN
            </Button>
            : null}

          </View>
        </ScrollView>
      </View>
    </View>
    {/* <Loader visible={props.isLoading}/> */}
  </ImageBackground>
  );
}
