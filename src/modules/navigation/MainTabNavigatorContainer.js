import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import MainTabNavigator from './MainTabNavigator';

export default compose(
  connect(
    (state) => ({
      userData: state.app.userData,
    }),
    {
    },
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(MainTabNavigator);
