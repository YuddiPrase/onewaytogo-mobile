import { compose, withState, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import HomeScreen from './HomeView';

import {
  getUser,
  getDashboard,
  updateLocation,
} from '../AppState';

export default compose(
  withState('isExtended', 'setIsExtended', false),
  connect(
    (state) => ({
      isConnect: state.app.isConnect,
      userData: state.app.userData,
      dashboardData: state.app.dashboardData,
      dataEventIndex: state.eventActivity.dataIndex,
    }),
    {
      getUser,
      updateLocation,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.getUser().then(() => {
        this.props.updateLocation();
      });
    },
  }),
)(HomeScreen);
