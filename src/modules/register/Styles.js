import {
	StyleSheet,
	Dimensions,
} from 'react-native';
import normalize from '@helpers/NormalizedText';
import { colors } from '../../styles';

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
		marginHorizontal: 0
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
		flexDirection: 'row',
	},
	inputStyle: {
	},
	datePickerStyle: {
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
		flexGrow: 1,
		marginLeft: 10,
		alignItems: 'flex-start',
		alignSelf: 'flex-start',
		justifyContent: 'center',
	},
	radioLabelStyles: {
		paddingRight: 20,
		fontSize: normalize(12),
		fontWeight: '900',
		color: '#333',
		lineHeight: 24,
		paddingBottom: 10
	},
	titleContainer: {
		height: 28,
		position: 'relative',
		marginVertical: 10,
		marginHorizontal: 12,
		flex: 1,
		flexDirection: 'row'
	},
	titleLine: {
		flex: 1,
		height: 2,
		backgroundColor: '#ddd',
		position: 'relative',
		top: 14
	},
	titleBorder: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 13,
		backgroundColor: '#eee',
		borderRadius: 50,
		maxWidth: '50%'
	},
	titleText: {
		color: '#888',
	},
	btnUploadImg: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: '#F2F2F2',
		elevation: 3,
		borderWidth: 2,
		borderRadius: 10,
		borderColor: '#828282',
		borderStyle: 'dashed',
		height: width/2
	},
	formContainer: {
		width: width > 480 ? width - 80 : width - 60,
		paddingTop: 15
	},
	inputMultiline: {
		flex: 1,
		fontSize: normalize(12),
		fontWeight: '600',
		lineHeight: 20,
		letterSpacing: 0.5,
		color: colors.red,
		borderColor: '#eee',
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 14,
		backgroundColor: 'white',
		elevation: 3,
		minHeight: 45,
		maxHeight: 200,
		textAlignVertical: 'top'
	},
	imageContainer: {
		width: width > 480 ? width - 90 : width - 85,
		height: width/2-10,
		borderRadius: 10,
		resizeMode: 'contain'
	},
});