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
});
