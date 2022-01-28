import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Image,
  RefreshControl,
  Dimensions,
  Pressable,
} from 'react-native';
import IconFeather from 'react-native-vector-icons/Feather';

import { Text } from '@components/StyledText';
import {
  ListCard,
  Loader
} from '@components';

import styles from './Styles';

const { width } = Dimensions.get('screen');

export default function NotificationsScreen(props) {

	const [onLoad, setOnLoad] = useState(false);
	const [onLoadMore, setOnLoadMore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [dataIndex, setDataIndex] = useState(props?.dataIndex);

  useEffect(() => {
    // console.warn('PROPS1', props)
    getIndex(true);
    return () => {
      // console.warn('PROPS2', props)
    }
  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

	const refreshView = async () => {
		setIsRefreshing(true);
    getIndex(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
	}

  const getIndex = async(isInit) => {
    try {
      if (isInit) {
        setIsEnd(false);
        setOnLoad(true);
      } else {
        setOnLoadMore(true);
      }
      const indexList = await props.notificationsIndex('', isInit);
      if (indexList) {
        if (isInit) {
          setDataIndex(indexList);
        } else {
          const data = [ ...dataIndex?.data, ...indexList.data];
          setDataIndex({ ...indexList, data: data });
        }
          setOnLoad(false);
          setOnLoadMore(false);
          if (indexList?.data?.length > (props.indexPerPage - 1)) {
            setIsEnd(false);
          } else {
            setIsEnd(true);
          }
      }
    } catch(ex) {
      console.warn('ex', ex)
    }
  }

  const openNotif = ({ item, index }) => {
    if (item?.status == 'unread') {
      props?.notificationsUpdateRead(item.id, props, index);
    }
    redirectTo(item);
  }

  const redirectTo = async (item) => {
    try {
      const detail = await JSON.parse(item.data);
      if (item.entity_type == 'event') {
        props.navigation?.navigate('Event Detail', { item: detail });
        await props.eventActivityShow(detail.id);
      } else if (item.entity_type == 'account_verification') {
        props.getUser();
        props?.navigation?.navigate('Info Akun', { item: detail })
      }
    } catch (ex) {
      console.warn('ex redirectTo', ex);
    }
  }

  const _renderItem = ({ item, index }) => {
    return (
      <ListCard
        isNotif
        key={ `ListCard-${index}` }
        index={ index }
        name={ item.title }
        label1={ item.content }
        label2={ item.created_at }
        payload= { item }
        onPress={() => openNotif({ item, index }) }
       ></ListCard>
    )
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
          backgroundColor: 'rgb(250,250,250)',
          height: 70,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => props.navigation?.pop()}>
            <IconFeather name={'chevron-left'} size={25} style={[{ width: 30, height: 25, color: '#333', }]}></IconFeather>
            <Text size={20} bold={true} color={'#333'}>Notifikasi</Text>
          </Pressable>
        </View>
      </ImageBackground>
      <View style={{ flex: 1, backgroundColor: 'white', paddingBottom: 0 }}>
        <ScrollView
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
        >
          {props.dataIndex?.data?.length > 0 ?
            props.dataIndex?.data.map((item, index) =>
              _renderItem({ item, index })
            ) :
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('@images/pages/2-01.png')} resizeMode={'contain'} style={{ width: width - 100, height: width - 120, resizeMode: 'contain'}} />
                <Text bold size={16} color={'#555'}>Notifikasi Masih Kosong</Text>
                <Text size={14} color={'#888'} style={{ maxWidth: width - 120, textAlign: 'center' }}>Belum ada pemberitahuan apapun yang dapat ditampilkan untuk kamu.</Text>
              </View>
          }
        </ScrollView>
      </View>
    </View>
    <Loader visible={onLoad && !isRefreshing}/>
  </ImageBackground>
  );
}
