import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import normalize from '@helpers/NormalizedText';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	containerImage: {
	},
	topper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 12,
		marginVertical: 12,
	},
	topperImg: {
		height: 162,
		width: 162,
		resizeMode: 'contain',
		marginBottom: 42
	},
	buttonStyle: {
		// borderRadius: 15
		elevation: 3
	},
	textStyle: {
		color: '#333',
		fontWeight: 'bold'
	},
	buttonContainer: {
		// width: '100%',
		alignSelf: 'center',
		width: width > 480 ? width - 60 : width - 40,
		paddingVertical: width > 480 ? 35 : 25,
	},
	whiteText: {
		fontFamily: 'ProximaNova-Regular',
		color: '#999',
		fontSize: 12,
		textAlign: 'center',
		lineHeight: 18
	},
	inputContainer: {
		flexDirection: 'column'
	},
	inputStyle: {
		// backgroundColor: 'rgba(0,0,0,0.7)',
		// paddingVertical: 12,
		// color: '#fff',
		// fontWeight: '600',
		// borderColor: '#b2b2b2',
	},
	datePickerStyle: {
		// backgroundColor: 'rgba(0,0,0,0.7)',
	},
	datePickerCustomStyle: {
	},
	linkText: {
		color: '#DC1E2D',
		fontFamily: 'ProximaNova-Regular',
		fontSize: 15,
		fontWeight: '900'
	},
	linkRow: {
		flexDirection: 'row',
		width: 'auto',
		padding: 8,
	},
	informationNotes: {
		flex: 1,
		flexWrap: 'wrap',
		fontSize: normalize(24),
		color: '#ddd',
		margin: 20,
		textAlign: 'left'
	},
	radioStyle: {
		flex: 1,
		marginLeft: 10,
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
		justifyContent: 'center',
	},
	radioLabelStyles: {
		paddingRight: 20,
		fontSize: normalize(14),
		fontWeight: '900',
		color: '#333',
		lineHeight: 24,
		paddingBottom: 15
	},
});