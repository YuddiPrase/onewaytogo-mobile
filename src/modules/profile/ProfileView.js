import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { Text } from '@components/StyledText';
import {
  Loader,
  Button
} from '@components';
import { setAuthorization } from '@helpers/Storage';
import { colors } from '@styles';

import styles from './Styles';

const { width, height } = Dimensions.get('window');

export default function ProfileScreen(props) {

	const [isImageProfile, setIsImageProfile] = useState(true);

  const logout = () => {
    const onLogout = async () => {
      try {
        // await props.logout(props);
        await props.navigation?.replace('Login Dashboard');
      } catch (ex) {
        setAuthorization('removeToken');
        props.navigation?.replace('Login Dashboard');
      }
    }
    Alert.alert(
      'Logout',
      'Apa anda yakin ingin keluar akun?',
      [
        {
          text: 'Ya, keluar',
          onPress: () => { onLogout(); }
        },
        {
          text: 'Tidak',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  const redirectTo = (value) => {
    try {
      props.navigation?.navigate(value);
		} catch (ex) {
			console.warn('EX', ex)
		}
  }

  const onErrorImageProfile = (err) => {
    setIsImageProfile(false);
  }

	const _renderTopHeaderDashboard = () => {
		return (
			<View
				style={{
					// backgroundColor: colors.secondaryColor,
					width: width,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					position: 'absolute',
					elevation: 0.1,
					height: 90,
					overflow: 'hidden'
				}}
			>
      <ImageBackground
        source={require('@images/bg/polygon-background.png')}
        style={{ width: width, height: 319, position: 'absolute', top: 0, left: 0 }}
        resizeMode="cover"
      >
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 15, marginTop: 30, flex: 1, height: 80 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ flexDirection: 'column', alignItems: 'center' }}>
            	<Image
								resizeMode="contain"
								style={{ width: 110, height: 30 }}
								source={require('@images/logo/sicepat-owtg.png')}
							/>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',
							marginTop: 5
						}}
					>
						<View style={{ marginLeft: 5 }}>
							{props.userData?.notif_unread_count > 0 ? <View style={styles.badgeNotifContainer}>
								<Text color={'white'}>
									{props.userData?.notif_unread_count > 9 ? '9+' : props.userData?.notif_unread_count}
								</Text>
							</View> : null}
							<Pressable>
								<Icon
									name={'bell'}
									size={24}
									style={[
										{ width: 24, height: 24, color: 'white'}
									]}
								></Icon>
							</Pressable>
						</View>
					</View>
				</View>
				</ImageBackground>
			</View>
		);
	}

  const _renderHeaderDashboard = () => {
		return (
			<View
				style={{
					// backgroundColor: colors.secondaryColor,
					width: width,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					height: 319,
				}}
			>
        <ImageBackground
          source={require('@images/bg/polygon-background.png')}
          style={{ width: width, position: 'relative', top: 0, left: 0, height: 319 }}
          resizeMode="cover"
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 10, borderWidth: 1 }}>
            {_renderImageProfile()}
          </View>
        </ImageBackground>
			</View>
		);
	}

	const _renderImageProfile = () => {
		return (
    <View style={{ borderWidth: 3, borderColor: 'white', borderRadius: 100, backgroundColor: 'white', elevation: 5 }}>
      <Image
        style={styles.imageProfile}
        source={require('@images/avatar2.png')}
        resizeMode={'cover'}
      />
    </View>);
	}

  const RenderStatusAccount = () => {
    if (props.userData?.status_account == 'unverified') {
      return (
        <View style={{ padding: 5, paddingHorizontal: 8, borderRadius: 5, backgroundColor: colors.primaryColor, marginHorizontal: 5 }}>
          <Text size={11} color={'white'}>{props.userData?.status_account_indo}</Text>
        </View>
      )
    } else if (props.userData?.status_account == 'pending-verify') {
      return (
        <View style={{ padding: 5, paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#EA9A40', marginHorizontal: 5 }}>
          <Text size={11} color={'white'}>{props.userData?.status_account_indo}</Text>
        </View>
      )
    } else if (props.userData?.status_account == 'reject-verify') {
      return (
        <View style={{ padding: 5, paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#EA2020', marginHorizontal: 5 }}>
          <Text size={11} color={'white'}>{props.userData?.status_account_indo}</Text>
        </View>
      )
    } else if (props.userData?.status_account == 'verified') {
      return (
        <View style={{ padding: 5, paddingHorizontal: 8, borderRadius: 5, backgroundColor: '#00aa00', marginHorizontal: 5 }}>
          <Text size={11} color={'white'}>{props.userData?.status_account_indo}</Text>
        </View>
      )
    }
    return null;
  }

  return (
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', flex: 1, width: '100%', backgroundColor: 'white' }}>
        {_renderTopHeaderDashboard()}
				{/* <ImageBackground
					source={null}
					resizeMode="cover"
					imageStyle={{}}
          style={{
            width: width,
            backgroundColor: 'transparent',
            height: 120,
          }}
				>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', }}>
              <View style={{ padding: 10, }}>
                {_renderImageProfile()}
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Text bold={true} size={20} color={'#333'} style={{ marginRight: 5 }}>
                  {props.userData?.fullname || 'Anonymous'}
                  </Text>
                  {props.userData?.role_type == 'member' ? <Icon name={'shield-check'} size={15} style={[{ width: 15, height: 15, color: '#00aa00'}]} /> : null}
                </View>
                <View>
                  <Text color={'#444'}>
                  {props.userData?.area_name || 'Undefined'}
                  </Text>
                </View>
            </View>
            </View>
          </View>
        </ImageBackground> */}
        <ScrollView
          contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center',  }}
        >
            {_renderHeaderDashboard()}
            <View style={{ marginTop: -90, marginBottom: 30, marginLeft: 20, alignSelf: 'flex-start'}}>
              <Text size={12} color={'#F2F2F2'} bold>
                Info Pengguna
              </Text>
            </View>
            <View style={{ borderRadius: 8, width: width-40, marginTop: -20, padding: 20, backgroundColor: 'white', elevation: 3, marginBottom: 20 }}>
              <View style={{ flexDirection: 'column', marginBottom: 12, borderBottomColor:'#F2F2F2', borderBottomWidth: 2, paddingBottom: 5 }}>
                <Text size={12} color={'#BDBDBD'} bold>Nama</Text>
                <Text size={14} color={'#4F4F4F'} style={{ marginTop: 5 }}>Yuddi Prasetyo</Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 12, borderBottomColor:'#F2F2F2', borderBottomWidth: 2, paddingBottom: 5 }}>
                <Text size={12} color={'#BDBDBD'} bold>TTL</Text>
                <Text size={14} color={'#4F4F4F'} style={{ marginTop: 5 }}>Jakarta, 30 September 1998</Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 12, borderBottomColor:'#F2F2F2', borderBottomWidth: 2, paddingBottom: 5 }}>
                <Text size={12} color={'#BDBDBD'} bold>No. KTP</Text>
                <Text size={14} color={'#4F4F4F'} style={{ marginTop: 5 }}>3302260456430001</Text>
              </View>
              <View style={{ flexDirection: 'column', marginBottom: 12, borderBottomColor:'#F2F2F2', borderBottomWidth: 2, paddingBottom: 5 }}>
                <Text size={12} color={'#BDBDBD'} bold>Email</Text>
                <Text size={14} color={'#4F4F4F'} style={{ marginTop: 5 }}>yyuuddii@mail.com</Text>
              </View>
              <View style={{ flexDirection: 'column', paddingBottom: 5, borderBottomColor:'#F2F2F2', borderBottomWidth: 2 }}>
                <Text size={12} color={'#BDBDBD'} bold>Handphone</Text>
                <Text size={14} color={'#4F4F4F'} style={{ marginTop: 5 }}>0812123456789</Text>
              </View>
            </View>
        </ScrollView>
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 10 }}>
          <Button
            styleType={'secondary'}
            style={styles.buttonStyle}
            onPress={() => logout()}
          >
            Keluar
          </Button>
        </View>
      </View>
      <Loader visible={props.isLoading}/>
  </ImageBackground>
  );
}
