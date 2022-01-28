import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import NotificationsScreen from './NotificationsView';

import {
  eventActivityShow,
} from '../event-activity/EventActivityState';
import {
  notificationsIndex,
  notificationsStore,
  notificationsShow,
  notificationsUpdateRead,
 } from './NotificationsState';

import { getUser } from '../AppState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.notifications.isLoading,
      dataIndex: state.notifications.dataIndex,
      indexPage: state.notifications.indexPage,
      indexPerPage: state.notifications.indexPerPage,
    })},
    {
      notificationsIndex,
      notificationsStore,
      notificationsShow,
      notificationsUpdateRead,
      getUser,
      eventActivityShow,
    }
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(NotificationsScreen);
