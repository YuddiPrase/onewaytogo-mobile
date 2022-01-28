import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import PrivacyPolicyScreen from './PrivacyPolicyView';

import {
  getPrivacyPolicy,
} from '../../AppState';

export default compose(
  connect(
    (state) => ({
      userData: state.app.userData,
      isConnect: state.app.isConnect,
      dataPrivacyPolicy: state.app.dataPrivacyPolicy
    }),
    { 
      getPrivacyPolicy
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getPrivacyPolicy();
      // console.warn('PP',this.props?.dataPrivacyPolicy)
    },
  }),
)(PrivacyPolicyScreen);
