import React, { Component } from 'react';
import { View, ImageBackground, Dimensions, Pressable, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '@styles';
import Video from 'react-native-video';
import { Text } from './StyledText';
import Moment from 'moment';

const { width } = Dimensions.get('window');

const lineBottom = {
	paddingBottom: 10, borderBottomWidth: 1, borderColor: '#ddd'
}

const styles = {
	container: {
		flex: 1,
	},
	buttonStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonStyleDisable: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bgImageContent: {
    width: '100%',
		borderRadius: 15,
	},
	content: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
    width: width - 20,
		height: 90,
		borderRadius: 15,
		marginHorizontal: 30,
		marginVertical: 8,
		elevation: 3,
		shadowRadius: 10,
	},
	contentTop: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 8
	},
	contentBottom: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		padding: 8
	},
	contentIsNotif: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
		// height: 90,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	contentIsForum: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		backgroundColor: 'white',
	},
  badgeIsForumContainer: {
		padding: 5,
		marginVertical: 10,
		marginHorizontal: 5,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#dc1133',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

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

class ListCard extends Component {

	renderListDefault() {
		return (
			<Pressable
				accessible={this.props.accessible ? this.props.accessible : false}
				accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
				testID={this.props.testID ? this.props.testID + `-${this.props.index}` : `input${this.props.testID}-${this.props.index}`}
				onPress={this.props.onPress}
				style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
				disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
			>
				<ImageBackground
					source={null}
					style={styles.content}
					resizeMode="cover"
					imageStyle={styles.bgImageContent}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
						<View style={{ padding: 10, borderRadius: 10, margin: 16, backgroundColor: colors.primaryColor, elevation: 3, shadowRadius: 8 }}>
							<Image
								source={require('@images/logo/5.png')}
								style={{ width: 30, height: 30 }}
							/>
						</View>
						<View style={{}}>
							<View style={{ maxWidth: width - 150, }} >
								<Text size={17} bold={true} color={colors.onWhiteDark} style={{ textAlign: 'left' }} numberOfLines={1}>
									{this.props.name}
								</Text>
							</View>
							<View style={{ maxWidth: width - 200, }}>
								<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
									{this.props.label1}
								</Text>
								<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
									{this.props.label2}
								</Text>
							</View>
						</View>
						<View style={{ position: 'absolute', bottom: 15, right: 15 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Text color={colors.primaryColor} size={12} bold={true}>{this.props.labelCorner || 'Edit'}</Text>
								<View style={{ padding: 3, borderRadius: 14, backgroundColor: colors.primaryColor, marginLeft: 5 }}>
									<Icon name={'arrow-right'} size={12} style={[{ width: 12, height: 12, color: colors.white }]}></Icon>
								</View>
							</View>
						</View>
					</View>
				</ImageBackground>
			</Pressable>
		)
	}

	renderListUserActivities() {
		return (
			<Pressable
				accessible={this.props.accessible ? this.props.accessible : false}
				accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
				testID={this.props.testID ? this.props.testID + `-${this.props.index}` : `input${this.props.testID}-${this.props.index}`}
				onPress={this.props.onPress}
				style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
				disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
			>
				<ImageBackground
					source={null}
					style={styles.content}
					resizeMode="cover"
					imageStyle={styles.bgImageContent}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
						<View style={{ padding: 8, borderRadius: 10, margin: 16, backgroundColor: colors.primaryColor, elevation: 3, shadowRadius: 8 }}>
							<Image
								source={require('@images/logo/5.png')}
								style={{ width: 20, height: 20 }}
							/>
						</View>
						<View style={{}}>
							<View style={{ maxWidth: width - 150, }} >
								<Text size={14} bold={true} color={colors.onWhiteDark} style={{ textAlign: 'left' }} numberOfLines={2}>
									{this.props.name}
								</Text>
							</View>
							<View style={{ maxWidth: width - 200, }}>
								<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
									{this.props.label1}
								</Text>
							</View>
						</View>
					</View>
				</ImageBackground>
			</Pressable>
		)
	}

	renderListNotif() {
		return (
			<Pressable
				accessible={this.props.accessible ? this.props.accessible : false}
				accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
				testID={this.props.testID ? this.props.testID + `-${this.props.index}` : `input${this.props.testID}-${this.props.index}`}
				onPress={this.props.onPress}
				style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
				disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
			>
				<ImageBackground
					source={null}
					style={[styles.contentIsNotif, {backgroundColor: this.props.payload.status == 'read' ? 'white' : colors.yellowSuperLight}]}
					resizeMode="cover"
					imageStyle={[styles.bgImageContent, ]}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
						<View style={{ padding: 10, borderRadius: 30, margin: 16, backgroundColor: colors.primaryColor, elevation: 3, shadowRadius: 8 }}>
							{/* <Image
								source={require('@images/logo/5.png')}
								style={{ width: 26, height: 26 }}
							/> */}
							<IconEntypo name={'bell'} size={24} color={'white'}></IconEntypo>
						</View>
						<View style={{}}>
							<View style={{ maxWidth: width - 120, }}>
								<Text size={17} bold={true} color={colors.onWhiteDark} style={{ textAlign: 'left' }} numberOfLines={2}>
									{this.props.name}
								</Text>
							</View>
							<View style={{ maxWidth: width - 120, }}>
								<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={2}>
									{this.props.label1}
								</Text>
								<View style={{ maxWidth: width - 135, flexDirection: 'row', alignItems: 'center', marginTop: 10,}}>
									{/* <Icon size={18} color={colors.lightGray} name={'clock'}></Icon> */}
									<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
										{this.props.label2 ? Moment(new Date(this.props.label2)).format('dddd, DD MMM yyyy HH:mm') : null} {}
									</Text>
								</View>
							</View>
						</View>
					</View>
				</ImageBackground>
			</Pressable>
		)
	}

	renderListForum() {
		return (
			<Pressable
				accessible={this.props.accessible ? this.props.accessible : false}
				accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
				testID={this.props.testID ? this.props.testID + `-${this.props.index}` : `input${this.props.testID}-${this.props.index}`}
				onPress={this.props.onPress}
				style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
				disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
			>
				<ImageBackground
					source={null}
					style={[styles.contentIsForum]}
					resizeMode="cover"
					imageStyle={[styles.bgImageContent, ]}
				>
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 8 }}>
						<View style={{ padding: 14, borderRadius: 40, marginHorizontal: 16, backgroundColor: 'white', elevation: 1, }}>
							<Image
								source={this.props.data.image_url ? { uri: this.props.data.image_url } : require('@images/logo/115-square-yellow.png')}
								style={{ width: 38, height: 38, resizeMode: 'contain' }}
							/>
						</View>
						<View style={{ flex: 2 }}>
							<View style={{ maxWidth: width - 120, }}>
								<Text size={17} bold={true} color={colors.onWhiteDark} style={{ textAlign: 'left' }} numberOfLines={2}>
									{this.props.name}
								</Text>
							</View>
							<View style={{ maxWidth: width - 120, }}>
								<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={2}>
									{this.props.label1}
								</Text>
							</View>
						</View>
						<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',}}>
							<View style={{ maxWidth: width - 135, flexDirection: 'row', alignItems: 'center' }}>
								<Text size={10} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
									{this.props.label2} {}
								</Text>
							</View>
							{this.props.badgeCount ?
								<View style={[styles.badgeIsForumContainer]}>
									<Text size={12} color={'#fff'}>{this.props.badgeCount > 999 ? '999+' : this.props.badgeCount }</Text>
								</View>
							: null}
						</View>
					</View>
				</ImageBackground>
			</Pressable>
		)
	}

	renderListForumPost = () => {

		let renderMedia = null;
		if (this.props.data.media) {
			if (this.props.data.media_type == 'image') {
				renderMedia = <TouchableOpacity onPress={this.props.onPress}>
					<View style={{ width: '100%', }}>
						<Image
							source={this.props.data.media_url ? { uri: this.props.data.media_url } : require('@images/bg/bg-5-01-top.png')}
							style={{ width: '100%', height: width - 50, resizeMode: 'cover' }}
						/>
					</View>
				</TouchableOpacity>
			} else if (this.props.data.media_type == 'video') {
				renderMedia = <TouchableOpacity onPress={this.props.onPress}>
					<Video
						ref={this.props.videoProps?.refVideoPreview}
						source={{uri: this.props.data.media_url }}   // Can be a URL or a local file.            // Callback when video cannot be loaded
						style={{ width: width, height: width - 50,}}
						paused={this.props.videoProps?.videoPreviewPaused}
						poster={this.props.data.media_url}
						resizeMode={'contain'}
					/>
				</TouchableOpacity>
			}
		}

		return (
				<ImageBackground
					source={null}
					style={[styles.contentIsForum]}
					resizeMode="cover"
					imageStyle={[styles.bgImageContent, ]}
				>
					<View style={{ flex: 1, flexDirection: 'column', borderRadius: 10, backgroundColor: 'white', elevation: 3, marginVertical: 8, marginHorizontal: 15 }}>
						<View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
							<TouchableOpacity
								onPress={this.props.onShowProfile}
							>
								<View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', }}>
									<Image
										source={this.props.data.image_url ? { uri: this.props.data.image_url } :  this.props.label2 ? { uri: this.props.label2 } : require('@images/bg/bg-5-01-top.png')}
										style={{ width: 40, height: 40, resizeMode: 'cover', borderRadius: 24, borderWidth: 1, borderColor: '#eee', margin: 10, marginVertical: 10, }}
									/>
									<Text bold={true} size={16} color={'#555'}>{this.props.data.fullname ? this.props.data.fullname : this.props.label1}</Text>
								</View>
							</TouchableOpacity>
							{this.props.isOptions && this.props.userData?.id == this.props.data?.created_by ?
								<Pressable
									onPress={this.props.onOptionPress}
								>
									<View style={{ padding: 10 }}>
										<IconMCI name={'dots-horizontal'} size={26} color={'#aaa'} />
									</View>
								</Pressable>
							: null}
						</View>
						{renderMedia}
						{this.props.data.media ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={this.props.onLikePost} style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <IconEntypo size={24} name={'thumbs-up'} color={this.props.data.like_status ? colors.primaryGreen : '#aaa'}></IconEntypo>
                  <Text size={14} color={this.props.data.like_status ? colors.primaryGreen : '#aaa'}>
          	        {generateNumber(this.props.data.likes_count)}
                  </Text>
                </TouchableOpacity>
              </View>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.props.onCommentPost} style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <IconEntypo size={24} name={'message'} color={'#aaa'}></IconEntypo>
                  <Text size={14} color={'#aaa'}>
          	        {generateNumber(this.props.data.comments_count)}
                  </Text>
                </TouchableOpacity>
              </View>
						</View> : null}
						<View style={[{ maxWidth: '100%', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, }, !this.props.data.media ? lineBottom : null]}>
							<Text size={14} color={colors.onWhiteDark} style={{ textAlign: 'left', lineHeight: 14 }} numberOfLines={3}>
								{this.props.data.media_text}
							</Text>
						</View>
						{!this.props.data.media ?
						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 10 }}>
							<View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <TouchableOpacity onPress={this.props.onLikePost} style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <IconEntypo size={24} name={'thumbs-up'} color={this.props.data.like_status ? colors.primaryGreen : '#aaa'}></IconEntypo>
                  <Text size={14} color={this.props.data.like_status ? colors.primaryGreen : '#aaa'}>
          	        {generateNumber(this.props.data.likes_count)}
                  </Text>
                </TouchableOpacity>
              </View>
							<View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.props.onCommentPost} style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <IconEntypo size={24} name={'message'} color={'#aaa'}></IconEntypo>
                  <Text size={14} color={'#aaa'}>
          	        {generateNumber(this.props.data.comments_count)}
                  </Text>
                </TouchableOpacity>
              </View>
						</View> : null}
						<View style={{ maxWidth: '100%', flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
              <View>
								<Image
									source={this.props.data.image_url ? { uri: this.props.data.image_url } : this.props.label2 ? { uri: this.props.label2 } : require('@images/bg/bg-5-01-top.png')}
									style={{ width: 35, height: 35, resizeMode: 'cover', borderRadius: 24, borderWidth: 1, borderColor: '#eee', marginRight: 10, marginVertical: 10, }}
								/>
							</View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity onPress={this.props.onCommentPost} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
									<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', paddingLeft: 15, padding: 8, borderRadius: 20 }}>
										<Text color={'#aaa'} size={12}>{'Tinggalkan Komentar ...'}</Text>
									</View>
								</TouchableOpacity>
              </View>
						</View>
					</View>
				</ImageBackground>
		)
	}

	render() {
		if (this.props.isCircleIcon) {
			return (
				<Pressable
					accessible={this.props.accessible ? this.props.accessible : false}
					accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
					testID={this.props.testID ? this.props.testID + `-${this.props.index}` : `input${this.props.testID}-${this.props.index}`}
					onPress={this.props.onPress}
					style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
					disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
				>
					<ImageBackground
						source={null}
						style={styles.content}
						resizeMode="cover"
						imageStyle={styles.bgImageContent}
					>
						<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
							<View style={{ padding: 10, borderRadius: 30, margin: 12, backgroundColor: colors.primaryColor, elevation: 3, shadowRadius: 8 }}>
								<Image
									source={require('@images/logo/5.png')}
									style={{ width: 25, height: 25 }}
								/>
							</View>
							<View style={{ flex: 1 }}>
								<View style={{ maxWidth: width - 150, }} >
									<Text size={17} bold={true} color={colors.onWhiteDark} style={{ textAlign: 'left' }} numberOfLines={1}>
										{this.props.name}
									</Text>
								</View>
								<View style={{ maxWidth: width - 200, }}>
									<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={this.props.label1Line ? this.props.label1Line : 1}>
										{this.props.label1}
									</Text>
									<Text size={14} color={colors.onWhiteSubDark} style={{ textAlign: 'left' }} numberOfLines={1}>
										{this.props.label2}
									</Text>
								</View>
							</View>
							<View style={{ flexDirection: 'column', justifyContent: 'center' }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ padding: 10, borderRadius: 14, marginLeft: 5 }}>
										<Icon name={'chevron-right'} size={20} style={[{ width: 20, height: 20, color: '#888' }]}></Icon>
									</View>
								</View>
							</View>
						</View>
					</ImageBackground>
				</Pressable>
			)
		} else if (this.props.isUserActivities) {
			return this.renderListUserActivities();
		} else if (this.props.isNotif) {
			return this.renderListNotif();
		} else if (this.props.isForum) {
			return this.renderListForum();
		} else if (this.props.isForumPost) {
			return this.renderListForumPost();
		} else {
			return this.renderListDefault();
		}
	}
}

export default ListCard;
