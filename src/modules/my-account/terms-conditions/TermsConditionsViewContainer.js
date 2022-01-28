import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import TermsConditionsScreen from './TermsConditionsView';

import {
  getTermsAndConditions,
} from '../../AppState';

export default compose(
  connect(
    (state) => ({
      userData: state.app.userData,
      isConnect: state.app.isConnect,
      dataTermsAndConditions: state.app.dataTermsAndConditions
    }),
    { 
      getTermsAndConditions
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.getTermsAndConditions();
    },
  }),
)(TermsConditionsScreen);
