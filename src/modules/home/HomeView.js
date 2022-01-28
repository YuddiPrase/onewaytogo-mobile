import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
	Image,
	ScrollView,
	Pressable,
	RefreshControl,
	StatusBar
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Entypo';

import {
	MenuItem,
	Button
} from '@components';
import { colors } from '@styles';

import styles from './Styles';
import { Text } from '../../components/StyledText';
import menus from './Menus';
import moment from 'moment';
import 'moment/locale/id';
import { ActivityIndicator } from 'react-native-paper';

const { width } = Dimensions.get('window');

export default function HomeScreen(props) {

	const [isCourierStatus, setIsCourierStatus] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [dataTaskOnGoing, setDataTaskOnGoing] = useState([
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500232123',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500232123',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500492112',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Dalam Pengiriman',
      color: '#F2994A',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      telp_penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Dalam Pengiriman',
      color: '#F2994A',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Kelapa Dua',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Kelapa Dua',
      penerima: 'Nouval Kurnia Firdaus',
      telp_penerima: '0812321654987',
      status: 'Berhasil Diantar',
      color: '#219653',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    }
	]);

	moment.locale('id');

	const refreshView = async () => {
		setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
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
				<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 95, margin: 16, padding: 16, backgroundColor: 'rgba(250,250,250,0.25)', borderRadius: 8 }}>
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'white', borderBottomWidth: 2, paddingBottom: 5 }}>
						<View style={{ flexDirection: 'column' }}>
							<Text size={14} color={'white'} bold>Yuda Samudra</Text>
							<Text size={12} color={'white'}>Status Partner: <Text bold>Aktif </Text></Text>
						</View>
						<View style={{ flexDirection: 'column', alignItems: 'flex-end'}}>
							<Text size={10} color={'white'}>Penilaian</Text>
							<View style={{ flexDirection: 'row', marginTop: 3 }} >
								<Image
									resizeMode="contain"
									style={{ width: 20, height: 20 }}
									source={require('@images/icons/star-fill.png')}
								/>
								<Image
									resizeMode="contain"
									style={{ width: 20, height: 20 }}
									source={require('@images/icons/star-fill.png')}
								/>
								<Image
									resizeMode="contain"
									style={{ width: 20, height: 20 }}
									source={require('@images/icons/star-fill.png')}
								/>
								<Image
									resizeMode="contain"
									style={{ width: 20, height: 20 }}
									source={require('@images/icons/star-fill.png')}
								/>
								<Image
									resizeMode="contain"
									style={{ width: 20, height: 20 }}
									source={require('@images/icons/star-unfill.png')}
								/>
							</View>
						</View>
					</View>
					<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
						<View style={{ flexDirection: 'column' }}>
							<View style={{ flexDirection: 'column' }}>
								<Text size={10} color={'white'}>Deposit</Text>
								<Text size={12} color={'white'} bold>Rp 100.000</Text>
							</View>
							<View style={{ flexDirection: 'column', marginTop: 5 }}>
								<Text size={10} color={'white'}>Penghasilan</Text>
								<Text size={12} color={'white'} bold>Rp 78.900</Text>
							</View>
						</View>
						<View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
								<Text size={10} color={'white'}>Saldo Kamu</Text>
								<Text size={24} color={'white'} bold>Rp 178.900</Text>
						</View>
					</View>
				</View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 15 }}>
					<View style={{ marginHorizontal: 5 }}>
						<Pressable style={{ flexDirection: 'column', alignItems: 'center'}}>
							<Image
								resizeMode="contain"
								style={{ width: 32, height: 32, marginBottom: 5 }}
								source={require('@images/icons/deposit.png')}
							/>
							<Text size={12} color={'white'}>Tambah Deposit</Text>
						</Pressable>
					</View>
					<View style={{ marginHorizontal: 5 }}>
						<Pressable style={{ flexDirection: 'column', alignItems: 'center'}}>
							<Image
								resizeMode="contain"
								style={{ width: 32, height: 32, marginBottom: 5 }}
								source={require('@images/icons/withdrawl.png')}
							/>
							<Text size={12} color={'white'}>Penarikan</Text>
						</Pressable>
					</View>
				</View>
				</ImageBackground>
			</View>
		);
	}

	const renderHeaderDashboard = () => {
		return (
			<View
				style={{
					backgroundColor: colors.secondaryColor,
					width: width,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingVertical: 10, flex: 1, height: 80 }}>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
						<View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            	<Image
								resizeMode="contain"
								style={{ width: 25, height: 25 }}
								source={require('@images/logo/sicepat.png')}
							/>
							<Text size={12} color={'white'}>
								Status: { isCourierStatus ? 'Aktif' : <Text size={12} color={'#bbb'}>Tidak Aktif</Text> }
							</Text>
						</View>
					</View>
					<View
						style={{
							flexDirection: 'row',

						}}
					>
						<View style={{ marginLeft: 5 }}>
							<Pressable onPress={() => { props.navigation?.navigate('Notifikasi')}}>
								<Icon
									name={'back-in-time'}
									size={24}
									style={[
										{ width: 32, height: 32, color: 'white'}
									]}
								></Icon>
							</Pressable>
						</View>
						<View style={{ marginLeft: 5 }}>
							{props.userData?.notif_unread_count > 0 ? <View style={styles.badgeNotifContainer}>
								<Text color={'white'}>
									{props.userData?.notif_unread_count > 9 ? '9+' : props.userData?.notif_unread_count}
								</Text>
							</View> : null}
							<Pressable onPress={() => { props.navigation?.navigate('Notifikasi')}}>
								<Icon
									name={'bell'}
									size={24}
									style={[
										{ width: 32, height: 32, color: 'white'}
									]}
								></Icon>
							</Pressable>
						</View>
					</View>
				</View>
			</View>
		);
	}

	const _renderStatusReason = () => {
		return (
			<View style={{ flexDirection: 'row' }}>

				<View style={{ flexDirection: 'column', width: width - 40, backgroundColor: 'yellow', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, elevation: 3, padding: 15 }}>
					<Text size={12} color={colors.primaryColor} bold>Minimal deposit Rp 100.000 untuk mengaktifkan status kamu.</Text>
				</View>

			</View>
		)
	}

	const _renderRecommendation = () => {
		return (
			<View style={{ width: width, padding: 20 }}>

				<View style={{ flexDirection: 'row', backgroundColor: '#2F80ED', borderRadius: 10, elevation: 3, padding: 5, flexWrap: 'nowrap' }}>

					<View style={{ flexBasis: '40%', flexDirection: 'row', alignItems: 'center' }}>
						<Image
							source={require('@images/pages/warehouse.png')}
							resizeMode={'contain'}
						/>
					</View>

					<View style={{ flexBasis: '60%', flexDirection: 'row', alignItems: 'center', padding: 5, paddingRight: 20 }}>
						<Text size={14} color={'white'} bold>
							Warehouse Cimone Tangerang sedang membutuhkan bantuan Kurir, segera pilih paket dan antar
						</Text>
					</View>

				</View>

			</View>
		)
	}

	const _renderItemTaskOnGoing = ({ item, index }) => {
    return (
      <View key={index} style={{ width: width-40, alignSelf: 'center' }} >
        <View style={{ marginTop: 5, marginBottom: 10, backgroundColor: 'white', elevation: 3, padding: 16, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8 }}>
          <View>
            <Text size={14} color={'#4F4F4F'} bold style={{ lineHeight: 20 }}>
              {item.tujuan}
            </Text>
            <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 20 }}>
              {item.penerima}
            </Text>
            <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 20 }}>
              {item.telp_penerima}
            </Text>
          </View>

          <View style={{ flexDirection: 'column', alignItems: 'flex-end'}}>
            <Text size={12} color={'#4F4F4F'} style={{ lineHeight: 20 }}>
              No. Resi {item.resi}
            </Text>
            <Text size={12} color={item.color} bold style={{ lineHeight: 20 }}>
              {item.status}
            </Text>
          </View>
        </View>
      </View>
    )
	}

	const _renderTaskOnGoing = () => {
		return (
			<View style={{ width: width, flexDirection: 'column', marginTop: 20 }}>
				{/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<View style={{ flexGrow: 1, alignItems: 'flex-start' }}>
						<Text size={14} color={'#333'} bold>
							Sedang dikerjakan [{ moment().format('dddd, DD MMM yyyy')}]
						</Text>
					</View>

					<View style={{ marginLeft: 10, flexGrow: 1, alignItems: 'flex-end' }}>
						<Pressable onPress={() => props.navigation?.navigate('Event')}>
							<Text size={12} color={'#666'} bold>Lihat Semua</Text>
						</Pressable>
					</View>
				</View> */}

				<View style={{ width: '100%', paddingHorizontal: 20 }}>

					{dataTaskOnGoing.length > 0 ?
              dataTaskOnGoing.map((item, index) =>
                _renderItemTaskOnGoing({ item, index })
              )
						: null
					}

					<View style={{ marginBottom: 10, backgroundColor: 'white', elevation: 3, padding: 16, flexDirection: 'row', justifyContent: 'center', borderRadius: 8 }}>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text size={12} color={'#828282'} style={{ lineHeight: 20 }}>
								Lihat semua riwayat pengiriman
							</Text>
							<Icon size={22} name={'chevron-right'} color={'#aaa'}></Icon>
						</View>
					</View>

				</View>

			</View>
		)
	}

  return (
    <View style={styles.container}>
			<StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
        showHideTransition={'fade'}
				translucent={true}
      />
      <ImageBackground
        source={null}
        style={styles.container}
        resizeMode="cover"
      >

				{_renderTopHeaderDashboard()}

				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshView}
              />
            }
				>
					<View style={[styles.section, ]}>
						<View style={{ flex: 1, alignItems: 'center', paddingBottom: 20 }}>
							{_renderHeaderDashboard()}
							{!isCourierStatus && _renderStatusReason()}
							{_renderRecommendation()}

							{
								!isRefreshing ?
								<View>
									<Text size={12} color={'#BDBDBD'} style={{ textAlign: 'center' }}>
										Tarik kebawah, tahan, dan lepas untuk perbarui
									</Text>
								</View> :
								<ActivityIndicator
									size={'small'}
									color={'#333'}
								/>
							}

							{_renderTaskOnGoing()}

						</View>
					</View>
				</ScrollView>
			</ImageBackground>
    </View>
  );
}