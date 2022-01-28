import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Dimensions, Animated, Easing } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
// import LottieView from 'lottie-react-native';
// import Loading from '@lottie/loading.svg'

const { height } = Dimensions.get('window');

const styles = {
	viewLoader: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		alignSelf: 'center',
		height: height
	},
	textStyle: {
		paddingLeft: 12
	}
};

class Loader extends Component {
	
	// state = {
	// 	duration: 3000,
	// 	isPlaying: true,
	// 	isInverse: false,
	// 	loop: true,
	// };

	// setAnim = anim => {
  //   this.anim = anim;
  // };

	// manageAnimation = shouldPlay => {
  //   if (!this.state.progress) {
  //     if (shouldPlay) {
	// 			if (this.anim)
  //       this.anim.play();
  //     } else {
	// 			if (this.anim)
  //       this.anim.reset();
  //     }
  //   } else {
  //     this.state.progress.setValue(0);

  //     if (shouldPlay) {
  //       Animated.timing(this.state.progress, {
  //         toValue: 1,
  //         duration: this.state.duration,
  //         easing: Easing.linear,
  //         useNativeDriver: true,
  //       }).start(() => {
  //         this.setState({ isPlaying: false });
  //       });
  //     }
  //   }

  //   this.setState({ isPlaying: shouldPlay });
  // };

	// onPlayPress = () => this.manageAnimation(!this.state.isPlaying);
  // stopAnimation = () => this.manageAnimation(false);

  // onInversePress = () => this.setState(state => ({ isInverse: !state.isInverse }));
  // onProgressChange = progress => this.state.progress.setValue(progress);
	// onDurationChange = duration => this.setState({ duration });
	
	render() {
		// const { duration, isPlaying, isInverse, progress, loop, example } = this.state;
		// if (this.props.visible && !isPlaying) { this.onPlayPress(); }
		// if (!this.props.visible && isPlaying) { this.stopAnimation(); }

		return (
			<Spinner visible={this.props.visible} overlayColor={'rgba(0, 0, 0, 0.5)'}>
				<View style={styles.viewLoader}>
					<ActivityIndicator size="large" color="#ffc800" />
					{/* <Text style={styles.textStyle}>{this.props.text ? this.props.text : 'Loading'}</Text> */}
						{/* <LottieView 
							ref={this.setAnim} 
							style={{ width: 150, height: 150, borderRadius: 50 }} 
							source={require('@lottie/loading-dot.json')}
            	autoPlay={!progress}
							progress={progress}
            	loop={loop}
							enableMergePathsAndroidForKitKatAndAbove
						/> */}
						{/* <Loading /> */}
				</View>
			</Spinner>
		);
	}
}

export default Loader;
