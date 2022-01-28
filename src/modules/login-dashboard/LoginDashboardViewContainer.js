import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import LoginDashboardScreen from './LoginDashboardView';

export default compose(
  connect(
    (state) => ({
      isConnect: state.app.isConnect,
    }),
    {},
  )
)(LoginDashboardScreen);
