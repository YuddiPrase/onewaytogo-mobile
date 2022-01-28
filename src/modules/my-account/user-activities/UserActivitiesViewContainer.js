import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import UserActivitiesScreen from './UserActivitiesView';
import { 
  userActivitiesIndex,
} from './UserActivitiesState';

export default compose(
  connect(
    (state) => {
    return ({
      isLoading: state.userActivities.isLoading,
      dataIndex: state.userActivities.dataIndex,
      indexPage: state.userActivities.indexPage,
      indexPerPage: state.userActivities.indexPerPage,
    })},
    { 
      userActivitiesIndex,
    }
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(UserActivitiesScreen);
