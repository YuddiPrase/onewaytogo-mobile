import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Platform, UIManager } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen';
import { getAuthorization } from '@helpers/Storage';

import AppView from './AppView';

import {
  getProvinces,
  isConnection,
  getListPartai,
  getListKandidat,
  getTermsAndConditions,
  getNewsFeed,
} from './AppState';

export default compose(
  connect(
    () => {
    return ({
    })},
    {
      getProvinces,
      isConnection,
      getListPartai,
      getListKandidat,
      getTermsAndConditions,
      getNewsFeed,
    },
  ),
  lifecycle({
    async componentDidMount() {
      if (Platform.OS === 'android') {
        // eslint-disable-next-line no-unused-expressions
        UIManager.setLayoutAnimationEnabledExperimental
          && UIManager.setLayoutAnimationEnabledExperimental(true);
      }

      NetInfo.fetch().then(state => {
        // console.warn('First, is ' + (state.isConnected ? 'online' : 'offline'), state.isConnected);
        this.props.isConnection(state.isConnected, this.props);
      });

      const unsubscribe = NetInfo.addEventListener(state => {
        // console.log("Connection State 1", state);
        this.props.isConnection(state.isConnected, this.props);
      });

      // unsubscribe();
      const gAuth = await getAuthorization();
      // console.warn('access_token', gAuth)
      if (!gAuth || !gAuth.access_token) {
        this.props.getProvinces();
      }
      SplashScreen.hide();
    },
  }),
)(AppView);
