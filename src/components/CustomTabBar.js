import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import normalize from '@helpers/NormalizedText';
import { colors, fonts } from '@styles';

class CustomTabBar extends Component {
  tabIcons = [];

  // isNotComplete() {
  //   if (this.props.globalProfile && this.props.globalProfile.birth_date && this.props.globalProfile.id_number) {
  //     return false;
  //   }
  //   return true;
  // }


  render() {
    return (
      <View style={[styles.tabs, this.props.style]}>
        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
              accessible={true}
              accessibilityLabel={this.props.titles[i]}
              testID={this.props.titles[i]}
            >
              <Icon
                name={tab}
                size={26}
                color={
                  this.props.activeTab === i ? colors.primaryGreen : colors.lightGray
                }
                ref={icon => {
                  this.tabIcons[i] = icon;
                }}
              />
              <Text 
                numberOfLines={1}
                style={[
                  { fontFamily: this.props.activeTab === i ? 
                  fonts.primaryBold : fonts.primaryRegular, fontSize: normalize(10) },
                  {
                    color:
                      this.props.activeTab === i
                        ? colors.primaryGreen
                        : colors.lightGray
                  }
                ]}
              >
                {this.props.titles[i]}
              </Text>
              {/* {(i === 2 && this.props.globalProfile.notif_unread > 0) ? <View style={styles.badge} /> : null}
              {(i === 1 && this.props.isCountNotif) ? (
                  <View style={{ position: 'absolute', right: 10, top: 5, height: 16, width: 16, borderRadius: 8, backgroundColor: '#D83426', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: '#fff', fontSize: 10, fontWeight: '600' }}>{this.props.notifCount}</Text>
                  </View>
              ) : null}
              {(i === 4 && this.isNotComplete()) ? <View style={styles.badge} /> : null} */}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  tabs: {
    height: 60,
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#fff'
  },
  badge: {
    backgroundColor: '#DC1E2D',
    position: 'absolute',
    top: 5,
    left: 20,
    height: 12,
    width: 12,
    borderRadius: 20
  }
});
// const mapStateToProps = (state) => {
//   return {
//     globalProfile: state.globalReducer.globalProfile,
//     isCountNotif: state.csChatReducer.isCountNotif,
//     notifCount: state.csChatReducer.notifCount,
//   };
// };

// export default connect(mapStateToProps, null)(CustomTabBar);
export default CustomTabBar;
