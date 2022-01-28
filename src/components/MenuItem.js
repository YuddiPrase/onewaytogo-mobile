import React, { Component } from 'react';
import {
	View,
	Dimensions,
	Pressable,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { colors } from '@styles';
import { Text } from './StyledText';
import normalize from '@helpers/NormalizedText';

const { width } = Dimensions.get('window');

const styles = {

	buttonStyle: {
    width: 60,
    height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},
	buttonStyleDisable: {
		alignItems: 'center',
		alignSelf: 'stretch',
		backgroundColor: '#ececec',
		justifyContent: 'center',
		borderRadius: 15,
		height: 50,
		margin: 10
	},
	textStyle: {
		alignSelf: 'center',
		color: '#fff',
		fontSize: 14
	},
	buttonCircleContainer: {
		maxWidth: 80,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 5,
		margin: 8,
	},
	buttonCircleStyle: {
		backgroundColor: 'white',
    width: 60,
    height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		borderRadius: 30,
		elevation: 3,
		shadowRadius: 10
	},
	buttonCircleStyleDisable: {
		backgroundColor: '#ddd',
    width: 60,
    height: 60,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
		borderRadius: 30,
		elevation: 3,
		shadowRadius: 10
	},
	imageIcon: {
		width: 30,
		height: 30,
	}
};

class MenuItem extends Component {
	state = {
		imageIcon: require('@images/icons/PNG/01.KomunitasPotensial-01.png')
	}

	componentDidMount() {
		switch (this.props.text) {
			case 'Komunitas Potensial':
				this.setState({
					imageIcon: require('@images/icons/PNG/01.KomunitasPotensial-01.png')
				})
			break;
			case 'Pemilih Potensial':
				this.setState({
					imageIcon: require('@images/icons/PNG/02.PemilihPotensial-01.png')
				})
			break;
			case 'Warga Berpengaruh':
				this.setState({
					imageIcon: require('@images/icons/PNG/03.WargaBerpengaruh-01.png')
				})
			break;
			case 'Pantau Pesaing':
				this.setState({
					imageIcon: require('@images/icons/PNG/04.PantauPesaing-01.png')
				})
			break;
			case 'Event':
				this.setState({
					imageIcon: require('@images/icons/PNG/05.Event-01.png')
				})
			break;
			case 'Distribusi Logistik':
				this.setState({
					imageIcon: require('@images/icons/PNG/06.DistribusiLogistik-01.png')
				})
			break;
			case 'Laporan Situasi':
				this.setState({
					imageIcon: require('@images/icons/PNG/07.LaporanSituasi-01.png')
				})
			break;
			case 'Pesan Kampanye':
				this.setState({
					imageIcon: require('@images/icons/PNG/08.PesanKampanye-01.png')
				})
			break;
			case 'Tugas Lapangan':
				this.setState({
					imageIcon: require('@images/icons/PNG/TugasLapangan-01.png')
				})
			break;
			case 'Manajemen Isu':
				this.setState({
					imageIcon: require('@images/icons/PNG/TAMBAHAN/manajemen-isu-01.png')
				})
			break;
			default: this.setState({
				imageIcon: require('@images/icons/PNG/17.Lainnya.png')
			})
		}
	}

	render() {
		if (!this.props.data?.access) {
			return (
				<View style={styles.buttonCircleContainer}>
					<View
						style={[styles.buttonCircleStyle, { overflow: 'hidden' }]}
					>
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 60, height: 60, flex: 1, backgroundColor: 'rgb(250,250,250)' }}>
							<Image
								style={[styles.imageIcon,{ tintColor: '#ddd' }]}
								source={this.state.imageIcon}
								resizeMode={'cover'}
							/>
						</View>
					</View>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
						<Text size={normalize(9)} color={'#aaa'} bold={true} style={{ textAlign: 'center', maxHeight: 28, lineHeight: normalize(10) }} numberOfLines={2}>
							{this.props.text || 'New Event'}
						</Text>
					</View>
				</View>
			);
		} else if (this.props.isCircle) {
			return (
				<View style={styles.buttonCircleContainer}>
					<Pressable
						accessible={this.props.accessible ? this.props.accessible : false}
						accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
						testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
						onPress={this.props.onPress}
						style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonCircleStyle : styles.buttonCircleStyleDisable) : styles.buttonCircleStyle,  this.props.style]}
						disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
						containerStyle={{ backfaceVisibility: 'visible', backgroundColor: 'transparent', }}
					>
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 60, height: 60, flex: 1, }}>
							<Image
								style={styles.imageIcon}
								source={this.state.imageIcon}
								resizeMode={'cover'}
							/>
						</View>
					</Pressable>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
						<Text size={normalize(9)} color={colors.primaryDark} bold={true} style={{ textAlign: 'center', maxHeight: 28, lineHeight: normalize(10) }} numberOfLines={2}>
							{this.props.text || 'New Event'}
						</Text>
					</View>
				</View>
			);
		}
		return (
			<Pressable
			accessible={this.props.accessible ? this.props.accessible : false}
			accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
			testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
			onPress={this.props.onPress}
			style={[this.props.canSubmit ? (this.props.canSubmit['disable'] === false ? styles.buttonStyle : styles.buttonStyleDisable) : styles.buttonStyle,  this.props.style]}
			disabled={this.props.loader || (this.props.canSubmit ? this.props.canSubmit['disable'] : false)}
			containerStyle={{ backfaceVisibility: 'visible', backgroundColor: 'transparent', }}
		>
			<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 60, height: 60, flex: 1, }}>
				<Icon name={this.props.name || 'folder'} size={28} color={colors.primaryGreen}/>
				<Text size={normalize(9)} color={colors.gray} style={{ textAlign: 'center', maxHeight: 28, lineHeight: normalize(10) }} numberOfLines={2}>{this.props.text || 'New Event'}</Text>
			</View>
		</Pressable>
		);
	}
}

export default MenuItem;
