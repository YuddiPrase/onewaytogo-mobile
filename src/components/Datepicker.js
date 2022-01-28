import React, { Component } from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from '@helpers/NormalizedText';
import { colors } from '@styles';
import { Text } from '@components/StyledText';

const styles = {
	baseStyle: {
		flex: 1,
		marginHorizontal: 12,
		marginBottom: 12
	},
	datePickerStyle: {
		width: '100%',
		backgroundColor: 'transparent',
		paddingVertical: 12,
		borderBottomWidth: 2,
		borderBottomColor: '#bbb',
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
};


class Datepicker extends Component {

	state = {
		isShow: false
	}

	renderCalendar() {
		const isInit = this.props.date ? Moment(this.props.date).format('YYYY-MM-DD') !== Moment().format('YYYY-MM-DD') : false;
		return (
			<Icon
				name="calendar"
				size={30}
				style={{
					position: 'absolute',
					right: 10,
					top: -3,
					color: isInit ? '#555' : colors.placeholder,
				}}
			/>
		);
	}

	render() {
		if (this.props.isSquare) {
			return (
				<View style={styles.baseStyle}>
					{this.props.isSquareLabel &&
						<View style={{ marginBottom: 5 }}>
							<Text style={[styles.labelText]} size={16}>
								{this.props.placeholder}
							</Text>
							</View>
					}
					{this.state.isShow ? <DateTimePicker
						testID={"dateTimePicker"}
						value={this.props.date || new Date()}
						mode={'date'}
						// is24Hour={true}
						display="default"
						onChange={(event, selectedDate) => {
							this.setState({ isShow:(Platform.OS === 'ios')});
							this.props.onDateChange(selectedDate);
						}}
						maximumDate={this.props.maximumDate ? this.props.maximumDate : this.props.placeholder === 'Tanggal Lahir' ? new Date() : null}
					/> : null}
					<TouchableNativeFeedback
						onPress={() => this.setState({ isShow: true })}
					>
						<View style={
							{
								flexGrow: 1,
								borderWidth: 1,
								borderColor: '#eee',
								borderRadius: 10,
								justifyContent: 'center',
								height: 48,
								backgroundColor: 'white',
								elevation: 3,
							}}>
							<View>
								<Text style={{
									paddingLeft: 10,
									fontSize: normalize(12),
									color: this.props.date ? '#555' : colors.placeholder,
								}}
								>
									{ this.props.date ? Moment(this.props.date).format(this.props.formatDate ? this.props.formatDate : 'DD MMM YYYY') : (this.props.placeholder2 ? this.props.placeholder2 : this.props.placeholder || 'Tanggal')}
								</Text>
								{this.renderCalendar()}
							</View>
						</View>
					</TouchableNativeFeedback>
					{this.props.error ? (
						<Text style={[styles.validationText]}>
							{this.props.error}
						</Text>
					) : null}
				</View>
			);
		}
		return (
			<View style={styles.baseStyle}>
				{this.props.isLabel &&
					<Text style={[styles.labelText]} size={16}>
						{this.props.placeholder}
					</Text>
				}
				{this.state.isShow ? <DateTimePicker
          testID={"dateTimePicker"}
          value={this.props.date || new Date()}
          mode={'date'}
          // is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
						// const currentDate = selectedDate || this.props.date;
						// console.warn('selectedDate', selectedDate)
    				this.setState({ isShow:(Platform.OS === 'ios')});
						this.props.onDateChange(selectedDate)
					}}
					maximumDate={this.props.maximumDate ? this.props.maximumDate : this.props.placeholder === 'Tanggal Lahir' ? new Date() : null}
        /> : null}
				<TouchableNativeFeedback
					onPress={() => this.setState({ isShow: true })}
				>
					<View style={
						{
						flex: 1,
						borderBottomWidth: 2,
						borderBottomColor: '#bbb',
						justifyContent: 'center',
						paddingVertical: 12,
						backgroundColor: 'transparent',
						}}>
						<View>
							<Text style={{
								fontSize: normalize(12),
								// color: isInit ? '#555' : colors.placeholder
								color: this.props.date ? '#555' : colors.placeholder,
							}}
							>
								{/* { isInit ? Moment(this.props.date).format('YYYY-MM-DD') : (this.props.placeholder || 'Tanggal') } */}
								{ this.props.date ? Moment(this.props.date).format('DD MMM YYYY') : (this.props.placeholder2 ? this.props.placeholder2 : this.props.placeholder || 'Tanggal')}
							</Text>
							{this.renderCalendar()}
						</View>
					</View>
				</TouchableNativeFeedback>

				{/* <DatePicker
					style={[styles.datePickerStyle, this.props.style]}
					date={this.props.date}
					mode="date"
					placeholder={this.props.placeholder ? this.props.placeholder : 'Tanggal Lahir'}
					format="YYYY-MM-DD"
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					androidMode="spinner"
					onDateChange={this.props.onDateChange}
					iconComponent={this.props.noIcon ? null : this.renderCalendar()}
					testID={this.props.testID || "datepicker"}
					cancelBtnTestID={this.props.cancelBtnTestID || "datepickerCancelBtn"}
					confirmBtnTestID={this.props.confirmBtnTestID || "datepickerConfirmBtn"}
					customStyles={{
						dateInput: {
							borderWidth: 0,
							padding: 2
						},
						dateText: {
							textAlign: 'left',
							color: '#fff',
							fontSize: normalize(14),
							alignSelf: 'flex-start',
							justifyContent: 'center'
						},
						placeholderText: {
							alignSelf: 'flex-start',
							fontFamily: 'ProximaNova-Regular',
							fontSize: normalize(14)
						},
						...this.props.customStyles
						// ... You can check the source to find the other keys.
					}}
				/> */}
				{this.props.error ? (
					<Text style={[styles.validationText]}>
						{this.props.error}
					</Text>
				) : null}
			</View>
		);
	}
}

export default Datepicker;
