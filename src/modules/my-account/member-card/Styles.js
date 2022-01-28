import {
	StyleSheet,
	Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	topper: {
		flex: 1,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16
	},
	topperImg: {
		height: 162,
		width: 162,
		resizeMode: 'contain',
		marginBottom: 42
	},
	buttonStyle: {
		// borderWidth: 2,
		// borderColor: '#b2b2b2'
		marginTop: 40,
		elevation: 3,
		shadowRadius: 5,
	},
	textStyle: {
		// color: 'white',
		// fontWeight: '900'
	},
	buttonContainer: {
		// width: '100%',
		width: width > 480 ? 400 : width - 40,
		paddingTop: width > 480 ? 50 : 25,
	},
	whiteText: {
		fontFamily: 'ProximaNova-Regular',
		color: '#999',
		fontSize: 12,
		textAlign: 'center',
		lineHeight: 18
	},
	inputContainer: {
		flexDirection: 'row',
	},
	inputStyle: {
	},
	linkText: {
		color: '#333',
		fontFamily: 'ProximaNova-Regular',
		fontSize: 15
	},
	linkRow: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		width: 'auto',
		padding: 8,
		marginBottom: 40,
	}
});