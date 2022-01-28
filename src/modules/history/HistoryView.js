import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  RefreshControl,
  Image,
  Pressable,
  StatusBar
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Entypo';

import { Text } from '@components/StyledText';
import {
  Input,
  ListCard,
  Loader,
} from '@components';
import { colors } from '@styles';

import styles from './Styles';

const { width } = Dimensions.get('window');

export default function HistoryScreen(props) {

	const [onLoad, setOnLoad] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataIndex, setDataIndex] = useState([
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
      status: 'Dikembalikan ke Warehouse',
      color: '#D22229',
      dimensi: '25x23x12',
      berat: '25 Kg',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      telp_penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
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
    },
  ]);

  const [search, setSearch] = useState(String);

  useEffect(() => {
    // console.warn('PROPS1', props)
    return () => {
      // console.warn('PROPS2', props)
    }
  }, [])

	const refreshView = async () => {
		setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
	}

  const debounceSearch = useCallback(_.debounce((v) => { searchFromDebounce(v)}, 1000), [])

  const searchIndex = (v) => {
    setSearch(v);
    debounceSearch(v);
  }

  const searchFromDebounce = async(v) => {
    setOnLoad(true);
    await props.eventActivityIndex({ search: v }, props);
    setOnLoad(false);
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

  const onEdit = async ({ item, index }) => {
		props.navigation?.navigate('Event Detail', {item});
    setOnLoad(true);
  }

  const _renderItem = ({ item, index }) => {
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
      style={styles.container}
      source={null}
    >
      {_renderTopHeaderDashboard()}
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // this.handleLoadMore();
          }
        }}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={refreshView}
        />
      }
      style={{ flexGrow: 1, marginTop: 90 }}
    >
      <View style={{ paddingVertical: 10, width: width }}>
        { dataIndex?.length > 0 ? dataIndex.map((item, index) =>
          _renderItem({ item, index })
          ) :
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('@images/pages/courier-sicepat.png')} resizeMode={'contain'} style={{ width: width - 100, height: 140, resizeMode: 'contain', marginTop: 50, marginBottom: 20 }} />
            <Text bold size={16} color={'#555'}>Data Masih Kosong</Text>
            <Text size={14} color={'#888'} style={{ maxWidth: width - 120, textAlign: 'center' }}>Belum ada data riwayat yang dapat ditampilkan</Text>
          </View>
        }
      </View>
    </ScrollView>
    <Loader visible={props.isLoading && !isRefreshing}/>
  </ImageBackground>
  </View>
  );
}
