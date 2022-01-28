import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';
import normalize from '@helpers/NormalizedText';
import { colors } from '@styles';
import { Text } from '@components/StyledText';

const styles = {
	containerStyle: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginBottom: 10,
		marginHorizontal: 10
	},
	inputStyle: {
		paddingVertical: 12,
		fontSize: normalize(12),
		textAlign: 'left',
		width: '100%',
		backgroundColor: 'transparent',
		color: '#555',
		fontWeight: '600',
		paddingHorizontal: 16
	},
	inputStyleDisable: {
		borderRadius: 10,
		borderWidth: 2,
		borderColor: '#ECECEC',
		backgroundColor: '#ececec',
		color: '#000',
		padding: 16,
		fontSize: normalize(12),
		textAlign: 'left',
		width: '100%',
		paddingHorizontal: 16
	},
	limiterStyle: {
		fontSize: normalize(12),
		color: '#000',
		marginTop: 12,
		alignSelf: 'flex-end'
	},
	validationText: {
		flexDirection: 'row',
		color: '#cc0000',
		justifyContent: 'flex-start'
	},
	labelText: {
		flexDirection: 'row',
		color: '#666',
		justifyContent: 'flex-start'
	},

	squareBorderLayout: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 10,
		backgroundColor: 'white',
		height: 48,
		overflow: 'hidden',
		elevation: 3,
	},
	squareBorderLayoutDisable: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderRadius: 10,
		backgroundColor: '#eee',
		height: 48,
		overflow: 'hidden',
		elevation: 3,
	},
	inputSquareStyle: {
		fontSize: normalize(12),
		textAlign: 'left',
		width: '100%',
		backgroundColor: 'transparent',
		color: '#555',
		fontWeight: '600',
		paddingLeft: 14,
		paddingVertical: 0,
	},
	inputSquareStyleDisable: {
		fontSize: normalize(12),
		textAlign: 'left',
		width: '100%',
		backgroundColor: '#eee',
		color: '#555',
		fontWeight: '600',
		paddingLeft: 14,
		paddingVertical: 0,
		flex: 1
	},
};

class Input extends Component {
	state = {
		passVisible: false,
		secureTextEntry: false
	}
	componentDidMount() {
		if (this.props.onRef != null) {
			this.props.onRef(this);
		}
		this.setState({
			secureTextEntry: (this.props.secureTextEntry && !this.state.passVisible) || false
		});
	}
	focus() {
		this.textInput.focus();
	}

	visibilityState() {
		if (this.state.passVisible) {
			return 'visibility-off';
		}
		return 'visibility';
	}

	showPassword() {
		this.setState({
			passVisible: !this.state.passVisible
		});
		setTimeout(() => {
			this.setState({
				secureTextEntry: (this.props.secureTextEntry && !this.state.passVisible) || false
			});
		}, 0);
	}

	trimPhoneCode(value) {
		if (value.substring(0, 3) === '+62') {
			return value.substring(3,value.length);
		}
		return value;
	}

	renderVisibility() {
		if (this.props.secureTextEntry) {
			if (this.props.isSquare) {
				return (
					<TouchableOpacity onPress={this.showPassword.bind(this)} style={{ position: 'absolute', right: 20 }}>
						<Icon name={this.visibilityState()} size={20} color={'#ddd'}/>
					</TouchableOpacity>
				);
			}
			if (this.props.isLabel) {
				return (
					<TouchableOpacity onPress={this.showPassword.bind(this)} style={{ left: -15, top: -38, alignSelf: 'flex-end'}}>
						<Icon name={this.visibilityState()} size={20} color={'#ddd'}/>
					</TouchableOpacity>
				);
			}
			return (
				<TouchableOpacity onPress={this.showPassword.bind(this)} style={{ left: -35 }}>
					<Icon name={this.visibilityState()} size={20} color={'#ddd'}/>
				</TouchableOpacity>
			);
		}
	}

