import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  RefreshControl,
  Image,
  Pressable
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Entypo';

import { Text } from '@components/StyledText';
import {
  Input,
  Button,
  Loader,
} from '@components';
import { colors } from '@styles';

import styles from './Styles';

const { width } = Dimensions.get('window');

export default function EventActivityScreen(props) {

	const [onLoad, setOnLoad] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [warehouse, setWarehouse] = useState(String);
	const [tujuan, setTujuan] = useState(String);
	const [dataIndex, setDataIndex] = useState([
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Berhasil Diantar'
    },
    {
      resi: '1220023854500232123',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Dalam Pengiriman'
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Berhasil Diantar'
    },
    {
      resi: '1220023854500232123',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Dalam Pengiriman'
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Berhasil Diantar'
    },
    {
      resi: '1220023854500493211',
      tujuan: 'Menteng',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      status: 'Berhasil Diantar'
    },
    {
      resi: '1220023854500493211',
      alamat_pengiriman: 'Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan',
      penerima: 'Nouval Kurnia Firdaus',
      telp: '0812321654987',
      dimensi: '25x23x12',
      berat: '25 Kg'
    },
  ]);

  const [search, setSearch] = useState(String);

  useEffect(() => {
    // console.warn('PROPS1', props)
    // props.eventActivityIndex();
    return () => {
      // console.warn('PROPS2', props)
    }
  }, [])

	const refreshView = async () => {
		setIsRefreshing(true);
		// await setProfileFromRest();
    // await this.props.loadDashboard();
    // props.eventActivityIndex();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
		// if (this.props.dashboard && this.props.dashboard.banners.length > 0) {
		// 	this.setState({
		// 		dataBanner: this.props.dashboard.banners
		// 	});
		// }
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
    // const res = await props.eventActivityShow(item.id);
    // if (res?.data) {
      // setOnLoad(false);
    // } else {
      // setOnLoad(false);
    // }
  }

  const _renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ marginBottom: 10, backgroundColor: 'white',elevation: 3, padding: 16, flexDirection: 'row', justifyContent: 'space-between', borderRadius: 8, width: width-40 }}>
				<View style={{ flexBasis: '50%' }}>
					<Text size={14} color={'#4F4F4F'} bold style={{ lineHeight: 20 }}>
						Nouval Kurnia Firdaus
					</Text>
					<Text size={12} color={'#4F4F4F'} style={{ lineHeight: 20 }}>
  					081355667788
					</Text>
          <View style={{ flexDirection: 'column' }}>
            <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 20 }}>
              Alamat Pengiriman:
            </Text>
            <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 12 }}>
              Jl. laba-laba no 1 RT 003 RW 020 Kec. Kelapa Dua Kel. Bencongan
            </Text>
          </View>
				</View>

				<View style={{ flexDirection: 'column', alignItems: 'flex-end', flexBasis: '50%' }}>
					<Text size={12} color={'#4F4F4F'} style={{ lineHeight: 20 }}>
						No. Resi 1263781258672136
					</Text>
					<View>
            <Pressable style={{ backgroundColor: colors.primaryColor, marginTop: 3, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, elevation: 3 }}>
              <Text size={12} color={'white'} bold>
                Batal Pilih Paket
              </Text>
            </Pressable>
          </View>
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 20 }}>
                Ukuran (PxLxT):
              </Text>
              <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 12 }}>
                25 x 23 x 12
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 20 }}>
                Berat:
              </Text>
              <Text size={12} color={'#BDBDBD'} style={{ lineHeight: 12, alignSelf: 'flex-end' }}>
                2 Kg
              </Text>
            </View>
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
              <View style={styles.badgeNotifContainer}>
								<Text size={10} color={'white'}>
                  9+
								</Text>
							</View>
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
    <ImageBackground style={styles.container} source={null} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
        {_renderTopHeaderDashboard()}
        <View
          style={{ width: width, flexDirection: 'column', alignItems: 'center', backgroundColor: '#FDFDFD', marginTop: 90 }}
        >
          <ScrollView
            contentContainerStyle={{ width: width, alignItems: 'center', paddingTop: 0, paddingBottom: 150, backgroundColor: 'white' }}
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
          >
            <View style={{ marginTop: 5, width: width-40, borderWidth: 0 }}>
            <View style={{ flexDirection: 'row' }}>
              <Input
                isIcon
                isIconLabel
                placeholder={'Pilih Warehouse'}
                placeholder2={'Cari Nama Warehouse atau Kota'}
                keyboardType={'default'}
                flexItem={{ flex: 1, marginHorizontal: 0, marginTop: 10 }}
                style={styles.inputStyle}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setWarehouse}
                value={warehouse}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Input
                isIcon
                isIconLabel
                placeholder={'Pilih Tujuan'}
                placeholder2={'Pilih Tujuan Provinsi/Kota/Kecamatan'}
                keyboardType={'default'}
                flexItem={{ flex: 1, marginHorizontal: 0, marginTop: 10 }}
                style={styles.inputStyle}
                placeholderTextColor={'#b2b2b2'}
                onChangeText={setWarehouse}
                value={warehouse}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <Text size={12} color={'#4F4F4F'} bold>
                Paket Siap Diambil ({dataIndex.length})
              </Text>
              {/* <Pressable style={{ backgroundColor: colors.primaryColor, marginTop: 3, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, elevation: 3 }}>
                <Text size={12} color={'white'} bold>
                  Cari Paket
                </Text>
              </Pressable> */}
            </View>
          </View>
            { dataIndex.length > 0 ?
              dataIndex.map((item, index) =>
                _renderItem({ item, index })
              ) :
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@images/pages/courier-sicepat.png')} resizeMode={'contain'} style={{ width: width - 100, height: 140, resizeMode: 'contain', marginTop: 50, marginBottom: 20 }} />
                <Text bold size={16} color={'#555'}>Data Masih Kosong</Text>
                <Text size={14} color={'#888'} style={{ maxWidth: width - 120, textAlign: 'center' }}>Ayo ambil barang/paket di Warehouse terdekat kamu</Text>
              </View>
            }
          </ScrollView>
        </View>
      </View>
      <View style={{ width: width, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white', position: 'absolute', bottom: 0, elevation: 5 }}>
        <Button
          style={{ marginBottom: 0 }}
          textStyle={styles.textStyle}
        >
          Konfirmasi Paket Siap Diantar
        </Button>
        <Button
          styleType={'secondary'}
          style={{ }}
          textStyle={styles.textStyle}
        >
          Cari Paket
        </Button>
      </View>
      <Loader visible={props.isLoading && !isRefreshing}/>
  </ImageBackground>
  );
}
