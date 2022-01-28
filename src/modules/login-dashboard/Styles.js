import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import { colors } from '@styles';
import normalize from '@helpers/NormalizedText';

const { width } = Dimensions.get('screen');

export default StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white'
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
		marginTop: 0,
		marginHorizontal: 0
	},
	textStyle: {
		// color: 'white',
		// fontWeight: '900'
	},
	buttonContainer: {
		// width: '100%',
		width: width > 480 ? 400 : width - 80,
		paddingTop: width > 480 ? 50 : 25,
	},
	whiteText: {
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
		textDecorationLine: 'underline'
	},
	linkRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingTop: 20,
		marginBottom: 20,
	},
	introSlide: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	introImage: {
		width: (width/2)+50,
		height: (width/2)+50,
		resizeMode: 'contain'
	},
	introTitle: {
		maxWidth: (width/2)+70,
		fontSize: normalize(16),
		color: '#555'
	},
	introText: {
		textAlign: 'center',
		maxWidth: (width/2)+70,
		fontSize: normalize(12),
		color: '#888'
	},
	buttonCircle: {
		borderRadius: 60,
		padding: 10,
		elevation: 3,
		backgroundColor: colors.primaryColor,
		bottom: 15,
		right: 10
	},
	activeDotStyle: {
		backgroundColor: colors.primaryColor
	},
});