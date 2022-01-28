import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import EventActivityScreen from './EventActivityView';

export default compose(
  connect(
    () => {
      return ({
      });
    },
    {
    }
  ),
  lifecycle({
    componentDidMount() {
    },
  }),
)(EventActivityScreen);
