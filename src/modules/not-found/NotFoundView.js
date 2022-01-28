import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Linking,
  Dimensions,
} from 'react-native';

import { fonts, colors } from '../../styles';

const { width } = Dimensions.get('window');

export default function NotFoundScreen(props) {
  const rnsUrl = 'https://reactnativestarter.com';
  const handleClick = () => {
    Linking.canOpenURL(rnsUrl).then((supported) => {
      if (supported) {
        Linking.openURL(rnsUrl);
      } else {
        // console.log(`Don't know how to open URI: ${rnsUrl}`);
      }
    });
  };

  return (
    <ImageBackground
      // source={require('@images/bg/bg-diagonal.jpg')}
      source={null}
      style={styles.container}
    >
      <View style={styles.textContainer}>
        <Text style={styles.availableText}>Sorry this page is</Text>
        <Text style={styles.availableTextItalic}>under construction</Text>
      </View>
      <Image
        source={require('@images/pages/UnderConstruction.png')}
        style={styles.nerdImage}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  nerdImage: {
    maxWidth: 450,
    width: width - 100,
    height: width - 150,
    borderWidth: 1
  },
  availableText: {
    color: colors.primaryDark,
    fontFamily: fonts.primaryLight,
    fontSize: 26,
  },
  availableTextItalic: {
    color: colors.primaryDark,
    fontFamily: fonts.primaryBold,
    fontSize: 30,
    fontStyle: 'italic',
    lineHeight: 30
    // textShadowColor: '#333',
    // textShadowOffset: { width: -1, height: 0 },
    // textShadowRadius: 10
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
});
