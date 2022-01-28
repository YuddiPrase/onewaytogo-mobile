import {
  StyleSheet,
  Dimensions
} from 'react-native';
import {
  fonts,
  colors
} from '@styles';

const {
  width,
  height
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    backgroundColor: 'white'
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 20,
    // height: 380,
    // borderWidth: 1,
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  badgeNotifContainer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: colors.primaryGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 7,
    top: 2,
    elevation: 2
  },
  imageProfile: {
    width: width > 480 ? 70 : 60,
    height: width > 480 ? 70 : 60,
    borderRadius: 80,
    alignSelf: 'center',
    top: width > 480 ? 5 : 2,
  },
  frontMenusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  groupMenusHeader: {
    marginLeft: 20,
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  groupMenusChildren: {
    marginLeft: 14,
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  contentSliderContainer: {
    padding: 5,
    flex: 1,
  },
  itemSliderContainer: {
    height: width > 480 ? 190 : 170,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

export default styles;