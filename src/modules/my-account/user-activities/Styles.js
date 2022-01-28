import {
	StyleSheet
} from 'react-native';
import normalize from '@helpers/NormalizedText';

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
		height: 250,
		borderRadius: 10,
	}
});