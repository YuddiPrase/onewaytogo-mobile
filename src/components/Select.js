import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text } from '@components/StyledText';

import normalize from '@helpers/NormalizedText';

const styles = {
  containerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
		borderWidth: 1,
		borderColor: '#eee',
    textAlign: 'left',
    borderRadius: 10,
    flex: 1,
		paddingVertical: 12,
		color: '#555',
		fontWeight: '600',
    backgroundColor: 'white',
    elevation: 3
  },
  inputStyle: {
    width: '100%',
    height: 22,
    color: '#aaa',
  },
  itemStyle: {
  },
  baseStyle: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10
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

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  render() {
    if (this.props.isSquare) {
      return (
        <View style={[styles.baseStyle, this.props.baseStyle]}>
          {this.props.isSquareLabel &&
						<View style={{ marginBottom: 5 }}>
              <Text style={[styles.labelText]} size={16}>
                {this.props.placeholder}
              </Text>
            </View>
          }
          <View style={[styles.containerStyle, this.props.containerStyle]}>
            <Picker
              accessible={this.props.accessible ? this.props.accessible : false}
              accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `select${this.props.placeholder ? this.props.placeholder : ''}Label`}
              testID={this.props.testID ? this.props.testID : `select${this.props.testID}`}
              style={[styles.inputStyle, { color: this.props.value == '' ? '#aaa' : '#333'}]}
              itemStyle={styles.itemStyle}
              selectedValue={this.props.value}
              onValueChange={this.props.onValueChange}
              dropdownIconColor={'#aaaaaa'}
              enabled={this.props.disabled ? false : true}
            >
              {this.props.placeholder ? (
                <Picker.Item value="" label={this.props.placeholder} color='#b2b2b2'/>
              ) : null}
              {this.props.items?.map((i, index) => (
                <Picker.Item
                  key={[this.props.iteratorLabel] + index}
                  label={i[this.props.iteratorLabel]}
                  value={i[this.props.iteratorKey]}
                />
              ))}
            </Picker>
          </View>
          {this.props.error ? (
            <Text style={[styles.validationText]}>{this.props.error}</Text>
          ) : null}
        </View>
      );
    }
    return (
      <View style={[styles.baseStyle, this.props.baseStyle]}>
        {!this.props.isLabel &&
          <Text style={[styles.labelText]} size={16}>
            {this.props.placeholder}
          </Text>
        }
        <View style={[styles.containerStyle, this.props.containerStyle]}>
          <Picker
            accessible={this.props.accessible ? this.props.accessible : false}
            accessibilityLabel={this.props.accessibilityLabel ? this.props.accessibilityLabel : `select${this.props.placeholder ? this.props.placeholder : ''}Label`}
            testID={this.props.testID ? this.props.testID : `select${this.props.testID}`}
            style={[styles.inputStyle, { color: this.props.value == '' ? '#aaa' : '#333'}]}
            itemStyle={styles.itemStyle}
            selectedValue={this.props.value}
            onValueChange={this.props.onValueChange}
            dropdownIconColor={'#ffffff'}
            enabled={this.props.disabled ? false : true}
          >
            {this.props.placeholder ? (
              <Picker.Item value="" label={this.props.placeholder} color='#666'/>
            ) : null}
            {this.props.items?.map((i, index) => (
              <Picker.Item
                key={[this.props.iteratorLabel] + index}
                label={i[this.props.iteratorLabel]}
                value={i[this.props.iteratorKey]}
              />
            ))}
          </Picker>
        </View>
        {this.props.error ? (
          <Text style={[styles.validationText]}>{this.props.error}</Text>
        ) : null}
      </View>
    );
  }
}

export default Select;
