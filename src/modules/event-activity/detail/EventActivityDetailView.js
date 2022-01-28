import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import DraggablePanel from 'react-native-draggable-panel';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTML from 'react-native-render-html';
import Moment from 'moment';

import { Text } from '@components/StyledText';
import { colors } from '@styles';
// import useDebounce from '@helpers/Debounce';

import styles from './Styles';

const { width } = Dimensions.get('window');


export default function EventActivityDetailScreen(props) {

  const [onLoad, setOnLoad] = useState(false);
  const [onLoadMore, setOnLoadMore] = useState(false);
	const [isFormBar, setIsFormBar] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [messageInput, setMessageInput] = useState(String);

  const [dataDetail, setDataDetail] = useState(props?.route?.params?.item || null);
  const [dataListComment, setDataListComment] = useState([] || null);
  const [isViewImage, setIsViewImage] = useState(false);
  const [imageUrls, setImageUrls] = useState(null);

  useEffect(() => {
    // console.warn('PROPS1', props)
    if (props?.route?.params?.item?.id) {
      const id = props?.route?.params?.item?.id;
      getShow(id);
      getListComments(id, true);
    }
    return () => {
      // console.warn('PROPS2', props)
    }
  }, [])

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
  }

  const getShow = async(id) => {
    await props.eventActivityShow(id).then((res) => {
      setDataDetail(res);
    }).catch((x) => {
      props.navigation?.pop();
    });
  }

  const getListComments = async(id, isInit) => {
    try {
      if (isInit) {
        setIsEnd(false);
        setOnLoad(true);
      } else {
        setOnLoadMore(true);
      }
      const comments = await props.eventActivityListComment(id, isInit);
      if (comments) {
        if (isInit) {
          setDataListComment(comments);
        } else {
          const data = [ ...dataListComment?.data, ...comments.data];
          setDataListComment({ ...comments, data: data });
        }
        setOnLoad(false);
        setOnLoadMore(false);
        if (comments?.data?.length == props.listCommentPerPage) {
          setIsEnd(false);
        } else {
          setIsEnd(true);
        }
      }
    } catch(ex) {
      console.warn('ex glc', ex)
    }
  }

  const generateNumber = (value) => {
    if (value) {
      let v = 0;
      if (value > 999999999) {
          v = (value/1000000000);
          return v + 'M';
      } else if (value > 999999) {
          v = (value/1000000);
          return v + 'Jt';
      } else if (value > 999) {
          v = (value/1000);
          return v + 'K';
      } else { return value; }
    } return 0;
  }

  const generateDate = (date) => {
    const dateNow = Moment(new Date()).format('DD, MMM HH:mm');
    const dateFormatting = Moment(date).format('DD, MMM HH:mm');
    if (String(dateNow) == String(dateFormatting)) {
      // console.warn('generateDate dateNow', dateNow);
      return 'Baru saja';
    }
    return dateFormatting;
  }

  const likeMessage = () => {
    setDataDetail({
      ...dataDetail,
      likes_count: dataDetail?.like_status ? (dataDetail?.likes_count - 1) : (dataDetail?.likes_count + 1),
      like_status: dataDetail?.like_status ? false : true,
      unlikes_count: dataDetail?.unlike_status ? (dataDetail?.unlikes_count - 1) : dataDetail?.unlikes_count,
      unlike_status: false,
    });
    props.eventActivityLike(dataDetail.id);
  }


  const unlikeMessage = () => {
    setDataDetail({
      ...dataDetail,
      likes_count: dataDetail?.like_status ? (dataDetail?.likes_count - 1) : dataDetail?.likes_count,
      like_status: false,
      unlikes_count: dataDetail?.unlike_status ? (dataDetail?.unlikes_count - 1) : (dataDetail?.unlikes_count + 1),
      unlike_status: dataDetail?.unlike_status ? false : true,
    });
    props.eventActivityUnlike(dataDetail.id);
  }

  const openComment = () => {
    setIsFormBar(true);
    if (dataDetail) {
      getListComments(dataDetail?.id, true);
    }
  }

  const sendMessageInput = async () => {
    if (dataDetail) {
      setDataListComment({
        ...dataListComment,
        data: [
          {
            fullname: 'Anda',
            created_at: 'now',
            comment: messageInput,
            isSend: false,
          },
          ...dataListComment.data,
        ]
      });
      const isSend = await props.eventActivityComment(dataDetail?.id, messageInput);
      if (isSend) {
        setDataListComment({
            ...dataListComment,
            data: [
              {
                fullname: 'Anda',
                created_at: 'now',
                comment: messageInput,
                isSend: true,
              },
              ...dataListComment.data,
            ]
        });
      } else {
        setDataListComment(dataListComment);
      }
      setMessageInput('');
    }
  }

  const handleLoadMoreListComment = () => {
    if (!isEnd) {
      getListComments(dataDetail?.id);
    }
  }

  const renderViewImage = () => {
    return (
      <Modal
      visible={isViewImage}
      transparent
      onRequestClose={() => setIsViewImage(false)}
      >
        <ImageViewer imageUrls={imageUrls} onCancel={() => setIsViewImage(false)} />
      </Modal>
    );
  }

  return (
    <ImageBackground style={styles.container} source={require('@images/bg/bg-5-01.jpg')} imageStyle={styles.containerImage}>
      <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
				<ImageBackground
					source={null}
					resizeMode="cover"
					imageStyle={{
          }}
          style={{
            width: '100%',
            backgroundColor: 'rgb(250,250,250)',
            height: 70
          }}
				>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, paddingLeft: 10 }}>
            <Pressable style={{ flexDirection: 'row', alignItems: 'center', }} onPress={() => props.navigation?.pop()}>
              <IconFeather name={'chevron-left'} size={25} style={[{ width: 30, height: 25, color: '#333', }]}></IconFeather>
              <Text size={20} bold={true} color={'#333'}>Event Detail</Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 10 }}>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                handleLoadMoreListComment();
              }
            }}
          >
            <View style={styles.topper}>
              <View style={styles.buttonContainer}>

                <View style={[styles.inputContainer, { marginHorizontal: 10 }]}>
                  <Text size={16} bold={true} color={'#333'}>
                    {dataDetail?.title || '-'}
                  </Text>
                  <Text size={13} color={'#555'}>
                    {dataDetail?.number || '-'}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', flex: 1, margin: 10 }}>
                    <Pressable onPress={() => { setImageUrls([{ url: dataDetail?.content_url }]); setIsViewImage(true)}} style={{ flex: 1, }}>
                      <View style={styles.imagePreview}>
                        { dataDetail?.content_url ? <Image
                          source={{ uri: dataDetail?.content_url }}
                          style={styles.imageContainer}
                        /> : null}
                      </View>
                    </Pressable>
                </View>

                <View style={{ margin: 10 }}>
                    <HTML source={{ html: dataDetail?.description || ''}} />
                </View>

                <View style={{ margin: 10, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#ddd' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <TouchableOpacity onPress={() => { likeMessage()}} style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <IconEntypo size={26} name={'thumbs-up'} color={dataDetail?.like_status ? colors.primaryGreen : '#aaa'}></IconEntypo>
                        <Text size={16} bold={true} color={dataDetail?.like_status ? colors.primaryGreen : '#aaa'}>
                        {generateNumber(dataDetail?.likes_count)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18  }}>
                      <TouchableOpacity onPress={() => { unlikeMessage() }} style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <IconEntypo size={26} name={'thumbs-down'} color={dataDetail?.unlike_status ? colors.primaryGreen : '#aaa'}></IconEntypo>
                        <Text size={16} bold={true} color={dataDetail?.unlike_status ? colors.primaryGreen : '#aaa'}>
                          {generateNumber(dataDetail?.unlikes_count)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { openComment(); }} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                      <View style={{ flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 8, paddingHorizontal: 10 }}>
                        <Text size={16} color={'#aaa'}>
                          Tulis dan Lihat Komentar...
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          </ScrollView>
          {/* <View style={styles.addCircleButton}>
            <Pressable onPress={() => onCreate()} style={{ padding: 10}}>
              <IconFeather size={30} name={'plus'} color={'white'}></IconFeather>
            </Pressable>
          </View> */}
        </View>
      </View>

      <DraggablePanel
        visible={isFormBar}
        expandable
        animationDuration={300}
        borderRadius={30}
				expandable={true}
				onDismiss={() => { setIsFormBar(false); }}
      >

        <View style={
          {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // backgroundColor: '#dedede',
            padding: 12,
            paddingHorizontal: 24,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', maxHeight: 100 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexGrow: 1 }}>
                  <TextInput
                    placeholder={'Tulis Komentar Anda'}
                    underlineColorAndroid='transparent'
                    style={[styles.inputMessage]}
                    value={messageInput}
                    onChangeText={setMessageInput}
                    autoCapitalize='none'
                    autoCorrect={false}
                    multiline
                  />
                </View>
              </View>
              <View style={{ marginLeft: 10 }}>
                <View style={{ borderRadius: 10, elevation: 3,  backgroundColor: colors.primaryGreen, padding: 6,  }}>
                  <TouchableOpacity onPress={sendMessageInput}>
                    <Icon
                      name={'near-me'}
                      size={26}
                      style={[
                        { width: 28, height: 28, color: colors.white,}
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
          </View>
        </View>
      {/* && dataListComment?.data?.length == 0 */}
        { onLoad ? <ActivityIndicator size="large" color={colors.primaryColor} /> :
        <ScrollView
          contentContainerStyle={{ overflow: 'scroll', paddingBottom: 20 }}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              // handleLoadMoreListComment();
            }
          }}
        >
          <View style={styles.topper}>
            <View style={styles.buttonContainer}>

            { dataListComment?.data?.length > 0 ?
              dataListComment?.data?.map((item, index) =>
              (<View key={index} style={[styles.messageContainer, { backgroundColor: index == 0 && item.created_at == 'now' ? item.isSend ? null : colors.yellowSuperLight : null}]}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginHorizontal: 10 }}>
                  <Text size={12} color={'#666'}>
                    {item.fullname}
                  </Text>
                  <Text size={12} color={'#666'}>
                   {' - '} { item.created_at == 'now' ? 'Baru saja' : generateDate(item.created_at)}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: 10 }} >
                  <Text style={{ fontSize: 16, color: '#333', }}>
                    {item.comment}
                  </Text>
                </View>
              </View>)
              ) : null
            }

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 12 }}>
              {dataListComment?.data?.length > 0 ? isEnd ? <View>
                <Text size={10} color={'#888'}>End of bottom</Text>
              </View>
              : onLoadMore ? <ActivityIndicator size={'small'} color={colors.primaryColor} />
              : <Pressable onPress={handleLoadMoreListComment.bind(this)}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Text size={10} color={'#888'}>Load more</Text>
                  <IconEntypo name={'chevron-small-down'} size={24} color={'#888'}></IconEntypo>
                </View>
                </Pressable>
              : <View>
                <Text size={10} color={'#888'}>Tidak ada komentar</Text>
              </View>}
            </View>

            </View>
          </View>
        </ScrollView>
        }
      </DraggablePanel>
      {/* <Loader visible={props.isLoading}/> */}
      {renderViewImage()}
  </ImageBackground>
  );
}