	render() {
		if (this.props.isLabel) {
		return (
			<View style={[styles.containerStyle, this.props.flexItem]}>
				<View style={{ flexDirection: this.props.isLabel ? 'column' : 'row', alignItems: this.props.isLabel ? 'flex-start' : 'center', justifyContent: this.props.isLabel ? 'flex-start' : 'space-between', flex: 1, width: '100%' }}>
					{this.props.isLabel && (
						<Text style={[styles.labelText]}>
							{this.props.placeholder}
						</Text>
					)}
					<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
					{this.props.isPhone && (
						<Text style={{ fontSize: normalize(12) , fontWeight: '600', color: this.props.value ? '#555' : colors.placeholder, left: this.props.editable == false ? 10 : 0, position: 'absolute', elevation: 1  }}>
							+62
						</Text>
					)}
					<TextInput
						onEndEditing={this.props.onEndEditing}
						onChangeText={(v) => {
							if (v && v.substring(0,1) == 0 && this.props.isPhone ) {
								v = v.slice(0, -1);
							}
							this.props.onChangeText(v)
						}}
						value={this.trimPhoneCode(this.props.value)}
						style={[
							(this.props.editable || this.props.editable === undefined) ? styles.inputStyle : styles.inputStyleDisable,
							this.props.style, this.props.multiline ? { height: 140, textAlignVertical: 'top' } : null,
							this.props.isGrey ? { backgroundColor: 'rgba(200,200,200,0.7)', color: '#333' } : null,
							{ paddingLeft: this.props.editable == false ? this.props.isPhone ? 45 : 16 : this.props.isPhone ? 40 : 0 }]}
						autoCorrect={false}
						placeholder={this.props.placeholder2 ? this.props.placeholder2 : this.props.placeholder}
						secureTextEntry={this.state.secureTextEntry}
						placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : 'rgba(0,0,0,0.6)'}
						editable={this.props.editable}
						keyboardType={this.props.keyboardType}
						maxLength={this.props.maxLength}
						onKeyPress={this.props.onKeyPress}
						ref={input => (this.textInput = input)}
						multiline={this.props.multiline}
						numberOfLines={this.props.numberOfLines}
						accessible={this.props.accessible ? this.props.accessible : false}
						accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `input${this.props.placeholder}Label`}
						testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
					/>
					</View>
					{this.renderVisibility()}
				</View>
				{this.props.isPhone && this.props.editable !== false ? (
					<Text style={[styles.validationText, { color: '#666', fontSize: normalize(10), right: 14, top: 3, position: 'absolute' }]}>
						Ex: 8123456789
					</Text>
				) : null}
				{this.props.error ? (
					<Text style={styles.validationText}>
						{this.props.error}
					</Text>
				) : null}
				{this.props.maxLengthDisplay ? (
					<Text style={styles.limiterStyle}>
						{this.props.value ? this.props.value.length : 0} / {this.props.maxLength}
					</Text>
				) : null}
			</View>
		);
		} else if (this.props.isOTP) {
			return (
				<View style={[styles.containerStyle, this.props.flexItem, { alignItems: 'center', height: 45, }]}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor, borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(0,1)}</Text></View>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor,borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(1,2)}</Text></View>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor,borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(2,3)}</Text></View>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor,borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(3,4)}</Text></View>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor,borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(4,5)}</Text></View>
						<View style={{ height: 42, width: 34, borderRadius: 2, backgroundColor: 'white', marginLeft: 10, alignItems: 'center', justifyContent: 'center', borderBottomColor: colors.primaryColor,borderBottomWidth: 3 }}>
							<Text size={24} color={colors.primaryColor} bold>{this.props.value.substring(5,6)}</Text></View>
					</View>
					<TextInput
							onEndEditing={this.props.onEndEditing}
							onChangeText={(v) => {
								this.props.onChangeText(v)
							}}
							value={this.props.value}
							style={[{
								fontSize: normalize(12),
								textAlign: 'center',
								backgroundColor: 'rgba(255,255,255,0.1)',
								color: 'transparent',
								top: -45,
								width: '100%',
								height: 45
							}
							]}
							autoCorrect={false}
							placeholder={''}
							secureTextEntry={this.state.secureTextEntry}
							placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : 'rgba(0,0,0,0.6)'}
							editable={this.props.editable}
							keyboardType={this.props.keyboardType}
							maxLength={6}
							onKeyPress={(v) => {
              console.log('kp', v);
            }}

							ref={input => (this.textInput = input)}
							multiline={this.props.multiline}
							numberOfLines={this.props.numberOfLines}
							accessible={this.props.accessible ? this.props.accessible : false}
							accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `input${this.props.placeholder}Label`}
							testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
							caretHidden
					/>
				</View>
			);
		} else if (this.props.isIcon) {
		return (
			<View style={[styles.containerStyle, this.props.flexItem]}>
				{this.props.isIconLabel && (
					<Text style={[styles.labelText]}>
						{this.props.placeholder}
					</Text>
				)}
				<View style={(this.props.editable || this.props.editable === undefined) ? styles.squareBorderLayout : styles.squareBorderLayoutDisable}>
						<TextInput
							onEndEditing={this.props.onEndEditing}
							onChangeText={(v) => {
								if (v && v.substring(0,1) == 0 && this.props.isPhone ) {
									v = v.slice(0, -1);
								}
								this.props.onChangeText(v)
							}}
							value={this.trimPhoneCode(this.props.value)}
							style={[
								(this.props.editable || this.props.editable === undefined) ? styles.inputStyle : styles.inputStyleDisable,
								this.props.style,
								this.props.multiline ? { height: 140, textAlignVertical: 'top' } : null,
								this.props.isGrey ? { backgroundColor: 'rgba(200,200,200,0.7)', color: '#333' } : null,
								{ paddingRight: this.props.isIcon ? 45 : 16,
									paddingVertical: this.props.isIcon ? 5 : 12,
									fontSize:  this.props.isIcon ? normalize(12) : normalize(14),
								 },
							]}
							autoCorrect={false}
							placeholder={this.props.placeholder2 ? this.props.placeholder2 : this.placeholder}
							secureTextEntry={this.state.secureTextEntry}
							placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : 'rgba(0,0,0,0.6)'}
							editable={this.props.editable}
							keyboardType={this.props.keyboardType}
							maxLength={this.props.maxLength}
							onKeyPress={this.props.onKeyPress}
							ref={input => (this.textInput = input)}
							multiline={this.props.multiline}
							numberOfLines={this.props.numberOfLines}
							accessible={this.props.accessible ? this.props.accessible : false}
							accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `input${this.props.placeholder}Label`}
							testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
						/>
						{this.props.isIcon && (
							<View style={{ position: 'absolute', top: 10, right: 15, elevation: 3 }}>
								<IconFeather size={20} name={'search'} color={'#aaa'}></IconFeather>
							</View>
						)}
				</View>
				{this.props.error ? (
					<Text style={styles.validationText}>
						{this.props.error}
					</Text>
				) : null}
			</View>
		);
		} else if (this.props.isSquare) {
			return (
				<View style={[styles.containerStyle, this.props.flexItem]}>
					{this.props.isSquareLabel && (
						<View style={{ marginBottom: 5 }}>
							<Text style={[styles.labelText]} size={16}>
								{this.props.placeholder}
							</Text>
						</View>
					)}
					<View style={(this.props.editable || this.props.editable === undefined) ? styles.squareBorderLayout : styles.squareBorderLayoutDisable}>
						{this.props.isSquareLabelPhone && (
							<Text style={{ fontSize: normalize(12) , fontWeight: '600', color: this.props.value ? '#555' : colors.placeholder, left: 8, position: 'absolute', elevation: 1  }}>
								+62
							</Text>
						)}
						<TextInput
							onEndEditing={this.props.onEndEditing}
							onChangeText={(v) => {
								if (v && v.substring(0,1) == 0 && this.props.isSquareLabelPhone ) {
									v = v.slice(0, -1);
								}
								this.props.onChangeText(v)
							}}
							value={this.props.value}
							style={[
								(this.props.editable || this.props.editable === undefined) ? styles.inputSquareStyle : styles.inputSquareStyleDisable,
								this.props.style,
								this.props.multiline ? { height: 140, textAlignVertical: 'top' } : null,
								this.props.isGrey ? { backgroundColor: '#fafafa' } : null,
								{ paddingLeft: this.props.isSquareLabelPhone ? 47 : 15 }
							]}
							autoCorrect={false}
							placeholder={this.props.placeholder2 ? this.props.placeholder2 : this.props.placeholder}
							secureTextEntry={this.state.secureTextEntry}
							placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : 'rgba(0,0,0,0.6)'}
							editable={this.props.editable}
							keyboardType={this.props.keyboardType}
							autoCapitalize={this.props.autoCapitalize}
							maxLength={this.props.maxLength}
							onKeyPress={this.props.onKeyPress}
							ref={input => (this.textInput = input)}
							multiline={this.props.multiline}
							numberOfLines={this.props.numberOfLines}
							accessible={this.props.accessible ? this.props.accessible : false}
							accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `input${this.props.placeholder}Label`}
							testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
						/>
						{this.renderVisibility()}
					</View>
					{this.props.isSquareLabelPhone ? (
						<Text style={[styles.validationText, { color: '#666', fontSize: normalize(10), right: 14, top: 3, position: 'absolute' }]}>
							Ex: 8123456789
						</Text>
					) : null}
					{this.props.error ? (
						<Text style={styles.validationText}>
							{this.props.error}
						</Text>
					) : null}
					{this.props.maxLengthDisplay ? (
						<Text style={styles.limiterStyle}>
							{this.props.value ? this.props.value.length : 0} / {this.props.maxLength}
						</Text>
					) : null}
				</View>
			);
		}
		return (
			<View style={[styles.containerStyle, this.props.flexItem]}>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
					<TextInput
						onEndEditing={this.props.onEndEditing}
						onChangeText={(v) => {
							if (v && v.substring(0,1) == 0 && this.props.isPhone ) {
								v = v.slice(0, -1);
							}
							this.props.onChangeText(v)
						}}
						value={this.props.value}
						style={[
							(this.props.editable || this.props.editable === undefined) ? styles.inputStyle : styles.inputStyleDisable,
							this.props.style,
							this.props.multiline ? { height: 140, textAlignVertical: 'top' } : null,
							this.props.isGrey ? { backgroundColor: '#fafafa' } : null
						]}
						autoCorrect={false}
						placeholder={this.props.placeholder}
						secureTextEntry={this.state.secureTextEntry}
						placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor : 'rgba(0,0,0,0.6)'}
						editable={this.props.editable}
						keyboardType={this.props.keyboardType}
						maxLength={this.props.maxLength}
						onKeyPress={this.props.onKeyPress}
						ref={input => (this.textInput = input)}
						multiline={this.props.multiline}
						numberOfLines={this.props.numberOfLines}
						accessible={this.props.accessible ? this.props.accessible : false}
						accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `input${this.props.placeholder}Label`}
						testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
					/>
					{this.renderVisibility()}
				</View>
				{this.props.isPhone ? (
					<Text style={[styles.validationText, { color: '#666', fontSize: normalize(10), right: 14, top: 3, position: 'absolute' }]}>
						Ex: 8123456789
					</Text>
				) : null}
				{this.props.error ? (
					<Text style={styles.validationText}>
						{this.props.error}
					</Text>
				) : null}
				{this.props.maxLengthDisplay ? (
					<Text style={styles.limiterStyle}>
						{this.props.value ? this.props.value.length : 0} / {this.props.maxLength}
					</Text>
				) : null}
			</View>
		);
	}
}

export default Input;
