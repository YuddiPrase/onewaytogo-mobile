import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import normalize from '@helpers/NormalizedText';
import { Text } from '@components/StyledText';
import { colors } from '@styles';

const styles = {
	buttonStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		height: 48,
		margin: 10,
		borderRadius: 8,
		backgroundColor: colors.primaryColor,
		elevation: 3,
	},
	buttonStyleDisable: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		height: 48,
		margin: 10,
		borderRadius: 8,
		backgroundColor: 'rgba(210, 34, 41, 0.5)',
		// elevation: 3,
	},
	buttonSecondaryStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		height: 48,
		margin: 10,
		borderWidth: 1,
		borderColor: colors.primaryColor,
		borderRadius: 8,
		backgroundColor: 'white',
		elevation: 3,
	},
	buttonSecondaryStyleDisable: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'stretch',
		height: 48,
		margin: 10,
		borderRadius: 8,
		backgroundColor: 'rgba(250,180,0,0.3)',
		elevation: 3,
	},
	textStyle: {
		alignSelf: 'center',
	}
};

class Button extends Component {
	renderIcon() {
		if (this.props.icon) {
			return <Icon name={this.props.icon} size={this.props.iconSize} color={this.props.iconColor} />;
		}
		else if (this.props.withImage) {
			return <Image source={this.props.withImage} style={this.props.imageStyle} />;
		}
	}

	renderLoader() {
		if (this.props.loader) {
			return <ActivityIndicator size="large" color="#0e5f3a" />;
		}
	}

	render() {
		const styleType = this.props.styleType == 'secondary' ? styles.buttonSecondaryStyle : styles.buttonStyle;

		const styleTypeDisable = this.props.styleType == 'secondary' ? styles.buttonSecondaryStyleDisable : styles.buttonStyleDisable;

		const textColor = this.props.styleType == 'secondary' ? colors.primaryColor : 'white';

		return (
			<TouchableOpacity
				accessible={this.props.accessible ? this.props.accessible : false}
				accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `button${this.props.children}Label`}
				testID={this.props.testID ? this.props.testID : `input${this.props.testID}`}
				onPress={this.props.onPress}
				style={[this.props.disabled ? styleTypeDisable : styleType, this.props.style]}
				disabled={this.props.loader || this.props.disabled}
			>
				{this.renderIcon()}
				{this.renderLoader()}
				<Text style={[styles.textStyle, this.props.textStyle]} bold={true} size={normalize(12)} color={textColor}>{this.props.loader ? null : this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

export default Button;
