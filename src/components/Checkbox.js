import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { colors } from '@styles';


const styles = {
    mainStyle: {
      justifyContent: 'flex-start',
      backgroundColor: 'transparent',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'flex-start',
      borderWidth: 0,
      margin: 10,
      marginLeft: 0
    },
    textStyle: {
      marginLeft: 0,
      marginRight: 0,
    },
    customText: {
      marginTop: 7,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'flex-start',
      flexWrap: 'wrap'
    }
};

class Checkbox extends Component {
    state = {
        checked: false
    }
    componentWillMount() {
        if (this.props.value !== this.state.checked) {
            this.setState({
                checked: this.props.value
            });
            this.props.onPress({ flag: this.props.value, answer: this.props.title });
        }
    }

    renderText() {
        if (this.props.title) {
            return (
                <View style={styles.customText}>
                    <Text>{this.props.title}</Text>
                </View>
            );
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}
            >
                <CheckBox
                    title={this.renderText()}
                    checked={this.state.checked}
                    onPress={() => {
                        this.setState({ checked: !this.state.checked });
                        if (this.props.onPress) {
                            this.props.onPress({ flag: !this.state.checked, answer: this.props.title });
                        }
                    }}
                    containerStyle={styles.mainStyle}
                    textStyle={styles.textStyle}
                    checkedColor={colors.primaryColor}
                    uncheckedColor={colors.primaryColor}
                />
                {/* <View style={styles.customText}>
                    <Text style={{ fontFamily: 'ProximaNova-Regular', fontSize: 14, color: '#000' }}>{this.props.title}</Text>
                </View> */}
            </View>
        );
    }
}

export default Checkbox;
