import {
	StyleSheet
} from 'react-native';
import normalize from '@helpers/NormalizedText';
import { colors } from '@styles';

export default StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
	},
	containerImage: {
		backgroundColor: 'white'
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
		borderRadius: 15
	},
	textStyle: {
		color: '#555',
		fontWeight: 'bold'
	},
	buttonContainer: {
		width: '100%',
		flex: 1,
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
	inputSearchStyle: {
		backgroundColor: 'rgb(245,245,245)',
		color: '#555',
		borderWidth: 1,
		borderColor: '#aaa',
		borderRadius: 25,
		elevation: 3
	},
	inputStyle: {
		// backgroundColor: 'rgba(0,0,0,0.7)',
		// paddingVertical: 12,
		// color: '#fff',
		// fontWeight: '600',
		// borderColor: '#b2b2b2',
	},
	datePickerStyle: {
		backgroundColor: 'rgba(0,0,0,0.7)',
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
	btnUploadImg: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		borderWidth: 4,
		borderRadius: 15,
		borderColor: '#666',
	},
	imageContainer: {
		width: '100%',
		height: 350,
		borderRadius: 10,
		resizeMode: 'contain'
	},
	addCircleButton: {
		position: 'absolute',
		bottom: 30,
		right: 30,
		elevation: 3,
		shadowRadius: 10,
		padding: 5,
		borderRadius: 50,
		backgroundColor: colors.primaryGreen
	}
});