import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import AssessmentScreen from './AssessmentView';
import {
  setAppOpened,
  getAuth,
} from '../../AppState';

export default compose(
  connect(
    (state) => ({
      isLoading: state.login.isLoading,
      isConnect: state.app.isConnect,
    }),
    {
      setAppOpened,
      getAuth,
    },
  ),
  lifecycle({
  }),
)(AssessmentScreen);
